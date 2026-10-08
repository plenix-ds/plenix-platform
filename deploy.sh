#!/usr/bin/env bash
# Plenix · publish the apps and the design system to the Plenix VM (Proxmox VM 130, 10.0.0.30).
#   plenix.lighthouseway.org         -> /Plenix/dashboard/
#   design-system.lighthouseway.org  -> /Plenix/platform/design-system/
# Both names serve /srv/plenix/www on the VM (Nginx, site file /etc/nginx/sites-available/plenix); Nginx Proxy Manager
# (CT 102) gives them HTTPS. Only the folders listed below are published: never the build tools, archives or databases.
# Run from Git Bash:  bash deploy.sh   (needs this PC's SSH key on plenix@10.0.0.30)
set -euo pipefail
HOST=plenix@10.0.0.30
cd "$(dirname "$0")/.."

(cd Plenix && node build-app.js >/dev/null 2>&1) || { echo "BUILD FAILED: run node Plenix/build-app.js"; exit 1; }
(cd Plenix && node check-system.js >/dev/null 2>&1) || { echo "check-system failed: fix it before publishing"; exit 1; }

PKG=$(mktemp -u).tgz
tar -czf "$PKG" --force-local --exclude='*.bak' --exclude='node_modules' \
  Plenix/platform Plenix/suite Plenix/bookmarks Plenix/calendar Plenix/contacts Plenix/dam Plenix/dashboard Plenix/files \
  Plenix/messages Plenix/notes Plenix/projects Plenix/settings Plenix/tasks Plenix/check-system.js \
  "Plenix - DAM/audit/batches/15-26.md"

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
  sudo mv /srv/plenix/www /srv/plenix/www.old
  sudo mv /srv/plenix/www.new /srv/plenix/www"
echo "Published: https://plenix.lighthouseway.org/  https://design-system.lighthouseway.org/"
