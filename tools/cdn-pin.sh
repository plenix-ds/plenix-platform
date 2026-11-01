#!/usr/bin/env bash
# Plenix · pin one app to one release, or follow the latest again (issue 842). Owner's decision (2026-11-01): every app
# follows the latest release, read once per page from /cdn/latest.json; when a release is bad for an app, that app is pinned
# to a release that works, until it is unpinned.
#   bash tools/cdn-pin.sh <app> <version>    pin: the app's pages load every Plenix file from /cdn/<version>/
#   bash tools/cdn-pin.sh <app> off          unpin: the app follows the latest release again
#   bash tools/cdn-pin.sh                    show latest.json
# <app> is an app folder: dashboard, projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings, dam.
# The release must be published with the app's own files (/cdn/<version>/apps/<app>/, from 0.80.0 on). It changes only the
# "pins" of /cdn/latest.json on the publish host (deploy.sh keeps them and moves "latest"); pages pick it up as the file's
# short cache runs out (the nginx rule of issue 842). Run from the repository root; the host comes from tools/publish-config.sh.
set -euo pipefail
cd "$(dirname "$0")/.."
. tools/publish-config.sh
APP="${1:-}"; PIN="${2:-}"
if [ -z "$APP" ]; then ssh "${SSH_OPTS[@]}" "$HOST" "cat /srv/plenix/cdn/latest.json"; exit 0; fi
APPS=$(node -p "[...new Set(require('./check-system.rules/one-source.js').pages().map((p) => p.app))].join(' ')")
case " $APPS " in *" $APP "*) ;; *) echo "Unknown app \"$APP\": one of $APPS"; exit 1 ;; esac
if [ "$PIN" != "off" ] && ! [[ "$PIN" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then echo "Give a release (0.80.0) or off"; exit 1; fi
FILE=app.js; [ "$APP" = dam ] && FILE=assets.js
ssh "${SSH_OPTS[@]}" "$HOST" "set -e
  P=/srv/plenix/cdn/latest.json
  [ -f \$P ] || { echo 'No /cdn/latest.json yet: deploy a release with the page loader first'; exit 1; }
  if [ '$PIN' != off ] && [ ! -f /srv/plenix/cdn/$PIN/apps/$APP/$FILE ]; then echo 'Release $PIN has no files for $APP (/cdn/$PIN/apps/$APP/$FILE): pick a release from 0.80.0 on'; exit 1; fi
  sudo python3 -c 'import json,os,sys; p=sys.argv[1]; d=json.load(open(p)); pins=d.setdefault(\"pins\", {}); app, pin = sys.argv[2], sys.argv[3]
if pin == \"off\": pins.pop(app, None)
else: pins[app] = pin
json.dump(d, open(p + \".new\", \"w\"), indent=1); os.chmod(p + \".new\", 0o644); os.replace(p + \".new\", p)' \$P '$APP' '$PIN'
  cat \$P"
[ "$PIN" = off ] && echo "$APP follows the latest release again." || echo "$APP is pinned to $PIN."
