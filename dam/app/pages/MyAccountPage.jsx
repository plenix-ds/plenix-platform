/* Plenix asset app · My Account (app/pages/MyAccountPage.jsx): profile and personal preferences.
   Replaces the HTML of settings-myaccount.html (batch 109). Sections: Profile, Preferences; the address hash
   (#profile, #preferences) opens one directly and follows the navigation. Both stay mounted, so unsaved edits survive
   switching. */
import React from 'react';
import { SettingsLayout, SettingsSection, NavList, RecordPage, Field, Input, Select, Combobox, Switch, ChoiceList, Button, useDensity, useToast, useSession, NavPane, Text } from 'plenix-platform';
import { AssetPage } from '../shell/AssetShell.jsx';

// DATA: the saved preferences and the page-size choices come from the back end; sample values until then. The profile is
// the signed-in person, from the Platform session.
const PAGE_SIZES = ['6', '8', '12', '15', '20', '30', '36', '50', '100', '200'];
const LAST_VIEWED = 'finder/find';

const SECTIONS = [
  { heading: 'My account', items: [{ id: 'profile', label: 'Profile', icon: 'settings-profile' }, { id: 'preferences', label: 'Preferences', icon: 'settings-preferences' }] },
];

function useSection() {
  const read = () => (location.hash === '#preferences' ? 'preferences' : 'profile');
  const [section, setSection] = React.useState(read);
  React.useEffect(() => {
    const on = () => setSection(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = (id) => { if (id === 'home') return; history.replaceState(null, '', '#' + id); setSection(id); };
  return [section, go];
}

function Profile() {
  const toast = useToast();
  const { account } = useSession();
  const [p, setP] = React.useState(() => ({ firstName: account.firstName || '', lastName: account.lastName || '', email: account.email || '' }));
  const field = (k) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }) });
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); toast.show('Profile saved', { tone: 'success' }); }}>
      <RecordPage.Header title="Profile" description="Edit your account details and update your password." headingLevel={2} />
      <SettingsSection card actions={<><Button onClick={() => toast.show('Change password')}>Change password</Button><Button type="submit" variant="primary">Save</Button></>}>
        <Field label="First name" layout="inline"><Input name="firstName" autoComplete="given-name" {...field('firstName')} /></Field>
        <Field label="Last name" layout="inline"><Input name="lastName" autoComplete="family-name" {...field('lastName')} /></Field>
        <Field label="Email" layout="inline"><Input name="email" type="email" autoComplete="email" {...field('email')} /></Field>
      </SettingsSection>
    </form>
  );
}

function Preferences() {
  const toast = useToast();
  const [density, setDensity] = useDensity();
  const [prefs, setPrefs] = React.useState({ theme: 'Light', assets: '30', rows: '30', album: false, approval: false, dateFormat: '' });
  const [sizes, setSizes] = React.useState(PAGE_SIZES.map((v) => ({ value: v, label: v })));
  const set = (k) => (v) => setPrefs({ ...prefs, [k]: v });
  const create = (k) => (text) => { const v = text.trim(); if (!v) return; if (!sizes.some((o) => o.value === v)) setSizes(sizes.concat({ value: v, label: v })); set(k)(v); };
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); toast.show('Preferences saved', { tone: 'success' }); }}>
      <RecordPage.Header title="Preferences" description="Your personal display and notification preferences." headingLevel={2} />
      <SettingsSection card actions={<Button type="submit" variant="primary">Save preferences</Button>}>
        <Field label="Default theme" layout="inline">
          <Select name="defaultTheme" value={prefs.theme} onChange={(e) => set('theme')(e.target.value)}><option>Light</option><option>Dark</option></Select>
        </Field>
        <div className="plx-field">
          <ChoiceList legend="Display density" value={density} onChange={setDensity} options={window.PlenixWorkspace ? window.PlenixWorkspace.densities() : []} />
        </div>
        <Field label="Assets per Page" layout="inline">
          <Combobox options={sizes} value={prefs.assets} onChange={set('assets')} creatable onCreate={create('assets')} />
        </Field>
        <Field label="Rows per Page" layout="inline">
          <Combobox options={sizes} value={prefs.rows} onChange={set('rows')} creatable onCreate={create('rows')} />
        </Field>
        <Field label="Receive album notifications" layout="row">
          <Switch label="Receive album notifications" labelHidden checked={prefs.album} onChange={(e) => set('album')(e.target.checked)} />
        </Field>
        <Field label="Receive Approval / Rejection Notifications" layout="row">
          <Switch label="Receive Approval / Rejection Notifications" labelHidden checked={prefs.approval} onChange={(e) => set('approval')(e.target.checked)} />
        </Field>
        <Field label="Preferred date format" layout="inline" info="Accepted formats: yyyy-MM-dd, MM-dd-yyyy, dd-MM-yyyy">
          <Input name="preferredDateFormat" placeholder="Preferred date format" value={prefs.dateFormat} onChange={(e) => set('dateFormat')(e.target.value)} />
        </Field>
        <Field label="Last viewed application" layout="inline">
          <Text as="output" variant="data">{LAST_VIEWED}</Text>
        </Field>
      </SettingsSection>
    </form>
  );
}

export function MyAccountPage() {
  const [section, go] = useSection();
  return (
    <AssetPage title="My account" current="account" sideNav={<NavPane as="div" label="Settings sections" title="My account" header={<Button size="sm" variant="ghost" icon="home" href="index.html">Home</Button>} footer={<Button size="sm" variant="ghost" icon="arrow-left" href="index.html">Back to Asset Manager</Button>}><NavList label="Settings sections" value={section} onSelect={go} groups={SECTIONS} /></NavPane>}>
      <SettingsLayout>
        <div hidden={section !== 'profile'}><Profile /></div>
        <div hidden={section !== 'preferences'}><Preferences /></div>
      </SettingsLayout>
    </AssetPage>
  );
}
