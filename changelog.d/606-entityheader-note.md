### Changed
- EntityHeader's note on identifiers is exact (issue 606): plain text reads an ID as `01-20261020` only after an Arabic letter or in Arabic-Indic digits; an ID with Latin digits and no Arabic letter before it stays `20261020-01`, and `<Isolate kind="id">` makes it follow the page. Documentation only; nothing changes on screen.
