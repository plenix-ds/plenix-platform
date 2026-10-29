# Plenix handoff, part 2 — run on the Windows VM (PowerShell), from inside the copied Plenix-handoff folder:
#   powershell -ExecutionPolicy Bypass -File .\setup-vm.ps1
# Needs: Git (with Git Bash), Node 22, Chrome, GitHub access (gh auth login), Claude Code.
# Result:
#   C:\Users\Administrator\Documents\Plenix                 the repo (open Claude Code here)
#   C:\Users\Administrator\Documents\Plenix - DAM\audit     the work log
#   C:\Users\Administrator\Documents\Plenix-rel             clean copy that deploys run from
#   C:\Users\Administrator\.claude\projects\C--Users-Administrator-Documents-Plenix\memory   Claude's memory
$ErrorActionPreference = 'Stop'

$Handoff = $PSScriptRoot
$Docs    = 'C:\Users\Administrator\Documents'
$Repo    = Join-Path $Docs 'Plenix'
$Rel     = Join-Path $Docs 'Plenix-rel'
$WorkLog = Join-Path $Docs 'Plenix - DAM\audit'
# Claude Code names a project's folder after the folder it is opened in (every \ : and space becomes -).
$Memory  = 'C:\Users\Administrator\.claude\projects\C--Users-Administrator-Documents-Plenix\memory'

function Step($t) { Write-Host "`n== $t" -ForegroundColor Cyan }

Step '1. Checking the installed tools'
foreach ($tool in 'git', 'node', 'npm', 'gh', 'claude') {
  if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "$tool is not installed (or not on PATH)." }
}
$nodeMajor = [int]((node -v).TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 22) { throw "Node 22 or newer is needed (found $(node -v))." }
gh auth status | Out-Null
if ($LASTEXITCODE) { throw 'Run "gh auth login" first (the repos are private).' }

Step '2. Checking the copied files'
$bad = 0
Get-Content (Join-Path $Handoff 'checksums.txt') | ForEach-Object {
  $hash, $rel = $_.TrimStart([char]0xFEFF) -split "  ", 2
  $f = Join-Path $Handoff $rel
  if (-not (Test-Path $f) -or (Get-FileHash $f -Algorithm SHA256).Hash -ne $hash) { Write-Warning "Damaged or missing: $rel"; $bad++ }
}
if ($bad) { throw "$bad files are damaged. Copy the Plenix-handoff folder again." }
Write-Host 'All files intact.'

Step '3. Cloning the repo (with the design system)'
if (Test-Path $Repo) { Write-Host "$Repo already exists; skipped." }
else {
  gh auth setup-git
  git clone --recurse-submodules https://github.com/plenix-ds/plenix-platform.git $Repo
  if ($LASTEXITCODE) { throw 'git clone failed.' }
}

Step '4. Installing packages'
Push-Location $Repo
npm ci
if ($LASTEXITCODE) { Pop-Location; throw 'npm ci failed.' }
Pop-Location

Step '5. Work log'
if (Test-Path $WorkLog) { Write-Host "$WorkLog already exists; skipped." }
else { New-Item -ItemType Directory (Split-Path $WorkLog) -Force | Out-Null; Copy-Item (Join-Path $Handoff 'audit') $WorkLog -Recurse }

Step "6. Claude's memory"
if (Test-Path $Memory) { Write-Host "$Memory already exists; skipped (merge by hand if needed)." }
else { New-Item -ItemType Directory (Split-Path $Memory) -Force | Out-Null; Copy-Item (Join-Path $Handoff 'memory') $Memory -Recurse }

Step '7. Clean copy for deploys'
if (Test-Path $Rel) { Write-Host "$Rel already exists; skipped." }
else {
  git -C $Repo worktree add --detach $Rel HEAD
  git -C $Rel submodule update --init
  if ($LASTEXITCODE) { throw 'Creating the deploy copy failed.' }
}

Step '8. SSH key for deploys (PUBLISH_USER on PUBLISH_HOST)'
foreach ($n in 'PUBLISH_HOST', 'PUBLISH_USER') { if (-not [Environment]::GetEnvironmentVariable($n)) { throw "Missing $n`: set it in the environment (the publish host and its account; no default)." } }
$key = Join-Path $HOME '.ssh\id_ed25519'
if (-not (Test-Path $key)) {
  New-Item -ItemType Directory (Split-Path $key) -Force | Out-Null
  ssh-keygen -t ed25519 -f $key -C 'plenix-deploy'   # press Enter twice for no passphrase
}
Write-Host "Add this public key to ~/.ssh/authorized_keys of $env:PUBLISH_USER on $env:PUBLISH_HOST (one line):" -ForegroundColor Yellow
Get-Content "$key.pub"
Write-Host "Then test it with:  ssh $env:PUBLISH_USER@$env:PUBLISH_HOST echo ok"

Write-Host "`nDone. Open Claude Code in $Repo and say: continue from HANDOFF.md" -ForegroundColor Green
