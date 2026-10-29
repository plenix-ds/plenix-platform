#!/usr/bin/env bash
# Plenix login service · build and (re)start it on the publish host (PUBLISH_HOST). Run from Git Bash: bash services/login/deploy.sh
# The container listens on 127.0.0.1:8782 only; the VM's Nginx sends it /auth/ and asks /auth/check before every app page
# (services/login/nginx-example.conf). The sign-in page loads the Platform release in package.json from the CDN.
# Data (accounts.json, secret, log.jsonl) lives in /srv/plenix/login on the VM and survives a redeploy.
# Not run yet: the cutover from Authentik waits for the owner (services/login/README.md).
set -euo pipefail
cd "$(dirname "$0")"
. ../../tools/publish-config.sh   # PUBLISH_HOST, PUBLISH_USER, PUBLISH_KEY (no defaults)
VERSION=$(node -p "require('../../package.json').version")
CDN=https://design-system.lighthouseway.org/cdn/$VERSION
cp ../../platform/brand/favicon.svg favicon.svg
trap 'rm -f favicon.svg' EXIT
tar -czf - server.js accounts.js favicon.svg Dockerfile | ssh "${SSH_OPTS[@]}" "$HOST" "set -e
  mkdir -p /tmp/plenix-login-src && tar -xzf - -C /tmp/plenix-login-src
  cd /tmp/plenix-login-src && sudo docker build -q -t plenix-login . >/dev/null
  sudo mkdir -p /srv/plenix/login && sudo chown 1000:1000 /srv/plenix/login && sudo chmod 700 /srv/plenix/login
  sudo docker rm -f plenix-login >/dev/null 2>&1 || true
  sudo docker run -d --name plenix-login --restart unless-stopped -p 127.0.0.1:8782:8782 -e CDN=$CDN -v /srv/plenix/login:/data plenix-login >/dev/null
  rm -rf /tmp/plenix-login-src
  sleep 2; curl -s -o /dev/null -w 'plenix-login: check without sign-in answers %{http_code}\n' http://127.0.0.1:8782/auth/check"
echo "Accounts: ssh $HOST then sudo docker exec -it plenix-login node accounts.js list"
