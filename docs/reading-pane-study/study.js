/* compiled from study.jsx; do not edit */
(function () {
/* Reading pane demo (docs/reading-pane-study/study.jsx): the Outlook-style layout on the Platform's SplitView (owner,
   2026-10-16): header row · navigation pane | table | the selected item. Two pages, no switches: index.html side by
   side, stacked.html stacked. Compiled to study.js with tools/agent/build-study.js. */
const {
  AppShell,
  AppHeader,
  NavPane,
  NavList,
  StatusBar,
  SessionProvider,
  DataGrid,
  CommandBar,
  Toolbar,
  Button,
  Text,
  Stack,
  Inline,
  EmptyState,
  Badge,
  Persona,
  Divider,
  SplitView,
  ReadingPane
} = Plenix;
const {
  useState
} = React;
const STACKED = /stacked\.html$/.test(location.pathname);
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
  flagged: i === 1
}));
const COLUMNS = [{
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
function Mail() {
  const [sel, setSel] = useState([1]);
  const [open, setOpen] = useState(1);
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
  const table = /*#__PURE__*/React.createElement(DataGrid, {
    label: "Inbox",
    data: ITEMS,
    columns: COLUMNS,
    mode: "fill",
    selectable: true,
    selected: sel,
    narrow: "table",
    viewMenu: false,
    onSelectionChange: k => {
      setSel(k);
      if (k.length === 1) setOpen(k[0]);
    },
    on: {
      rowClick: (e, row) => {
        const id = row.getData().id;
        setOpen(id);
        setSel([id]);
      }
    }
  });
  const reading = /*#__PURE__*/React.createElement(ReadingPane, {
    label: count > 1 ? count + ' items selected' : item ? item.subject : 'Nothing selected',
    actions: count === 1 && item ? /*#__PURE__*/React.createElement(Toolbar, {
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
    }, "Delete")) : null,
    empty: /*#__PURE__*/React.createElement(EmptyState, {
      icon: count > 1 ? 'checklist' : 'mail',
      title: count > 1 ? count + ' items selected' : 'Select an item to read',
      description: count > 1 ? 'Choose what to do with them in the command bar.' : 'Nothing is selected.'
    })
  }, count === 1 && item ? /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(Text, {
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
  }, "The second round is in the shared folder. The kitchen views changed the most; the hallway is the same as before.")) : null);
  return /*#__PURE__*/React.createElement("div", {
    className: "study-page"
  }, bar, /*#__PURE__*/React.createElement(SplitView, {
    label: "Inbox",
    firstLabel: "Message list",
    orientation: STACKED ? 'stacked' : 'side-by-side',
    first: table,
    second: reading
  }));
}
function App() {
  const [folder, setFolder] = useState('inbox');
  return /*#__PURE__*/React.createElement(AppShell, {
    page: "master-detail",
    header: /*#__PURE__*/React.createElement(AppHeader, {
      tone: "accent",
      appName: STACKED ? 'Split view · stacked' : 'Split view · side by side',
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
      start: /*#__PURE__*/React.createElement("span", null, ITEMS.length, " items"),
      end: /*#__PURE__*/React.createElement("span", null, STACKED ? 'Stacked' : 'Side by side')
    })
  }, /*#__PURE__*/React.createElement(Mail, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(SessionProvider, null, /*#__PURE__*/React.createElement(App, null)));
})();
