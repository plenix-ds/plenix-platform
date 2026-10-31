### Fixed
- Toolbar, CommandBar and ActionBar (#777): a bar first measured while the page's web font (DM Sans) was still loading measured the wider fallback text, folded its buttons to icons, and stayed folded once the font arrived. The bars now measure again when the fonts finish loading. On a first visit, a 520px toolbar with five buttons now shows every word, where it showed only the first.
