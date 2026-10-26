#!/usr/bin/env bash
# Plenix · publish the apps and the design system to the Plenix VM (Proxmox VM 130, 10.0.0.30).
#   plenix.lighthouseway.org         -> /Plenix/dashboard/
#   design-system.lighthouseway.org  -> /Plenix/platform/design-system/
#     /cdn/<version>/  the release's CDN files (kept for good: a published version never changes)
#     /api/v1/         the read-only JSON API (replaced on every deploy)
# The deployed apps run on the release, not on the source: their pages load the Platform from /cdn/<version>/ (the version
# in package.json), so a broken release shows in our own apps first. Platform changes reach them only through a new version.
# Both names serve /srv/plenix/www on the VM (Nginx, site file /etc/nginx/sites-available/plenix); Nginx Proxy Manager
# (CT 102) gives them HTTPS. Only the folders listed below are published: never the build tools, archives or databases.
# The owner's study pages (docs/font-study, docs/composition, docs/reading-pane-study, docs/page-headers, and the DataGrid studies docs/grid-header-study, docs/grid-row-hover-study, docs/grid-row-selection-study) are published too, at /Plenix/docs/<study>/.
# Run from Git Bash:  bash deploy.sh   (needs this PC's SSH key on plenix@10.0.0.30)
set -euo pipefail
HOST=plenix@10.0.0.30
cd "$(dirname "$0")/.."

(cd Plenix && node build-app.js >/dev/null 2>&1 && node build-usage.js >/dev/null) || { echo "BUILD FAILED: run node Plenix/build-app.js"; exit 1; }
(cd Plenix && node check-system.js >/dev/null 2>&1) || { echo "check-system failed: fix it before publishing"; exit 1; }
(cd Plenix && node build-packages.js >/dev/null) || { echo "build-packages failed: run node Plenix/build-packages.js"; exit 1; }
VERSION=$(cd Plenix && node -p "require('./package.json').version")
# the design spec runs on this release from the CDN (platform/design-system/plenix-source.js): it must name this version
[ ! -f Plenix/platform/design-system/plenix-source.js ] || grep -q "var VERSION = '$VERSION'" Plenix/platform/design-system/plenix-source.js || { echo "The design spec pins another release: set VERSION in platform/design-system/plenix-source.js to $VERSION"; exit 1; }
# the Material Symbols library, shared by every release (icons-all.css points at it): copied once per pinned commit
MATERIAL=$(cd Plenix && node -p "require('./platform/icons/map.json')._commit.slice(0, 12)")

PKG=$(mktemp -u).tgz
tar -czf "$PKG" --force-local --exclude='*.bak' --exclude='node_modules' \
  Plenix/platform Plenix/suite Plenix/bookmarks Plenix/calendar Plenix/contacts Plenix/dam Plenix/dashboard Plenix/files \
  Plenix/messages Plenix/notes Plenix/projects Plenix/settings Plenix/tasks Plenix/check-system.js \
  Plenix/docs/font-study Plenix/docs/composition Plenix/docs/reading-pane-study Plenix/docs/page-headers \
  Plenix/docs/grid-header-study Plenix/docs/grid-row-hover-study Plenix/docs/grid-row-selection-study \
  "Plenix - DAM/audit/batches/15-26.md" Plenix/release Plenix/packages/styles/plenix.css

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
  if [ ! -d /srv/plenix/cdn/material/$MATERIAL ]; then sudo mkdir -p /srv/plenix/cdn/material && sudo cp -r /srv/plenix/www.new/Plenix/platform/icons/library /srv/plenix/cdn/material/$MATERIAL && echo 'Material library published at /cdn/material/$MATERIAL/'; fi
  if [ -d /srv/plenix/cdn/$VERSION ]; then echo 'CDN $VERSION is already published: kept as it was (raise the version to publish changes)'
    # unreleased Platform changes: this build's release files differ from the published ones
    for x in plenix.js plenix.css; do cmp -s /srv/plenix/www.new/Plenix/release/cdn/$VERSION/\$x /srv/plenix/cdn/$VERSION/\$x || echo \"NOTE: \$x has changes that are not released; the apps keep using release $VERSION. Raise the version in package.json to release them.\"; done
  else sudo mv /srv/plenix/www.new/Plenix/release/cdn/$VERSION /srv/plenix/cdn/$VERSION; echo 'CDN $VERSION published'; fi
  sudo rm -rf /srv/plenix/www.new/Plenix/release
  # the apps load the released Platform (the same four files other projects use) instead of the source
  CDN=https://design-system.lighthouseway.org/cdn/$VERSION
  for f in /srv/plenix/www.new/Plenix/*/index.html /srv/plenix/www.new/Plenix/dam/*.html; do
    sudo sed -i -e \"s|<link rel=\\\"stylesheet\\\" href=\\\"../platform/platform.css\\\">|<link rel=\\\"stylesheet\\\" href=\\\"\$CDN/plenix.css\\\">|\" \
      -e \"s|<script src=\\\"../platform/providers/theme-boot.js\\\"></script>|<script src=\\\"\$CDN/theme-boot.js\\\"></script>|\" \
      -e \"s|<script src=\\\"../platform/vendor/react-loader.js\\\"></script>|<script src=\\\"\$CDN/vendor/react.production.min.js\\\"></script><script src=\\\"\$CDN/vendor/react-dom.production.min.js\\\"></script>|\" \
      -e \"s|<script src=\\\"../platform/dist/platform.js\\\"></script>|<script src=\\\"\$CDN/plenix.js\\\"></script>|\" \"\$f\"
  done
  # live app pages leave out the development audits and open the connection to the CDN first thing (batch 237)
  for f in /srv/plenix/www.new/Plenix/*/index.html /srv/plenix/www.new/Plenix/dam/*.html; do
    sudo sed -i -e '/platform\/dev\//d' -e '/the radius audit (development)/d' \
      -e '/<meta name=\"viewport\"/a <link rel=\"preconnect\" href=\"https://design-system.lighthouseway.org\">' \"\$f\"
  done
  # the study pages load one stylesheet (the source platform.css with its imports inlined, built by build-packages.js)
  # instead of platform.css and its hundred imports (batch 237); the design system loads the CDN release (plenix-source.js)
  sudo mv /srv/plenix/www.new/Plenix/packages/styles/plenix.css /srv/plenix/www.new/Plenix/platform/dist/platform.bundle.css
  sudo rm -rf /srv/plenix/www.new/Plenix/packages
  B=\$(sha256sum /srv/plenix/www.new/Plenix/platform/dist/platform.bundle.css | cut -c1-8)
  # the study pages too: platform.css's two hundred imports trip the server's request limit (429) and the page shows unstyled
  for f in /srv/plenix/www.new/Plenix/docs/*/*.html; do
    sudo sed -i \"s|href=\\\"../../platform/platform.css\\\"|href=\\\"../../platform/dist/platform.bundle.css?v=\$B\\\"|\" \"\$f\"
  done
  grep -l platform.bundle.css /srv/plenix/www.new/Plenix/docs/*/*.html | wc -l | xargs -I{} echo 'Study pages on one stylesheet: {}'
  pinned=\$(grep -l \"cdn/$VERSION/plenix.js\" /srv/plenix/www.new/Plenix/*/index.html /srv/plenix/www.new/Plenix/dam/*.html | wc -l)
  echo \"Apps on release $VERSION: \$pinned pages\"
  ls /srv/plenix/cdn | grep -E '^[0-9]+[.][0-9]+[.][0-9]+' | sort -V | python3 -c 'import sys,json; v=[l.strip() for l in sys.stdin if l.strip()]; print(json.dumps({\"versions\": v, \"latest\": v[-1]}))' | sudo tee /srv/plenix/cdn/index.json >/dev/null
  sudo mv /srv/plenix/www /srv/plenix/www.old
  sudo mv /srv/plenix/www.new /srv/plenix/www"
echo "Published: https://plenix.lighthouseway.org/  https://design-system.lighthouseway.org/  (CDN /cdn/$VERSION/, API /api/v1/)"
