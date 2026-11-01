#!/usr/bin/env bash
# release.sh "<subject>" <changelog-entry.md> <log-entry.md> <main-repo paths...>
# RELEASE_LEVEL=minor for new or rewritten components (a library wave, a rewrite), patch (the default) for fixes only
# (semver from 0.32.0 on, owner 2026-10-15, RedSave #27: a rewrite is listed under "Changed" with what an app must check).
# Next version from CHANGELOG.md (patch, or minor with RELEASE_LEVEL=minor); changelog + work log entries; usage; commits the design system submodule (all of
# it) and the given main-repo paths; pushes; deploys from the clean worktree (retries); tags. CI is not waited on.
set -euo pipefail
# Paths: the repo is two folders up from this script; the work log is ../Plenix - DAM/audit; the clean deploy copy is
# ../Plenix-rel (create once: git worktree add ../Plenix-rel HEAD). Override with PLENIX_REL.
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
REL="${PLENIX_REL:-$REPO/../Plenix-rel}"
SUBJ="$1"; CL="$2"; LOG="$3"; shift 3
cd "$REPO"
git fetch -q
V=$(node -e "
const fs=require('fs');let s=fs.readFileSync('CHANGELOG.md','utf8');const top=/## \[(\d+)\.(\d+)\.(\d+)\]/.exec(s);const V=process.env.RELEASE_LEVEL==='minor'?top[1]+'.'+(+top[2]+1)+'.0':top[1]+'.'+top[2]+'.'+(+top[3]+1);
const e=fs.readFileSync(process.argv[1],'utf8').trim();
s=s.replace(top[0],'## ['+V+'] - '+new Date().toISOString().slice(0,10)+'\n\n'+e+'\n\n'+top[0]);fs.writeFileSync('CHANGELOG.md',s);
const p=JSON.parse(fs.readFileSync('package.json','utf8'));p.version=V;fs.writeFileSync('package.json',JSON.stringify(p,null,2)+'\n');
fs.appendFileSync('../Plenix - DAM/audit/batches/15-26.md','\n'+fs.readFileSync(process.argv[2],'utf8').trim().split('{V}').join(V)+'\n');
console.log(V);" "$CL" "$LOG")
echo "version $V"
(node build-app.js >/dev/null || node build-app.js >/dev/null || node build-app.js >/dev/null)   # retried: the CPU crashes builds; never release a stale bundle (0.31.48 merge committed an old dist/platform.js)
node build-usage.js >/dev/null
git -C platform/design-system add -A .   # the generated spec files are ignored there (#692): only sources are committed
git -C platform/design-system diff --cached --quiet || git -C platform/design-system commit -qm "$SUBJ

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git -C platform/design-system push -q origin HEAD:main
# the paths a caller names that git ignores (a build output, #692: never committed) are left out, so git add does not stop
paths=(); for p in "$@"; do git check-ignore -q "$p" || paths+=("$p"); done
git add CHANGELOG.md package.json platform/design-system ${paths[@]+"${paths[@]}"}
git commit -qm "$V: $SUBJ

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
H=$(git rev-parse HEAD)
set -o pipefail
cd "$REL"
git checkout -q -- . && git -C platform/design-system checkout -q -- . && git fetch -q && git checkout -q --detach "$H" && git submodule update -q --init
ok=; for i in 1 2 3 4 5 6 7 8; do out=$(bash deploy.sh 2>&1 | tail -1); echo "deploy $i: $out"; case "$out" in Published*) ok=1; break;; esac; done; [ -n "$ok" ] || { echo "DEPLOY FAILED 8 times (CPU-damaged packages); not tagged"; exit 1; }
git tag "v$V" && git push -q origin "v$V" && echo "TAGGED $V"
echo "CI started for $V (not waited on; check with: gh run list --repo plenix-ds/plenix-platform -L 2)"
