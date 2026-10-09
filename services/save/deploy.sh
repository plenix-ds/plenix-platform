#!/usr/bin/env bash
# Plenix save service · build and (re)start it on the Plenix VM (batch 258). Run from Git Bash: bash services/save/deploy.sh
# The container listens on 127.0.0.1:8781 only; the VM's Nginx sends it /api/tokens and /api/session, and accepts those
# only from Nginx Proxy Manager (10.0.0.20), which signs people in through Authentik and passes X-authentik-* headers.
# Data (the work clone, log.jsonl, github-token) lives in /srv/plenix/save on the VM and survives a redeploy.
set -euo pipefail
HOST=plenix@10.0.0.30
cd "$(dirname "$0")"
tar -czf - server.js Dockerfile | ssh "$HOST" "set -e
  mkdir -p /tmp/plenix-save-src && tar -xzf - -C /tmp/plenix-save-src
  cd /tmp/plenix-save-src && sudo docker build -q -t plenix-save . >/dev/null
  sudo mkdir -p /srv/plenix/save && sudo chown 1000:1000 /srv/plenix/save && sudo chmod 700 /srv/plenix/save
  sudo docker rm -f plenix-save >/dev/null 2>&1 || true
  sudo docker run -d --name plenix-save --restart unless-stopped -p 127.0.0.1:8781:8781 -v /srv/plenix/save:/data plenix-save >/dev/null
  rm -rf /tmp/plenix-save-src
  sleep 2; curl -s -o /dev/null -w 'plenix-save: session without sign-in answers %{http_code}\n' http://127.0.0.1:8781/api/session"
