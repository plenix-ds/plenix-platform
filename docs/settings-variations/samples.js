/* compiled from samples.jsx; do not edit */
(function () {
/* Settings page variations (docs/settings-variations/samples.jsx): the Account settings page drawn five ways, only with
   Platform components and tokens inside the AppShell, for the owner's review (2026-10-12). A study, not a Platform part.
   Compiled to samples.js with @babel/standalone (scratchpad build-study.js). */
const {
  AppShell,
  AppHeader,
  NavPane,
  NavList,
  PageContent,
  StatusBar,
  SessionProvider,
  Avatar,
  Button,
  Inline,
  Stack,
  Input,
  Select,
  Switch,
  SettingsSection,
  SettingsRow,
  Field,
  Columns,
  Tabs,
  RecordPage,
  EntityHeader,
  ActionBar,
  Text,
  Notice
} = Plenix;
const {
  useState
} = React;
const ME = {
  name: 'Raphael Maher',
  email: 'raphael@lighthouseway.org'
};

// the shared controls of the page, so every variation shows the same settings
const Picture = () => /*#__PURE__*/React.createElement(Inline, {
  gap: "sm",
  align: "center"
}, /*#__PURE__*/React.createElement(Avatar, {
  name: ME.name,
  size: "md"
}), /*#__PURE__*/React.createElement(Button, {
  size: "sm",
  icon: "settings-camera"
}, "Change picture"));
const NameInput = p => /*#__PURE__*/React.createElement(Input, {
  defaultValue: ME.name,
  "aria-label": p.label ? undefined : 'Name',
  id: p.id,
  autoComplete: "name"
});
const EmailInput = p => /*#__PURE__*/React.createElement(Input, {
  type: "email",
  defaultValue: ME.email,
  "aria-label": p.label ? undefined : 'Email',
  id: p.id,
  autoComplete: "email"
});
const CalendarSelect = p => /*#__PURE__*/React.createElement(Select, {
  defaultValue: "outlook",
  "aria-label": p.label ? undefined : 'Calendar source',
  id: p.id
}, /*#__PURE__*/React.createElement("option", {
  value: "outlook"
}, "Outlook Calendar"), /*#__PURE__*/React.createElement("option", {
  value: "gcal"
}, "Google Calendar"), /*#__PURE__*/React.createElement("option", {
  value: "apple"
}, "Apple Calendar"));
const EmailSelect = p => /*#__PURE__*/React.createElement(Select, {
  defaultValue: "outlook",
  "aria-label": p.label ? undefined : 'Email source',
  id: p.id
}, /*#__PURE__*/React.createElement("option", {
  value: "outlook"
}, "Outlook"), /*#__PURE__*/React.createElement("option", {
  value: "gmail"
}, "Gmail"));
const Notifications = () => /*#__PURE__*/React.createElement(Switch, {
  defaultChecked: true,
  label: "Browser notifications"
});
const SignOut = () => /*#__PURE__*/React.createElement(Button, {
  variant: "danger-secondary",
  icon: "sign-out"
}, "Sign out");
const Header = () => /*#__PURE__*/React.createElement(RecordPage.Header, {
  title: "Account",
  description: "Profile, integrations and connected services.",
  size: "lg",
  headingLevel: 1
});

// A · today: rows (label at the start, control at the end) under section titles
function RowsVariant() {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(SettingsSection, {
    title: "Profile"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Picture"
  }, /*#__PURE__*/React.createElement(Picture, null)), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(Stack, {
    width: "sm"
  }, /*#__PURE__*/React.createElement(NameInput, null))), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(Stack, {
    width: "md"
  }, /*#__PURE__*/React.createElement(EmailInput, null)))), /*#__PURE__*/React.createElement(SettingsSection, {
    title: "Integrations"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Calendar source"
  }, /*#__PURE__*/React.createElement(CalendarSelect, null)), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Email source"
  }, /*#__PURE__*/React.createElement(EmailSelect, null))), /*#__PURE__*/React.createElement(SettingsSection, {
    title: "Security"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Browser notifications",
    description: "Alerts while Plenix is open in a tab"
  }, /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true,
    "aria-label": "Browser notifications"
  })), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Sign out",
    description: "Ends this session on this device"
  }, /*#__PURE__*/React.createElement(SignOut, null))));
}

// B · cards: each section a bordered card; the profile's Save and Discard in the card's action bar
function CardsVariant() {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(SettingsSection, {
    card: true,
    title: "Profile",
    description: "How you appear to the people you work with.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, null, "Discard"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary"
    }, "Save"))
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Picture"
  }, /*#__PURE__*/React.createElement(Picture, null)), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(Stack, {
    width: "sm"
  }, /*#__PURE__*/React.createElement(NameInput, null))), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(Stack, {
    width: "md"
  }, /*#__PURE__*/React.createElement(EmailInput, null)))), /*#__PURE__*/React.createElement(SettingsSection, {
    card: true,
    title: "Integrations",
    description: "Where your calendar and email come from."
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Calendar source"
  }, /*#__PURE__*/React.createElement(CalendarSelect, null)), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Email source"
  }, /*#__PURE__*/React.createElement(EmailSelect, null))), /*#__PURE__*/React.createElement(SettingsSection, {
    card: true,
    title: "Security"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Browser notifications"
  }, /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true,
    "aria-label": "Browser notifications"
  })), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Sign out"
  }, /*#__PURE__*/React.createElement(SignOut, null))));
}

// C · two columns: each section's title and description on the start side, its fields (labels above) on the end side
function TwoColumnVariant() {
  const Section = p => /*#__PURE__*/React.createElement(Columns, {
    count: 2,
    divided: true
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "heading",
    as: "h2"
  }, p.title), /*#__PURE__*/React.createElement(Text, {
    variant: "secondary",
    as: "p"
  }, p.desc)), /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, p.children));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Section, {
    title: "Profile",
    desc: "How you appear to the people you work with."
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Picture"
  }, /*#__PURE__*/React.createElement(Picture, null)), /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    htmlFor: "v3-name"
  }, /*#__PURE__*/React.createElement(NameInput, {
    id: "v3-name",
    label: true
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "v3-email",
    description: "Used to sign in and for notifications."
  }, /*#__PURE__*/React.createElement(EmailInput, {
    id: "v3-email",
    label: true
  })), /*#__PURE__*/React.createElement(ActionBar, {
    label: "Profile actions"
  }, /*#__PURE__*/React.createElement(Button, null, "Discard"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Save"))), /*#__PURE__*/React.createElement(Section, {
    title: "Integrations",
    desc: "Where your calendar and email come from."
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Calendar source",
    htmlFor: "v3-cal"
  }, /*#__PURE__*/React.createElement(CalendarSelect, {
    id: "v3-cal",
    label: true
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email source",
    htmlFor: "v3-mail"
  }, /*#__PURE__*/React.createElement(EmailSelect, {
    id: "v3-mail",
    label: true
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Security",
    desc: "Notifications and this session."
  }, /*#__PURE__*/React.createElement(Notifications, null), /*#__PURE__*/React.createElement(Inline, null, /*#__PURE__*/React.createElement(SignOut, null))));
}

// D · profile first: the person as the page's entity header, then the other settings as rows
function ProfileVariant() {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(EntityHeader, {
    media: {
      person: ME.name,
      color: 'blue'
    },
    context: "Account",
    title: ME.name,
    facts: [ME.email, 'Admin', /*#__PURE__*/React.createElement(React.Fragment, null, "Member since ", /*#__PURE__*/React.createElement(Text, {
      variant: "data"
    }, "Oct 2026"))],
    actions: [{
      icon: 'settings-camera',
      label: 'Change picture'
    }, {
      icon: 'pencil',
      label: 'Edit profile',
      primary: true
    }],
    headingLevel: 1
  }), /*#__PURE__*/React.createElement(SettingsSection, {
    title: "Integrations"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Calendar source"
  }, /*#__PURE__*/React.createElement(CalendarSelect, null)), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Email source"
  }, /*#__PURE__*/React.createElement(EmailSelect, null))), /*#__PURE__*/React.createElement(SettingsSection, {
    title: "Security"
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Browser notifications"
  }, /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true,
    "aria-label": "Browser notifications"
  })), /*#__PURE__*/React.createElement(SettingsRow, {
    label: "Sign out"
  }, /*#__PURE__*/React.createElement(SignOut, null))));
}

// E · tabs: one tab per section, a form with labels above its fields and Save and Cancel at its end
function TabsVariant() {
  const [tab, setTab] = useState('profile');
  const form = (children, save) => /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, children, save ? /*#__PURE__*/React.createElement(ActionBar, {
    label: "Form actions"
  }, /*#__PURE__*/React.createElement(Button, null, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Save")) : null);
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Tabs, {
    label: "Account sections",
    value: tab,
    onChange: setTab,
    items: [{
      value: 'profile',
      label: 'Profile',
      content: form(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
        label: "Picture"
      }, /*#__PURE__*/React.createElement(Picture, null)), /*#__PURE__*/React.createElement(Field, {
        label: "Name",
        htmlFor: "v5-name"
      }, /*#__PURE__*/React.createElement(NameInput, {
        id: "v5-name",
        label: true
      })), /*#__PURE__*/React.createElement(Field, {
        label: "Email",
        htmlFor: "v5-email"
      }, /*#__PURE__*/React.createElement(EmailInput, {
        id: "v5-email",
        label: true
      }))), true)
    }, {
      value: 'integrations',
      label: 'Integrations',
      content: form(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
        label: "Calendar source",
        htmlFor: "v5-cal"
      }, /*#__PURE__*/React.createElement(CalendarSelect, {
        id: "v5-cal",
        label: true
      })), /*#__PURE__*/React.createElement(Field, {
        label: "Email source",
        htmlFor: "v5-mail"
      }, /*#__PURE__*/React.createElement(EmailSelect, {
        id: "v5-mail",
        label: true
      }))), true)
    }, {
      value: 'security',
      label: 'Security',
      content: form(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Notifications, null), /*#__PURE__*/React.createElement(Notice, {
        tone: "warning"
      }, "Signing out ends this session on this device."), /*#__PURE__*/React.createElement(Inline, null, /*#__PURE__*/React.createElement(SignOut, null))), false)
    }]
  }));
}
const VARIANTS = [{
  id: 'a',
  label: 'A · Rows (today)',
  icon: 'list-lines',
  View: RowsVariant
}, {
  id: 'b',
  label: 'B · Cards',
  icon: 'cards-medium',
  View: CardsVariant
}, {
  id: 'c',
  label: 'C · Two columns',
  icon: 'view-table',
  View: TwoColumnVariant
}, {
  id: 'd',
  label: 'D · Profile first',
  icon: 'person',
  View: ProfileVariant
}, {
  id: 'e',
  label: 'E · Tabs',
  icon: 'grid-2x2',
  View: TabsVariant
}];
function App() {
  const [sel, setSel] = useState('a');
  const v = VARIANTS.find(x => x.id === sel);
  return /*#__PURE__*/React.createElement(AppShell, {
    page: "settings",
    header: /*#__PURE__*/React.createElement(AppHeader, {
      tone: "accent",
      appName: "Settings variations",
      brandHref: "#"
    }),
    sideNav: /*#__PURE__*/React.createElement(NavPane, {
      label: "Variations",
      title: "Account page"
    }, /*#__PURE__*/React.createElement(NavList, {
      label: "Variations",
      value: sel,
      onSelect: setSel,
      items: VARIANTS.map(x => ({
        id: x.id,
        label: x.label,
        icon: x.icon
      }))
    })),
    footer: /*#__PURE__*/React.createElement(StatusBar, {
      start: /*#__PURE__*/React.createElement("span", null, v.label),
      end: /*#__PURE__*/React.createElement("span", null, "Platform components only")
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "plx-app-shell__page"
  }, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(v.View, null))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(SessionProvider, null, /*#__PURE__*/React.createElement(App, null)));
})();
