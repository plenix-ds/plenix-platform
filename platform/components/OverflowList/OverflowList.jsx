/* Plenix · OverflowList
   Summary: A row of items that shows the ones that fit and puts the rest behind a "…" button that opens them in a menu
     (06 Navigation & Discovery › Local navigation): the behavior the Toolbar and the command bar have, for any row of items.
   Usage:
     <OverflowList label="Page actions" items={[{ id: 'share', label: 'Share', icon: 'share', onSelect: share }, { id: 'export', label: 'Export', href: '/export' }]} />
     <OverflowList items={tags.map((t) => ({ id: t, label: t, content: <Tag>{t}</Tag> }))} />   // your own element in the row; the menu still lists the label
   Props:
     items: the row, in order: [{ id, label, icon, href, disabled, onSelect, content }]; id is unique; label is the text of its row
       button and of its menu item; onSelect(id) runs when it is chosen, in the row or in the menu; href makes it a link
     items[].content: an element drawn in the row in place of the ghost button (a Tag, a Badge, a link); the menu lists the item by label. It
       is drawn twice, once out of sight to measure it, so it must not carry an id
     label: the accessible name of the row (a group); without it the row has no name
     size: the size of the ghost buttons and of the "…" button: "sm" | "md" (default "md")
     strings: the words it shows and announces, for other languages: { more: "More items" }
     className: more classes on the row
   Behavior:
     The row never wraps. Every item is shown while they all fit; when they do not, the last ones go into the menu, one at a time from the end,
       until the rest and the "…" button fit. The "…" button is the last thing in the row (at the end in both directions) and opens a menu of the
       folded items in their order, as the Toolbar's More does. It is measured from the widths of the items, so it follows the row as the
       window or its container is resized, when the items or their labels change, and when the page's fonts finish loading.
     Nothing changes the focus order except the folding itself: a folded item leaves the Tab order and is a menu item; the "…" button is one
       more Tab stop. The menu is the Menu's (arrow keys, Escape, Home and End).
   Notes:
     The items are measured in a copy that is hidden from the page and from assistive technology (aria-hidden and inert).
     For a few items whose names are short; a long list of choices is a Select or a Menu.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';
import { Button } from '../Button/Button.tsx';
import { Menu, MenuItem } from '../Menu/Menu.jsx';
import { useStrings } from '../../providers/LocaleProvider.tsx';
import MoreIcon from 'plenix-platform/icons/plenix/more';

export function OverflowList({ items = [], label, size = 'md', strings, className, ...rest }) {
  const t = useStrings('overflowList', strings);
  const box = React.useRef(null), meter = React.useRef(null);
  const [shown, setShown] = React.useState(items.length);
  const key = items.map((i) => i.id + ':' + i.label).join('|');
  const choose = (it) => () => { if (it.onSelect) it.onSelect(it.id); };

  const measure = React.useCallback(() => {
    const row = box.current, copy = meter.current;
    if (!row || !copy) return;
    const widths = Array.prototype.map.call(copy.children, (k) => k.offsetWidth);
    const more = widths.pop(), gap = parseFloat(getComputedStyle(copy).columnGap) || 0, room = row.clientWidth;
    const all = widths.reduce((sum, w, i) => sum + w + (i ? gap : 0), 0);
    if (all <= room) { setShown(widths.length); return; }
    // some fold: as many as fit beside the "…" button (each item is followed by a gap, then the button)
    let n = 0, used = more;
    while (n < widths.length && used + widths[n] + gap <= room) { used += widths[n] + gap; n += 1; }
    setShown(n);
  }, []);

  React.useLayoutEffect(() => { measure(); }, [key, size, measure]);
  React.useEffect(() => {
    const row = box.current, copy = meter.current;
    if (!row || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => measure());
    ro.observe(row); if (copy) ro.observe(copy);
    const set = typeof document !== 'undefined' ? document.fonts : undefined;
    const again = () => measure();
    if (set && typeof set.addEventListener === 'function') set.addEventListener('loadingdone', again);
    return () => { ro.disconnect(); if (set && typeof set.removeEventListener === 'function') set.removeEventListener('loadingdone', again); };
  }, [measure]);

  const drawn = (it, hidden) => (it.content !== undefined && it.content !== null ? <React.Fragment key={it.id}>{it.content}</React.Fragment>
    : <Button key={it.id} variant="ghost" size={size} icon={it.icon} href={it.href} disabled={it.disabled} onClick={hidden ? undefined : choose(it)}>{it.label}</Button>);
  const folded = items.slice(Math.min(shown, items.length));
  const moreButton = () => <Button variant="ghost" size={size} iconOnly icon={MoreIcon} label={t.more} />;
  return (
    <div ref={box} role={label ? 'group' : undefined} aria-label={label || undefined} className={cx('plx-overflow-list', className)} {...rest}>
      {items.slice(0, Math.min(shown, items.length)).map((it) => drawn(it, false))}
      {folded.length ? (
        <Menu label={t.more} placement="bottom-end" trigger={<Button variant="ghost" size={size} iconOnly icon={MoreIcon} label={t.more} />}>
          {folded.map((it) => <MenuItem key={it.id} icon={it.icon} href={it.href} disabled={it.disabled} onSelect={choose(it)}>{it.label}</MenuItem>)}
        </Menu>
      ) : null}
      <div ref={meter} className="plx-overflow-list__meter" aria-hidden="true" inert="">
        {items.map((it) => drawn(it, true))}
        {moreButton()}
      </div>
    </div>
  );
}
