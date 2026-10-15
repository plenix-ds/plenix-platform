/* compiled from samples.jsx; do not edit */
(function () {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Command bar study (docs/command-bar-study/samples.jsx): every option for the menus over a collection, each drawn as a
   working screen with Platform components, icons and tokens only, and labeled with the standard it follows (owner review,
   2026-10-14: "i want to see all the options! … based on the various standards"). A study, not a Platform part.
   Compiled to samples.js with @babel/standalone (scratchpad build-study.js). */
const {
  Toolbar,
  Button,
  SplitButton,
  SearchField,
  Menu,
  MenuItem,
  MenuDivider,
  MenuRadioGroup,
  MenuGroup,
  Badge,
  Icon,
  VisuallyHidden,
  Dialog,
  RadioGroup,
  ContentGrid,
  MediaCard,
  Text,
  Stack,
  Inline,
  Columns,
  DataTable,
  BulkActions,
  Divider,
  AppShell,
  AppHeader,
  NavPane,
  NavList,
  PageContent,
  StatusBar,
  SessionProvider,
  RecordPage,
  Tooltip,
  Popover,
  SidePanel,
  Checkbox,
  Select,
  Input,
  ButtonGroup,
  Field,
  Breadcrumbs,
  Table,
  Persona,
  Details,
  Textarea
} = Plenix;
const {
  useState
} = React;
const ASSETS = [{
  id: 1,
  name: 'Kitchen render.png',
  type: 'Image',
  category: 'Projects',
  size: '4.2 MB',
  modified: '2026-10-12'
}, {
  id: 2,
  name: 'Floor plan.pdf',
  type: 'Document',
  category: 'Projects',
  size: '1.1 MB',
  modified: '2026-10-09'
}, {
  id: 3,
  name: 'Brand logo.svg',
  type: 'Image',
  category: 'Brand',
  size: '18 KB',
  modified: '2026-10-01'
}, {
  id: 4,
  name: 'Hero banner.jpg',
  type: 'Image',
  category: 'Brand',
  size: '920 KB',
  modified: '2026-09-28'
}, {
  id: 5,
  name: 'Site walkthrough.mp4',
  type: 'Video',
  category: 'Projects',
  size: '310 MB',
  modified: '2026-10-10'
}, {
  id: 6,
  name: 'Invoice 2026-114.pdf',
  type: 'Document',
  category: 'Finance',
  size: '240 KB',
  modified: '2026-10-11'
}];
const COLUMNS = [{
  title: 'Name',
  field: 'name',
  kind: 'name'
}, {
  title: 'Type',
  field: 'type'
}, {
  title: 'Category',
  field: 'category'
}, {
  title: 'Size',
  field: 'size',
  kind: 'data'
}, {
  title: 'Modified',
  field: 'modified',
  kind: 'data'
}];
const TYPES = ['Image', 'Document', 'Video'];
const CATEGORIES = ['Projects', 'Brand', 'Finance'];
const match = (types, cats) => ASSETS.filter(a => (!types.length || types.includes(a.type)) && (!cats.length || cats.includes(a.category)));
const toggle = (list, v) => list.includes(v) ? list.filter(x => x !== v) : list.concat(v);
const noop = () => {};
// the compare page's part switch hides one of these (study.css): the action parts or the find-and-view parts
const PART_A = 'study-part--actions',
  PART_F = 'study-part--find';
function AssetTable({
  sel,
  setSel,
  data = ASSETS,
  columns = COLUMNS,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(DataTable, _extends({
    viewMenu: false,
    label: "Assets",
    data: data,
    columns: columns,
    selectable: true,
    selected: sel,
    onSelectionChange: setSel
  }, rest));
}

/* ───────────── shared parts ───────────── */

// one action drawn in a button style: icon + label (ghost), icon only (tooltip), text only, outlined, or mixed
function Act({
  s = 'icon-label',
  icon,
  label,
  danger,
  primary,
  disabled,
  onClick
}) {
  if (s === 'icon') {
    return /*#__PURE__*/React.createElement(Tooltip, {
      content: label
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: icon,
      iconOnly: true,
      label: label,
      disabled: disabled,
      onClick: onClick,
      className: danger ? 'study-danger' : undefined
    }));
  }
  if (s === 'outlined') return /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: danger ? 'danger-secondary' : 'secondary',
    icon: icon,
    disabled: disabled,
    onClick: onClick
  }, label);
  if (s === 'mixed' && primary) return /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: icon,
    disabled: disabled,
    onClick: onClick
  }, label);
  return /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: icon,
    disabled: disabled,
    onClick: onClick,
    className: danger ? 'study-danger' : undefined
  }, label);
}
const NEW_ITEMS = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuItem, {
  icon: "folder-add"
}, "Folder"), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "upload"
}, "Upload files"), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "import"
}, "Import from link"));

// the create action in the bar's button style: a filled split button (mixed, the default), or a menu button in the bar's look
function NewAction({
  s = 'icon-label'
}) {
  if (s === 'mixed') return /*#__PURE__*/React.createElement(SplitButton, {
    variant: "primary",
    size: "sm",
    icon: "plus",
    label: "New",
    onClick: noop,
    menuLabel: "More new options"
  }, NEW_ITEMS);
  const variant = s === 'outlined' ? 'secondary' : 'ghost';
  return /*#__PURE__*/React.createElement(Menu, {
    label: "New",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: variant,
      icon: "plus",
      caret: true
    }, "New")
  }, NEW_ITEMS);
}

// the action side with nothing selected
function Actions({
  narrow,
  s = 'icon-label'
}) {
  return /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, /*#__PURE__*/React.createElement(NewAction, {
    s: s
  }), narrow ? null : /*#__PURE__*/React.createElement(Act, {
    s: s === 'mixed' ? 'icon-label' : s,
    icon: "upload",
    label: "Upload"
  }));
}
const MORE_ITEMS = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuItem, {
  icon: "rename"
}, "Rename"), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "tags"
}, "Edit tags"), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "refresh"
}, "Regenerate thumbnail"));
const BULK = [{
  id: 'download',
  label: 'Download',
  icon: 'download-arrow',
  onSelect: noop
}, {
  id: 'move',
  label: 'Move',
  icon: 'move',
  onSelect: noop
}, {
  id: 'share',
  label: 'Share',
  icon: 'share',
  onSelect: noop
}, {
  id: 'delete',
  label: 'Delete',
  icon: 'trash',
  danger: true,
  onSelect: noop
}];
const AssetsHeader = ({
  actions
}) => /*#__PURE__*/React.createElement(RecordPage.Header, {
  title: "Assets",
  actions: actions,
  size: "lg",
  headingLevel: 2
});
const HeaderActions = () => /*#__PURE__*/React.createElement(Inline, {
  gap: "sm"
}, /*#__PURE__*/React.createElement(Button, {
  icon: "upload"
}, "Upload"), /*#__PURE__*/React.createElement(SplitButton, {
  variant: "primary",
  icon: "plus",
  label: "New",
  onClick: noop,
  menuLabel: "More new options"
}, /*#__PURE__*/React.createElement(MenuItem, {
  icon: "folder-add"
}, "Folder"), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "import"
}, "Import from link")));

/* ───────────── Kept variants: 1E and 5C ───────────── */
// E · the filters live in a side panel (the AppShell's inspector), opened and closed by a Filters button in the bar
function FiltersPanel({
  open,
  onOpenChange,
  types,
  setTypes,
  cats,
  setCats
}) {
  return /*#__PURE__*/React.createElement(SidePanel, {
    title: "Filters",
    icon: "filter",
    open: open,
    onOpenChange: onOpenChange,
    footer: /*#__PURE__*/React.createElement(Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setTypes([]);
        setCats([]);
      }
    }, "Reset"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onOpenChange(false)
    }, "Done"))
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "heading"
  }, "Type"), TYPES.map(t => /*#__PURE__*/React.createElement(Checkbox, {
    key: t,
    label: t,
    checked: types.includes(t),
    onChange: () => setTypes(toggle(types, t))
  }))), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "heading"
  }, "Category"), CATEGORIES.map(c => /*#__PURE__*/React.createElement(Checkbox, {
    key: c,
    label: c,
    checked: cats.includes(c),
    onChange: () => setCats(toggle(cats, c))
  }))), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "heading"
  }, "Tags"), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Approved"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Draft"
  }))));
}
function PanelFilters({
  panel,
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  const [q, setQ] = useState('');
  const n = panel.types.length + panel.cats.length;
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(AssetsHeader, null), /*#__PURE__*/React.createElement("div", {
    className: "study-bar"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Assets"
  }, /*#__PURE__*/React.createElement(Actions, null), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Search assets",
    className: "study-search-bar"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "filter",
    selected: panel.open,
    expanded: panel.open,
    onClick: () => panel.setOpen(!panel.open)
  }, "Filters", n ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: "info"
  }, n)) : null), /*#__PURE__*/React.createElement(ViewMenu, null)))), /*#__PURE__*/React.createElement(BulkActions, {
    count: sel.length,
    total: 326,
    noun: "asset",
    onSelectAll: noop,
    onClear: () => setSel([]),
    actions: BULK,
    className: PART_A
  }), /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel,
    data: match(panel.types, panel.cats)
  }));
}

/* ───────────── For the Explorer reference ───────────── */
// Explorer's Sort and View: labeled menu buttons with icons
function ExplorerSortView({
  iconOnly
}) {
  const [sort, setSort] = useState('modified');
  const [layout, setLayout] = useState('details');
  const trig = (icon, label) => /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: icon,
    caret: true,
    iconOnly: iconOnly,
    label: label
  }, label);
  const wrap = (label, el) => iconOnly ? /*#__PURE__*/React.createElement(Tooltip, {
    content: label
  }, el) : el;
  return /*#__PURE__*/React.createElement(React.Fragment, null, wrap('Sort', /*#__PURE__*/React.createElement(Menu, {
    label: "Sort",
    trigger: trig('sort', 'Sort')
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "Sort by",
    value: sort,
    onChange: setSort
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "name"
  }, "Name"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "modified"
  }, "Date modified"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "type"
  }, "Type"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "size"
  }, "Size")), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuItem, {
    checked: false
  }, "Descending"))), wrap('View', /*#__PURE__*/React.createElement(Menu, {
    label: "View",
    trigger: trig('view-table', 'View')
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "Layout",
    value: layout,
    onChange: setLayout
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "large",
    icon: "cards-large"
  }, "Large icons"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "medium",
    icon: "cards-medium"
  }, "Medium icons"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "small",
    icon: "cards-small"
  }, "Small icons"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "list",
    icon: "list-lines"
  }, "List"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "details",
    icon: "view-table"
  }, "Details")), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuItem, {
    checked: false
  }, "Compact view"))));
}

/* ───────────── 8 · Enterprise systems ───────────── */
// Each screen follows one enterprise design system's table or list toolbar, from its public documentation as remembered
// (not copied); the option's note says what is approximated. `initial` preselects rows (the compare view's selected state).

const N = v => /*#__PURE__*/React.createElement(Text, {
  variant: "data"
}, v);
const tip = (label, el) => /*#__PURE__*/React.createElement(Tooltip, {
  content: label
}, el);
const iconBtn = (icon, label, extra) => tip(label, /*#__PURE__*/React.createElement(Button, _extends({
  size: "sm",
  variant: "ghost",
  icon: icon,
  iconOnly: true,
  label: label
}, extra)));
// a find-and-view control in the references: ghost, as decided for Plenix bars (owner, 2026-10-14)
const fvBtn = (icon, label, extra) => tip(label, /*#__PURE__*/React.createElement(Button, _extends({
  size: "sm",
  variant: "ghost",
  icon: icon,
  iconOnly: true,
  label: label
}, extra)));
const ROW_HEIGHT = /*#__PURE__*/React.createElement(MenuRadioGroup, {
  label: "Row height",
  value: "compact",
  onChange: noop
}, /*#__PURE__*/React.createElement(MenuItem, {
  value: "compact"
}, "Compact"), /*#__PURE__*/React.createElement(MenuItem, {
  value: "standard"
}, "Standard"), /*#__PURE__*/React.createElement(MenuItem, {
  value: "comfortable"
}, "Comfortable"));
const COLUMN_ITEMS = ['Type', 'Category', 'Size', 'Modified'].map(f => /*#__PURE__*/React.createElement(MenuItem, {
  key: f,
  checked: true,
  keepOpen: true
}, f));
const opts = list => [{
  value: '',
  label: 'All'
}].concat(list.map(v => ({
  value: v,
  label: v
})));

// 8F · SAP Fiori list report: variant management as the page title, the filter bar with Go, then the table toolbar with the
// title and item count on the left and the actions and settings on the right. Go applies the filters to the table.
function EntSap({
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  const [draft, setDraft] = useState({
    type: '',
    category: ''
  });
  const [applied, setApplied] = useState({
    type: '',
    category: ''
  });
  const [q, setQ] = useState('');
  const data = match(applied.type ? [applied.type] : [], applied.category ? [applied.category] : []);
  const set = k => e => setDraft(Object.assign({}, draft, {
    [k]: e.target.value
  }));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-panel study-part--find"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-head"
  }, /*#__PURE__*/React.createElement(Menu, {
    label: "Views",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "ghost",
      caret: true
    }, "Standard")
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "My views",
    value: "standard",
    onChange: noop
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "standard"
  }, "Standard"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "images"
  }, "Images in projects")), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "save"
  }, "Save as"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "gear"
  }, "Manage views")), iconBtn('share', 'Share')), /*#__PURE__*/React.createElement("div", {
    className: "study-form"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Search"
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Search",
    className: "study-search-bar"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Type"
  }, /*#__PURE__*/React.createElement(Select, {
    value: draft.type,
    onChange: set('type'),
    options: opts(TYPES)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Category"
  }, /*#__PURE__*/React.createElement(Select, {
    value: draft.category,
    onChange: set('category'),
    options: opts(CATEGORIES)
  })), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setApplied(draft)
  }, "Go"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Adapt filters")))), /*#__PURE__*/React.createElement("div", {
    className: "study-bar study-bar--flat-ruled"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Assets table"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, null, /*#__PURE__*/React.createElement(Text, {
    variant: "heading",
    as: "h2"
  }, "Assets ", /*#__PURE__*/React.createElement(Text, {
    variant: "data",
    className: "study-muted"
  }, "(", data.length, ")"))), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Create"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    disabled: !sel.length
  }, "Delete")), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, fvBtn('sort', 'Sort'), fvBtn('group-by', 'Group'), tip('View settings', /*#__PURE__*/React.createElement(Menu, {
    label: "View settings",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "gear",
      iconOnly: true,
      label: "View settings"
    })
  }, /*#__PURE__*/React.createElement(MenuGroup, {
    label: "Columns"
  }, COLUMN_ITEMS)))), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, /*#__PURE__*/React.createElement(SplitButton, {
    size: "sm",
    icon: "export",
    label: "Export",
    onClick: noop,
    menuLabel: "Export options"
  }, /*#__PURE__*/React.createElement(MenuItem, null, "Export as"))))), /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel,
    data: data
  }));
}

// 8I · Ant Design Pro ProTable: the query form above (Query applies it), then the toolbar (title left; New and the reload,
// density and column settings icons right); a selection adds an alert above the table with its count, Clear and batch actions
function EntAnt({
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  const [draft, setDraft] = useState({
    name: '',
    type: '',
    category: ''
  });
  const [applied, setApplied] = useState(draft);
  const set = k => e => setDraft(Object.assign({}, draft, {
    [k]: e.target.value
  }));
  const data = match(applied.type ? [applied.type] : [], applied.category ? [applied.category] : []).filter(a => a.name.toLowerCase().includes(applied.name.toLowerCase()));
  const reset = () => {
    const empty = {
      name: '',
      type: '',
      category: ''
    };
    setDraft(empty);
    setApplied(empty);
  };
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-panel study-panel--framed study-part--find"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-form"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(Input, {
    value: draft.name,
    onChange: set('name'),
    placeholder: "Enter a name"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Type"
  }, /*#__PURE__*/React.createElement(Select, {
    value: draft.type,
    onChange: set('type'),
    options: opts(TYPES)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Category"
  }, /*#__PURE__*/React.createElement(Select, {
    value: draft.category,
    onChange: set('category'),
    options: opts(CATEGORIES)
  })), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: reset
  }, "Reset"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setApplied(draft)
  }, "Query"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconEnd: "chevron-down"
  }, "Expand")))), /*#__PURE__*/React.createElement("div", {
    className: "study-bar study-bar--flat"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Assets table"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, null, /*#__PURE__*/React.createElement(Text, {
    variant: "heading",
    as: "h2"
  }, "Assets")), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: "plus"
  }, "New")), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, iconBtn('refresh', 'Reload'), tip('Density', /*#__PURE__*/React.createElement(Menu, {
    label: "Density",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "density-standard",
      iconOnly: true,
      label: "Density"
    })
  }, ROW_HEIGHT)), tip('Column settings', /*#__PURE__*/React.createElement(Menu, {
    label: "Column settings",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "settings-customize",
      iconOnly: true,
      label: "Column settings"
    })
  }, /*#__PURE__*/React.createElement(MenuItem, {
    checked: true,
    keepOpen: true
  }, "Name"), COLUMN_ITEMS, /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuItem, null, "Reset")))))), sel.length ? /*#__PURE__*/React.createElement("div", {
    className: "study-bar study-bar--selection study-part--actions"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Selection"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, null, /*#__PURE__*/React.createElement(Text, {
    variant: "body",
    className: "study-count"
  }, "Selected ", N(sel.length), " items"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    onClick: () => setSel([])
  }, "Clear")), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, null, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Batch delete"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Export")))) : null, /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel,
    data: data
  }));
}

// 8J · Atlassian (Jira's issue navigator): search and basic filter buttons, or the query language; the view switcher, Share,
// Export and more on the right
function EntAtlassian({
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  const [mode, setMode] = useState('basic');
  const [q, setQ] = useState('');
  const [jql, setJql] = useState('category = Projects AND type = Image ORDER BY modified DESC');
  const [view, setView] = useState('list');
  const [cats, setCats] = useState([]);
  const [types, setTypes] = useState([]);
  const fb = (label, list, values, setter) => /*#__PURE__*/React.createElement(Menu, {
    label: label,
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      caret: true,
      selected: list.length > 0
    }, label, list.length ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement(Badge, {
      size: "sm",
      tone: "info"
    }, list.length)) : null)
  }, values.map(v => /*#__PURE__*/React.createElement(MenuItem, {
    key: v,
    checked: list.includes(v),
    keepOpen: true,
    onSelect: () => setter(toggle(list, v))
  }, v)));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: [{
      label: 'Spaces',
      href: '#'
    }, {
      label: 'Plenix',
      href: '#'
    }, {
      label: 'Assets'
    }]
  }), /*#__PURE__*/React.createElement(RecordPage.Header, {
    size: "md",
    headingLevel: 2,
    title: "Assets"
  })), /*#__PURE__*/React.createElement("div", {
    className: "study-bar study-bar--flat"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Search and filters"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, mode === 'basic' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Search assets",
    className: "study-search-bar"
  }), fb('Category', cats, CATEGORIES, setCats), fb('Type', types, TYPES, setTypes), /*#__PURE__*/React.createElement(Menu, {
    label: "Owner",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      caret: true
    }, "Owner")
  }, /*#__PURE__*/React.createElement(MenuItem, {
    checked: false,
    keepOpen: true
  }, "Me"), /*#__PURE__*/React.createElement(MenuItem, {
    checked: false,
    keepOpen: true
  }, "Unassigned")), /*#__PURE__*/React.createElement(Menu, {
    label: "More filters",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      iconEnd: "plus"
    }, "More")
  }, /*#__PURE__*/React.createElement(MenuItem, null, "Size"), /*#__PURE__*/React.createElement(MenuItem, null, "Modified"), /*#__PURE__*/React.createElement(MenuItem, null, "Tags"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
    data: true,
    value: jql,
    onChange: e => setJql(e.target.value),
    "aria-label": "Query",
    className: "study-query"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: "search"
  }, "Search")), /*#__PURE__*/React.createElement(Seg, {
    size: "sm",
    label: "Search mode",
    value: mode,
    onChange: setMode,
    options: [{
      value: 'basic',
      label: 'Basic'
    }, {
      value: 'jql',
      label: 'JQL'
    }]
  })), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, /*#__PURE__*/React.createElement(Seg, {
    size: "sm",
    label: "View",
    value: view,
    onChange: setView,
    options: [{
      value: 'list',
      icon: 'list-lines',
      ariaLabel: 'List view'
    }, {
      value: 'detail',
      icon: 'panel-right-open',
      ariaLabel: 'Detail view'
    }]
  })), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "share"
  }, "Share"), /*#__PURE__*/React.createElement(Menu, {
    label: "Export",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "export",
      caret: true
    }, "Export")
  }, /*#__PURE__*/React.createElement(MenuItem, null, "Print list"), /*#__PURE__*/React.createElement(MenuItem, null, "CSV (all fields)"), /*#__PURE__*/React.createElement(MenuItem, null, "CSV (current fields)")), tip('More', /*#__PURE__*/React.createElement(Menu, {
    label: "More",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "more",
      iconOnly: true,
      label: "More"
    })
  }, /*#__PURE__*/React.createElement(MenuItem, {
    disabled: !sel.length
  }, sel.length ? 'Bulk change ' + sel.length + ' assets' : 'Bulk change'), /*#__PURE__*/React.createElement(MenuItem, null, "Save filter")))))), /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel,
    data: mode === 'basic' ? match(types, cats) : ASSETS
  }));
}

// 8L · Oracle Redwood, on one line (owner, 2026-10-14): one framed bar with the search (fixed width), the filter menu
// buttons that show their value, All filters, then the result count, sort and the view icons. Create stays in the header.
function EntRedwood({
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  const [q, setQ] = useState('');
  const [types, setTypes] = useState(['Image']);
  const [cats, setCats] = useState([]);
  const [recent, setRecent] = useState('any');
  const [sort, setSort] = useState('modified');
  const [view, setView] = useState('table');
  const text = q.trim().toLowerCase();
  const data = match(types, cats).filter(a => (!text || a.name.toLowerCase().includes(text)) && (recent === 'any' || a.modified >= '2026-10-08')).slice().sort(SORTS[sort]);
  const chip = (label, list, values, setter) => /*#__PURE__*/React.createElement(Menu, {
    label: label,
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      caret: true,
      selected: list.length > 0
    }, list.length ? label + ': ' + list.join(', ') : label)
  }, values.map(v => /*#__PURE__*/React.createElement(MenuItem, {
    key: v,
    checked: list.includes(v),
    keepOpen: true,
    onSelect: () => setter(toggle(list, v))
  }, v)));
  const SORT_WORDS = {
    modified: 'Modified',
    name: 'Name',
    size: 'Size'
  };
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(RecordPage.Header, {
    size: "lg",
    headingLevel: 2,
    title: "Assets",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "plus",
      className: PART_A
    }, "Create")
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-bar"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Search and collection"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Search assets",
    className: "study-search-bar"
  }), chip('Type', types, TYPES, setTypes), chip('Category', cats, CATEGORIES, setCats), /*#__PURE__*/React.createElement(Menu, {
    label: "Modified",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      caret: true,
      selected: recent !== 'any'
    }, recent === 'any' ? 'Modified' : 'Modified: last 7 days')
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "Modified",
    value: recent,
    onChange: setRecent
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "any"
  }, "Any time"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "week"
  }, "Last 7 days"))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "filter"
  }, "All filters")), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, sel.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    variant: "label",
    className: "study-count"
  }, N(sel.length), " selected"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "download-arrow"
  }, "Download"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "trash"
  }, "Delete")) : null), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "data",
    className: "study-count"
  }, data.length + (data.length === 1 ? ' result' : ' results')), /*#__PURE__*/React.createElement(Menu, {
    label: "Sort",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "sort",
      caret: true
    }, 'Sort by: ' + SORT_WORDS[sort])
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "Sort by",
    value: sort,
    onChange: setSort
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "name"
  }, "Name"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "modified"
  }, "Modified"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "size"
  }, "Size"))), /*#__PURE__*/React.createElement(Seg, {
    size: "sm",
    label: "View",
    value: view,
    onChange: setView,
    options: [{
      value: 'table',
      icon: 'view-table',
      ariaLabel: 'Table'
    }, {
      value: 'list',
      icon: 'list-lines',
      ariaLabel: 'List'
    }, {
      value: 'cards',
      icon: 'grid-2x2',
      ariaLabel: 'Cards'
    }]
  })))), /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel,
    data: data
  }));
}

// 8M · Workday Canvas: the table header with the count on the left and the toolbar icons on the right
function EntWorkday({
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(RecordPage.Header, {
    size: "md",
    headingLevel: 2,
    title: "Assets"
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-bar study-bar--flat-ruled"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Table"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "secondary",
    className: "study-count"
  }, N(326), " items", sel.length ? /*#__PURE__*/React.createElement(React.Fragment, null, ", ", N(sel.length), " selected") : null)), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, fvBtn('filter', 'Filter'), fvBtn('sort', 'Sort'), tip('View settings', /*#__PURE__*/React.createElement(Menu, {
    label: "View settings",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "view-table",
      iconOnly: true,
      label: "View settings"
    })
  }, /*#__PURE__*/React.createElement(MenuGroup, {
    label: "Columns"
  }, COLUMN_ITEMS))), iconBtn('expand', 'Full screen')), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, iconBtn('export', 'Export to Excel'), tip('Related actions', /*#__PURE__*/React.createElement(Menu, {
    label: "Related actions",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "more",
      iconOnly: true,
      label: "Related actions"
    })
  }, MORE_ITEMS))))), /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel
  }));
}

// 8C · Microsoft Azure portal resource list: a command bar of icon and label buttons, then the search with filter pills and, on the right,
// the record count, grouping and the list view. The Type pill filters the table.
function EntAzure({
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const data = type === 'all' ? ASSETS : match([type], []);
  const c = (icon, label, extra) => /*#__PURE__*/React.createElement(Button, _extends({
    size: "sm",
    variant: "ghost",
    icon: icon
  }, extra), label);
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(RecordPage.Header, {
    size: "lg",
    headingLevel: 2,
    title: "Assets"
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-bar study-bar--flat-ruled"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Commands"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, c('plus', 'Create'), /*#__PURE__*/React.createElement(Menu, {
    label: "Manage view",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "view-table",
      caret: true
    }, "Manage view")
  }, /*#__PURE__*/React.createElement(MenuItem, {
    icon: "fields"
  }, "Edit columns"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "save"
  }, "Save view"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "refresh"
  }, "Reset to default view")), c('refresh', 'Refresh'), c('export', 'Export to CSV'), c('code', 'Open query'), /*#__PURE__*/React.createElement(Divider, {
    orientation: "vertical"
  }), c('tags', 'Assign tags', {
    disabled: !sel.length
  }), c('trash', 'Delete', {
    disabled: !sel.length
  })))), /*#__PURE__*/React.createElement("div", {
    className: "study-head study-part--find"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-tokens"
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Filter for any field",
    className: "study-search-bar"
  }), /*#__PURE__*/React.createElement(Menu, {
    label: "Category filter",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Category equals ", /*#__PURE__*/React.createElement(Text, {
      variant: "strong"
    }, "all"))
  }, CATEGORIES.map(v => /*#__PURE__*/React.createElement(MenuItem, {
    key: v,
    checked: true,
    keepOpen: true
  }, v))), /*#__PURE__*/React.createElement(Menu, {
    label: "Type filter",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      selected: type !== 'all'
    }, "Type equals ", /*#__PURE__*/React.createElement(Text, {
      variant: "strong"
    }, type === 'all' ? 'all' : type))
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "Type",
    value: type,
    onChange: setType
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "all"
  }, "All"), TYPES.map(v => /*#__PURE__*/React.createElement(MenuItem, {
    key: v,
    value: v
  }, v)))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "plus"
  }, "Add filter")), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "secondary",
    className: "study-count"
  }, "Showing ", N(1), " to ", N(data.length), " of ", N(data.length), " records", sel.length ? /*#__PURE__*/React.createElement(React.Fragment, null, ", ", N(sel.length), " selected") : null), /*#__PURE__*/React.createElement(Menu, {
    label: "Grouping",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      caret: true
    }, "No grouping")
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "Group by",
    value: "none",
    onChange: noop
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "none"
  }, "No grouping"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "type"
  }, "Group by type"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "category"
  }, "Group by category"))), /*#__PURE__*/React.createElement(Menu, {
    label: "View",
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "list-lines",
      caret: true
    }, "List view")
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "View",
    value: "list",
    onChange: noop
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "list"
  }, "List view"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "summary"
  }, "Summary view"))))), /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel,
    data: data
  }));
}

// 8E · Microsoft Windows 11 File Explorer: New, the icon-only clipboard and file verbs (enabled by a selection), Sort, View, Filter, …; the
// details pane toggle at the far end
function EntExplorer({
  initial
}) {
  const [sel, setSel] = useState(initial || []);
  const [pane, setPane] = useState(false);
  const none = sel.length === 0;
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-bar study-bar--flat-ruled"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Commands"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, /*#__PURE__*/React.createElement(Menu, {
    label: "New",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "plus",
      caret: true
    }, "New")
  }, NEW_ITEMS), /*#__PURE__*/React.createElement(Divider, {
    orientation: "vertical"
  }), iconBtn('move', 'Cut', {
    disabled: none
  }), iconBtn('ed-copy', 'Copy', {
    disabled: none
  }), iconBtn('import', 'Paste'), iconBtn('rename', 'Rename', {
    disabled: sel.length !== 1
  }), iconBtn('share', 'Share', {
    disabled: none
  }), iconBtn('trash', 'Delete', {
    disabled: none
  })), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, /*#__PURE__*/React.createElement(ExplorerSortView, null), /*#__PURE__*/React.createElement(Menu, {
    label: "Filter",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "filter",
      caret: true
    }, "Filter")
  }, TYPES.map(t => /*#__PURE__*/React.createElement(MenuItem, {
    key: t,
    checked: false,
    keepOpen: true
  }, t)))), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_A
  }, tip('See more', /*#__PURE__*/React.createElement(Menu, {
    label: "See more",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "more",
      iconOnly: true,
      label: "See more"
    })
  }, /*#__PURE__*/React.createElement(MenuItem, {
    icon: "pin"
  }, "Pin to Quick access"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "select"
  }, "Select all"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "square-minus"
  }, "Select none"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "gear"
  }, "Options")))), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, {
    className: PART_F
  }, iconBtn(pane ? 'panel-right-close' : 'panel-right-open', 'Details', {
    pressed: pane,
    onClick: () => setPane(!pane)
  })))), /*#__PURE__*/React.createElement(AssetTable, {
    sel: sel,
    setSel: setSel
  }));
}

/* ───────────── The four situations' data ───────────── */
// Filters only: the activity log; menu only: team members; both: the asset library; neither: storage by file type.

const TODAY = '2026-10-14';
const ACTIVITY = [{
  id: 1,
  time: '2026-10-14 09:42',
  person: 'Maya Chen',
  action: 'Uploaded',
  item: '/Projects/Kitchen render.png',
  app: 'DAM'
}, {
  id: 2,
  time: '2026-10-14 08:15',
  person: 'Alex Kim',
  action: 'Edited',
  item: '/Notes/Site visit notes.md',
  app: 'Notes'
}, {
  id: 3,
  time: '2026-10-13 17:03',
  person: 'Raphael Maher',
  action: 'Shared',
  item: '/Brand/Brand logo.svg',
  app: 'DAM'
}, {
  id: 4,
  time: '2026-10-13 14:20',
  person: 'Sam Patel',
  action: 'Edited',
  item: '/Tasks/Order kitchen tiles',
  app: 'Tasks'
}, {
  id: 5,
  time: '2026-10-12 11:48',
  person: 'Maya Chen',
  action: 'Moved',
  item: '/Projects/Floor plan.pdf',
  app: 'DAM'
}, {
  id: 6,
  time: '2026-10-12 10:05',
  person: 'Jordan Lee',
  action: 'Deleted',
  item: '/Finance/Old quote.pdf',
  app: 'DAM'
}, {
  id: 7,
  time: '2026-10-11 16:30',
  person: 'Alex Kim',
  action: 'Commented',
  item: '/Tasks/Review hero banner',
  app: 'Tasks'
}, {
  id: 8,
  time: '2026-10-11 09:12',
  person: 'Sam Patel',
  action: 'Edited',
  item: '/Contacts/Northwind Builders',
  app: 'Contacts'
}, {
  id: 9,
  time: '2026-10-10 15:55',
  person: 'Raphael Maher',
  action: 'Uploaded',
  item: '/Projects/Site walkthrough.mp4',
  app: 'DAM'
}, {
  id: 10,
  time: '2026-10-09 13:27',
  person: 'Jordan Lee',
  action: 'Shared',
  item: '/Notes/Client brief.md',
  app: 'Notes'
}, {
  id: 11,
  time: '2026-10-08 10:40',
  person: 'Maya Chen',
  action: 'Edited',
  item: '/Brand/Hero banner.jpg',
  app: 'DAM'
}, {
  id: 12,
  time: '2026-10-06 17:18',
  person: 'Alex Kim',
  action: 'Deleted',
  item: '/Tasks/Draft schedule',
  app: 'Tasks'
}, {
  id: 13,
  time: '2026-10-03 08:55',
  person: 'Sam Patel',
  action: 'Uploaded',
  item: '/Finance/Invoice 2026-114.pdf',
  app: 'DAM'
}, {
  id: 14,
  time: '2026-09-29 12:10',
  person: 'Raphael Maher',
  action: 'Moved',
  item: '/Contacts/Lakeside Interiors',
  app: 'Contacts'
}, {
  id: 15,
  time: '2026-09-02 09:30',
  person: 'Jordan Lee',
  action: 'Commented',
  item: '/Notes/Budget review.md',
  app: 'Notes'
}];
const PEOPLE = ['Raphael Maher', 'Maya Chen', 'Alex Kim', 'Sam Patel', 'Jordan Lee'];
const ACTIONS = ['Uploaded', 'Edited', 'Shared', 'Moved', 'Commented', 'Deleted'];
const APPS = ['DAM', 'Notes', 'Tasks', 'Contacts'];
const ACTION_TONE = {
  Uploaded: 'success',
  Edited: 'info',
  Deleted: 'danger'
};
const ACTIVITY_COLUMNS = [{
  title: 'Time',
  field: 'time',
  kind: 'data',
  type: 'date'
}, {
  title: 'Person',
  field: 'person',
  type: 'person',
  render: r => /*#__PURE__*/React.createElement(Persona, {
    name: r.person,
    size: "xs"
  })
}, {
  title: 'Action',
  field: 'action',
  kind: 'center',
  type: 'select',
  render: r => /*#__PURE__*/React.createElement(Badge, {
    tone: ACTION_TONE[r.action] || 'neutral',
    variant: "soft"
  }, r.action)
}, {
  title: 'Item',
  field: 'item',
  kind: 'data'
}, {
  title: 'App',
  field: 'app',
  type: 'select'
}];
const pageHeader = (title, description) => /*#__PURE__*/React.createElement(RecordPage.Header, {
  title: title,
  description: description,
  size: "lg",
  headingLevel: 2
});

// S2 · menu only: a short list the person manages
const ROLES = ['Admin', 'Editor', 'Viewer'];
const ROLE_TONE = {
  Owner: 'info',
  Admin: 'info'
};
const MEMBERS = [{
  id: 1,
  name: 'Raphael Maher',
  email: 'raphael.maher@plenix.example',
  role: 'Owner',
  active: '2026-10-14'
}, {
  id: 2,
  name: 'Maya Chen',
  email: 'maya.chen@plenix.example',
  role: 'Admin',
  active: '2026-10-14'
}, {
  id: 3,
  name: 'Alex Kim',
  email: 'alex.kim@plenix.example',
  role: 'Editor',
  active: '2026-10-13'
}, {
  id: 4,
  name: 'Sam Patel',
  email: 'sam.patel@plenix.example',
  role: 'Editor',
  active: '2026-10-10'
}, {
  id: 5,
  name: 'Jordan Lee',
  email: 'jordan.lee@plenix.example',
  role: 'Viewer',
  active: '2026-10-02'
}, {
  id: 6,
  name: 'Priya Nair',
  email: 'priya.nair@plenix.example',
  role: 'Viewer',
  active: '2026-09-18'
}];

// S3 · both: the asset library, in layout 1A's merged bar, with filters that filter
const LIBRARY = ASSETS.concat([{
  id: 7,
  name: 'Bathroom render.png',
  type: 'Image',
  category: 'Projects',
  size: '3.8 MB',
  modified: '2026-10-08'
}, {
  id: 8,
  name: 'Material board.pdf',
  type: 'Document',
  category: 'Projects',
  size: '6.4 MB',
  modified: '2026-10-07'
}, {
  id: 9,
  name: 'Color palette.pdf',
  type: 'Document',
  category: 'Brand',
  size: '420 KB',
  modified: '2026-09-30'
}, {
  id: 10,
  name: 'Logo animation.mp4',
  type: 'Video',
  category: 'Brand',
  size: '48 MB',
  modified: '2026-09-26'
}, {
  id: 11,
  name: 'Spring campaign.jpg',
  type: 'Image',
  category: 'Marketing',
  size: '2.6 MB',
  modified: '2026-10-05'
}, {
  id: 12,
  name: 'Product teaser.mp4',
  type: 'Video',
  category: 'Marketing',
  size: '126 MB',
  modified: '2026-10-04'
}, {
  id: 13,
  name: 'Newsletter header.png',
  type: 'Image',
  category: 'Marketing',
  size: '780 KB',
  modified: '2026-10-02'
}, {
  id: 14,
  name: 'Budget 2026.pdf',
  type: 'Document',
  category: 'Finance',
  size: '310 KB',
  modified: '2026-09-22'
}, {
  id: 15,
  name: 'Invoice 2026-109.pdf',
  type: 'Document',
  category: 'Finance',
  size: '236 KB',
  modified: '2026-09-19'
}, {
  id: 16,
  name: 'Living room render.png',
  type: 'Image',
  category: 'Projects',
  size: '4.6 MB',
  modified: '2026-10-13'
}, {
  id: 17,
  name: 'Elevation drawings.pdf',
  type: 'Document',
  category: 'Projects',
  size: '2.2 MB',
  modified: '2026-10-06'
}, {
  id: 18,
  name: 'Drone survey.mp4',
  type: 'Video',
  category: 'Projects',
  size: '540 MB',
  modified: '2026-09-24'
}, {
  id: 19,
  name: 'Brand guidelines.pdf',
  type: 'Document',
  category: 'Brand',
  size: '8.9 MB',
  modified: '2026-09-15'
}, {
  id: 20,
  name: 'Social banner.png',
  type: 'Image',
  category: 'Marketing',
  size: '640 KB',
  modified: '2026-09-29'
}, {
  id: 21,
  name: 'Team photo.jpg',
  type: 'Image',
  category: 'Brand',
  size: '5.1 MB',
  modified: '2026-09-12'
}, {
  id: 22,
  name: 'Expense report Q3.pdf',
  type: 'Document',
  category: 'Finance',
  size: '190 KB',
  modified: '2026-10-01'
}, {
  id: 23,
  name: 'Client interview.mp4',
  type: 'Video',
  category: 'Marketing',
  size: '212 MB',
  modified: '2026-09-17'
}, {
  id: 24,
  name: 'Site photos 01.jpg',
  type: 'Image',
  category: 'Projects',
  size: '3.3 MB',
  modified: '2026-10-11'
}]);
const LIBRARY_CATEGORIES = ['Projects', 'Brand', 'Marketing', 'Finance'];
const UNIT = {
  KB: 1e3,
  MB: 1e6,
  GB: 1e9
};
const bytes = s => {
  const [n, u] = s.split(' ');
  return parseFloat(n) * (UNIT[u] || 1);
};
const SORTS = {
  name: (a, b) => a.name.localeCompare(b.name),
  modified: (a, b) => b.modified.localeCompare(a.modified),
  size: (a, b) => bytes(b.size) - bytes(a.size)
};

// S4 · neither: a small fixed table that is only read
const STORAGE = [{
  id: 1,
  type: 'Images',
  files: '1,284',
  size: '18.4 GB',
  share: '46%'
}, {
  id: 2,
  type: 'Videos',
  files: '96',
  size: '14.2 GB',
  share: '36%'
}, {
  id: 3,
  type: 'Documents',
  files: '2,310',
  size: '4.1 GB',
  share: '10%'
}, {
  id: 4,
  type: 'Audio',
  files: '142',
  size: '2.0 GB',
  share: '5%'
}, {
  id: 5,
  type: 'Other',
  files: '388',
  size: '1.3 GB',
  share: '3%'
}];
const STORAGE_COLUMNS = [{
  title: 'File type',
  field: 'type',
  kind: 'name',
  rowLabel: true
}, {
  title: 'Files',
  field: 'files',
  kind: 'data',
  hozAlign: 'right',
  headerHozAlign: 'right'
}, {
  title: 'Size',
  field: 'size',
  kind: 'data',
  hozAlign: 'right',
  headerHozAlign: 'right'
}, {
  title: 'Share of storage',
  field: 'share',
  kind: 'data',
  hozAlign: 'right',
  headerHozAlign: 'right'
}];
function StorageByType() {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, pageHeader('Storage by file type', 'How the library\'s storage is used, by the kind of file.'), /*#__PURE__*/React.createElement(Table, {
    label: "Storage by file type",
    data: STORAGE,
    columns: STORAGE_COLUMNS
  }));
}

/* ───────────── the pages ───────────── */

const narrowCell = el => /*#__PURE__*/React.createElement(Columns, {
  count: 3
}, el, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null));
const optionLabel = o => o.id.toUpperCase() + ' · ' + o.name;

// the pages besides Decided so far and Controls, side by side: the kept variants (not the standard) and the enterprise
// references (their bars in their own looks: references, not candidates)
const GROUPS = [{
  heading: 'Kept variants',
  variants: true,
  options: [{
    id: '1e',
    name: 'Filters in a side panel',
    standard: 'Kept as a variant',
    when: 'Not the standard: a variant a page may use when filters need room.',
    note: 'The AppShell inspector (SidePanel) on the right is the panel; Carbon also places it on the left.',
    panel: true,
    View: p => /*#__PURE__*/React.createElement(PanelFilters, p)
  }, {
    id: '5c',
    name: 'One Filters button and a panel',
    standard: 'Kept as a variant',
    when: 'Not the standard: one Filters button with a count opens a panel.',
    note: 'The AppShell inspector (SidePanel) is the panel.',
    panel: true,
    View: p => /*#__PURE__*/React.createElement(PanelFilters, p)
  }]
}, {
  heading: 'Reference',
  reference: true,
  options: [{
    id: '8c',
    name: 'Azure portal',
    standard: 'Microsoft Azure portal',
    selects: true,
    when: 'A command bar of icon and label buttons, then a search with filter pills, the count, grouping and view.',
    note: 'Azure\'s filters (Subscription, Resource group, Type, Location) are mapped to Category and Type; its rounded pills are drawn as small menu buttons; Open query uses the code icon; Assign tags and Delete are enabled by a selection. Uses filter chips (eliminated by the owner).',
    View: p => /*#__PURE__*/React.createElement(EntAzure, p)
  }, {
    id: '8e',
    name: 'Windows 11 File Explorer',
    standard: 'Microsoft Windows 11',
    selects: true,
    when: 'New, icon-only file verbs enabled by a selection, Sort, View, Filter, and the details pane at the end.',
    note: 'The Plenix set has no cut or paste icons: Cut uses move, Paste uses import, Copy uses ed-copy. Explorer\'s Filter is in some Windows 11 builds only.',
    View: p => /*#__PURE__*/React.createElement(EntExplorer, p)
  }, {
    id: '8f',
    name: 'Fiori list report',
    standard: 'SAP Fiori',
    when: 'Filters set first and applied with Go, then the table toolbar with the title, count, actions and settings.',
    note: 'Fiori\'s view settings dialog is drawn as a gear menu plus sort and group icons; the filter fields are Plenix fields, not value-help inputs; Adapt filters does nothing here.',
    View: p => /*#__PURE__*/React.createElement(EntSap, p)
  }, {
    id: '8i',
    name: 'ProTable',
    standard: 'Ant Design Pro',
    selects: true,
    when: 'A query form above, a toolbar with the title, New and settings; a selection adds an alert with batch actions.',
    note: 'Plenix density names are used; column settings is a menu, not a popover with drag handles; Expand does nothing here. The selection alert uses the bulk bar\'s tint, standing in for Ant\'s info alert (Ant\'s own look; the Plenix bar never tints).',
    View: p => /*#__PURE__*/React.createElement(EntAnt, p)
  }, {
    id: '8j',
    name: 'Issue navigator',
    standard: 'Atlassian Jira',
    when: 'Search plus filter buttons or a JQL query; the view switch, Share and Export on the right.',
    note: 'Jira\'s Project, Type, Status and Assignee are mapped to this table\'s fields; the Basic/JQL switch is a segmented control (Jira uses a link); bulk change sits in the more menu.',
    View: p => /*#__PURE__*/React.createElement(EntAtlassian, p)
  }, {
    id: '8l',
    name: 'Smart search on one line',
    standard: 'Oracle Redwood',
    selects: true,
    when: 'One framed bar: search, filter menus and All filters, then the result count, sort and the view icons.',
    note: 'Drawn from a general memory of Redwood\'s smart search and collection pages, on one line at the owner\'s request (2026-10-14); Create stays in the page header. The filter buttons show their value, standing in for Redwood\'s filter chips (eliminated by the owner).',
    View: p => /*#__PURE__*/React.createElement(EntRedwood, p)
  }, {
    id: '8m',
    name: 'Table header toolbar',
    standard: 'Workday Canvas',
    when: 'The count on the left and a row of icon buttons on the right.',
    note: 'Workday\'s exact icons and order are not certain; the icons are Plenix stand-ins (export for Export to Excel, expand for full screen).',
    View: p => /*#__PURE__*/React.createElement(EntWorkday, p)
  }]
}];
const OPTIONS = GROUPS.flatMap(g => g.options.map(o => Object.assign({
  group: g.heading
}, o)));
function StudyNote({
  o
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "study-note"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "eyebrow"
  }, o.group), /*#__PURE__*/React.createElement(Badge, {
    tone: "info",
    variant: "soft"
  }, o.standard)), /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h1"
  }, o.id === 'br' || o.id === 'gr' || o.id === 'bs' ? o.name : optionLabel(o)), /*#__PURE__*/React.createElement(Text, {
    variant: "body"
  }, o.when), o.rule ? /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, 'Rule of thumb: ' + o.rule) : null, o.examples ? /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, 'Examples: ' + o.examples.join(' · ')) : null, o.note ? /*#__PURE__*/React.createElement(Details, {
    summary: "How this was drawn",
    variant: "inline"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, o.note)) : null));
}

/* ───────────── Kept in this browser ───────────── */
// Eliminations and notes are kept in this browser (localStorage, try/catch: the page works without it), as the guided
// chooser kept them; the chooser is gone (everything it asked is decided or on the controls page), its record is on
// Decided so far.

const EKEY = 'plenix-command-bar-study-eliminated',
  NKEY = 'plenix-command-bar-study-notes';
const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
const loadStored = (k, d, ok) => {
  try {
    const v = JSON.parse(window.localStorage.getItem(k));
    return v != null && ok(v) ? v : d;
  } catch (e) {
    return d;
  }
};
const saveStored = (k, v) => {
  try {
    window.localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {/* the page works without storage */}
};
function useStored(k, d, ok) {
  const [v, setV] = useState(() => loadStored(k, d, ok));
  const set = next => setV(old => {
    const x = typeof next === 'function' ? next(old) : next;
    saveStored(k, x);
    return x;
  });
  return [v, set];
}

// options eliminated earlier, kept on record
const EARLIER = [{
  id: '1c',
  name: 'Buttons above the bar',
  step: 'layout'
}, {
  id: '1d',
  name: 'Filter chips under the bar',
  step: 'layout'
}, {
  id: '1g',
  name: 'The bar stays; a floating bar for the selection',
  step: 'layout'
}, {
  id: '2a',
  name: 'The bar\'s buttons change when you select',
  step: 'selection'
}, {
  id: '2c',
  name: 'The whole bar turns blue when you select',
  step: 'selection'
}, {
  id: '2e',
  name: 'The count and select-all in the header',
  step: 'selection'
}, {
  id: '2d',
  name: 'A floating bar appears at the bottom',
  step: 'selection'
}, {
  id: '3b',
  name: 'Gray fill, no border',
  step: 'look'
}, {
  id: '3c',
  name: 'Borderless on the page',
  step: 'look'
}, {
  id: '3d',
  name: 'Tinted while selecting',
  step: 'look'
}, {
  id: '3e',
  name: 'Raised, menu shadow',
  step: 'look'
}, {
  id: '4c',
  name: 'Text only',
  step: 'buttons'
}, {
  id: '5b',
  name: 'Filter chips',
  step: 'filters'
}, {
  id: '7b',
  name: 'Three bars, narrow',
  step: 'narrow'
}, {
  id: '7c',
  name: 'Buttons above the bar, narrow',
  step: 'narrow'
}, {
  id: '7d',
  name: 'Filter chips, narrow',
  step: 'narrow'
}, {
  id: '8a',
  name: 'Carbon data table toolbar (IBM)',
  step: 'enterprise'
}, {
  id: '8b',
  name: 'OneDrive / SharePoint (Microsoft)',
  step: 'enterprise'
}, {
  id: '8d',
  name: 'Dynamics 365 (Microsoft)',
  step: 'enterprise'
}, {
  id: '8g',
  name: 'Lightning list view (Salesforce)',
  step: 'enterprise'
}, {
  id: '8h',
  name: 'Cloudscape table (AWS)',
  step: 'enterprise'
}, {
  id: '8k',
  name: 'List with filter breadcrumb (ServiceNow)',
  step: 'enterprise'
}, {
  id: '8n',
  name: 'Search bar and data grid toolbar (Elastic EUI)',
  step: 'enterprise'
}];
const optOf = id => OPTIONS.find(o => o.id === id);
const labelOf = id => {
  const o = optOf(id);
  if (o) return optionLabel(o);
  const e = EARLIER.find(x => x.id === id);
  return id.toUpperCase() + (e ? ' · ' + e.name : '');
};
function memberColumns(now) {
  return [{
    title: 'Name',
    field: 'name',
    kind: 'name',
    type: 'person',
    render: m => /*#__PURE__*/React.createElement(Persona, {
      name: m.name,
      size: "xs"
    })
  }, {
    title: 'Email',
    field: 'email',
    kind: 'data'
  }, {
    title: 'Role',
    field: 'role',
    kind: 'center',
    type: 'select',
    render: row => {
      const m = now(row);
      return /*#__PURE__*/React.createElement(Badge, {
        tone: ROLE_TONE[m.role] || 'neutral',
        variant: m.role === 'Owner' ? 'solid' : 'soft'
      }, m.role);
    }
  }, {
    title: 'Last active',
    field: 'active',
    kind: 'data',
    type: 'date'
  }];
}

// each situation's own screen: its table, its filters, its sorts and its actions
const SIT = {
  filters: {
    name: 'Filters only',
    ref: 's1',
    title: 'Activity log',
    noun: 'event',
    nouns: 'events',
    search: 'Search activity',
    data: ACTIVITY,
    selectable: false,
    text: r => r.person + ' ' + r.action + ' ' + r.item + ' ' + r.app,
    fieldsOf: () => ACTIVITY_FIELDS,
    dims: [{
      key: 'person',
      label: 'Person',
      icon: 'person',
      all: PEOPLE
    }, {
      key: 'action',
      label: 'Action',
      icon: 'filter',
      all: ACTIONS
    }, {
      key: 'app',
      label: 'App',
      icon: 'app-switcher',
      all: APPS
    }],
    sorts: [{
      value: 'new',
      label: 'Newest first',
      fn: (a, b) => b.time.localeCompare(a.time)
    }, {
      value: 'old',
      label: 'Oldest first',
      fn: (a, b) => a.time.localeCompare(b.time)
    }, {
      value: 'person',
      label: 'Person A → Z',
      fn: (a, b) => a.person.localeCompare(b.person)
    }],
    groups: [{
      value: 'action',
      label: 'Action'
    }, {
      value: 'app',
      label: 'App'
    }],
    hideable: ['Person', 'Action', 'Item', 'App']
  },
  menu: {
    name: 'Menu only',
    ref: 's2',
    title: 'Team members',
    noun: 'member',
    nouns: 'members',
    data: MEMBERS,
    selectable: true,
    initial: [3, 4],
    dims: [],
    sorts: [],
    groups: [],
    hideable: []
  },
  both: {
    name: 'Both',
    ref: 's3',
    title: 'Assets',
    noun: 'asset',
    nouns: 'assets',
    search: 'Search assets',
    data: LIBRARY,
    selectable: true,
    initial: [1, 3],
    text: r => r.name,
    fieldsOf: () => ASSET_FIELDS,
    quick: [{
      key: 'category',
      label: 'Category',
      icon: 'settings-categories',
      noun: 'category'
    }, {
      key: 'type',
      label: 'Type',
      icon: 'doc-search',
      noun: 'type'
    }],
    dims: [{
      key: 'category',
      label: 'Category',
      icon: 'settings-categories',
      all: LIBRARY_CATEGORIES
    }, {
      key: 'type',
      label: 'Type',
      icon: 'doc-search',
      all: TYPES
    }],
    sorts: [{
      value: 'modified',
      label: 'Newest first',
      fn: SORTS.modified
    }, {
      value: 'name',
      label: 'Name A → Z',
      fn: SORTS.name
    }, {
      value: 'size',
      label: 'Largest first',
      fn: SORTS.size
    }],
    groups: [{
      value: 'type',
      label: 'Type'
    }, {
      value: 'category',
      label: 'Category'
    }],
    hideable: ['Type', 'Category', 'Size', 'Modified']
  },
  neither: {
    name: 'Neither',
    ref: 's4',
    title: 'Storage by file type'
  }
};
// the selection is decided (2B): the bulk bar under the main bar; layout 1G keeps its floating bar as well
const modeOf = sit => SIT[sit].selectable ? 'bulk' : 'none';

// the button rule, measured: icon and label while every bar holds one row; icons only when not; then the actions fold into More,
// one per step from the end (max steps). Starts again from icon and label whenever the bar's width or its content changes.
function useFitStep(ref, key, max = 2) {
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(0);
  React.useLayoutEffect(() => {
    setStep(0);
  }, [width, key]);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || step >= max) return;
    const over = Array.prototype.some.call(el.querySelectorAll('.study-bar > .plx-toolbar'), tb => {
      const kids = Array.prototype.filter.call(tb.children, k => k.offsetParent !== null && k.offsetWidth > 0);
      if (!kids.length) return false;
      // one row holds every child: none starts below the tallest one (children are centered, so their tops differ)
      const top = Math.min.apply(null, kids.map(k => k.offsetTop));
      const tall = Math.max.apply(null, kids.map(k => k.offsetHeight));
      // overflow is measured on the children, not scrollWidth: a tooltip's hidden bubble at the end may reach past the edge
      const end = tb.getBoundingClientRect().right;
      return kids.some(k => k.getBoundingClientRect().right > end + 1 || k.offsetTop >= top + tall);
    });
    if (over) setStep(step + 1);
  });
  return step;
}

// one command in the rule's style: icon and label, or icon only with a tooltip; the page's primary command, if it marks one.
// Disabled (grayed) until it applies, never hidden, with a tooltip saying why (owner, 2026-10-14)
function Verb({
  v,
  s,
  primary,
  disabled,
  why
}) {
  const tip = (el, words) => /*#__PURE__*/React.createElement(Tooltip, {
    content: words
  }, el);
  const cls = v.danger ? 'study-danger' : undefined;
  const variant = primary && v.primary ? 'primary' : 'ghost';
  const only = s === 'icon' && variant !== 'primary';
  const button = /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: variant,
    icon: v.icon,
    iconOnly: only,
    label: v.label,
    caret: !!v.items,
    disabled: disabled,
    className: cls,
    onClick: v.items ? undefined : v.onClick
  }, v.label);
  const el = v.items ? /*#__PURE__*/React.createElement(Menu, {
    label: v.label,
    trigger: button
  }, v.items) : button;
  return disabled ? tip(el, why) : only ? tip(el, v.label) : el;
}

// the bar search (owner, 2026-10-14): first on the find side, one fixed width (240px); narrow: an icon that opens the field
// across the bar, focused; Escape, or leaving it empty, collapses it back to the icon. Never squeezed to an odd width
function BarSearch({
  value,
  onChange,
  onClear,
  placeholder,
  narrow
}) {
  const [open, setOpen] = useState(false);
  const field = React.useRef(null);
  const icon = React.useRef(null);
  React.useEffect(() => {
    if (open && field.current) field.current.focus();
  }, [open]);
  const close = refocus => {
    setOpen(false);
    if (refocus) setTimeout(() => {
      if (icon.current) icon.current.focus();
    }, 0);
  };
  if (!narrow) return /*#__PURE__*/React.createElement(SearchField, {
    value: value,
    onChange: onChange,
    onClear: onClear,
    placeholder: placeholder,
    className: "study-search-bar"
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tooltip, {
    content: "Search"
  }, /*#__PURE__*/React.createElement(Button, {
    ref: icon,
    size: "sm",
    variant: "ghost",
    icon: "search",
    iconOnly: true,
    label: "Search",
    selected: !!value,
    onClick: () => setOpen(true)
  })), open ? /*#__PURE__*/React.createElement("div", {
    className: "study-search-over"
  }, /*#__PURE__*/React.createElement(SearchField, {
    ref: field,
    value: value,
    onChange: onChange,
    onClear: onClear,
    placeholder: placeholder,
    className: "study-panel-search",
    onKeyDown: e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
      }
    },
    onBlur: e => {
      if (!e.currentTarget.value) close(false);
    }
  })) : null);
}

// the View menu (6B, decided): layout, the gallery's card size and the list's row height in one menu; the part that does
// not apply to the current layout is grayed, never hidden
function ViewMenu({
  value,
  onChange,
  iconOnly,
  variant = 'ghost',
  gallery = true
}) {
  const [own, setOwn] = useState({
    layout: 'list',
    size: 'm',
    height: 'short'
  });
  const v = value || own;
  const set = k => x => (onChange || setOwn)(Object.assign({}, v, {
    [k]: x
  }));
  const menu = /*#__PURE__*/React.createElement(Menu, {
    label: "View",
    placement: "bottom-end",
    trigger: iconOnly ? /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: variant,
      icon: "view-table",
      caret: true,
      label: "View"
    }) : /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: variant,
      icon: "view-table",
      caret: true
    }, "View")
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: "Layout",
    value: v.layout,
    onChange: set('layout'),
    keepOpen: true
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: "list",
    icon: "list-lines"
  }, "List"), /*#__PURE__*/React.createElement(MenuItem, {
    value: "gallery",
    icon: "grid-2x2",
    disabled: !gallery
  }, "Gallery")), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuGroup, {
    label: "Card size (gallery)"
  }, [['s', 'Small', 'cards-small'], ['m', 'Medium', 'cards-medium'], ['l', 'Large', 'cards-large']].map(([k, w, i]) => /*#__PURE__*/React.createElement(MenuItem, {
    key: k,
    type: "radio",
    checked: v.size === k,
    icon: i,
    disabled: v.layout !== 'gallery',
    keepOpen: true,
    onSelect: () => set('size')(k)
  }, w))), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuGroup, {
    label: "Row height (list)"
  }, HEIGHTS.map(h => /*#__PURE__*/React.createElement(MenuItem, {
    key: h.value,
    type: "radio",
    checked: v.height === h.value,
    disabled: v.layout !== 'list',
    keepOpen: true,
    onSelect: () => set('height')(h.value)
  }, h.label))));
  return iconOnly ? /*#__PURE__*/React.createElement(Tooltip, {
    content: "View"
  }, menu) : menu;
}
// Hide fields (1F's named button): a menu of the columns, checked while shown
function HideFieldsMenu({
  names,
  hidden,
  setHidden,
  iconOnly,
  variant = 'ghost'
}) {
  const n = hidden.length;
  const btn = /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: variant,
    icon: "visibility-off",
    selected: n > 0,
    iconOnly: iconOnly && !n,
    label: iconOnly ? 'Hide fields' + (n ? ', ' + n : '') : undefined
  }, iconOnly ? n ? /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: "info"
  }, n) : 'Hide fields' : /*#__PURE__*/React.createElement(React.Fragment, null, "Hide fields", n ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: "info"
  }, n)) : null));
  const menu = /*#__PURE__*/React.createElement(Menu, {
    label: "Hide fields",
    trigger: btn
  }, names.map(f => /*#__PURE__*/React.createElement(MenuItem, {
    key: f,
    checked: !hidden.includes(f),
    keepOpen: true,
    onSelect: () => setHidden(toggle(hidden, f))
  }, f)), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "visibility",
    disabled: !n,
    onSelect: () => setHidden([])
  }, "Show all"));
  return iconOnly ? /*#__PURE__*/React.createElement(Tooltip, {
    content: "Hide fields"
  }, menu) : menu;
}

// the decided bar over a situation's own table: the main bar (it never changes with a selection), the 2B bar under it
// (Plenix BulkActions). Find and view: Search, Filter, Sort, Group (1F: Hide fields), View, the count, each its own button
// (ghost, decided; never merged, also when narrow); every bar's buttons are ghost, the selection bar's too. narrow: a side
// panel's width
// the count (owner, 2026-10-15: "remove this from the menu bar"): never in a bar; above the table, or under the card in
// small type. CountAt says where; CountSlot is the screen's line under its card
const CountAt = React.createContext('below');
const CountSlot = React.createContext(null);
function Built({
  sit,
  narrow,
  initial,
  primary = false,
  fixed,
  many,
  bars = 'now',
  tidy = '',
  shape = 'ghost',
  height = '--plx-ref-size-240px'
}) {
  const c = SIT[sit];
  // bars (fewer-bars study, 2026-10-15): now = as decided; a = many actions fold into More in one bar, 2B stays; b = the selection
  // actions live in the main bar, grayed until a selection, no 2B; c = a and b: always one bar
  const layout = sit === 'filters' ? '1f' : sit === 'both' && many && (bars === 'now' || bars === 'b') ? '1b' : '1a';
  const selInMain = bars === 'b' || bars === 'c';
  // d (owner, 2026-10-15): one command bar; a selection adds a second row in the same frame, under a thin gray line;
  // e: the same second row, always there, grayed until a selection
  const rowsIn = bars === 'd' || bars === 'e';
  // tidy (owner, 2026-10-15: "messy and scattered"): a = zones (actions | search and filters … view), the search right after
  // the actions; b = search leads row 1, the actions start row 2; c = Category and Type only in the Filter panel; d = one
  // style per zone: the actions go to icons first, find and view keep their labels longest, carets only on menus
  const T = k => tidy.includes(k);
  const mode = modeOf(sit);
  const finds = sit !== 'menu';
  const [rows, setRows] = useState(c.data);
  const [sel, setSel] = useState(initial || []);
  const [q, setQ] = useState('');
  const [filt, setFilt] = useState({
    join: 'and',
    items: []
  });
  const [sortLv, setSortLv] = useState([]);
  const [groups, setGroups] = useState([]);
  const [view, setView] = useState({
    layout: 'list',
    size: 'm',
    height: 'short'
  });
  const [hidden, setHidden] = useState([]);
  const [quick, setQuick] = useState({});
  const table = React.useRef(null);
  const latest = React.useRef(rows);
  latest.current = rows;
  const columns = React.useMemo(() => sit === 'menu' ? memberColumns(m => latest.current.find(x => x.id === m.id) || m) : sit === 'filters' ? ACTIVITY_COLUMNS : COLUMNS, [sit]);
  const fields = c.fieldsOf ? c.fieldsOf() : [];
  const text = q.trim().toLowerCase();
  const data = finds ? rows.filter(r => (!text || c.text(r).toLowerCase().includes(text)) && testNode(filt, r, fields) && (c.quick || []).every(k => !(quick[k.key] || []).length || quick[k.key].includes(r[k.key]))).sort(levelCompare(fields, groups.concat(sortLv))) : rows;
  const selecting = sel.length > 0;
  const root = React.useRef(null);
  const nF = condsOf(filt).length;
  // the commands of the selection bar, in order; Delete (danger) stays visible last as long as possible
  const verbs = sit === 'menu' ? [{
    icon: 'settings-permissions',
    label: 'Change role',
    primary: true,
    items: ROLES.map(r => /*#__PURE__*/React.createElement(MenuItem, {
      key: r,
      onSelect: () => setRole(sel, r)
    }, r))
  }, {
    icon: 'mail',
    label: 'Resend invitation'
  }, {
    icon: 'trash',
    label: 'Remove',
    danger: true,
    onClick: () => removeSel()
  }] : [{
    icon: 'download-arrow',
    label: 'Download',
    primary: true
  }, {
    icon: 'move',
    label: 'Move'
  }, {
    icon: 'share',
    label: 'Share'
  }, {
    icon: 'rename',
    label: 'Rename'
  }, {
    icon: 'tags',
    label: 'Edit tags'
  }, {
    icon: 'refresh',
    label: 'Regenerate thumbnail'
  }, {
    icon: 'trash',
    label: 'Delete',
    danger: true,
    onClick: () => removeSel()
  }];
  const extra = many && bars !== 'now' ? [['folder-add', 'New folder'], ['import', 'Import'], ['export', 'Export'], ['share', 'Share'], ['settings-permissions', 'Permissions'], ['gear', 'Settings']].map(([icon, label]) => ({
    icon,
    label
  })) : [];
  const selVerbs = verbs.map(v => Object.assign({
    sel: true
  }, v));
  const foldList = bars === 'a' || rowsIn ? extra : selInMain ? extra.concat(selVerbs) : selVerbs;
  const foldable = foldList.filter(v => !v.danger);
  // the button rule, measured (owner, 2026-10-14): step 0 icon and label; 1 icons with tooltips; then one more action goes into
  // More (⋮) per step, from the end; More only appears when something does not fit. A narrow bar starts at icons
  const iconStep = narrow ? 0 : T('d') ? 2 : 1;
  const fit = useFitStep(root, [selecting, mode, primary, nF, JSON.stringify(quick), sortLv.length, groups.length, hidden.length, view.layout, narrow, many, bars, tidy, shape].join('|'), iconStep + foldable.length);
  const s = fit === 0 && !narrow ? 'icon-label' : 'icon';
  const foldN = Math.max(0, fit - iconStep);
  // the button shape (parked): the main bar ghost (the mix, ghost) or outlined; the selection bar outlined (BulkActions) or ghost
  const outlinedMain = shape === 'outlined';
  const ms = outlinedMain && s === 'icon-label' ? 'outlined' : s;
  const mv = outlinedMain ? 'secondary' : 'ghost';

  // the commands
  function removeSel() {
    setRows(list => list.filter(r => !sel.includes(r.id) || r.role === 'Owner'));
    setSel([]);
  }
  function setRole(ids, role) {
    setRows(list => list.map(m => ids.includes(m.id) && m.role !== 'Owner' ? Object.assign({}, m, {
      role
    }) : m));
  }
  // a list of commands with the fold rule: the selection ones (sel) grayed with a why-tooltip until rows are selected
  const verbsEl = (list, folds) => {
    const why = words => 'Select ' + c.nouns + ' to ' + words;
    const off = v => !!v.sel && !selecting;
    const plain = list.filter(v => !v.danger);
    const keep = plain.slice(0, plain.length - folds),
      folded = plain.slice(keep.length);
    const danger = list.filter(v => v.danger);
    const moreOff = folded.length > 0 && folded.every(off);
    return /*#__PURE__*/React.createElement(React.Fragment, null, keep.map((v, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: v.label
    }, i > 0 && v.sel && !keep[i - 1].sel ? /*#__PURE__*/React.createElement(Divider, {
      orientation: "vertical"
    }) : null, /*#__PURE__*/React.createElement(Verb, {
      v: v,
      s: s,
      primary: primary,
      disabled: off(v),
      why: why(v.label.toLowerCase())
    }))), folded.length > 0 ? /*#__PURE__*/React.createElement(Tooltip, {
      content: moreOff ? why('see more actions') : 'More actions'
    }, /*#__PURE__*/React.createElement(Menu, {
      label: "More actions",
      trigger: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        icon: "more",
        iconOnly: true,
        label: "More actions",
        disabled: moreOff
      })
    }, folded.map(v => v.items ? /*#__PURE__*/React.createElement(MenuGroup, {
      key: v.label,
      label: v.label
    }, v.items) : /*#__PURE__*/React.createElement(MenuItem, {
      key: v.label,
      icon: v.icon,
      disabled: off(v)
    }, v.label)))) : null, danger.length ? /*#__PURE__*/React.createElement(Divider, {
      orientation: "vertical"
    }) : null, danger.map(v => /*#__PURE__*/React.createElement(Verb, {
      key: v.label,
      v: v,
      s: s,
      disabled: off(v),
      why: why(v.label.toLowerCase())
    })));
  };
  const mainActs = () => bars === 'now' ? layout === '1b' ? manyEl() : restEl() : /*#__PURE__*/React.createElement(React.Fragment, null, restEl(), foldList.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
    orientation: "vertical"
  }), verbsEl(foldList, foldN)) : null);
  // many actions (1B): eight commands, in their own bar
  const MANY = [['folder-add', 'New folder'], ['import', 'Import'], ['export', 'Export'], ['share', 'Share'], ['settings-permissions', 'Permissions'], ['gear', 'Settings']];
  const manyEl = () => /*#__PURE__*/React.createElement(React.Fragment, null, restEl(), MANY.map(([icon, label]) => /*#__PURE__*/React.createElement(Act, {
    key: label,
    s: ms,
    icon: icon,
    label: label
  })));
  const restEl = () => sit === 'menu' ? primary ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: "plus"
  }, "Invite member") : /*#__PURE__*/React.createElement(Act, {
    s: ms,
    icon: "plus",
    label: "Invite member"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, primary ? /*#__PURE__*/React.createElement(SplitButton, {
    variant: "primary",
    size: "sm",
    icon: "plus",
    label: "New",
    onClick: noop,
    menuLabel: "More new options"
  }, NEW_ITEMS) : s === 'icon' ? /*#__PURE__*/React.createElement(Tooltip, {
    content: "New"
  }, /*#__PURE__*/React.createElement(Menu, {
    label: "New",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: mv,
      icon: "plus",
      caret: true,
      iconOnly: true,
      label: "New"
    })
  }, NEW_ITEMS)) : /*#__PURE__*/React.createElement(Menu, {
    label: "New",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: mv,
      icon: "plus",
      caret: true
    }, "New")
  }, NEW_ITEMS), /*#__PURE__*/React.createElement(Act, {
    s: ms,
    icon: "upload",
    label: "Upload"
  }));
  // the selection bar (owner, 2026-10-14): the actions, then Select all and Clear (grayed with a why-tooltip until they
  // apply); the count at the far right, "N selected", the number in the data font, no noun
  const all = data.length > 0 && data.every(r => sel.includes(r.id));
  const selEl = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Toolbar.Group, null, verbsEl(selVerbs, bars === 'now' ? foldN : 0), /*#__PURE__*/React.createElement(Divider, {
    orientation: "vertical"
  }), all ? /*#__PURE__*/React.createElement(Tooltip, {
    content: 'Every ' + c.noun + ' is selected'
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: T('d') ? 'checklist' : undefined,
    disabled: true
  }, "Select all")) : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: T('d') ? 'checklist' : undefined,
    onClick: () => setSel(data.map(r => r.id))
  }, "Select all"), selecting ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: T('d') ? 'close' : undefined,
    onClick: () => setSel([])
  }, "Clear") : /*#__PURE__*/React.createElement(Tooltip, {
    content: 'Nothing to clear: select ' + c.nouns + ' first'
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: T('d') ? 'close' : undefined,
    disabled: true
  }, "Clear"))));

  // find and view: each control its own button, ghost (decided); icons only when the bar
  // does not fit or is narrow; never merged
  const io = narrow || fit >= iconStep;
  const gfields = fields.filter(f => f.kind === 'select');
  const findEls = fv => /*#__PURE__*/React.createElement(React.Fragment, null, c.search ? /*#__PURE__*/React.createElement(BarSearch, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: c.search,
    narrow: narrow
  }) : null, /*#__PURE__*/React.createElement(PanelButton, {
    kind: "filter",
    n: nF,
    iconOnly: io,
    variant: fv
  }, /*#__PURE__*/React.createElement(FilterPanel, {
    fields: fields,
    value: filt,
    setValue: setFilt
  })), (T('c') ? [] : c.quick || []).map(k => /*#__PURE__*/React.createElement(QuickFilter, {
    key: k.key,
    caret: !T('d'),
    label: k.label,
    icon: k.icon,
    noun: k.noun,
    iconOnly: io,
    variant: fv,
    options: fieldOf(fields, k.key).options,
    value: quick[k.key] || [],
    setValue: v => setQuick(o => Object.assign({}, o, {
      [k.key]: v
    }))
  })));
  const viewEls = fv => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelButton, {
    kind: "sort",
    n: sortLv.length,
    iconOnly: io,
    variant: fv
  }, /*#__PURE__*/React.createElement(SortPanel, {
    fields: fields,
    levels: sortLv,
    setLevels: setSortLv,
    grouped: groups.length > 0
  })), /*#__PURE__*/React.createElement(PanelButton, {
    kind: "group",
    n: groups.length,
    iconOnly: io,
    variant: fv
  }, /*#__PURE__*/React.createElement(GroupPanel, {
    fields: gfields,
    levels: groups,
    setLevels: setGroups,
    table: table
  })), layout === '1f' ? /*#__PURE__*/React.createElement(HideFieldsMenu, {
    names: c.hideable,
    hidden: hidden,
    setHidden: setHidden,
    iconOnly: io,
    variant: fv
  }) : null, /*#__PURE__*/React.createElement(ViewMenu, {
    value: view,
    onChange: setView,
    iconOnly: io,
    variant: fv,
    gallery: sit === 'both'
  }));
  const countEl = null;
  const countAt = React.useContext(CountAt);
  const slot = React.useContext(CountSlot);
  const shown = finds ? data.length : rows.length;
  const countLine = /*#__PURE__*/React.createElement(React.Fragment, null, N(shown), " ", shown === 1 ? c.noun : c.nouns, mode === 'bulk' ? /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", N(sel.length), " selected") : null);
  const countKey = shown + '|' + sel.length + '|' + mode;
  React.useEffect(() => {
    if (slot) slot(countAt === 'below' ? countLine : null);
  }, [countKey, countAt]);

  // the bars, for one find-and-view style
  const barsOf = fv => {
    const actionGroup = sit !== 'filters' && layout !== '1f' ? /*#__PURE__*/React.createElement(Toolbar.Group, {
      className: PART_A
    }, mainActs()) : null;
    const findGroup = finds ? /*#__PURE__*/React.createElement(Toolbar.Group, {
      className: PART_F
    }, findEls(fv)) : null;
    const viewGroup = finds ? /*#__PURE__*/React.createElement(Toolbar.Group, {
      className: PART_F
    }, viewEls(fv), countEl, sit === 'filters' ? /*#__PURE__*/React.createElement(Act, {
      s: ms,
      icon: "export",
      label: "Export"
    }) : null) : null;
    if (layout === '1f') {
      return /*#__PURE__*/React.createElement("div", {
        className: "study-bar"
      }, /*#__PURE__*/React.createElement(Toolbar, {
        label: "View"
      }, /*#__PURE__*/React.createElement(Toolbar.Group, null, c.search ? /*#__PURE__*/React.createElement(BarSearch, {
        value: q,
        onChange: e => setQ(e.target.value),
        onClear: () => setQ(''),
        placeholder: c.search,
        narrow: narrow
      }) : null, /*#__PURE__*/React.createElement(Menu, {
        label: "Views",
        trigger: /*#__PURE__*/React.createElement(Button, {
          size: "sm",
          variant: fv,
          icon: "view-table",
          caret: true
        }, narrow ? 'All' : 'All ' + c.nouns)
      }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
        label: "Views",
        value: "all",
        onChange: noop
      }, /*#__PURE__*/React.createElement(MenuItem, {
        value: "all"
      }, 'All ' + c.nouns), /*#__PURE__*/React.createElement(MenuItem, {
        value: "recent"
      }, "Recent")), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuItem, {
        icon: "plus"
      }, "Create view")), /*#__PURE__*/React.createElement(Divider, {
        orientation: "vertical"
      }), /*#__PURE__*/React.createElement(PanelButton, {
        kind: "filter",
        n: nF,
        iconOnly: io,
        variant: fv
      }, /*#__PURE__*/React.createElement(FilterPanel, {
        fields: fields,
        value: filt,
        setValue: setFilt
      })), viewEls(fv)), /*#__PURE__*/React.createElement(Toolbar.Spacer, null), /*#__PURE__*/React.createElement(Toolbar.Group, null, countEl, /*#__PURE__*/React.createElement(Act, {
        s: ms,
        icon: "export",
        label: "Export"
      }))));
    }
    if (layout === '1b') {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "study-bar study-part--actions"
      }, /*#__PURE__*/React.createElement(Toolbar, {
        label: c.title + ' actions'
      }, actionGroup)), /*#__PURE__*/React.createElement("div", {
        className: "study-bar study-part--find"
      }, /*#__PURE__*/React.createElement(Toolbar, {
        label: "Find and view"
      }, findGroup, /*#__PURE__*/React.createElement(Toolbar.Spacer, null), viewGroup)));
    }
    const row2 = rowsIn && mode === 'bulk' && (bars === 'e' || selecting);
    if (rowsIn && T('b')) {
      return /*#__PURE__*/React.createElement("div", {
        className: "study-bar study-bar--rows"
      }, /*#__PURE__*/React.createElement(Toolbar, {
        label: "Find and view"
      }, findGroup, /*#__PURE__*/React.createElement(Toolbar.Spacer, null), viewGroup), /*#__PURE__*/React.createElement(Toolbar, {
        label: c.title + ' actions'
      }, /*#__PURE__*/React.createElement(Toolbar.Group, {
        className: PART_A
      }, mainActs()), mode === 'bulk' ? /*#__PURE__*/React.createElement(Divider, {
        orientation: "vertical"
      }) : null, mode === 'bulk' ? selEl() : null));
    }
    const row1 = T('a') ? /*#__PURE__*/React.createElement(React.Fragment, null, actionGroup, actionGroup && findGroup ? /*#__PURE__*/React.createElement(Divider, {
      orientation: "vertical"
    }) : null, findGroup, /*#__PURE__*/React.createElement(Toolbar.Spacer, null), viewGroup) : /*#__PURE__*/React.createElement(React.Fragment, null, actionGroup, /*#__PURE__*/React.createElement(Toolbar.Spacer, null), findGroup, viewGroup);
    return /*#__PURE__*/React.createElement("div", {
      className: 'study-bar' + (row2 ? ' study-bar--rows' : '')
    }, /*#__PURE__*/React.createElement(Toolbar, {
      label: c.title
    }, row1), row2 ? /*#__PURE__*/React.createElement(Toolbar, {
      label: "Selection actions"
    }, selEl()) : null);
  };
  const bulkEl = mode !== 'bulk' || selInMain || rowsIn ? null : shape === 'ghost' ? /*#__PURE__*/React.createElement("div", {
    className: "study-bar"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Selection actions"
  }, selEl())) : /*#__PURE__*/React.createElement(BulkActions, {
    className: PART_A,
    count: sel.length,
    total: data.length,
    noun: c.noun,
    onSelectAll: () => setSel(data.map(r => r.id)),
    onClear: () => setSel([]),
    actions: verbs.filter(v => !v.more).map(v => ({
      id: v.label,
      label: v.label,
      icon: v.icon,
      danger: v.danger,
      onSelect: v.onClick || noop
    }))
  });
  const rowMenu = sit === 'menu' ? m => ROLES.map(r => ({
    label: 'Make ' + r.toLowerCase(),
    icon: 'settings-permissions',
    disabled: m.role === 'Owner' || m.role === r,
    onSelect: () => setRole([m.id], r)
  })).concat([{
    separator: true
  }, {
    label: 'Remove',
    icon: 'trash',
    danger: true,
    disabled: m.role === 'Owner',
    onSelect: () => {
      setRows(list => list.filter(x => x.id !== m.id));
      setSel(x => x.filter(id => id !== m.id));
    }
  }]) : layout === '1f' ? [{
    label: 'Download',
    icon: 'download-arrow',
    onSelect: noop
  }, {
    label: 'Move',
    icon: 'move',
    onSelect: noop
  }, {
    separator: true
  }, {
    label: 'Delete',
    icon: 'trash',
    danger: true,
    onSelect: removeSel
  }] : undefined;
  const gb = groupByOf(groups);
  const shownCols = columns.filter(col => !hidden.includes(col.title));
  return /*#__PURE__*/React.createElement("div", {
    className: 'study-built' + (fixed ? ' study-built--fixed' : ''),
    ref: root
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-built__stack"
  }, /*#__PURE__*/React.createElement(RecordPage.Header, {
    title: c.title,
    size: "md",
    headingLevel: 3,
    actions: layout === '1f' && sit !== 'filters' ? /*#__PURE__*/React.createElement(Inline, {
      gap: "sm"
    }, restEl()) : undefined
  }), barsOf('ghost'), bulkEl, countAt === 'above' ? /*#__PURE__*/React.createElement(Text, {
    variant: "caption",
    className: "study-count-line"
  }, countLine) : null, /*#__PURE__*/React.createElement("div", {
    className: "study-table-room"
  }, view.layout === 'gallery' ? /*#__PURE__*/React.createElement("div", {
    className: 'study-gallery-room' + (fixed ? ' study-gallery-room--fill' : '')
  }, /*#__PURE__*/React.createElement(ContentGrid, {
    size: view.size === 's' ? 'xs' : view.size === 'l' ? 'md' : 'sm',
    label: c.title
  }, data.map(a => /*#__PURE__*/React.createElement(MediaCard, {
    key: a.id,
    icon: typeIcon(a.type),
    title: a.name,
    meta: a.size
  })))) : /*#__PURE__*/React.createElement(DataTable, {
    viewMenu: false,
    key: JSON.stringify([gb, hidden, view.height]),
    label: c.title,
    data: data,
    columns: shownCols,
    selectable: c.selectable,
    selected: c.selectable ? sel : undefined,
    onSelectionChange: c.selectable ? setSel : undefined,
    height: fixed ? '100%' : height,
    rowHeight: view.height,
    options: gb ? {
      groupBy: gb
    } : {},
    rowMenu: rowMenu,
    empty: 'No ' + c.nouns + ' match these filters',
    onReady: t => {
      table.current = t;
    }
  }))));
}

// a note on a view or a step: an inline text area under the label; kept in this browser
function NoteBox({
  k,
  label,
  notes,
  setNotes,
  editing,
  setEditing
}) {
  const saved = notes[k] || '';
  const [draft, setDraft] = useState(saved);
  React.useEffect(() => {
    if (editing) setDraft(notes[k] || '');
  }, [editing]);
  const put = v => setNotes(n => {
    const x = Object.assign({}, n);
    if (v) x[k] = v;else delete x[k];
    return x;
  });
  if (editing) {
    return /*#__PURE__*/React.createElement(Stack, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(Field, {
      label: 'Note on ' + label
    }, /*#__PURE__*/React.createElement(Textarea, {
      rows: 3,
      value: draft,
      onChange: e => setDraft(e.target.value)
    })), /*#__PURE__*/React.createElement(Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "primary",
      onClick: () => {
        put(draft.trim());
        setEditing(false);
      }
    }, "Save note"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => setEditing(false)
    }, "Cancel")));
  }
  if (!saved) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "study-saved-note"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "Note"), /*#__PURE__*/React.createElement(Text, {
    variant: "body"
  }, saved)), /*#__PURE__*/React.createElement(Inline, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "pencil",
    onClick: () => setEditing(true)
  }, "Edit"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "trash",
    onClick: () => put('')
  }, "Delete")));
}

/* ───────────── Airtable-style panels: Filter, Sort and Group (owner, 2026-10-14) ───────────── */
// "It should be just like Airtable's": each opens from its bar button as a popover panel with a header (title and an info
// button), one row per condition or level, and ghost Add buttons under the rows. The three panels share one row: the same
// control height (md), the same spacing; a ⋮⋮ handle on every row reorders it (drag, or the handle's Move up / Move down;
// Alt + Arrow Up / Down on a focused row), and each move is announced. They work on any table: fields are
// [{ value, label, kind: text | select | multi | number | date, get(row), options: [{ value, color }] }].

const KIND_ICON = {
  text: 'ed-text',
  select: 'field-select',
  multi: 'tags',
  number: 'field-number',
  date: 'calendar'
};
const DIRW = {
  text: ['A → Z', 'Z → A'],
  select: ['First → Last', 'Last → First'],
  multi: ['First → Last', 'Last → First'],
  number: ['1 → 9', '9 → 1'],
  date: ['Oldest → newest', 'Newest → oldest']
};
const OPS_BY = {
  text: [['contains', 'contains'], ['ncontains', 'does not contain'], ['is', 'is'], ['isnot', 'is not'], ['empty', 'is empty'], ['nempty', 'is not empty']],
  select: [['any', 'is any of'], ['none', 'is none of'], ['empty', 'is empty'], ['nempty', 'is not empty']],
  multi: [['any', 'has any of'], ['none', 'has none of'], ['empty', 'is empty'], ['nempty', 'is not empty']],
  number: [['eq', '='], ['ne', '≠'], ['lt', '<'], ['gt', '>'], ['empty', 'is empty'], ['nempty', 'is not empty']],
  date: [['is', 'is'], ['before', 'is before'], ['after', 'is after'], ['within', 'is within'], ['empty', 'is empty'], ['nempty', 'is not empty']]
};
const WITHIN = [{
  value: 'week',
  label: 'the past week'
}, {
  value: 'month',
  label: 'the past month'
}, {
  value: 'year',
  label: 'the past year'
}];
// option colors: the category colors (Trubetskoy's 20), handed out in this order
const CAT_ORDER = ['blue', 'green', 'purple', 'orange', 'teal', 'magenta', 'yellow', 'navy', 'red', 'cyan', 'lavender', 'brown', 'olive', 'pink', 'apricot', 'mint', 'maroon', 'lime', 'beige', 'grey'];
const colored = (values, start = 0) => values.map((v, i) => ({
  value: v,
  color: CAT_ORDER[(start + i) % CAT_ORDER.length]
}));
const fieldOf = (fields, v) => fields.find(f => f.value === v) || fields[0];
const getV = (f, r) => f.get ? f.get(r) : r[f.value];
const fopt = f => ({
  value: f.value,
  label: f.label,
  icon: KIND_ICON[f.kind]
});
const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
const daysBefore = n => {
  const d = new Date(TODAY + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
};

// sorting by levels [{ field, dir }]: a select field sorts in its options' order (First → Last)
function levelCompare(fields, levels) {
  return (a, b) => {
    for (const l of levels) {
      const f = fields.find(x => x.value === l.field);
      if (!f) continue;
      let x = getV(f, a),
        y = getV(f, b);
      if (f.options && f.kind === 'select') {
        x = f.options.findIndex(o => o.value === x);
        y = f.options.findIndex(o => o.value === y);
      }
      if (Array.isArray(x)) {
        x = x.join(', ');
        y = y.join(', ');
      }
      const c = x < y ? -1 : x > y ? 1 : 0;
      if (c) return l.dir === 'asc' ? c : -c;
    }
    return 0;
  };
}
// filtering by a node { join: and | or, items: [condition | { group: true, join, items }] }; an unfinished condition does not filter
const blank = x => x == null || x === '' || Array.isArray(x) && !x.length;
function testCond(c, r, fields) {
  const f = fieldOf(fields, c.field),
    v = getV(f, r),
    val = c.value;
  if (c.op === 'empty') return blank(v);
  if (c.op === 'nempty') return !blank(v);
  if (blank(val)) return true;
  if (f.kind === 'text') {
    const s = String(v || '').toLowerCase(),
      q = String(val).toLowerCase();
    return c.op === 'contains' ? s.includes(q) : c.op === 'ncontains' ? !s.includes(q) : c.op === 'is' ? s === q : s !== q;
  }
  if (f.kind === 'select') return c.op === 'any' ? val.includes(v) : !val.includes(v);
  if (f.kind === 'multi') {
    const hit = (v || []).some(x => val.includes(x));
    return c.op === 'any' ? hit : !hit;
  }
  if (f.kind === 'number') {
    const n = v / 1e6,
      q = parseFloat(val);
    if (isNaN(q)) return true;
    return c.op === 'eq' ? Math.abs(n - q) < 0.05 : c.op === 'ne' ? Math.abs(n - q) >= 0.05 : c.op === 'lt' ? n < q : n > q;
  }
  const d = String(v).slice(0, 10);
  if (c.op === 'within') return d >= daysBefore(val === 'week' ? 7 : val === 'month' ? 30 : 365);
  return c.op === 'is' ? d === val : c.op === 'before' ? d < val : d > val;
}
function testNode(node, r, fields) {
  if (!node.items.length) return true;
  const t = x => x.group ? testNode(x, r, fields) : testCond(x, r, fields);
  return node.join === 'or' ? node.items.some(t) : node.items.every(t);
}
const condsOf = node => node.items.reduce((l, x) => l.concat(x.group ? condsOf(x) : [x]), []);
let uid = 100;
const newCond = f => ({
  id: ++uid,
  field: f.value,
  op: OPS_BY[f.kind][0][0],
  value: f.kind === 'select' || f.kind === 'multi' ? [] : ''
});

// a pill in a category color (the Plenix pill: its own 1px border)
const Pill = ({
  color,
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: "study-pill",
  "data-plx-category": color
}, children);
// a select drawn as a menu button: the field's type icon and name, or a value; the same height as the row's other controls
function Pick({
  label,
  value,
  options,
  onChange,
  size = 'field',
  className
}) {
  const cur = options.find(o => o.value === value) || options[0];
  return /*#__PURE__*/React.createElement(Menu, {
    label: label,
    trigger: /*#__PURE__*/React.createElement(Button, {
      icon: cur.icon,
      caret: true,
      className: 'study-pick study-pick--' + size + (className ? ' ' + className : ''),
      title: cur.label
    }, cur.label)
  }, /*#__PURE__*/React.createElement(MenuRadioGroup, {
    label: label,
    value: value,
    onChange: onChange
  }, options.map(o => /*#__PURE__*/React.createElement(MenuItem, {
    key: o.value,
    value: o.value,
    icon: o.icon
  }, o.label))));
}
// a multi-select: the chosen values as pills in their colors, with a caret
function MultiPick({
  label,
  field,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement(Menu, {
    label: label,
    trigger: /*#__PURE__*/React.createElement(Button, {
      caret: true,
      className: "study-pick study-pick--value"
    }, value.length ? /*#__PURE__*/React.createElement("span", {
      className: "study-pills"
    }, value.map(v => {
      const o = field.options.find(x => x.value === v);
      return /*#__PURE__*/React.createElement(Pill, {
        key: v,
        color: o ? o.color : 'grey'
      }, v);
    })) : /*#__PURE__*/React.createElement("span", {
      className: "study-muted"
    }, "Choose options"))
  }, field.options.map(o => /*#__PURE__*/React.createElement(MenuItem, {
    key: o.value,
    checked: value.includes(o.value),
    keepOpen: true,
    onSelect: () => onChange(toggle(value, o.value))
  }, /*#__PURE__*/React.createElement(Pill, {
    color: o.color
  }, o.value))));
}

// reordering the rows of a panel: drag, the handle's menu, or Alt + Arrow Up / Down on a focused row; announced
function useReorder(items, setItems, nameOf) {
  const [msg, setMsg] = useState('');
  const drag = React.useRef(null);
  const box = React.useRef(null);
  const move = (i, to, focus) => {
    if (to < 0 || to >= items.length) return;
    const next = items.slice();
    const [x] = next.splice(i, 1);
    next.splice(to, 0, x);
    setItems(next);
    setMsg(nameOf(x) + ' moved to position ' + (to + 1) + ' of ' + items.length);
    if (focus) setTimeout(() => {
      const el = box.current && box.current.querySelectorAll(':scope > [data-level-row]')[to];
      if (el) el.focus();
    }, 0);
  };
  const rowProps = i => ({
    'data-level-row': '',
    tabIndex: 0,
    draggable: true,
    onKeyDown: e => {
      if (e.target !== e.currentTarget || !e.altKey) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        move(i, i - 1, true);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        move(i, i + 1, true);
      }
    },
    onDragStart: e => {
      e.stopPropagation();
      drag.current = i;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(i));
    },
    onDragOver: e => e.preventDefault(),
    onDrop: e => {
      e.preventDefault();
      e.stopPropagation();
      const from = drag.current;
      drag.current = null;
      if (from != null && from !== i) move(from, i);
    }
  });
  const handle = (i, name) => /*#__PURE__*/React.createElement(Menu, {
    label: 'Reorder ' + name,
    placement: "bottom-end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "drag",
      iconOnly: true,
      label: 'Reorder ' + name,
      className: "study-level-handle"
    })
  }, /*#__PURE__*/React.createElement(MenuItem, {
    icon: "chevron-up",
    disabled: i === 0,
    onSelect: () => move(i, i - 1, true)
  }, "Move up"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: "chevron-down",
    disabled: i === items.length - 1,
    onSelect: () => move(i, i + 1, true)
  }, "Move down"));
  const status = /*#__PURE__*/React.createElement(VisuallyHidden, {
    role: "status",
    "aria-live": "polite"
  }, msg);
  return {
    box,
    rowProps,
    handle,
    status
  };
}
function PanelHead({
  title,
  info,
  sub,
  actions
}) {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-panel-head"
  }, /*#__PURE__*/React.createElement(Inline, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "heading"
  }, title), /*#__PURE__*/React.createElement(Tooltip, {
    content: info
  }, /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    variant: "ghost",
    icon: "circle-info",
    iconOnly: true,
    label: 'About ' + title.toLowerCase()
  }))), actions ? /*#__PURE__*/React.createElement(Inline, {
    gap: "xs"
  }, actions) : null), sub ? /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, sub) : null);
}

// Sort: rows of field + direction + × + handle; "Sort within groups by" while the table is grouped
function SortPanel({
  fields,
  levels,
  setLevels,
  grouped
}) {
  const ro = useReorder(levels, setLevels, l => fieldOf(fields, l.field).label);
  const put = (i, ch) => setLevels(levels.map((l, j) => j === i ? Object.assign({}, l, ch) : l));
  const free = fields.filter(f => !levels.some(l => l.field === f.value));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm",
    className: "study-panel"
  }, /*#__PURE__*/React.createElement(PanelHead, {
    title: grouped ? 'Sort within groups by' : 'Sort by',
    info: "The rows are ordered by the first field, then by the next where the first is the same."
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-levels",
    ref: ro.box
  }, levels.length ? null : /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "No sort: the rows keep the order they were added in."), levels.map((l, i) => {
    const f = fieldOf(fields, l.field);
    return /*#__PURE__*/React.createElement("div", _extends({
      key: l.field,
      className: "study-level-row"
    }, ro.rowProps(i)), /*#__PURE__*/React.createElement(Pick, {
      label: "Field",
      value: l.field,
      options: fields.filter(x => x.value === l.field || !levels.some(y => y.field === x.value)).map(fopt),
      onChange: v => put(i, {
        field: v
      })
    }), /*#__PURE__*/React.createElement(Pick, {
      label: "Direction",
      size: "dir",
      value: l.dir,
      options: [{
        value: 'asc',
        label: DIRW[f.kind][0]
      }, {
        value: 'desc',
        label: DIRW[f.kind][1]
      }],
      onChange: v => put(i, {
        dir: v
      })
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: "Remove sort"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "close",
      iconOnly: true,
      label: 'Remove the sort by ' + f.label,
      onClick: () => setLevels(levels.filter((_, j) => j !== i))
    })), ro.handle(i, f.label));
  })), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    className: "study-panel-add"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "plus",
    disabled: !free.length,
    onClick: () => setLevels(levels.concat({
      field: free[0].value,
      dir: 'asc'
    }))
  }, levels.length ? 'Add another sort' : 'Add a sort')), ro.status);
}

// Group: rows of field + order + more + trash + handle; Collapse all and Expand all work on the table's groups
const eachGroup = (t, fn) => {
  if (!t || !t.getGroups) return;
  const walk = gs => gs.forEach(g => {
    fn(g);
    walk(g.getSubGroups ? g.getSubGroups() : []);
  });
  walk(t.getGroups());
};
function GroupPanel({
  fields,
  levels,
  setLevels,
  table
}) {
  const ro = useReorder(levels, setLevels, l => fieldOf(fields, l.field).label);
  const put = (i, ch) => setLevels(levels.map((l, j) => j === i ? Object.assign({}, l, ch) : l));
  const free = fields.filter(f => !levels.some(l => l.field === f.value));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm",
    className: "study-panel"
  }, /*#__PURE__*/React.createElement(PanelHead, {
    title: "Group by",
    info: "Rows with the same value are gathered under one header; a subgroup splits each group again.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      disabled: !levels.length,
      onClick: () => eachGroup(table && table.current, g => g.hide())
    }, "Collapse all"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      disabled: !levels.length,
      onClick: () => eachGroup(table && table.current, g => g.show())
    }, "Expand all"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-levels",
    ref: ro.box
  }, levels.length ? null : /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "Gather the rows that share a value under one header."), levels.map((l, i) => {
    const f = fieldOf(fields, l.field);
    return /*#__PURE__*/React.createElement("div", _extends({
      key: l.field,
      className: "study-level-row"
    }, ro.rowProps(i)), /*#__PURE__*/React.createElement(Pick, {
      label: "Field",
      value: l.field,
      options: fields.filter(x => x.value === l.field || !levels.some(y => y.field === x.value)).map(fopt),
      onChange: v => put(i, {
        field: v
      })
    }), /*#__PURE__*/React.createElement(Pick, {
      label: "Order",
      size: "dir",
      value: l.dir,
      options: [{
        value: 'asc',
        label: DIRW[f.kind][0]
      }, {
        value: 'desc',
        label: DIRW[f.kind][1]
      }],
      onChange: v => put(i, {
        dir: v
      })
    }), /*#__PURE__*/React.createElement(Menu, {
      label: 'More for ' + f.label,
      placement: "bottom-end",
      trigger: /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        icon: "more",
        iconOnly: true,
        label: 'More for ' + f.label
      })
    }, /*#__PURE__*/React.createElement(MenuItem, {
      checked: !!l.hideEmpty,
      keepOpen: true,
      onSelect: () => put(i, {
        hideEmpty: !l.hideEmpty
      })
    }, "Hide empty groups")), /*#__PURE__*/React.createElement(Tooltip, {
      content: "Remove group"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "trash",
      iconOnly: true,
      label: 'Remove the grouping by ' + f.label,
      onClick: () => setLevels(levels.filter((_, j) => j !== i))
    })), ro.handle(i, f.label));
  })), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    className: "study-panel-add"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "plus",
    disabled: !free.length,
    onClick: () => setLevels(levels.concat({
      field: free[0].value,
      dir: 'asc'
    }))
  }, levels.length ? 'Add subgroup' : 'Add group')), ro.status);
}

// Filter: condition rows joined in one bordered group; Where, then and / or; nested condition groups (one level)
function CondValue({
  c,
  f,
  set
}) {
  if (c.op === 'empty' || c.op === 'nempty') return /*#__PURE__*/React.createElement("span", {
    className: "study-pick--value"
  });
  if (f.kind === 'select' || f.kind === 'multi') return /*#__PURE__*/React.createElement(MultiPick, {
    label: f.label + ' values',
    field: f,
    value: c.value,
    onChange: v => set({
      value: v
    })
  });
  if (f.kind === 'date' && c.op === 'within') return /*#__PURE__*/React.createElement(Pick, {
    label: "Within",
    size: "value",
    value: c.value || 'week',
    options: WITHIN,
    onChange: v => set({
      value: v
    })
  });
  if (f.kind === 'date') return /*#__PURE__*/React.createElement(Input, {
    type: "date",
    data: true,
    "aria-label": f.label,
    className: "study-pick--value",
    value: c.value,
    onChange: e => set({
      value: e.target.value
    })
  });
  if (f.kind === 'number') return /*#__PURE__*/React.createElement(Input, {
    type: "number",
    data: true,
    "aria-label": f.label + ' in MB',
    placeholder: "Size in MB",
    className: "study-pick--value",
    value: c.value,
    onChange: e => set({
      value: e.target.value
    })
  });
  return /*#__PURE__*/React.createElement(Input, {
    "aria-label": f.label,
    placeholder: "Enter a value",
    className: "study-pick--value",
    value: c.value,
    onChange: e => set({
      value: e.target.value
    })
  });
}
function CondRows({
  fields,
  node,
  setNode,
  nested
}) {
  const items = node.items;
  const setItems = list => setNode(Object.assign({}, node, {
    items: list
  }));
  const ro = useReorder(items, setItems, x => x.group ? 'Condition group' : fieldOf(fields, x.field).label);
  const put = (i, ch) => setItems(items.map((x, j) => j === i ? Object.assign({}, x, ch) : x));
  const conj = i => i === 0 ? /*#__PURE__*/React.createElement(Text, {
    variant: "secondary",
    className: "study-conj"
  }, "Where") : i === 1 ? /*#__PURE__*/React.createElement(Pick, {
    label: "And or or",
    size: "conj",
    value: node.join,
    options: [{
      value: 'and',
      label: 'and'
    }, {
      value: 'or',
      label: 'or'
    }],
    onChange: v => setNode(Object.assign({}, node, {
      join: v
    }))
  }) : /*#__PURE__*/React.createElement(Text, {
    variant: "secondary",
    className: "study-conj"
  }, node.join);
  return /*#__PURE__*/React.createElement("div", {
    className: 'study-levels study-levels--framed' + (nested ? ' study-levels--nested' : ''),
    ref: ro.box
  }, items.length ? null : /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "No conditions: every record is shown."), items.map((x, i) => {
    const remove = what => /*#__PURE__*/React.createElement(Tooltip, {
      content: 'Remove ' + what
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "trash",
      iconOnly: true,
      label: 'Remove ' + what,
      onClick: () => setItems(items.filter((_, j) => j !== i))
    }));
    if (x.group) {
      return /*#__PURE__*/React.createElement("div", _extends({
        key: x.id,
        className: "study-level-row"
      }, ro.rowProps(i)), conj(i), /*#__PURE__*/React.createElement(Stack, {
        gap: "sm",
        className: "study-cond-group"
      }, /*#__PURE__*/React.createElement(CondRows, {
        fields: fields,
        node: x,
        setNode: n => put(i, n),
        nested: true
      }), /*#__PURE__*/React.createElement(Inline, {
        gap: "sm"
      }, /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        icon: "plus",
        onClick: () => put(i, {
          items: x.items.concat(newCond(fields[0]))
        })
      }, "Add condition"))), remove('condition group'), ro.handle(i, 'condition group'));
    }
    const f = fieldOf(fields, x.field);
    return /*#__PURE__*/React.createElement("div", _extends({
      key: x.id,
      className: "study-level-row"
    }, ro.rowProps(i)), conj(i), /*#__PURE__*/React.createElement(Pick, {
      label: "Field",
      value: x.field,
      options: fields.map(fopt),
      onChange: v => put(i, newCond(fieldOf(fields, v)))
    }), /*#__PURE__*/React.createElement(Pick, {
      label: "Operator",
      size: "op",
      value: x.op,
      options: OPS_BY[f.kind].map(([value, label]) => ({
        value,
        label
      })),
      onChange: v => put(i, {
        op: v,
        value: v === 'within' ? 'week' : x.op === 'within' ? '' : x.value
      })
    }), /*#__PURE__*/React.createElement(CondValue, {
      c: x,
      f: f,
      set: ch => put(i, ch)
    }), remove('condition'), ro.handle(i, f.label));
  }), ro.status);
}
function FilterPanel({
  fields,
  value,
  setValue
}) {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm",
    className: "study-panel"
  }, /*#__PURE__*/React.createElement(PanelHead, {
    title: "Filter",
    info: "Only the records that meet the conditions are shown; a condition left unfinished does not filter.",
    sub: "In this view, show records"
  }), /*#__PURE__*/React.createElement(CondRows, {
    fields: fields,
    node: value,
    setNode: setValue
  }), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    className: "study-panel-add"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "plus",
    onClick: () => setValue(Object.assign({}, value, {
      items: value.items.concat(newCond(fields[0]))
    }))
  }, "Add condition"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "plus",
    onClick: () => setValue(Object.assign({}, value, {
      items: value.items.concat({
        id: ++uid,
        group: true,
        join: 'and',
        items: [newCond(fields[0])]
      })
    }))
  }, "Add condition group")));
}

// the bar buttons (owner, 2026-10-14): icon + "Filter", "Sort" or "Group", never reworded; active: the tint and a count badge.
// Ghost, as every bar button (decided).
const BAR_WORD = {
  filter: 'Filter',
  sort: 'Sort',
  group: 'Group'
};
const BAR_ICON = {
  filter: 'filter',
  sort: 'sort',
  group: 'group-by'
};
function PanelButton({
  kind,
  n,
  iconOnly,
  variant = 'ghost',
  children
}) {
  const w = BAR_WORD[kind];
  const box = React.useRef(null);
  // focus goes to the panel's first field (its first row's control, else its Add button), not the info button
  const first = {
    get current() {
      const el = box.current;
      return el ? el.querySelector('.study-levels button, .study-levels input, .study-col-list button, .study-panel-add button') : null;
    }
  };
  const badge = n ? /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: "info"
  }, n) : null;
  const trigger = /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: variant,
    icon: BAR_ICON[kind],
    selected: n > 0,
    iconOnly: iconOnly && !n,
    label: iconOnly ? n ? w + ', ' + n : w : undefined
  }, iconOnly ? n ? badge : w : /*#__PURE__*/React.createElement(React.Fragment, null, w, n ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", badge) : null));
  const pop = /*#__PURE__*/React.createElement(Popover, {
    label: w,
    size: "auto",
    trigger: trigger,
    initialFocus: first
  }, /*#__PURE__*/React.createElement("div", {
    ref: box
  }, children));
  return iconOnly ? /*#__PURE__*/React.createElement(Tooltip, {
    content: w
  }, pop) : pop;
}

// the study's tables as fields
const bytesOf = s => typeof s === 'number' ? s : bytes(s);
const ASSET_FIELDS = [{
  value: 'name',
  label: 'Name',
  kind: 'text'
}, {
  value: 'type',
  label: 'Type',
  kind: 'select',
  options: colored(TYPES, 4)
}, {
  value: 'category',
  label: 'Category',
  kind: 'select',
  options: colored(['Projects', 'Brand', 'Marketing', 'Finance'])
}, {
  value: 'size',
  label: 'Size',
  kind: 'number',
  get: r => bytesOf(r.size)
}, {
  value: 'modified',
  label: 'Modified',
  kind: 'date'
}];
const ACTIVITY_FIELDS = [{
  value: 'person',
  label: 'Person',
  kind: 'select',
  options: colored(PEOPLE)
}, {
  value: 'action',
  label: 'Action',
  kind: 'select',
  options: colored(ACTIONS, 5)
}, {
  value: 'item',
  label: 'Item',
  kind: 'text'
}, {
  value: 'app',
  label: 'App',
  kind: 'select',
  options: colored(APPS, 11)
}, {
  value: 'time',
  label: 'Time',
  kind: 'date'
}];
const groupByOf = levels => !levels.length ? null : levels.length === 1 ? levels[0].field : levels.map(l => l.field);

/* ───────────── Segmented controls (owner, 2026-10-14: look A, decided) ───────────── */
// Today's SegmentedControl look (gray track, white thumb) is eliminated; the decided look is A, a bordered group with a tinted
// selection (Material 3 / Fluent), drawn with a ButtonGroup of pressed Buttons (study.css). The SegmentedControl props
// (label, value, onChange, options [{ value, label, icon, ariaLabel }]), or isOn and onPress for a set where several
// segments can be on (All, Projects, Brand…)
function Seg({
  label,
  value,
  onChange,
  options,
  isOn,
  onPress,
  size = 'sm',
  className
}) {
  return /*#__PURE__*/React.createElement(ButtonGroup, {
    label: label,
    className: 'study-seg' + (className ? ' ' + className : '')
  }, options.map(o => {
    const on = isOn ? isOn(o.value) : value === o.value;
    const press = () => onPress ? onPress(o.value) : onChange(o.value);
    if (!o.label) return /*#__PURE__*/React.createElement(Tooltip, {
      key: o.value,
      content: o.ariaLabel
    }, /*#__PURE__*/React.createElement(Button, {
      size: size,
      icon: o.icon,
      iconOnly: true,
      label: o.ariaLabel,
      pressed: on,
      onClick: press
    }));
    return /*#__PURE__*/React.createElement(Button, {
      key: o.value,
      size: size,
      icon: o.icon,
      pressed: on,
      onClick: press
    }, o.label);
  }));
}

/* ───────────── Columns: first column, order and shown (owner, 2026-10-14) ───────────── */
// "First column" is a must, as a list with reordering, not a segmented choice. One list of every column: a drag handle, a
// checkbox (shown or hidden) and Make first column; the first column is pinned at the top. Reorder by drag, by the Move up
// and Move down buttons, or with Alt + Arrow Up / Down on a focused row; each move is announced.
const moveTo = (order, f, i) => {
  const rest = order.filter(x => x !== f);
  rest.splice(i, 0, f);
  return rest;
};
function ColumnsList({
  value,
  onChange,
  fields,
  filter = ''
}) {
  const [msg, setMsg] = useState('');
  const [drag, setDrag] = useState(null);
  const box = React.useRef(null);
  const {
    order,
    hidden
  } = value;
  const put = (o, h, words, focus) => {
    onChange({
      order: o,
      hidden: h
    });
    setMsg(words);
    if (focus) setTimeout(() => {
      const el = box.current && box.current.querySelector('[data-field="' + focus + '"]');
      if (el) el.focus();
    }, 0);
  };
  const move = (f, to, focus) => {
    if (to < 0 || to >= order.length) return;
    const o = moveTo(order, f, to);
    put(o, to === 0 ? hidden.filter(x => x !== f) : hidden, fields[f] + (to === 0 ? ' is the first column' : ', position ' + (to + 1) + ' of ' + order.length), focus ? f : null);
  };
  const q = filter.trim().toLowerCase();
  return /*#__PURE__*/React.createElement("div", {
    className: "study-col-list",
    ref: box
  }, order.map((f, i) => q && !fields[f].toLowerCase().includes(q) ? null : /*#__PURE__*/React.createElement("div", {
    key: f,
    "data-field": f,
    tabIndex: 0,
    draggable: true,
    "aria-label": fields[f] + (i === 0 ? ', first column' : '') + '. Alt + Arrow Up or Down moves it',
    className: 'study-col-row' + (drag === f ? ' is-dragging' : ''),
    onKeyDown: e => {
      if (e.target !== e.currentTarget || !e.altKey) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        move(f, i - 1, true);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        move(f, i + 1, true);
      }
    },
    onDragStart: e => {
      setDrag(f);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', f);
    },
    onDragEnd: () => setDrag(null),
    onDragOver: e => e.preventDefault(),
    onDrop: e => {
      e.preventDefault();
      const from = e.dataTransfer.getData('text/plain') || drag;
      setDrag(null);
      if (from && from !== f) move(from, i);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "study-col-row__handle",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "drag"
  })), /*#__PURE__*/React.createElement(Checkbox, {
    label: fields[f],
    checked: !hidden.includes(f),
    disabled: i === 0,
    onChange: () => put(order, toggle(hidden, f), fields[f] + (hidden.includes(f) ? ' shown' : ' hidden'))
  }), i === 0 ? /*#__PURE__*/React.createElement("span", {
    className: "study-col-row__first"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin-filled"
  }), /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "First column")) : /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    variant: "ghost",
    icon: "pin",
    onClick: () => move(f, 0, true)
  }, "Make first column"), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Move up"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    variant: "ghost",
    icon: "chevron-up",
    iconOnly: true,
    label: 'Move ' + fields[f] + ' up',
    disabled: i === 0,
    onClick: () => move(f, i - 1)
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Move down"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "xs",
    variant: "ghost",
    icon: "chevron-down",
    iconOnly: true,
    label: 'Move ' + fields[f] + ' down',
    disabled: i === order.length - 1,
    onClick: () => move(f, i + 1)
  })))), /*#__PURE__*/React.createElement(VisuallyHidden, {
    role: "status",
    "aria-live": "polite"
  }, msg));
}
// A · the dropdown (C: icon only): a Columns button opening the list; changes apply at once
function ColumnsDropdown({
  value,
  onChange,
  fields,
  iconOnly,
  variant = 'ghost'
}) {
  const pop = /*#__PURE__*/React.createElement(Popover, {
    title: "Columns",
    size: "lg",
    placement: "bottom-start",
    trigger: iconOnly ? /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: variant,
      icon: "fields",
      caret: true,
      label: "Columns"
    }) : /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: variant,
      icon: "fields",
      caret: true
    }, "Columns")
  }, /*#__PURE__*/React.createElement(ColumnsList, {
    value: value,
    onChange: onChange,
    fields: fields
  }));
  return iconOnly ? /*#__PURE__*/React.createElement(Tooltip, {
    content: "Columns"
  }, pop) : pop;
}
// E · the modal: the same list, larger, with search, Show all / Hide all and a First column select; changes apply on Apply
function ColumnsDialog({
  value,
  onChange,
  fields,
  variant = 'ghost'
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [q, setQ] = useState('');
  const first = draft.order[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: variant,
    icon: "fields",
    onClick: () => {
      setDraft(value);
      setQ('');
      setOpen(true);
    }
  }, "Manage columns"), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onClose: () => setOpen(false),
    title: "Manage columns",
    icon: "fields",
    size: "md",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      onClick: () => setOpen(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => {
        onChange(draft);
        setOpen(false);
      }
    }, "Apply"))
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "First column"
  }, /*#__PURE__*/React.createElement(Select, {
    value: first,
    options: draft.order.map(f => ({
      value: f,
      label: fields[f]
    })),
    onChange: e => setDraft({
      order: moveTo(draft.order, e.target.value, 0),
      hidden: draft.hidden.filter(x => x !== e.target.value)
    })
  })), /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Find a column",
    label: "Find a column",
    className: "study-panel-search"
  }), /*#__PURE__*/React.createElement(Inline, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "visibility",
    onClick: () => setDraft({
      order: draft.order,
      hidden: []
    })
  }, "Show all"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "visibility-off",
    onClick: () => setDraft({
      order: draft.order,
      hidden: draft.order.slice(1)
    })
  }, "Hide all")), /*#__PURE__*/React.createElement(ColumnsList, {
    value: draft,
    onChange: setDraft,
    fields: fields,
    filter: q
  }))));
}

/* ───────────── Controls, side by side (owner, 2026-10-14: "it needs to be an apples-to-apples comparison") ───────────── */
// Every way each control can be presented, each on an identical bar: the decided white framed bar (3A), a search field at
// the start, the count at the end, and the control under comparison in the same slot between them. Every card in a section
// drives the one sample table under the cards. Eliminate and Note are kept with the chooser's (same stores).

const TAGS = ['Approved', 'Draft', 'Client', 'Internal', 'Print', 'Web', 'Archive', 'Hero'];
const popOf = (title, trigger, body, footer, size = 'auto') => /*#__PURE__*/React.createElement(Popover, {
  title: title,
  size: size,
  trigger: trigger,
  footer: footer
}, body);
const HEIGHTS = [{
  value: 'short',
  label: 'Short'
}, {
  value: 'medium',
  label: 'Medium'
}, {
  value: 'tall',
  label: 'Tall'
}, {
  value: 'extra-tall',
  label: 'Extra tall'
}];
const DATES = [{
  value: 'any',
  label: 'Any time',
  short: 'Any time'
}, {
  value: '7',
  label: 'Last 7 days',
  short: '7 days'
}, {
  value: '30',
  label: 'Last 30 days',
  short: '30 days'
}, {
  value: 'year',
  label: 'This year',
  short: 'This year'
}];
// a quick filter (owner, 2026-10-14): a button that opens a searchable checklist of one field's values, shown as their pills;
// Tags is decided this way (E), Category and Type are proposed the same. App-specific: an app shows only the ones it has
function ChecklistBody({
  noun,
  options,
  value,
  setValue
}) {
  const [q, setQ] = useState('');
  const list = options.filter(o => o.value.toLowerCase().includes(q.trim().toLowerCase()));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: 'Find a ' + noun,
    label: 'Find a ' + noun,
    className: "study-panel-search"
  }), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, list.length ? list.map(o => /*#__PURE__*/React.createElement(Checkbox, {
    key: o.value,
    label: /*#__PURE__*/React.createElement(Pill, {
      color: o.color
    }, o.value),
    checked: value.includes(o.value),
    onChange: () => setValue(toggle(value, o.value))
  })) : /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, 'No ' + noun + ' matches')));
}
function QuickFilter({
  label,
  icon,
  noun,
  options,
  value,
  setValue,
  iconOnly,
  variant = 'ghost',
  caret = true
}) {
  const n = value.length;
  const trigger = iconOnly ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: variant,
    icon: icon,
    caret: caret,
    selected: n > 0,
    label: n ? label + ', ' + n : label
  }, n ? /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: "info"
  }, n) : null) : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: variant,
    icon: icon,
    caret: caret,
    selected: n > 0
  }, label, n ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement(Badge, {
    size: "sm",
    tone: "info"
  }, n)) : null);
  const pop = /*#__PURE__*/React.createElement(Popover, {
    title: label,
    size: "sm",
    trigger: trigger,
    footer: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      icon: "filter-off",
      disabled: !n,
      onClick: () => setValue([])
    }, "Clear")
  }, /*#__PURE__*/React.createElement(ChecklistBody, {
    noun: noun,
    options: options,
    value: value,
    setValue: setValue
  }));
  return iconOnly ? /*#__PURE__*/React.createElement(Tooltip, {
    content: label
  }, pop) : pop;
}
const DATE_ANY = {
  preset: 'any',
  from: '',
  to: ''
};
function DateBody({
  st,
  set
}) {
  const d = st.date;
  const range = (k, v) => set('date', Object.assign({}, d, {
    preset: 'custom',
    [k]: v
  }));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(RadioGroup, {
    label: "Modified",
    value: d.preset,
    onChange: v => set('date', Object.assign({}, d, {
      preset: v
    })),
    options: DATES.map(x => ({
      value: x.value,
      label: x.label
    })).concat({
      value: 'custom',
      label: 'Custom range'
    })
  }), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "From"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "date",
    data: true,
    value: d.from,
    onChange: e => range('from', e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "To"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "date",
    data: true,
    value: d.to,
    onChange: e => range('to', e.target.value)
  }))));
}
const countBtn = (icon, word, n, variant = 'ghost') => /*#__PURE__*/React.createElement(Button, {
  size: "sm",
  variant: variant,
  icon: icon,
  caret: true,
  selected: n > 0
}, word, n ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement(Badge, {
  size: "sm",
  tone: "info"
}, n)) : null);

// the sample: the table (with the thin column caret on its hover buttons) or the gallery
const typeIcon = t => t === 'Image' ? 'image-b' : t === 'Video' ? 'snapshot' : 'doc-text';
// the pill border, still open (owner, 2026-10-14): every pill has a 1px border two shades darker than its fill, but the
// category colors have no darker shade; drawn here as they are (the border in the fill's own color)
function PillSection({
  n,
  notes,
  setNotes
}) {
  const [editing, setEditing] = useState(false);
  const groups = [['Category', colored(['Projects', 'Brand', 'Marketing', 'Finance'])], ['Type', colored(TYPES, 4)], ['Tags', colored(TAGS, 1)]];
  return /*#__PURE__*/React.createElement("section", {
    className: "study-ctl-section",
    id: "ctl-pills",
    "aria-labelledby": "ctl-h-pills"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-head"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h2",
    id: "ctl-h-pills"
  }, n + ' · Pill border in category colors'), /*#__PURE__*/React.createElement(Text, {
    variant: "body"
  }, "Pills in the Filter values and the tables take the category colors. The pill rule asks for a border two shades darker than the fill; the category colors have no darker shade, so today the border is the fill's own color.")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "pencil",
    pressed: editing,
    onClick: () => setEditing(!editing)
  }, "Note")), /*#__PURE__*/React.createElement(NoteBox, {
    k: "controls|pills|",
    label: "the pill border",
    notes: notes,
    setNotes: setNotes,
    editing: editing,
    setEditing: setEditing
  }), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, groups.map(([label, opts]) => /*#__PURE__*/React.createElement(Inline, {
    key: label,
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label",
    className: "study-conj"
  }, label), opts.map(o => /*#__PURE__*/React.createElement(Pill, {
    key: o.value,
    color: o.color
  }, o.value)))))));
}
function ControlsPage({
  notes,
  setNotes
}) {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h1"
  }, "Controls, side by side"), /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "What is still open. Every control is decided and drawn on Decided so far; only the pill border remains.")), /*#__PURE__*/React.createElement(PillSection, {
    n: 1,
    notes: notes,
    setNotes: setNotes
  }));
}

/* ───────────── Decided so far (owner, 2026-10-14: "show what is decided, and remove what is no longer needed") ───────────── */
// The composed result as live screens (every bar button ghost), the panels as they now are, every decision and rule one
// per line, what is still open, and the record of eliminated options.

const DECISIONS = ['Layout: one bar (1A) while the few actions fit beside find and view; many actions get their own action bar over the find-and-view bar; pages that only find use 1F, a named button per view setting.', 'Bars fixed at the top: the main bar and the selection bar stay put while the table scrolls under them.', 'The main bar never changes on selection.', 'Commands are never hidden, only grayed until they apply, each with a tooltip saying why.', 'Selection: 2B, a second bar under the main bar, always visible: the actions, then Select all and Clear on the left (grayed with a tooltip saying why until they apply; Clear is grayed at 0); at the far right the count, "N selected", the number in DM Mono, no noun.', 'Look: 3A, the bar is white and framed, never tinted while rows are selected.', 'Button rule: icon and label while the bar fits; icons with tooltips when it does not; then only the actions that still do not fit go into More, from the end, Delete last. No primary by default; a page may mark one.', 'More (⋮) only when the actions don\'t fit; otherwise every action is shown.', 'Labels: Filter, Sort and Group keep their names; when active they take the tint and a count badge. Group follows Sort and Filter, for consistency.', 'View: 6B, one View menu with the layout (List, Gallery), the gallery\'s card size (S, M, L) and the list\'s row height (Short, Medium, Tall, Extra tall).', 'Filter, Sort and Group open Airtable-style panels; Columns is a list (first column, order, shown) in a dropdown, or larger in a Manage columns dialog.', 'Buttons: ghost (no outline), in every bar: the find-and-view controls, the actions and the selection bar\'s actions (this also settles the button shape).', 'Row height: View menu only; the table has no view button.', 'Filter holds every possibility; quick filters (Category, Type, Tags, Date) are optional shortcuts per app.', 'Category and Type: app-specific quick filters, between Filter and Sort, shown only in apps that have categories or types; presentation proposed: same as Tags.', 'Tags: E, a button that opens a searchable checklist (the GitHub labels style).', 'Date: E, a button that opens a panel with presets and a date range (the Google Analytics style).', 'Search: first on the find side of every bar (1F included, before the filters), one fixed width (240px): white, outlined, the search icon inside on the left, × once there is text, the height of the buttons beside it.', 'Search, narrow: a search icon in the same place; it opens the field across the bar, over the other controls, focused, with × to clear; Escape, or leaving it empty, collapses it back. Never squeezed to an odd width.', 'Search inside panels (Tags, Category, Type, Columns): the find field fills the panel width.', 'Narrow: icons only; Filter, Sort, Group, View and Columns stay separate, never merged.', 'Segmented controls: look A, a bordered group with a tinted selection (Material 3 / Fluent); today\'s look (gray track, white thumb) and B (filled) are eliminated.', 'Caret: the thin chevron (chevron-down, in the muted color) on every menu button in every bar, as on the columns; the small filled triangle is gone.', 'Kept as variants, not the standard: 1E filters in a side panel, 5C one Filters button and a panel.'];
const STILL_OPEN = ['The pill border for category-colored pills: the category colors have no darker shade for the two-shades-darker border (Controls, side by side).'];
// for the Platform later (owner, 2026-10-14): the DataTable's viewMenu default goes off, or the view button is removed
const PLATFORM_LATER = ['DataTable: the viewMenu default goes off (or the header view button is removed); row height lives in the page\'s View menu only.', 'SearchField: the fixed bar width (240px) and the collapse-to-icon behavior at narrow widths.', 'BulkActions / SelectionSummary: the count becomes "N selected" at the end of the bar (the number in DM Mono, no noun); the actions come first, then Select all and Clear.'];

// one decided screen: its label row (title, badge, the selection toggle, Note), its note, and the screen in a frame
function DecidedScreen({
  id,
  title,
  standard,
  lines = [],
  canSelect,
  notes,
  setNotes,
  render
}) {
  const [on, setOn] = useState(false);
  const [editing, setEditing] = useState(false);
  const [count, setCount] = useState(null);
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-head"
  }, /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "heading",
    as: "h3"
  }, title), standard ? /*#__PURE__*/React.createElement(Badge, {
    tone: "info",
    variant: "soft"
  }, standard) : null), /*#__PURE__*/React.createElement(Inline, {
    gap: "xs",
    wrap: true
  }, canSelect ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "checklist",
    pressed: on,
    onClick: () => setOn(!on)
  }, "2 items selected") : null, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "pencil",
    pressed: editing,
    onClick: () => setEditing(!editing)
  }, "Note"))), lines.map(l => /*#__PURE__*/React.createElement(Text, {
    key: l,
    variant: "secondary"
  }, l)), /*#__PURE__*/React.createElement(NoteBox, {
    k: 'decided|' + id,
    label: title,
    notes: notes,
    setNotes: setNotes,
    editing: editing,
    setEditing: setEditing
  }), /*#__PURE__*/React.createElement(CountSlot.Provider, {
    value: setCount
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-option"
  }, render(on))), count ? /*#__PURE__*/React.createElement(Text, {
    variant: "caption",
    className: "study-count-line"
  }, count) : null);
}

// the panels as they now are, drawn open (each in a popover's frame) and live
function PanelsNow() {
  const [filt, setFilt] = useState({
    join: 'and',
    items: [{
      id: 1,
      field: 'type',
      op: 'any',
      value: ['Image', 'Video']
    }, {
      id: 2,
      field: 'category',
      op: 'none',
      value: ['Finance']
    }]
  });
  const [sortLv, setSortLv] = useState([{
    field: 'modified',
    dir: 'desc'
  }, {
    field: 'name',
    dir: 'asc'
  }]);
  const [groups, setGroups] = useState([{
    field: 'type',
    dir: 'asc'
  }, {
    field: 'category',
    dir: 'asc'
  }]);
  const [cols, setCols] = useState({
    order: ['name', 'type', 'category', 'size', 'modified'],
    hidden: ['size']
  });
  const names = {
    name: 'Name',
    type: 'Type',
    category: 'Category',
    size: 'Size',
    modified: 'Modified'
  };
  const [tagDate, setTagDate] = useState({
    tags: ['Client'],
    date: {
      preset: '7',
      from: '',
      to: ''
    }
  });
  const setTD = (k, v) => setTagDate(o => Object.assign({}, o, {
    [k]: v
  }));
  const frame = (label, el) => /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "study-panel-frame"
  }, el));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, frame('Filter', /*#__PURE__*/React.createElement(FilterPanel, {
    fields: ASSET_FIELDS,
    value: filt,
    setValue: setFilt
  })), /*#__PURE__*/React.createElement("div", {
    className: "study-ctl-grid"
  }, frame('Sort', /*#__PURE__*/React.createElement(SortPanel, {
    fields: ASSET_FIELDS,
    levels: sortLv,
    setLevels: setSortLv,
    grouped: groups.length > 0
  })), frame('Group', /*#__PURE__*/React.createElement(GroupPanel, {
    fields: ASSET_FIELDS.filter(f => f.kind === 'select'),
    levels: groups,
    setLevels: setGroups
  })), frame('Columns: the dropdown\'s list', /*#__PURE__*/React.createElement(ColumnsList, {
    value: cols,
    onChange: setCols,
    fields: names
  })), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "Columns (the dialog) and View (6B): open them"), /*#__PURE__*/React.createElement("div", {
    className: "study-bar"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Columns and view"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, null, /*#__PURE__*/React.createElement(ColumnsDropdown, {
    value: cols,
    onChange: setCols,
    fields: names
  }), /*#__PURE__*/React.createElement(ColumnsDialog, {
    value: cols,
    onChange: setCols,
    fields: names
  }), /*#__PURE__*/React.createElement(ViewMenu, null))))), frame('Tags (E): a searchable checklist', /*#__PURE__*/React.createElement(ChecklistBody, {
    noun: "tag",
    options: colored(TAGS, 1),
    value: tagDate.tags,
    setValue: v => setTD('tags', v)
  })), frame('Date (E): presets and a date range', /*#__PURE__*/React.createElement(DateBody, {
    st: tagDate,
    set: setTD
  })), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "Tags and Date in a bar: open them"), /*#__PURE__*/React.createElement("div", {
    className: "study-bar"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    label: "Tags and date"
  }, /*#__PURE__*/React.createElement(Toolbar.Group, null, /*#__PURE__*/React.createElement(QuickFilter, {
    label: "Tags",
    icon: "tags",
    noun: "tag",
    options: colored(TAGS, 1),
    value: tagDate.tags,
    setValue: v => setTD('tags', v)
  }), popOf('Date', countBtn('calendar', 'Date', tagDate.date.preset === 'any' ? 0 : 1), /*#__PURE__*/React.createElement(DateBody, {
    st: tagDate,
    set: setTD
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "filter-off",
    disabled: tagDate.date.preset === 'any',
    onClick: () => setTD('date', DATE_ANY)
  }, "Clear"))))))));
}

// Fewer bars (owner, 2026-10-15: "after seeing the 3 bars, I don't like it"): the decided stack next to three ways to fewer bars
const FEWER = [{
  k: 'now',
  title: 'Now (decided)',
  lines: ['Few actions: one bar and the selection bar (2 bars). Many actions: an action bar, the find bar and the selection bar (3 bars).']
}, {
  k: 'd',
  title: 'D · One command bar; a selection adds a second row inside it',
  lines: ['One framed bar. When rows are selected, a second row appears in the same frame under a thin gray line, with the selection actions, Select all and Clear; it goes away when the selection is cleared. Many actions fold into More in the first row.']
}, {
  k: 'e',
  title: 'E · Like D, the second row always there, grayed until you select',
  lines: ['The same one frame with two rows, but the second row never comes and goes: its actions are grayed with a tooltip until rows are selected (the "see all options, even grayed" rule).']
}, {
  k: 'a',
  title: 'A · One main bar; the selection bar stays',
  lines: ['Many actions share the one bar and fold into More (⋮) from the end when they do not fit. The selection bar (2B) stays under it: always 2 bars.']
}, {
  k: 'b',
  title: 'B · Selection actions in the main bar, grayed until you select',
  lines: ['No selection bar. Download, Move, Share and the rest sit in the main bar, grayed with a tooltip until rows are selected, like MS Office: the bar never changes, buttons only turn on. "N selected" at the end. Select all and Clear: the table header checkbox. Many actions keep their own action bar: 1 or 2 bars.']
}, {
  k: 'c',
  title: 'C · A and B together: always one bar',
  lines: ['Every action (the selection ones grayed until you select), then search, filters and view, in one bar; what does not fit folds into More. Always 1 bar.']
}];
const CountSet = React.createContext(null);
function CountSwitch() {
  const at = React.useContext(CountAt),
    set = React.useContext(CountSet);
  return /*#__PURE__*/React.createElement(Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "The count"), /*#__PURE__*/React.createElement(Seg, {
    label: "Where the count sits",
    value: at,
    onChange: set,
    options: [{
      value: 'above',
      label: 'Above the table'
    }, {
      value: 'below',
      label: 'Under the card'
    }]
  }));
}
// Tidy bar (owner, 2026-10-15: E "looks messy and scattered"): E as drawn, then the four fixes and two combinations
const TIDY = [{
  k: '',
  title: 'E as drawn',
  lines: ['The actions on the left, a spacer, then search, filters and view on the right: the search box floats mid-bar; nine controls with the same gaps; mixed carets; row 2 text-only buttons.']
}, {
  k: 'a',
  title: 'A · Zones',
  lines: ['Actions | search and filters, then a spacer, then Sort, Group and View. The search starts its zone right after the actions (no longer floating); a divider between the zones.']
}, {
  k: 'b',
  title: 'B · Search leads',
  lines: ['Row 1: search and filters, a spacer, Sort, Group and View. Row 2: the actions, then the selection actions (grayed until you select), Select all and Clear.']
}, {
  k: 'c',
  title: 'C · Fewer things',
  lines: ['Category and Type are not buttons in the bar; they are fields in the Filter panel (Filter holds every possibility). 9 controls become 7.']
}, {
  k: 'd',
  title: 'D · One style per zone',
  lines: ['The actions are the first to go to icons; find and view keep their labels longest. Carets only on real menus (New, View); the panels (Filter, Category, Type, Sort, Group) have none. Select all and Clear get icons.']
}, {
  k: 'ad',
  title: 'A + D',
  lines: ['Zones, and one style per zone.']
}, {
  k: 'acd',
  title: 'A + C + D',
  lines: ['Zones, Category and Type in the Filter panel, and one style per zone.']
}];
function TidyBarPage({
  notes,
  setNotes
}) {
  const sp = {
    notes,
    setNotes
  };
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h1"
  }, "Tidy bar"), /*#__PURE__*/React.createElement(CountSwitch, null), /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "E (one frame, the selection row always there) made tidy. Few actions; the last two also with many. Live: use \"2 items selected\" to see the selection state.")), TIDY.map(f => /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    key: f.k || 'e',
    id: 'tidy-' + (f.k || 'e'),
    title: f.title,
    lines: f.lines,
    canSelect: true
  }, sp, {
    render: on => /*#__PURE__*/React.createElement(Built, {
      key: f.k + (on ? 'sel' : 'rest'),
      sit: "both",
      bars: "e",
      tidy: f.k,
      initial: on ? SIT.both.initial : []
    })
  }))), ['ad', 'acd'].map(k => /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    key: k + 'm',
    id: 'tidy-' + k + '-many',
    title: TIDY.find(f => f.k === k).title + ': many actions',
    canSelect: true
  }, sp, {
    render: on => /*#__PURE__*/React.createElement(Built, {
      key: k + 'm' + (on ? 'sel' : 'rest'),
      sit: "both",
      many: true,
      bars: "e",
      tidy: k,
      initial: on ? SIT.both.initial : []
    })
  }))));
}
function FewerBarsPage({
  notes,
  setNotes
}) {
  const sp = {
    notes,
    setNotes
  };
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h1"
  }, "Fewer bars"), /*#__PURE__*/React.createElement(CountSwitch, null), /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "The decided stack next to three ways to fewer bars, each with few and with many actions. Live: use \"2 items selected\" to see the selection state.")), FEWER.map(f => /*#__PURE__*/React.createElement(Stack, {
    key: f.k,
    gap: "lg"
  }, /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: 'fewer-' + f.k,
    title: f.title + ': few actions',
    lines: f.lines,
    canSelect: true
  }, sp, {
    render: on => /*#__PURE__*/React.createElement(Built, {
      key: f.k + (on ? 'sel' : 'rest'),
      sit: "both",
      bars: f.k,
      initial: on ? SIT.both.initial : []
    })
  })), /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: 'fewer-' + f.k + '-many',
    title: f.title + ': many actions',
    canSelect: true
  }, sp, {
    render: on => /*#__PURE__*/React.createElement(Built, {
      key: f.k + 'm' + (on ? 'sel' : 'rest'),
      sit: "both",
      many: true,
      bars: f.k,
      initial: on ? SIT.both.initial : []
    })
  })))));
}
function DecidedPage({
  elim,
  setElim,
  notes,
  setNotes
}) {
  const sp = {
    notes,
    setNotes,
    elim,
    setElim
  };
  const recRows = EARLIER.map(e => ({
    id: e.id,
    option: e.id.toUpperCase() + ' · ' + e.name,
    how: 'Eliminated earlier'
  })).concat(elim.map(id => ({
    id: 'x' + id,
    option: labelOf(id),
    how: 'Eliminated on the controls page'
  })));
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h1"
  }, "Decided so far"), /*#__PURE__*/React.createElement(CountSwitch, null), /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "The composed bars as they are decided, live: filter, sort, group, change the view and select rows."), /*#__PURE__*/React.createElement(Text, {
    variant: "body"
  }, "Buttons: ghost (no outline), in every bar. Row height: View menu only; the table has no view button.")), /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: "both",
    title: "Both, few actions: one bar (1A) and the selection bar (2B)",
    standard: "Decided",
    canSelect: true
  }, sp, {
    lines: ['Category and Type: app-specific: shown only in apps that have categories/types. Their presentation is proposed: same as Tags (a panel with a searchable checklist, values as their pills).', 'Actions on the left (icon and label, collapsing to icons); on the right Search, Filter, the quick filters, Sort, Group, View and the count. The selection bar is always there, its actions grayed with a tooltip until rows are selected. Fixed at the top: scroll the table and the bars stay.'],
    render: on => /*#__PURE__*/React.createElement(Built, {
      key: on ? 'sel' : 'rest',
      sit: "both",
      fixed: true,
      initial: on ? SIT.both.initial : []
    })
  })), /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: "many",
    title: "Both, many actions: the action bar over the find bar, then 2B",
    standard: "Decided",
    canSelect: true
  }, sp, {
    render: on => /*#__PURE__*/React.createElement(Built, {
      key: on ? 'sel' : 'rest',
      sit: "both",
      many: true,
      initial: on ? SIT.both.initial : []
    })
  })), /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: "filters",
    title: "Filters only: the 1F bar on the activity log",
    standard: "Decided"
  }, sp, {
    render: on => /*#__PURE__*/React.createElement(Built, {
      sit: "filters"
    })
  })), /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: "menu",
    title: "Menu only: team members with 2B",
    standard: "Decided",
    canSelect: true
  }, sp, {
    render: on => /*#__PURE__*/React.createElement(Built, {
      key: on ? 'sel' : 'rest',
      sit: "menu",
      initial: on ? SIT.menu.initial : []
    })
  })), /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: "neither",
    title: "Neither: the plain table",
    standard: "Decided"
  }, sp, {
    render: () => /*#__PURE__*/React.createElement(StorageByType, null)
  })), /*#__PURE__*/React.createElement(DecidedScreen, _extends({
    id: "narrow",
    title: "At a side panel's width",
    standard: "Narrow: icons only, never merged",
    canSelect: true
  }, sp, {
    lines: ['Filter, Sort, Group and View stay separate icon buttons, each with its tooltip and, when active, its tint and count; only the actions fold into More.'],
    render: on => narrowCell(/*#__PURE__*/React.createElement(Built, {
      key: on ? 'sel' : 'rest',
      sit: "both",
      narrow: true,
      initial: on ? SIT.both.initial : []
    }))
  })), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h2"
  }, "The panels as they now are"), /*#__PURE__*/React.createElement(PanelsNow, null)), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h2"
  }, "Decisions and rules"), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, DECISIONS.map(d => /*#__PURE__*/React.createElement(Text, {
    key: d,
    variant: "body"
  }, d)))), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h2"
  }, "Still open"), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, STILL_OPEN.map(d => /*#__PURE__*/React.createElement(Text, {
    key: d,
    variant: "body"
  }, d)))), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h2"
  }, "For the Platform later"), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, PLATFORM_LATER.map(d => /*#__PURE__*/React.createElement(Text, {
    key: d,
    variant: "body"
  }, d)))), /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "title",
    as: "h2"
  }, "On record: eliminated"), /*#__PURE__*/React.createElement(Table, {
    label: "Eliminated",
    data: recRows,
    columns: [{
      title: 'Option',
      field: 'option',
      kind: 'name'
    }, {
      title: 'How',
      field: 'how'
    }]
  })));
}
function App() {
  const [id, setId] = useState('tidy');
  const [countAt, setCountAt] = useStored('plenix-command-bar-study-count', 'below', v => v === 'above' || v === 'below');
  const [open, setOpen] = useState(true);
  const [types, setTypes] = useState([]);
  const [cats, setCats] = useState(['Projects']);
  const [elim, setElim] = useStored(EKEY, [], Array.isArray);
  const [notes, setNotes] = useStored(NKEY, {}, isObj);
  const o = OPTIONS.find(x => x.id === id) || null;
  const panel = {
    open,
    setOpen,
    types,
    setTypes,
    cats,
    setCats
  };
  const item = x => ({
    id: x.id,
    label: optionLabel(x)
  });
  const variants = GROUPS.find(g => g.variants),
    refs = GROUPS.find(g => g.reference);
  const groups = [{
    heading: 'Command bar',
    collapsible: false,
    items: [{
      id: 'tidy',
      label: 'Tidy bar',
      icon: 'view-table'
    }, {
      id: 'fewer',
      label: 'Fewer bars',
      icon: 'view-table'
    }, {
      id: 'decided',
      label: 'Decided so far',
      icon: 'check'
    }, {
      id: 'controls',
      label: 'Controls, side by side',
      icon: 'view-table'
    }]
  }, {
    heading: 'Kept variants',
    items: variants.options.map(item)
  }, {
    heading: 'Reference',
    defaultExpanded: false,
    items: refs.options.filter(x => !elim.includes(x.id)).map(item)
  }];
  const page = id === 'tidy' ? 'Tidy bar' : id === 'fewer' ? 'Fewer bars' : id === 'decided' ? 'Decided so far' : id === 'controls' ? 'Controls, side by side' : null;
  return /*#__PURE__*/React.createElement(AppShell, {
    page: "dam",
    header: /*#__PURE__*/React.createElement(AppHeader, {
      tone: "accent",
      appName: "Command bar study",
      brandHref: "#"
    }),
    sideNav: /*#__PURE__*/React.createElement(NavPane, {
      label: "Pages",
      title: "Menus over a collection"
    }, /*#__PURE__*/React.createElement(NavList, {
      label: "Pages",
      value: id,
      onSelect: setId,
      groups: groups
    })),
    panel: o && o.panel ? /*#__PURE__*/React.createElement(FiltersPanel, {
      open: open,
      onOpenChange: setOpen,
      types: types,
      setTypes: setTypes,
      cats: cats,
      setCats: setCats
    }) : undefined,
    footer: /*#__PURE__*/React.createElement(StatusBar, {
      start: /*#__PURE__*/React.createElement("span", null, o ? o.id.toUpperCase() + ' · ' + o.name : page),
      end: /*#__PURE__*/React.createElement("span", null, o ? o.standard : 'Eliminations and notes are kept in this browser')
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "plx-app-shell__page"
  }, /*#__PURE__*/React.createElement(CountSet.Provider, {
    value: setCountAt
  }, /*#__PURE__*/React.createElement(CountAt.Provider, {
    value: countAt
  }, /*#__PURE__*/React.createElement(PageContent, null, id === 'tidy' ? /*#__PURE__*/React.createElement(TidyBarPage, {
    notes: notes,
    setNotes: setNotes
  }) : id === 'fewer' ? /*#__PURE__*/React.createElement(FewerBarsPage, {
    notes: notes,
    setNotes: setNotes
  }) : id === 'decided' ? /*#__PURE__*/React.createElement(DecidedPage, {
    elim: elim,
    setElim: setElim,
    notes: notes,
    setNotes: setNotes
  }) : id === 'controls' ? /*#__PURE__*/React.createElement(ControlsPage, {
    elim: elim,
    setElim: setElim,
    notes: notes,
    setNotes: setNotes
  }) : o ? /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(StudyNote, {
    o: o
  }), /*#__PURE__*/React.createElement(o.View, {
    key: o.id,
    panel: panel
  })) : null)))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(SessionProvider, null, /*#__PURE__*/React.createElement(App, null)));
})();
