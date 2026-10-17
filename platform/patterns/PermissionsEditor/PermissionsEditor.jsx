/* Plenix · PermissionsEditor
   Summary: An editable capabilities matrix by role or person with a readable permission summary.
   Usage: <PermissionsEditor subjects={roles} capabilities={rights} value={rightsByRole} onChange={setRights} />
   Props:
     subjects: [{ id, label, locked }]; capabilities: [{ id, label }]; value: { subjectId: [capabilityId] }.
     mode: "roles" (default) or "people"; onChange(next): controlled draft updates; onSave(next): optional persistence.
     readOnly: disables all changes; strings: { label, capability, subject, save, failed, unsaved }; className: extra classes.
   Behavior:
     A named Checkbox at each intersection updates an immutable draft; locked subjects cannot change.
     Optional Save waits for persistence, preserves the draft on failure and guards unsaved navigation.
     The selected subject has a PermissionSummary. The matrix is a Platform DataTable.
   Notes:
     Permissions are UI data, never authorization. Validate grants and locked roles on the server.
*/
import React from 'react';
import { Stack } from '../../components/Stack/Stack.jsx';
import { Field } from '../../components/Field/Field.jsx';
import { Select } from '../../components/Input/Input.jsx';
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx';
import { DataTable } from '../../components/DataTableNext/DataTablePublic.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Notice } from '../../components/Notice/Notice.jsx';
import { PermissionSummary } from '../PermissionSummary/PermissionSummary.jsx';
import { useUnsavedGuard } from '../../providers/UnsavedGuard.jsx';
import { cx } from '../../utils/cx.js';

export function PermissionsEditor({ subjects = [], capabilities = [], value = {}, mode = 'roles', onChange, onSave, readOnly = false, strings, className }) {
  const t = Object.assign({ label: 'Permissions', capability: 'Capability', subject: 'Show permissions for', save: 'Save permissions', failed: 'Could not save permissions. Try again.', unsaved: 'Your permission changes have not been saved.' }, strings);
  const [selected, setSelected] = React.useState(subjects[0]?.id || ''), [busy, setBusy] = React.useState(false), [error, setError] = React.useState('');
  const [saved, setSaved] = React.useState(value), lock = React.useRef(false);
  React.useEffect(() => { if (!onSave) setSaved(value); }, [value, onSave]);
  useUnsavedGuard(!!onSave && JSON.stringify(saved) !== JSON.stringify(value), t.unsaved);
  const subject = subjects.find((s) => s.id === selected) || subjects[0];
  const change = (s, cap, checked) => {
    if (readOnly || lock.current || s.locked || !onChange) return;
    const had = value[s.id] || [], next = { ...value, [s.id]: checked ? Array.from(new Set(had.concat(cap))) : had.filter((v) => v !== cap) };
    onChange(next);
  };
  const columns = [{ title: t.capability, field: 'label', kind: 'wrap', rowLabel: true }].concat(subjects.map((s) => ({
    title: s.label, field: 'permission-' + s.id, kind: 'center', headerSort: false,
    render: (cap) => <Checkbox label={s.label + ': ' + cap.label} checked={(value[s.id] || []).includes(cap.id)}
      disabled={readOnly || busy || s.locked || !onChange} onChange={(e) => change(s, cap.id, e.target.checked)} />
  })));
  const save = async () => {
    if (lock.current || !onSave) return; lock.current = true; setBusy(true); setError('');
    try { await onSave(value); setSaved(value); } catch (e) { setError(t.failed); } finally { lock.current = false; setBusy(false); }
  };
  return <Stack className={cx('plx-permissions-editor', className)} aria-busy={busy}>
    <DataTable label={t.label} data={capabilities} columns={columns} index="id" headerMenu={false} />
    <Field label={t.subject}><Select value={subject?.id || ''} options={subjects.map((s) => ({ value: s.id, label: s.label }))} onChange={(e) => setSelected(e.target.value)} /></Field>
    {subject ? <PermissionSummary access={subject.label} icon={mode === 'people' ? 'person' : 'settings-permissions'}
      can={capabilities.filter((c) => (value[subject.id] || []).includes(c.id)).map((c) => c.label)}
      cannot={capabilities.filter((c) => !(value[subject.id] || []).includes(c.id)).map((c) => c.label)} live /> : null}
    {error ? <Notice tone="danger">{error}</Notice> : null}
    {onSave ? <Button variant="primary" disabled={busy || readOnly || JSON.stringify(saved) === JSON.stringify(value)} onClick={save}>{t.save}</Button> : null}
  </Stack>;
}
