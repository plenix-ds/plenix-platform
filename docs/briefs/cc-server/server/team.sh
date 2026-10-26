#!/usr/bin/env bash
# team: start the five Plenix agents in tmux (session "team"), each with Remote Control, or attach if running.
#   team          start missing agents, then attach
#   team status   list the agents' windows
#   team stop     stop all agents
set -u
export PATH="$HOME/.local/bin:$HOME/.bun/bin:$PATH"
S=team
W=$HOME/work

# role|window|display name|folder|extra folders
AGENTS=(
  "owner-desk|desk|Plenix · Owner desk|$HOME/team/owner-desk|$W/plenix $W/st-john-test-site"
  "lead|lead|Plenix · Lead|$W/plenix|$W/st-john-test-site $W/plenix-b1 $W/plenix-b2"
  "builder-1|b1|Plenix · Builder 1|$W/plenix-b1|$W/st-john-test-site"
  "builder-2|b2|Plenix · Builder 2|$W/plenix-b2|$W/st-john-test-site"
  "reviewer|review|Plenix · Reviewer|$W/plenix|$W/st-john-test-site"
)

case "${1:-start}" in
  status) tmux list-windows -t $S 2>/dev/null || echo "team is not running"; exit 0 ;;
  stop) tmux kill-session -t $S 2>/dev/null && echo "team stopped"; exit 0 ;;
esac

mkdir -p "$HOME/team/owner-desk"
tmux has-session -t $S 2>/dev/null || tmux new-session -d -s $S -n shell -c "$HOME"
for a in "${AGENTS[@]}"; do
  IFS='|' read -r role win name dir extra <<<"$a"
  tmux list-windows -t $S -F '#W' | grep -qx "$win" && continue
  adds=""; for d in $extra; do adds="$adds --add-dir $d"; done
  tmux new-window -d -t $S -n "$win" -c "$dir" \
    "PLENIX_ROLE=$role claude --agent $role --name '$name' --remote-control '$name' --permission-mode auto$adds; echo; echo '$name stopped. Press Enter to close.'; read"
done
[ -t 1 ] && [ -z "${TMUX:-}" ] && exec tmux attach -t $S
tmux list-windows -t $S -F '#W'
