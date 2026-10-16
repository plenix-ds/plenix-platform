/* compiled from options.jsx; do not edit */
(function () {
/* Touch options study (docs/touch-options/options.jsx): the two open touch decisions drawn with Platform components, so
   the owner can choose (owner, 2026-10-15: "i need to see visual options"; GitHub #26 and #27). 1. where the pane's size
   menu goes with touch (it covers the pane today); 2. what the AppHeader's links follow when the header is narrower than
   the screen. A study, not a Platform part. Compiled to options.js with tools/agent/build-study.js. */
const {
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  MenuGroup,
  NavList,
  Text,
  Stack,
  Inline,
  Badge,
  AppHeader,
  SearchField,
  SessionProvider,
  SectionHeading
} = Plenix;
const {
  useState
} = React;
const noop = () => {};
const FOLDERS = [{
  id: 'all',
  label: 'All assets',
  icon: 'folder'
}, {
  id: 'brand',
  label: 'Brand kit',
  icon: 'folder'
}, {
  id: 'projects',
  label: 'Projects',
  icon: 'folder'
}, {
  id: 'archive',
  label: 'Archive',
  icon: 'folder'
}];
const SIZE_ITEMS = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuItem, {
  icon: "column-narrower"
}, "Narrower"), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "column-wider"
}, "Wider"), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "column-fit"
}, "Reset width"), /*#__PURE__*/React.createElement(MenuItem, {
  icon: "panel-left-close"
}, "Collapse"));
const sizeMenu = cls => /*#__PURE__*/React.createElement(Menu, {
  label: "Folders pane width",
  placement: "bottom-start",
  className: cls,
  trigger: /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    iconOnly: true,
    icon: "drag",
    label: "Folders pane width"
  })
}, SIZE_ITEMS);
function Pane({
  head,
  children
}) {
  const [cur, setCur] = useState('brand');
  return /*#__PURE__*/React.createElement("div", {
    className: "study-pane"
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-pane__head"
  }, /*#__PURE__*/React.createElement(SectionHeading, null, "Folders"), head), /*#__PURE__*/React.createElement(NavList, {
    label: "Folders",
    items: FOLDERS,
    current: cur,
    onSelect: it => setCur(it.id)
  }), children);
}
function Content() {
  return /*#__PURE__*/React.createElement("div", {
    className: "study-content"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "title"
  }, "Brand kit"), /*#__PURE__*/React.createElement(Text, {
    as: "p",
    tone: "muted"
  }, "The selected folder's assets show here."));
}
function Option({
  letter,
  title,
  recommended,
  pros,
  cons,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "study-option",
    "aria-label": 'Option ' + letter + ': ' + title
  }, /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    align: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h3",
    variant: "heading"
  }, letter, ". ", title), recommended ? /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    icon: "check"
  }, "Recommended") : null), /*#__PURE__*/React.createElement("div", {
    className: "study-frame"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "study-notes"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "label"
  }, "For"), /*#__PURE__*/React.createElement("ul", {
    className: "study-list"
  }, pros.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, p)))), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "label"
  }, "Against"), /*#__PURE__*/React.createElement("ul", {
    className: "study-list"
  }, cons.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, p))))));
}
function Splitter() {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h2",
    variant: "title"
  }, "1. The pane's size menu with touch"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    icon: "close"
  }, "Decided: no change (owner, 2026-10-15: resizing a pane by touch is not common)"), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "A pane's width can be changed without dragging, from a small menu: Narrower, Wider, Reset width, Collapse. With a mouse its button shows on hover; with touch there is no hover, so it must always show. Each frame below is a tablet with touch (48px targets). Tap the buttons: the menus work.")), /*#__PURE__*/React.createElement(Option, {
    letter: "Today",
    title: "On the divider, over the pane",
    pros: ['Right where the resizing happens'],
    cons: ['Covers the pane’s content (here: a folder row)', 'One of the touch-target findings left (it overlaps a 48px row)']
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-shell"
  }, /*#__PURE__*/React.createElement(Pane, null, sizeMenu('study-on-edge')), /*#__PURE__*/React.createElement("div", {
    className: "study-divider"
  }), /*#__PURE__*/React.createElement(Content, null))), /*#__PURE__*/React.createElement(Option, {
    letter: "A",
    title: "A strip reserved beside the pane",
    pros: ['Always visible, covers nothing', 'Stays on the divider, where resizing is'],
    cons: ['Costs 48px of width on every pane, even when nobody resizes', 'A column of empty space under the button']
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-shell"
  }, /*#__PURE__*/React.createElement(Pane, null), /*#__PURE__*/React.createElement("div", {
    className: "study-strip"
  }, sizeMenu()), /*#__PURE__*/React.createElement(Content, null))), /*#__PURE__*/React.createElement(Option, {
    letter: "B",
    title: "An icon button in the pane's header",
    recommended: true,
    pros: ['Always visible, covers nothing, no space lost', 'Found where the pane’s own controls are', 'One place for touch, mouse and keyboard'],
    cons: ['A step away from the divider (the drag still works on the divider)']
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-shell"
  }, /*#__PURE__*/React.createElement(Pane, {
    head: sizeMenu()
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-divider"
  }), /*#__PURE__*/React.createElement(Content, null))), /*#__PURE__*/React.createElement(Option, {
    letter: "C",
    title: "Inside the pane's More menu",
    pros: ['No new button at all'],
    cons: ['Hidden: hard to find on a phone or tablet', 'Needs a More menu on every pane that resizes']
  }, /*#__PURE__*/React.createElement("div", {
    className: "study-shell"
  }, /*#__PURE__*/React.createElement(Pane, {
    head: /*#__PURE__*/React.createElement(Menu, {
      label: "Folders options",
      placement: "bottom-start",
      trigger: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        iconOnly: true,
        icon: "more",
        label: "Folders options"
      })
    }, /*#__PURE__*/React.createElement(MenuItem, {
      icon: "folder-add"
    }, "New folder"), /*#__PURE__*/React.createElement(MenuItem, {
      icon: "refresh"
    }, "Refresh"), /*#__PURE__*/React.createElement(MenuDivider, null), /*#__PURE__*/React.createElement(MenuGroup, {
      label: "Pane width"
    }, SIZE_ITEMS))
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-divider"
  }), /*#__PURE__*/React.createElement(Content, null))));
}
const header = key => /*#__PURE__*/React.createElement(AppHeader, {
  key: key,
  tone: "accent",
  currentApp: "dam",
  appsRoot: "../../",
  onOpenApp: () => true,
  search: /*#__PURE__*/React.createElement(SearchField, {
    placeholder: "Search assets",
    label: "Search everything",
    onAccent: true
  }),
  account: /*#__PURE__*/React.createElement(AppHeader.Account, {
    myAccount: {
      onSelect: noop
    },
    settings: {
      onSelect: noop
    },
    signOut: {
      onSelect: noop
    }
  })
});
function HeaderWidths({
  cq
}) {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, [['wide', 'A full window (900px)'], ['split', 'Split view: half a desktop screen (720px)'], ['narrow', 'An embedded page or a side panel (400px)']].map(([w, label]) => /*#__PURE__*/React.createElement(Stack, {
    key: w,
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: 'study-header study-header--' + w + (cq ? ' study-header--cq' : '')
  }, header(w)))));
}
function HeaderCollapse() {
  return /*#__PURE__*/React.createElement(Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h2",
    variant: "title"
  }, "2. The AppHeader's links in a narrow header"), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    icon: "check"
  }, "Decided: B, built (owner, 2026-10-15). The header now measures its own width, so both rows below show B."), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "Below 840px the header hides its pinned-app links (the app switcher in the header name still has them) and lets the search span the bar. Today it checks the screen's width. When the header is narrower than the screen (a split view, an embedded page), the links stay and crowd the bar. These frames are on this wide screen, so they show exactly that.")), /*#__PURE__*/React.createElement(Option, {
    letter: "A",
    title: "By the screen's width (today)",
    pros: ['No change'],
    cons: ['In a split view or an embedded page the links crowd the bar and their targets shrink (the other touch finding left)']
  }, /*#__PURE__*/React.createElement(HeaderWidths, null)), /*#__PURE__*/React.createElement(Option, {
    letter: "B",
    title: "By the header's own width",
    recommended: true,
    pros: ['The header looks the same wherever it sits: a full window, a split view, a panel', 'The same rule as today, measured on the header instead of the screen (a container query)'],
    cons: ['Every app’s header changes behavior in split views (on purpose)']
  }, /*#__PURE__*/React.createElement(HeaderWidths, {
    cq: true
  })));
}
function App() {
  return /*#__PURE__*/React.createElement(SessionProvider, null, /*#__PURE__*/React.createElement("main", {
    className: "study-page"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h1",
    variant: "display"
  }, "Touch options"), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "Two decisions waiting on the owner, drawn with Platform components (GitHub plenix-ds/plenix-platform #26 and #27). Each option says what speaks for it and against it; the recommended one is marked.")), /*#__PURE__*/React.createElement(Splitter, null), /*#__PURE__*/React.createElement(HeaderCollapse, null))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
