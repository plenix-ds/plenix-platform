#!/usr/bin/env bash
# Plenix · publish the apps and the design system to the Plenix VM (Proxmox VM 130, 10.0.0.30).
#   plenix.lighthouseway.org         -> /Plenix/dashboard/
#   design-system.lighthouseway.org  -> /Plenix/platform/design-system/
#     /cdn/<version>/  the release's CDN files (kept for good: a published version never changes)
#     /api/v1/         the read-only JSON API (replaced on every deploy)
# Both names serve /srv/plenix/www on the VM (Nginx, site file /etc/nginx/sites-available/plenix); Nginx Proxy Manager
# (CT 102) gives them HTTPS. Only the folders listed below are published: never the build tools, archives or databases.
# Run from Git Bash:  bash deploy.sh   (needs this PC's SSH key on plenix@10.0.0.30)
set -euo pipefail
HOST=plenix@10.0.0.30
cd "$(dirname "$0")/.."

(cd Plenix && node build-app.js >/dev/null 2>&1) || { echo "BUILD FAILED: run node Plenix/build-app.js"; exit 1; }
(cd Plenix && node check-system.js >/dev/null 2>&1) || { echo "check-system failed: fix it before publishing"; exit 1; }
(cd Plenix && node build-packages.js >/dev/null) || { echo "build-packages failed: run node Plenix/build-packages.js"; exit 1; }
VERSION=$(cd Plenix && node -p "require('./package.json').version")

PKG=$(mktemp -u).tgz
tar -czf "$PKG" --force-local --exclude='*.bak' --exclude='node_modules' \
  Plenix/platform Plenix/suite Plenix/bookmarks Plenix/calendar Plenix/contacts Plenix/dam Plenix/dashboard Plenix/files \
  Plenix/messages Plenix/notes Plenix/projects Plenix/settings Plenix/tasks Plenix/check-system.js \
  "Plenix - DAM/audit/batches/15-26.md" Plenix/release

gzip -t "$PKG" || { echo "package is damaged; nothing published"; rm -f "$PKG"; exit 1; }
SUM=$(sha256sum "$PKG" | cut -d' ' -f1)
scp -q "$PKG" "$HOST:/tmp/plenix-site.tgz"
rm -f "$PKG"
# unpack beside the live copy; swap only when the upload checks out and unpacks cleanly (the old copy stays as www.old)
ssh "$HOST" "set -e
  echo '$SUM  /tmp/plenix-site.tgz' | sha256sum -c --quiet -
  sudo rm -rf /srv/plenix/www.new
  sudo mkdir -p /srv/plenix/www.new
  sudo tar -xzf /tmp/plenix-site.tgz -C /srv/plenix/www.new --no-same-owner
  rm /tmp/plenix-site.tgz
  sudo find /srv/plenix/www.new -type d -exec chmod 755 {} +
  sudo find /srv/plenix/www.new -type f -exec chmod 644 {} +
  sudo rm -rf /srv/plenix/www.old /srv/plenix/www.bad
  # the API is replaced; a CDN version is added once and never overwritten
  sudo rm -rf /srv/plenix/api.new && sudo mv /srv/plenix/www.new/Plenix/release/api /srv/plenix/api.new
  sudo rm -rf /srv/plenix/api && sudo mv /srv/plenix/api.new /srv/plenix/api
  sudo mkdir -p /srv/plenix/cdn
  if [ -d /srv/plenix/cdn/$VERSION ]; then echo 'CDN $VERSION is already published: kept as it was (raise the version to publish changes)'
  else sudo mv /srv/plenix/www.new/Plenix/release/cdn/$VERSION /srv/plenix/cdn/$VERSION; echo 'CDN $VERSION published'; fi
  sudo rm -rf /srv/plenix/www.new/Plenix/release
  ls /srv/plenix/cdn | sort -V | python3 -c 'import sys,json; v=[l.strip() for l in sys.stdin if l.strip()]; print(json.dumps({\"versions\": v, \"latest\": v[-1]}))' | sudo tee /srv/plenix/cdn/index.json >/dev/null
  sudo mv /srv/plenix/www /srv/plenix/www.old
  sudo mv /srv/plenix/www.new /srv/plenix/www"
echo "Published: https://plenix.lighthouseway.org/  https://design-system.lighthouseway.org/  (CDN /cdn/$VERSION/, API /api/v1/)"
