### Fixed
- DataGrid: the card form of a big table no longer freezes the page (#809, first step). In the narrow card list the grid now draws the first 100 cards, then the next 100 each time the end of the list nears the view (the grid's own scroll area, or the window when the grid grows with the page). Before, it drew every card at once: 10,000 rows took about 20 seconds at 320px.
  - End (or Ctrl or Command with End) on a card draws every card and goes to the last. Arrow Down past the drawn cards draws the next chunk first.
  - Select-all, the counts, find and filters work on all the rows. `aria-rowcount` is the full count.
  - A list of 100 cards or fewer, the wide table and remote grids are unchanged.
  - Full virtualization of the variable-height cards is #809's later step.
