# tools/publish-config.sh: the publish host, account and key for the deploy scripts. Source it; never run it.
# The values come from the environment, or from publish.config at the repository root (copy publish.config.example; it is
# untracked and never committed). There are no default values: a missing value stops the script with a clear message.
#   PUBLISH_HOST   the publish host (a name or address on the private network)
#   PUBLISH_USER   the account on the publish host
#   PUBLISH_KEY    the path of the SSH key for that account, on the machine that runs the deploy
_publish_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [ -f "$_publish_root/publish.config" ]; then
  while IFS='=' read -r _k _v; do
    case "$_k" in PUBLISH_HOST|PUBLISH_USER|PUBLISH_KEY) [ -n "${!_k:-}" ] || export "$_k=$_v" ;; esac
  done < <(grep -E '^[A-Z_]+=' "$_publish_root/publish.config")
fi
for _k in PUBLISH_HOST PUBLISH_USER PUBLISH_KEY; do
  [ -n "${!_k:-}" ] || { echo "Missing $_k: set it in the environment or in publish.config (see publish.config.example)." >&2; exit 2; }
done
[ -f "$PUBLISH_KEY" ] || { echo "PUBLISH_KEY names no file: $PUBLISH_KEY" >&2; exit 2; }
HOST="$PUBLISH_USER@$PUBLISH_HOST"
SSH_OPTS=(-o IdentitiesOnly=yes -o BatchMode=yes -i "$PUBLISH_KEY")
unset _k _v _publish_root
