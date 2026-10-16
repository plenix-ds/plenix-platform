/* compiled from study.jsx; do not edit */
(function () {
/* Reading pane study (docs/reading-pane-study/study.jsx): an Outlook-style layout drawn live with Platform components
   (owner, 2026-10-16: "header row · nav pane | table | contents of the selected item"). The page kind is master-detail
   (platform/standards/layout.json), with a table instead of a list. Switches: where the reading pane goes (right, bottom,
   off: Outlook's Reading pane setting) and how rows read (one line, or two lines as Outlook does in a narrow list).
   A study, not a Platform part. Compiled to study.js with tools/agent/build-study.js. */
const {
  AppShell,
  AppHeader,
  NavPane,
  NavList,
  PageContent,
  StatusBar,
  SessionProvider,
  DataTable,
  CommandBar,
  SegmentedControl,
  Toolbar,
  Button,
  Text,
  Stack,
  Inline,
  EntityHeader,
  EmptyState,
  Badge,
  Persona,
  Resizable,
  Divider
} = Plenix;
const {
  useState
} = React;
const FOLDERS = [{
  id: 'inbox',
  label: 'Inbox',
  icon: 'mail',
  count: 12
}, {
  id: 'drafts',
  label: 'Drafts',
  icon: 'pencil',
  count: 2
}, {
  id: 'sent',
  label: 'Sent',
  icon: 'forward'
}, {
  id: 'archive',
  label: 'Archive',
  icon: 'archive'
}];
const PEOPLE = ['Maya Chen', 'Omar Haddad', 'Sofia Rossi', 'Liam Walsh', 'Ana Souza', 'Kenji Mori'];
const SUBJECTS = ['Kitchen render, second round', 'Invoice 2026-114', 'Brand kit: new logo files', 'Site walkthrough notes', 'Floor plan comments', 'Hero banner sizes', 'Quarterly review', 'Contract for the Apex project'];
const ITEMS = SUBJECTS.map((s, i) => ({
  id: i + 1,
  from: PEOPLE[i % PEOPLE.length],
  subject: s,
  preview: 'Thanks for the update. I looked through the files and added a few notes for the next round.',
  received: '2026-10-' + String(16 - i).padStart(2, '0'),
  unread: i < 3,
  flagged: i === 1
}));
const COLS_ONE = [{
  title: 'From',
  field: 'from',
  kind: 'name'
}, {
  title: 'Subject',
  field: 'subject'
}, {
  title: 'Received',
  field: 'received',
  kind: 'data'
}];
// two lines (Outlook's narrow list): the sender and date, then the subject; one column of rich cells
const COLS_TWO = [{
  title: 'Message',
  field: 'subject',
  kind: 'name',
  render: r => /*#__PURE__*/React.createElement(Stack, {
    gap: "2xs"
  }, /*#__PURE__*/React.createElement(Inline, {
    gap: "xs",
    justify: "between"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: r.unread ? 'label' : 'body'
  }, r.from), /*#__PURE__*/React.createElement(Text, {
    variant: "data"
  }, r.received)), /*#__PURE__*/React.createElement(Text, {
    tone: "muted"
  }, r.subject))
}];
function Reading({
  item,
  count,
  onBack
}) {
  if (count > 1) return /*#__PURE__*/React.createElement("div", {
    className: "study-reading"
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "checklist",
    title: count + ' items selected',
    description: "Choose what to do with them in the command bar, or select one item to read it."
  }));
  if (!item) return /*#__PURE__*/React.createElement("div", {
    className: "study-reading"
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "mail",
    title: "Select an item to read",
    description: "Nothing is selected."
  }));
  return /*#__PURE__*/React.createElement("article", {
    className: "study-reading",
    "aria-label": item.subject
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, onBack ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "arrow-left",
    onClick: onBack
  }, "Back to Inbox")) : null, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Message actions"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "reply"
  }, "Reply"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "forward"
  }, "Forward"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "archive"
  }, "Archive"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "trash"
  }, "Delete")), /*#__PURE__*/React.createElement(Text, {
    as: "h2",
    variant: "title"
  }, item.subject), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    align: "center"
  }, /*#__PURE__*/React.createElement(Persona, {
    name: item.from,
    size: "sm"
  }), /*#__PURE__*/React.createElement(Text, {
    variant: "data"
  }, item.received), item.flagged ? /*#__PURE__*/React.createElement(Badge, {
    tone: "waiting",
    icon: "flag"
  }, "Flagged") : null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, item.preview), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "The second round is in the shared folder. The kitchen views changed the most; the hallway is the same as before.")));
}
function Mail({
  pane,
  rows
}) {
  const [sel, setSel] = useState([1]);
  const [open, setOpen] = useState(1);
  const [reading, setReading] = useState(false); // the reading pane "off": an item opened full width
  const item = ITEMS.find(x => x.id === open) || null;
  const count = sel.length;
  const bar = /*#__PURE__*/React.createElement(CommandBar, {
    label: "Inbox",
    actions: [{
      id: 'new',
      label: 'New mail',
      icon: 'plus',
      primary: true
    }, {
      id: 'sweep',
      label: 'Sweep',
      icon: 'trash-simple'
    }],
    selection: count > 1 ? {
      count,
      noun: 'item',
      actions: [{
        id: 'read',
        label: 'Mark as read',
        icon: 'mark-unread'
      }, {
        id: 'archive',
        label: 'Archive',
        icon: 'archive'
      }, {
        id: 'delete',
        label: 'Delete',
        icon: 'trash',
        danger: true
      }],
      onClear: () => setSel(open ? [open] : [])
    } : undefined
  });
  const pick = id => {
    setOpen(id);
    setSel([id]);
    if (pane === 'off') setReading(true);
  };
  // the grid fills its pane and scrolls inside it (mode "fill"), so the table and the reading pane are the same height
  const table = /*#__PURE__*/React.createElement(DataTable, {
    label: "Inbox",
    data: ITEMS,
    columns: rows === 'two' ? COLS_TWO : COLS_ONE,
    rowHeight: rows === 'two' ? 'medium' : 'short',
    mode: "fill",
    selectable: true,
    selected: sel,
    onSelectionChange: k => {
      setSel(k);
      if (k.length === 1) setOpen(k[0]);
    },
    on: {
      rowClick: (e, row) => pick(row.getData().id)
    },
    narrow: "table",
    viewMenu: false
  });
  if (pane === 'off') return /*#__PURE__*/React.createElement("div", {
    className: "study-mail"
  }, reading && item ? null : bar, /*#__PURE__*/React.createElement("div", {
    className: "study-panes study-panes--off"
  }, reading && item ? /*#__PURE__*/React.createElement(Reading, {
    item: item,
    count: 1,
    onBack: () => setReading(false)
  }) : /*#__PURE__*/React.createElement("div", {
    className: "study-list"
  }, table)));
  return /*#__PURE__*/React.createElement("div", {
    className: "study-mail"
  }, bar, /*#__PURE__*/React.createElement("div", {
    className: 'study-panes study-panes--' + pane
  }, /*#__PURE__*/React.createElement(Resizable, {
    label: "Message list",
    axis: pane === 'bottom' ? 'vertical' : 'horizontal',
    defaultWidth: pane === 'right' ? 560 : undefined,
    defaultHeight: pane === 'bottom' ? 320 : undefined,
    className: "study-list"
  }, table), /*#__PURE__*/React.createElement(Reading, {
    item: item,
    count: count
  })));
}
function App() {
  const [folder, setFolder] = useState('inbox');
  const [pane, setPane] = useState('right');
  const [rows, setRows] = useState('one');
  return /*#__PURE__*/React.createElement(AppShell, {
    page: "master-detail",
    header: /*#__PURE__*/React.createElement(AppHeader, {
      tone: "accent",
      appName: "Reading pane study",
      brandHref: "#"
    }),
    sideNav: /*#__PURE__*/React.createElement(NavPane, {
      label: "Folders",
      title: "Mail"
    }, /*#__PURE__*/React.createElement(NavList, {
      label: "Folders",
      value: folder,
      onSelect: setFolder,
      items: FOLDERS
    })),
    footer: /*#__PURE__*/React.createElement(StatusBar, {
      start: /*#__PURE__*/React.createElement("span", null, ITEMS.length, " items \xB7 3 unread"),
      end: /*#__PURE__*/React.createElement("span", null, "Reading pane: ", pane)
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-page"
  }, /*#__PURE__*/React.createElement(Inline, {
    gap: "lg",
    wrap: true,
    align: "center",
    className: "study-switches"
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    label: "Reading pane",
    value: pane,
    onChange: setPane,
    options: [{
      value: 'right',
      label: 'Right'
    }, {
      value: 'bottom',
      label: 'Bottom'
    }, {
      value: 'off',
      label: 'Off'
    }]
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    label: "Rows",
    value: rows,
    onChange: setRows,
    options: [{
      value: 'one',
      label: 'One line'
    }, {
      value: 'two',
      label: 'Two lines'
    }]
  })), /*#__PURE__*/React.createElement(Mail, {
    key: pane + rows,
    pane: pane,
    rows: rows
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(SessionProvider, null, /*#__PURE__*/React.createElement(App, null)));
})();
