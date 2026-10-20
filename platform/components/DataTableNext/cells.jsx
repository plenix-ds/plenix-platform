/* Plenix · DataTableNext cells
   Summary: Existing Platform rich-cell parts rendered directly by React.
   Usage: <CellValue column={column} value={value} />
   Props: A column descriptor and its raw value; custom renderers stay with the table's cell adapter.
   Behavior: Formats bytes and renders deleted values, avatars, tags and status badges with shared CSS. In the pill view
     (pill) every other value is a DataPill with its column's type icon; column.pill(value, record) may return its tone,
     icon, variant, data and gender, and column.pill === false keeps the plain value. A person (type person, kind
     avatar-name) carries value.gender.
   Notes: Imports no legacy grid implementation. Data still sorts and filters by its raw value. */
import React from 'react';
import { Avatar } from '../Avatar/Avatar.jsx';
import { Badge } from '../Badge/Badge.jsx';
import { Tag } from '../Tag/Tag.jsx';
import { DataPill } from '../DataPill/DataPill.jsx';
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
const DATA_TYPES = ['number', 'currency', 'date', 'bytes'];

export function CellValue({ column, value, strings, record, pill = false, icon }) {
  const kinds = [].concat(column.kind || []);
  if (pill && column.pill !== false && value !== null && value !== undefined && value !== '' && !kinds.includes('tags') && !kinds.includes('badge') && !kinds.includes('deleted')) {
    const isPerson = column.type === 'person' || kinds.includes('avatar-name');
    const person = isPerson && typeof value === 'object' ? value : null;
    const own = typeof column.pill === 'function' ? column.pill(value, record) || {} : {};
    const text = column.type === 'bytes' ? formatBytes(Number(value)) : person ? (person.name || person.label || '') : valueText(value);
    return <DataPill tone={own.tone} variant={own.variant} icon={own.icon || (isPerson ? undefined : icon)} person={isPerson} gender={own.gender || (person ? person.gender : undefined)}
      data={own.data !== undefined ? own.data : kinds.includes('data') || DATA_TYPES.includes(column.type)} fill={own.fill}>{text}</DataPill>;
  }
  if (value === null || value === undefined || value === '') return <span className={'plx-data-table__value'+(kinds.includes('deleted')?' plx-data-table__deleted':'')}>{column.empty??(kinds.includes('deleted')?strings?.deleted||'Deleted':'')}</span>;
  if (column.type === 'bytes') return <span className="plx-data-table__value">{formatBytes(Number(value))}</span>;
  if (kinds.includes('deleted')) return <span className="plx-data-table__value plx-data-table__deleted">{valueText(value)}</span>;
  if (kinds.includes('avatar-name')) { const person = typeof value === 'object' ? value : { name: String(value) }, name=person.name||person.label||''; return <span className="plx-data-table__rich"><Avatar name={name} src={person.src} size="2xs" aria-hidden="true" /><span className="plx-data-table__value">{name}</span></span>; }
  if (kinds.includes('tags')) return <span className="plx-data-table__rich">{[].concat(value).map((tag, i) => <Tag key={i} category={typeof tag === 'object' ? tag.category : undefined}>{typeof tag === 'object' ? tag.label : String(tag)}</Tag>)}</span>;
  if (kinds.includes('badge')) { const badge = typeof value === 'object' ? value : { label: String(value) }; return <Badge tone={badge.tone} icon={badge.icon||'circle-info'}>{badge.label}</Badge>; }
  return <span className="plx-data-table__value">{valueText(value)}</span>;
}
