# Unread records (task 164)

Approved scope and line weight: issue 198, Claude's comment of 2026-10-20 17:10 UTC. The 3px bar references the existing system border-width-thick, with action-primary-background for the accent and font-weight-semibold for text. Table's base and steps remain generated; no generated source is committed.

DataGrid supports predicate or controlled-key unread state, read delays, mark-read-on-open, row and selection menu commands, unread-only filtering and keyed controller actions/count. Table takes the same unread data for static display. VirtualList takes unread data and optional click/Enter opening. Unread rows include an accessible unread name. Row-owned pseudo-elements draw the bar; flat own-state selectors and registered non-inheriting state variables introduce no ancestor reach-through.

Validation: build passed; SYSTEM_OK 1060; SPEC_OK 1171 leaves / 767 records; text contracts recorded (only VirtualList item font-weight adjustment added). Selector classifier 59 fixtures and zero-overlap 22 fixtures pass. Strict dashboard/files audit: ZERO_OVERLAP_OK, no new overlaps. Browser unread regression verifies controlled and predicate state, count/key actions, row menu, read delay, filtering, semibold/3px computed styles, Table and VirtualList. Existing high-impact 31 checks, facets 22 checks, custom cell memo/selection/edit/lazy menus and 600-row search regression pass.

Command-bar lab comparison: same local Chrome runner, exact base f795b8be54a30a730689eb24585b5a551962ae2f and DS 5d6e50d0c1d996e5363d2f8f6feff48021cc02e4. Both base and head report the same side-gap/group-gap marker findings (37px marker computes 12px/4px), 64 checks / 13 tokens. Raw outputs retained beside this file; no assertion or baseline relaxed.
