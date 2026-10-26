#!/usr/bin/env bash
# Graphify, pinned 0.9.92, fully local: no AI backend, map kept outside the repo.
export GRAPHIFY_BACKEND=none GRAPHIFY_NO_CTA=1 GRAPHIFY_OUT="${GRAPHIFY_OUT:-/home/cc/graphs/plenix}"
exec /home/cc/opt/graphify/bin/graphify "$@"
