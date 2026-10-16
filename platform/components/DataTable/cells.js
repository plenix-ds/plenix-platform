/* Plenix · DataTable cells
   Summary: Inert native cells with no React root or portal.
   Usage: cellValue(column, strings)(cell); byteMatches(query, bytes); compareCells(a, b).
   Props: column.kind, column.type and column.empty; localized strings.deleted.
   Behavior: Preserve zero/false, render text safely, sort rich values by text and compare bytes numerically.
   Notes: Reuse Avatar, Tag and Badge classes and existing roles. */
import { formatBytes } from '../../utils/format.js';
import { initialsOf } from '../Avatar/Avatar.jsx';
const node = (tag, cls, text) => {
  const e = document.createElement(tag);
  e.className = cls;
  if (text != null) e.textContent = String(text);
  return e;
};
const missing = v => v === null || v === undefined || v === '';
export function cellValue(column, strings) {
  return cell => {
    const v = cell.getValue(),
      box = node('span', 'plx-data-table__value');
    cell.getElement().setAttribute('dir', 'auto');
    const kind = [].concat(column.kind || []);
    if (missing(v)) {
      box.textContent = column.empty !== undefined ? column.empty : kind.includes('deleted') ? strings.deleted : '';
      if (kind.includes('deleted')) box.classList.add('plx-data-table__deleted');
      return box;
    }
    if (kind.includes('deleted')) {
      box.classList.add('plx-data-table__deleted');
      box.textContent = typeof v === 'object' ? v.label || strings.deleted : String(v);
    } else if (column.type === 'bytes') {
      box.textContent = formatBytes(Number(v));
    } else if (kind.includes('avatar-name')) {
      const value = typeof v === 'object' ? v : {
          name: String(v)
        },
        name = value.name || value.label || '';
      box.classList.add('plx-data-table__rich');
      const avatar = node('span', 'plx-avatar plx-avatar--24', initialsOf(name));
      avatar.setAttribute('aria-hidden', 'true');
      if (value.src) {
        const image = node('img', 'plx-avatar__image');
        image.alt = '';
        image.loading = 'lazy';
        image.src = value.src;
        image.onerror = () => {
          image.remove();
          avatar.textContent = initialsOf(name);
        };
        avatar.textContent = '';
        avatar.appendChild(image);
      }
      box.appendChild(avatar);
      box.appendChild(node('span', 'plx-data-table__value', name));
    } else if (kind.includes('tags')) {
      box.classList.add('plx-data-table__rich');
      [].concat(v).filter(value => !missing(value)).forEach(value => {
        const item = typeof value === 'object' ? value : {
            label: String(value)
          },
          tag = node('span', 'plx-tag', item.label || item.name || '');
        if (item.category) tag.setAttribute('data-plx-category', item.category);
        box.appendChild(tag);
      });
    } else if (kind.includes('badge')) {
      box.classList.add('plx-data-table__rich');
      const value = typeof v === 'object' ? v : {
          label: String(v)
        },
        tone = ['neutral', 'success', 'active', 'waiting', 'action-required', 'negative'].includes(value.tone) ? value.tone : 'neutral',
        badge = node('span', 'plx-badge plx-badge--' + tone),
        icon = node('span', 'plx-icon plx-icon--' + (value.icon || 'circle-info') + ' plx-badge__icon');
      icon.setAttribute('aria-hidden', 'true');
      badge.appendChild(icon);
      badge.appendChild(document.createTextNode(value.label || ''));
      box.appendChild(badge);
    } else box.textContent = String(v);
    return box;
  };
}
const sortText = value => Array.isArray(value) ? value.map(sortText).join(', ') : value && typeof value === 'object' ? String(value.name ?? value.label ?? '') : String(value ?? '');
export function compareCells(a, b) { return sortText(a).localeCompare(sortText(b)); }
export function byteQuery(value) {
  const m = /^\s*(>=|<=|>|<|=|!=)?\s*(\d+(?:\.\d+)?)\s*(B|KB|MB|GB|TB|KIB|MIB|GIB|TIB)?\s*$/i.exec(String(value));
  if (!m) return null;
  const unit = (m[3] || 'B').toUpperCase(),
    power = ['B', 'KB', 'MB', 'GB', 'TB'].indexOf(unit.replace('IB', 'B')),
    bytes = Number(m[2]) * Math.pow(unit.includes('IB') ? 1024 : 1000, power);
  return {
    operator: m[1] || '=',
    bytes
  };
}
export function byteMatches(query, value) {
  const p = byteQuery(query);
  if (!p || value === null || value === undefined || value === '') return false;
  const n = Number(value);
  if (!Number.isFinite(n)) return false;
  return {
    '>': () => n > p.bytes,
    '>=': () => n >= p.bytes,
    '<': () => n < p.bytes,
    '<=': () => n <= p.bytes,
    '=': () => n === p.bytes,
    '!=': () => n !== p.bytes
  }[p.operator]();
}
