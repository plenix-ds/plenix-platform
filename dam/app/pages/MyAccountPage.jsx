/* Plenix asset app · My Account (app/pages/MyAccountPage.jsx): profile and personal preferences.
   Replaces the HTML of settings-myaccount.html (batch 109). Sections: Profile, Preferences; each is a screen with its
   address (#/profile, #/preferences; the older #preferences opens the same) and a history entry (Platforms Standard 4.3).
   Both stay mounted, so unsaved edits survive switching; leaving the page with unsaved edits asks (useUnsavedGuard).
   Each screen is SettingsSection cards (owner, 2026-10-13: "all the settings pages to have the cards view"): Profile one
   static card; Preferences a static Display card and a Notifications card, with the rarely read Activity card collapsible. */
import React from 'react';
import { SettingsLayout, SettingsSection, SettingsRow, ActionBar, NavList, RecordPage, Field, Input, SegmentedControl, Combobox, Switch, ChoiceList, Button, useDensity, useToast, useSession, NavPane, Text, useScreenLocation, useUnsavedGuard } from 'plenix-platform';
import { AssetPage } from '../shell/AssetShell.jsx';

// DATA: the saved preferences and the page-size choices come from the back end; sample values until then. The profile is
// the signed-in person, from the Platform session.
const PAGE_SIZES = ['6', '8', '12', '15', '20', '30', '36', '50', '100', '200'];
const LAST_VIEWED = 'finder/find';

const SECTIONS = [
  { heading: 'My account', items: [{ id: 'profile', label: 'Profile', icon: 'settings-profile' }, { id: 'preferences', label: 'Preferences', icon: 'settings-preferences' }] },
];

// the section is the screen: choosing one pushes a history entry, Back and Forward follow
const legacy = (hash) => (hash === '#profile' || hash === '#preferences' ? '/' + hash.slice(1) : null);
function useSection() {
  const loc = useScreenLocation({ app: 'assets-account', legacy });
  const section = loc.parts[0] === 'preferences' ? 'preferences' : 'profile';
  const go = (id) => { if (id === 'home') return; loc.navigate([id]); };
  return [section, go];
}
// both sections stay mounted, so only leaving the page loses an edit
const keeps = () => true;

function Profile() {
  const toast = useToast();
  const { account } = useSession();
  const [p, setP] = React.useState(() => ({ firstName: account.firstName || '', lastName: account.lastName || '', email: account.email || '' }));
  const [saved, setSaved] = React.useState(p);
  useUnsavedGuard(Object.keys(p).some((k) => p[k] !== saved[k]), 'Your profile changes have not been saved.', { keeps });
  const field = (k) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }) });
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); setSaved(p); toast.show('Profile saved', { tone: 'success' }); }}>
      <RecordPage.Header title="Profile" description="Edit your account details and update your password." headingLevel={2} />
      <SettingsSection title="Account details" stateKey="profile" actions={<><Button onClick={() => toast.show('Change password')}>Change password</Button><Button type="submit" variant="primary">Save</Button></>}>
        <Field label="First name" layout="inline"><Input name="firstName" width="lg" autoComplete="given-name" enterKeyHint="next" {...field('firstName')} /></Field>
        <Field label="Last name" layout="inline"><Input name="lastName" width="lg" autoComplete="family-name" enterKeyHint="next" {...field('lastName')} /></Field>
        <Field label="Email" layout="inline"><Input name="email" width="lg" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} enterKeyHint="done" {...field('email')} /></Field>
      </SettingsSection>
    </form>
  );
}

function Preferences() {
  const toast = useToast();
  const [density, setDensity] = useDensity();
  // the appearance (Platforms Standard 1.6): system (default), light or dark, the same choice as the suite's Settings › Mode;
  // theme-boot keeps it for every page and it applies at once, like the display density
  const ws = window.PlenixWorkspace;
  const [mode, setModeState] = React.useState(() => (ws && ws.mode ? ws.mode() : 'system'));
  const setMode = (m) => { setModeState(m); if (ws && ws.setMode) ws.setMode(m); };
  const [prefs, setPrefs] = React.useState({ assets: '30', rows: '30', album: false, approval: false, dateFormat: '' });
  const [saved, setSaved] = React.useState(prefs);
  useUnsavedGuard(Object.keys(prefs).some((k) => prefs[k] !== saved[k]), 'Your preferences have not been saved.', { keeps });
  const [sizes, setSizes] = React.useState(PAGE_SIZES.map((v) => ({ value: v, label: v })));
  const set = (k) => (v) => setPrefs({ ...prefs, [k]: v });
  const create = (k) => (text) => { const v = text.trim(); if (!v) return; if (!sizes.some((o) => o.value === v)) setSizes(sizes.concat({ value: v, label: v })); set(k)(v); };
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); setSaved(prefs); toast.show('Preferences saved', { tone: 'success' }); }}>
      <RecordPage.Header title="Preferences" description="Your personal display and notification preferences." headingLevel={2} />
      <SettingsSection title="Display" stateKey="display" description="Your mode and density apply at once, on every page.">
        <SettingsRow label="Mode" description="System follows the light or dark setting of your device">
          <SegmentedControl label="Mode" value={mode} onChange={setMode} options={[{ value: 'system', label: 'System' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        </SettingsRow>
        <ChoiceList legend="Display density" value={density} onChange={setDensity} options={window.PlenixWorkspace ? window.PlenixWorkspace.densities() : []} />
      </SettingsSection>
      <SettingsSection title="Results and dates" stateKey="results">
        <Field label="Assets per page" layout="inline">
          <Combobox options={sizes} value={prefs.assets} onChange={set('assets')} creatable onCreate={create('assets')} />
        </Field>
        <Field label="Rows per page" layout="inline">
          <Combobox options={sizes} value={prefs.rows} onChange={set('rows')} creatable onCreate={create('rows')} />
        </Field>
        <Field label="Preferred date format" layout="inline" info="Accepted formats: yyyy-MM-dd, MM-dd-yyyy, dd-MM-yyyy">
          <Input name="preferredDateFormat" width="lg" data autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="done" placeholder="yyyy-MM-dd" value={prefs.dateFormat} onChange={(e) => set('dateFormat')(e.target.value)} />
        </Field>
      </SettingsSection>
      <SettingsSection title="Notifications" stateKey="notifications">
        <SettingsRow label="Album notifications" description="When assets are added to or removed from an album you follow">
          <Switch label="Album notifications" labelHidden checked={prefs.album} onChange={(e) => set('album')(e.target.checked)} />
        </SettingsRow>
        <SettingsRow label="Approval and rejection notifications" description="When your assets are approved or rejected">
          <Switch label="Approval and rejection notifications" labelHidden checked={prefs.approval} onChange={(e) => set('approval')(e.target.checked)} />
        </SettingsRow>
      </SettingsSection>
      <SettingsSection title="Activity" stateKey="activity" collapsible defaultExpanded={false}>
        <Field label="Last viewed application" layout="inline">
          <Text as="output" variant="data">{LAST_VIEWED}</Text>
        </Field>
      </SettingsSection>
      <ActionBar label="Preferences actions"><Button type="submit" variant="primary">Save preferences</Button></ActionBar>
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
