#!/usr/bin/env bash
# Plenix package registry · ask the registry for one release of every @plenix-ds package, so it fetches and keeps it at
# once (the release script runs this after publishing). Runs ON THE VM: sudo /srv/plenix/registry/prefetch.sh <version>
# It signs in as the local account "prefetch", whose password is generated on the VM the first time and kept only in
# /srv/plenix/registry/prefetch-password (mode 600).
set -euo pipefail
VERSION="${1:?usage: prefetch.sh <version>}"
DIR=/srv/plenix/registry; PASS_FILE=$DIR/prefetch-password; REG=http://127.0.0.1:4873
if [ ! -s "$PASS_FILE" ]; then
  umask 077; openssl rand -base64 24 > "$PASS_FILE"
  HASH=$(openssl passwd -apr1 -stdin < "$PASS_FILE")
  grep -v '^prefetch:' $DIR/conf/htpasswd > $DIR/conf/htpasswd.new || true
  echo "prefetch:$HASH" >> $DIR/conf/htpasswd.new; mv $DIR/conf/htpasswd.new $DIR/conf/htpasswd
  chown 10001:65533 $DIR/conf/htpasswd; chmod 640 $DIR/conf/htpasswd; sleep 2
fi
AUTH=$(printf 'prefetch:%s' "$(tr -d '\n' < "$PASS_FILE")" | base64 -w0)
ok=0; for P in react styles tokens icons; do
  META=$(curl -s -H "Authorization: Basic $AUTH" "$REG/@plenix-ds%2f$P")
  TGZ=$(printf '%s' "$META" | grep -o "\"tarball\":\"[^\"]*-$VERSION.tgz\"" | head -1 | cut -d'"' -f4 || true)
  if [ -n "$TGZ" ]; then curl -s -o /dev/null -H "Authorization: Basic $AUTH" "${TGZ/https:\/\/registry.lighthouseway.org/$REG}" && ok=$((ok+1)); echo "kept @plenix-ds/$P@$VERSION"
  else echo "not found yet: @plenix-ds/$P@$VERSION"; fi
done
echo "prefetch: $ok packages kept"
