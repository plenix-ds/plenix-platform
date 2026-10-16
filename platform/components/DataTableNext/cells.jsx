/* Plenix · DataTableNext cells
   Summary: Existing Platform rich-cell parts rendered directly by React.
   Usage: <CellValue column={column} value={value} />
   Props: A column descriptor and its raw value; custom renderers stay with the table's cell adapter.
   Behavior: Formats bytes and renders deleted values, avatars, tags and status badges with shared CSS.
   Notes: Imports no legacy grid implementation. Data still sorts and filters by its raw value. */
import React from 'react';
import { Avatar } from '../Avatar/Avatar.jsx';
import { Badge } from '../Badge/Badge.jsx';
import { Tag } from '../Tag/Tag.jsx';
import { formatBytes } from '../../utils/format.js';
export const valueText=value=>value==null?'':Array.isArray(value)?value.map(valueText).join(', '):typeof value==='object'?String(value.label??value.name??''):String(value);
export function textFilter(row,field,search) {return valueText(row.getValue(field)).toLocaleLowerCase().includes(String(search??'').toLocaleLowerCase());}
export function listFilter(row,field,search) {const value=row.getValue(field);return [].concat(value??[]).some(item=>valueText(item).toLocaleLowerCase()===String(search??'').toLocaleLowerCase());}
export function byteFilter(row, field, search) {
  if (search == null || search === '') return true;
  const match = /^\s*(>=|<=|>|<|=|!=)?\s*(-?\d+(?:\.\d+)?)\s*(B|[KMGT]i?B)?\s*$/i.exec(String(search));
  if (!match) return false;
  const raw = row.getValue(field); if (raw === null || raw === undefined || raw === '') return false;
  const unit=(match[3]||'B').toUpperCase(),power=unit==='B'?0:['K','M','G','T'].indexOf(unit[0])+1;
  const amount = Number(match[2]) * Math.pow(unit.includes('I')?1024:1000,power), value = Number(row.getValue(field));
  if (!Number.isFinite(value)) return false;
  switch (match[1] || '=') { case '>': return value > amount; case '>=': return value >= amount; case '<': return value < amount; case '<=': return value <= amount; case '!=': return value !== amount; default: return value === amount; }
}
export function CellValue({ column, value, strings }) {
  const kinds = [].concat(column.kind || []);
  if (value === null || value === undefined || value === '') return <span className={'plx-data-table__value'+(kinds.includes('deleted')?' plx-data-table__deleted':'')}>{column.empty??(kinds.includes('deleted')?strings?.deleted||'Deleted':'')}</span>;
  if (column.type === 'bytes') return <span className="plx-data-table__value">{formatBytes(Number(value))}</span>;
  if (kinds.includes('deleted')) return <span className="plx-data-table__value plx-data-table__deleted">{valueText(value)}</span>;
  if (kinds.includes('avatar-name')) { const person = typeof value === 'object' ? value : { name: String(value) }, name=person.name||person.label||''; return <span className="plx-data-table__rich"><Avatar name={name} src={person.src} size="2xs" aria-hidden="true" /><span className="plx-data-table__value">{name}</span></span>; }
  if (kinds.includes('tags')) return <span className="plx-data-table__rich">{[].concat(value).map((tag, i) => <Tag key={i} category={typeof tag === 'object' ? tag.category : undefined}>{typeof tag === 'object' ? tag.label : String(tag)}</Tag>)}</span>;
  if (kinds.includes('badge')) { const badge = typeof value === 'object' ? value : { label: String(value) }; return <Badge tone={badge.tone} icon={badge.icon||'circle-info'}>{badge.label}</Badge>; }
  return <span className="plx-data-table__value">{valueText(value)}</span>;
}
