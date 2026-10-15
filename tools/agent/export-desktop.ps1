# Plenix handoff, part 1 — run on the OLD desktop (PowerShell).
# Collects what git does not carry (Claude's memory and the work log) into D:\Plenix-handoff, with a SHA-256 list so the
# VM can check nothing was damaged on the way (this PC's CPU corrupts some large writes).
# Then copy the whole D:\Plenix-handoff folder to the VM (network share or USB), e.g. to C:\Users\Administrator\Downloads.
$ErrorActionPreference = 'Stop'

$Memory = 'C:\Users\AdminMan\.claude\projects\D--Documents-Projects-Projects-Applications-Plenix---DAM\memory'
$Audit  = 'D:\Documents\Projects\Projects_Applications\Plenix - DAM\audit'
$Setup  = 'D:\Documents\Projects\Projects_Applications\Plenix\tools\agent\setup-vm.ps1'
$Out    = 'D:\Plenix-handoff'

if (Test-Path $Out) { throw "$Out already exists. Rename or remove it first." }
New-Item -ItemType Directory $Out | Out-Null

Copy-Item $Memory "$Out\memory" -Recurse
Copy-Item $Audit  "$Out\audit"  -Recurse
Copy-Item $Setup  "$Out\setup-vm.ps1"

# Checksums of every file, relative to $Out
Get-ChildItem $Out -Recurse -File | Where-Object Name -ne 'setup-vm.ps1' | ForEach-Object {
  '{0}  {1}' -f (Get-FileHash $_.FullName -Algorithm SHA256).Hash, $_.FullName.Substring($Out.Length + 1)
} | Set-Content "$Out\checksums.txt" -Encoding utf8

# Check the copies against the originals right away
$bad = 0
foreach ($pair in @(@($Memory, "$Out\memory"), @($Audit, "$Out\audit"))) {
  Get-ChildItem $pair[0] -Recurse -File | ForEach-Object {
    $copy = Join-Path $pair[1] $_.FullName.Substring($pair[0].Length + 1)
    if ((Get-FileHash $_.FullName).Hash -ne (Get-FileHash $copy).Hash) { Write-Warning "Differs: $copy"; $bad++ }
  }
}
if ($bad) { throw "$bad files were copied wrong. Delete $Out and run this again." }

$n = (Get-ChildItem $Out -Recurse -File).Count
Write-Host "OK: $n files in $Out. Copy that folder to the VM, then run setup-vm.ps1 from it there." -ForegroundColor Green
