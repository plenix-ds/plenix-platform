#!/usr/bin/env bash
# Plenix package registry · add an account, or set a new password. Run ON THE VM by the owner:
#   sudo /srv/plenix/registry/add-user.sh <name>
# The password is asked at a hidden prompt and stored hashed (apr1, which Verdaccio's htpasswd reads); it is never
# shown, logged or passed on a command line. Then on a computer: npm login --registry https://registry.lighthouseway.org
set -euo pipefail
NAME="${1:?usage: add-user.sh <name>}"
case "$NAME" in *[!a-z0-9._-]*) echo "use lowercase letters, digits, dot, dash or underscore"; exit 1;; esac
FILE=/srv/plenix/registry/conf/htpasswd
read -r -s -p "Password for $NAME (at least 12 characters): " P1; echo
read -r -s -p "Again: " P2; echo
[ "$P1" = "$P2" ] || { echo "The two passwords differ."; exit 1; }
[ ${#P1} -ge 12 ] || { echo "Use at least 12 characters."; exit 1; }
HASH=$(printf '%s' "$P1" | openssl passwd -apr1 -stdin)
unset P1 P2
touch "$FILE"
grep -v "^$NAME:" "$FILE" > "$FILE.new" || true
echo "$NAME:$HASH" >> "$FILE.new"
mv "$FILE.new" "$FILE"; chown 10001:65533 "$FILE"; chmod 640 "$FILE"
echo "Account $NAME saved."
