const fs = require('fs');
const p = 'D:/Documents/Projects/Projects_Applications/Plenix/platform/components/Tabs/Tabs.jsx';
let s = fs.readFileSync(p, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 80)); s = s.replace(a, b); };
rep(`     panelClassName: more classes on each panel
`, `     panelClassName: more classes on each panel
     strings: the words it shows, for other languages: { more: "More", moreLabel: "More tabs" }
`);
rep(`     The open folder tab has no line beneath it.
`, `     The open folder tab has no line beneath it.
     Tabs that do not fit on one row move into a "More" menu after the last shown tab: a menu button outside the tab list,
       its own Tab stop. The tab list never scrolls sideways (Platforms Standard 3.5, reflow). The selected tab is always
       shown: when it is one of the moved tabs, it takes the last shown place. Arrow keys, Home and End still reach every
       tab, moved ones included (the one chosen is shown); each tab states its place in the whole set (aria-posinset,
       aria-setsize), so a screen reader counts the moved tabs too. Choosing a tab in the menu selects it and focuses it.
`);
rep(`import { Icon } from '../Icon/Icon.jsx';
`, `import { Icon } from '../Icon/Icon.jsx';
import { Menu, MenuItem } from '../Menu/Menu.jsx';
`);
rep(`export const tabsPanelId = (base, value) => base + '-panel-' + String(value).replace(/[^a-zA-Z0-9_-]/g, '');
`, `export const tabsPanelId = (base, value) => base + '-panel-' + String(value).replace(/[^a-zA-Z0-9_-]/g, '');
const STRINGS = { more: 'More', moreLabel: 'More tabs' };

/* how many tabs fit on the row: it starts from all of them whenever the width, the tabs or the selected tab change, and
   lowers the number, before the browser paints, until every shown tab ends inside the tab list (the More control, once
   shown, takes its own room, so the list narrows and the count is checked again). The width is the Tabs' own, which
   does not follow the count, so the two never chase each other. */
function useTabsFit(rootRef, listRef, count, key) {
  const [fit, setFit] = React.useState(count);
  const [width, setWidth] = React.useState(0);
  React.useLayoutEffect(() => { setFit(count); }, [count, key, width]);
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setWidth(root.clientWidth));
    ro.observe(root);
    return () => ro.disconnect();
  }, []);
  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || fit <= 1) return;
    const box = list.getBoundingClientRect();
    const out = Array.prototype.some.call(list.children, (el) => {
      if (el.hidden) return false;
      const r = el.getBoundingClientRect();
      return r.right > box.right + 0.5 || r.left < box.left - 0.5;
    });
    if (out) setFit(fit - 1);
  });
  return Math.max(1, Math.min(fit, count));
}
`);
rep(`export function Tabs({ variant = 'contained', items, value, defaultValue, onChange, label, idBase, className, panelClassName }) {
  const uid = useUid('plx-tabs');`, `export function Tabs({ variant = 'contained', items, value, defaultValue, onChange, label, idBase, className, panelClassName, strings }) {
  const words = Object.assign({}, STRINGS, strings);
  const uid = useUid('plx-tabs');`);
rep(`  const refs = React.useRef({});
  const select =`, `  const refs = React.useRef({});
  const root = React.useRef(null), list = React.useRef(null);
  const fit = useTabsFit(root, list, items.length, items.map((t) => t.label).join('|') + '|' + String(current));
  // the shown tabs: the first \`fit\`; the selected tab takes the last place when it is not among them
  const at = items.findIndex((t) => t.value === current);
  const shown = (i) => (at < fit ? i < fit : (i < fit - 1 || i === at));
  const moved = items.filter((t, i) => !shown(i));
  // focus goes to a tab once it is shown (a moved tab chosen by key or from the menu)
  const focusNext = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = focusNext.current !== null ? refs.current[focusNext.current] : null;
    if (el && !el.hidden) { focusNext.current = null; el.focus(); }
  });
  const select =`);
rep(`    select(t.value);
    if (refs.current[t.value]) refs.current[t.value].focus();`, `    select(t.value);
    if (refs.current[t.value] && !refs.current[t.value].hidden) refs.current[t.value].focus();
    else focusNext.current = t.value;`);
rep(`    <div className={cx('plx-tabs', 'plx-tabs--' + variant, className)}>
      <div role="tablist" aria-label={label} className="plx-tabs__list" onKeyDown={onKeyDown}>
        {items.map((t) => {
          const on = t.value === current;
          return (
            <button key={t.value} ref={(el) => { refs.current[t.value] = el; }} type="button" role="tab" id={base + '-tab-' + String(t.value).replace(/[^a-zA-Z0-9_-]/g, '')}
              aria-selected={on} aria-controls={tabsPanelId(base, t.value)} tabIndex={on ? 0 : -1} disabled={t.disabled || undefined}
              className={cx('plx-tabs__tab', on && 'is-selected')} onClick={() => select(t.value)}>
              {t.icon ? <span className="plx-tabs__icon">{asIcon(t.icon)}</span> : null}
              <span className="plx-tabs__label">{t.label}</span>
              {t.count !== undefined ? <Count value={t.count} tone="neutral" /> : null}
            </button>
          );
        })}
      </div>`, `    <div ref={root} className={cx('plx-tabs', 'plx-tabs--' + variant, className)}>
      <div className="plx-tabs__list">
        <div ref={list} role="tablist" aria-label={label} className="plx-tabs__tablist" onKeyDown={onKeyDown}>
          {items.map((t, i) => {
            const on = t.value === current;
            return (
              <button key={t.value} ref={(el) => { refs.current[t.value] = el; }} type="button" role="tab" id={base + '-tab-' + String(t.value).replace(/[^a-zA-Z0-9_-]/g, '')}
                aria-selected={on} aria-controls={tabsPanelId(base, t.value)} aria-posinset={i + 1} aria-setsize={items.length}
                tabIndex={on ? 0 : -1} disabled={t.disabled || undefined} hidden={!shown(i) || undefined}
                className={cx('plx-tabs__tab', on && 'is-selected')} onClick={() => select(t.value)}>
                {t.icon ? <span className="plx-tabs__icon">{asIcon(t.icon)}</span> : null}
                <span className="plx-tabs__label">{t.label}</span>
                {t.count !== undefined ? <Count value={t.count} tone="neutral" /> : null}
              </button>
            );
          })}
        </div>
        {moved.length ? (
          <Menu label={words.moreLabel} placement="bottom-end" className="plx-tabs__more-anchor" trigger={
            <button type="button" className="plx-tabs__tab plx-tabs__more">
              <span className="plx-tabs__label">{words.more}</span>
              <span className="plx-tabs__more-caret" aria-hidden="true" />
            </button>}>
            {moved.map((t) => (
              <MenuItem key={t.value} icon={t.icon} disabled={t.disabled} onSelect={() => { focusNext.current = t.value; select(t.value); }}>
                {t.count !== undefined ? t.label + ' (' + t.count + ')' : t.label}
              </MenuItem>
            ))}
          </Menu>
        ) : null}
      </div>`);
fs.writeFileSync(p, s);
console.log('ok');
