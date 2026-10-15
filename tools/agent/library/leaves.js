// sec|Leaf|Target|role|note   (role: p builds, v variant of target, d same thing as target's primary, c covered elsewhere → own record)
// a 'c' target "rec:<record id>@<wave><lane>" names the existing record that answers it and where its record is written
module.exports = `
foundations|Logos|BrandMark|p|kind="logo"; brand-mark covers 'Logo' (singular) today, a name mismatch with the taxonomy
foundations|Wordmarks|BrandMark|v|kind="wordmark"
foundations|Brand marks|BrandMark|v|kind="mark"; brand-mark covers 'Brand mark' (singular)
foundations|Product marks|BrandMark|v|product mark per application
foundations|Brand application|brand-application|p|
foundations|Illustrations|Illustration|p|
foundations|Data visualization colors|dataviz-colors|p|
foundations|Contrast rules|contrast|p|
foundations|Heading hierarchy|SectionHeading|c|already covered by heading (covers foundations/Heading hierarchy)
foundations|Body styles|Text|p|variant body, lead
foundations|Label styles|Text|v|variant label
foundations|Caption styles|Text|v|variant caption
foundations|Text truncation|Text|v|truncate + lines
foundations|Display type|Text|v|new variant display
foundations|Tabular figures|Text|v|prop tabular
foundations|Pictograms|Pictogram|p|
foundations|Icon tile|IconTile|p|
foundations|Loading motion|loading-motion|p|
foundations|Gesture motion|gesture|v|the gesture motion tokens
foundations|High-contrast theme|themes-extra|p|needs the owner's OK (no new colors)
foundations|Product themes|themes-extra|v|
foundations|Theme zones|themes-extra|v|ThemeZone
foundations|AI visual language|ai-visual-language|p|
foundations|Design principles|content-guides|p|NOT CODE: a guide record
foundations|Visual hierarchy|content-guides|v|NOT CODE: a guide record with live examples
foundations|Layout grid|layout-grid|p|
foundations|Keylines|keylines|p|
foundations|Aspect-ratio scale|aspect-ratio-scale|p|
foundations|Hover treatment|interaction-states|p|
foundations|Focus treatment|interaction-states|v|links to the focus-ring record
foundations|Pressed treatment|interaction-states|v|
foundations|Selected treatment|interaction-states|v|
foundations|Dragged treatment|interaction-states|v|
foundations|Disabled treatment|interaction-states|v|
foundations|Voice and tone|content-guides|v|NOT CODE: a guide record
foundations|Style and grammar|content-lint|p|
foundations|Capitalization|content-lint|v|sentence-case rule
foundations|Inclusive language|content-lint|v|term list rule
foundations|Terminology|content-lint|v|glossary + rule
foundations|Action labels|content-lint|v|verb list rule on Button/MenuItem labels
foundations|Writing messages|content-guides|v|NOT CODE: a guide record
foundations|Empty-state and onboarding copy|content-guides|v|NOT CODE: guide with EmptyState examples
foundations|Text alternatives|content-lint|v|alt/label required rule
foundations|Numbers and units|format|p|
foundations|Date and time formats|format|v|
foundations|Currency and percentages|format|v|
foundations|Names, addresses and phone numbers|format|v|
layout|Aspect ratio|Preview|p|
layout|Bleed|Stack|p|
layout|Center|Stack|v|
layout|Sidebar|NavPane|c|side-navigation covers layout/Sidebar
layout|Rail|NavPane|c|navigation-rail covers layout/Rail (ToolRail)
layout|Main content region|AppShell|c|application-shell covers it
layout|Secondary region|AppShell|c|inspector-region covers it (SidePanel)
layout|Sticky region|Sticky|p|
layout|Fixed region|Sticky|v|position fixed
layout|Footer region|AppShell|c|application-shell covers it
layout|One-column layout|AppShell|p|page kind with the contained layout
layout|Three-column layout|AppShell|c|application-shell covers it
layout|Master-detail layout|AppShell|c|dam-template covers it; SecondaryPane list-detail
layout|Sidebar layout|AppShell|c|application-shell covers it
layout|Masonry layout|ContentGrid|p|
layout|Holy Grail layout|AppShell|c|application-shell covers it
layout|Full-screen workspace|AppShell|v|page="editor" (focus)
layout|Breakpoints|AppShell|c|breakpoints covers layout/Breakpoints
layout|Hide / show|ResponsiveVisibility|p|same as breakpoint-utility's Responsive visibility
layout|Reorder|Stack|v|reverse/reverseBelow
layout|Collapse|Columns|p|
layout|Adaptive navigation|NavPane|v|the shell modes inline/rail/overlay/bar/screen
layout|Adaptive density|AppShell|c|density covers layout/Adaptive density
content|Rich text|RichText|p|
content|Blockquote|Blockquote|p|
content|Ordered list|List|p|
content|Inline code|Code|p|
content|Inline link|Link|p|
content|Standalone link|Link|v|
content|External link|Link|v|
content|Back link|Link|v|
content|Skip link|AppShell|c|application-shell covers content/Skip link
content|Image|Image|p|
content|Responsive image|Image|v|
content|Figure|Figure|p|
content|Image gallery|AssetGallery|v|AssetGallery's generic form (images + lightbox)
content|Illustration|Illustration|d|same as Illustrations (foundations)
content|Video|MediaPlayer|v|
content|Audio|MediaPlayer|v|
content|QR code|QRCode|p|
content|Barcode|Barcode|p|
content|Color swatch|ColorSwatch|p|built, no record of its own
content|Avatar group|AvatarGroup|p|
content|Profile summary|Persona|p|
content|User card|UserCard|p|
content|Team|PeopleGroup|p|
content|Group|PeopleGroup|v|
content|Role|RoleLabel|p|
content|Permission summary|PermissionSummary|p|
content|Presence|Avatar|p|presence on the avatar
content|Online status|Avatar|d|same as Presence
content|Timestamp|Time|p|
content|Relative time|Time|v|
content|Date label|Time|v|
content|Version label|VersionLabel|p|
actions|Split button|SplitButton|p|
actions|Floating action button|FloatingActionButton|p|
actions|Action list|rec:interactive-list@7A|c|interactive-list covers actions/Action list
actions|Context menu|Menu|p|
actions|Command menu|CommandMenu|p|
actions|Command palette|CommandPalette|p|
actions|Radio menu item|Menu|v|
actions|Modal trigger|rec:dialog@4B|c|dialog covers actions/Modal trigger
actions|Tooltip trigger|Tooltip|c|tooltip covers actions/Tooltip trigger
actions|Copy|CopyButton|p|
actions|Download|DownloadButton|p|
actions|Export|ExportDialog|p|
actions|Import|ImportDialog|p|
actions|Print|print|p|
actions|Share|ShareDialog|v|the action that opens it
actions|Duplicate|DuplicateAction|p|
actions|Rename|RenameAction|p|
actions|Delete|DeleteFlow|v|the action; the flow is patterns/Delete flow
actions|Back to top|BackToTop|p|
forms|Form section|Form|p|
forms|Field group|Fieldset|p|
forms|Legend|Fieldset|v|
forms|Error summary|ErrorSummary|p|
forms|Input group|InputGroup|p|
forms|Form actions|Form|v|
forms|Character counter|Field|p|
forms|Read-only field|Input|p|already a state; its own page
forms|Field style variants|Input|v|appearance prop
forms|Autogrowing text area|Input|v|Textarea autoGrow
forms|Rich-text editor|RichTextEditor|p|
forms|Code editor|CodeEditor|p|
forms|Inline editable text|InlineEdit|p|
forms|PIN / OTP input|OtpInput|p|
forms|Toggle button|Button|p|pressed exists
forms|Async select|Combobox|p|
forms|Checkbox select|Combobox|v|
forms|Radio select|Combobox|v|
forms|Cascader|Cascader|p|
forms|Tree select|TreeSelect|p|
forms|People picker|EntityPicker|v|people preset
forms|Entity picker|EntityPicker|p|
forms|Country / locale select|CountrySelect|p|
forms|Calendar|Calendar|p|
forms|Date picker|DatePicker|p|
forms|Date range picker|DatePicker|v|
forms|Time picker|TimePicker|p|
forms|Date-time picker|DatePicker|v|
forms|Relative date input|RelativeDateInput|p|
forms|Time-zone selector|TimeZoneSelect|p|
forms|Swatch picker|ColorPicker|p|built (ColorPicker), no record of its own
forms|Number input|NumberInput|p|
forms|Stepper|NumberInput|v|stepper buttons (the form control, not the navigation stepper)
forms|Currency input|NumberInput|v|
forms|Percentage input|NumberInput|v|
forms|Quantity selector|NumberInput|v|
forms|Range slider|Slider|p|
forms|File input|FileInput|p|
forms|Image upload|ImageUpload|p|
forms|Avatar upload|AvatarUpload|p|
forms|Attachment picker|AttachmentPicker|p|
forms|Media picker|FilePicker|v|media mode
navigation|Product navigation|AppHeader|v|header nav + NavPane: its own record
navigation|Mega menu|MegaMenu|p|
navigation|Miller columns|MillerColumns|p|
navigation|Stepper|ProgressSteps|p|
navigation|Vertical tabs|Tabs|p|
navigation|Skip navigation|AppShell|c|application-shell covers navigation/Skip navigation
navigation|Load more / infinite scroll|LoadMore|p|
navigation|Bottom navigation|NavPane|p|the bar mode
navigation|Mobile app bar|AppHeader|p|
navigation|Mobile navigation drawer|NavPane|v|overlay mode
navigation|Mobile menu|NavPane|d|same as Mobile navigation drawer
navigation|Bottom-sheet navigation|BottomSheetNav|p|
navigation|Mobile tab bar|NavPane|d|same as Bottom navigation
navigation|Search bar|SearchField|c|search-input covers navigation/Search bar
navigation|Search suggestions|SearchField|p|
navigation|Autocomplete search|SearchField|d|same as Search suggestions
navigation|Search result item|SearchResult|p|
navigation|Search result groups|SearchResult|v|SearchResultGroup
navigation|Recent searches|SearchField|v|
navigation|Search history|SearchField|d|same as Recent searches
navigation|Filter panel|FilterPanel|p|
navigation|Sort control|rec:action-bar@7B|c|action-bar (DataToolbar) covers navigation/Sort control
navigation|Query builder|QueryBuilder|p|
data-display|Grouped list|rec:navigation-menu@7C|c|navigation-menu covers data-display/Grouped list; a non-navigation grouped list is ResourceList grouped
data-display|Resource list|ResourceList|p|
data-display|Object list|ResourceList|d|same as Resource list
data-display|Virtualized list|VirtualList|p|
data-display|Timeline|Timeline|p|
data-display|Product card|ProductCard|p|
data-display|Profile card|UserCard|d|same as User card
data-display|Metric card|Metric|p|
data-display|Feature card|FeatureCard|p|
data-display|Expandable card|Card|p|
data-display|Chart foundations|ChartKit|p|
data-display|Chart legend|chart-parts|p|
data-display|Chart tooltip|chart-parts|v|
data-display|Data label|chart-parts|v|
data-display|Axis|chart-parts|v|
data-display|Grid line|chart-parts|v|
data-display|Threshold|chart-parts|v|ReferenceLine kind="threshold"
data-display|Reference line|chart-parts|v|
data-display|Annotation|chart-parts|v|ChartAnnotation (not specialized/Annotation)
data-display|Line chart|LineChart|p|
data-display|Area chart|AreaChart|p|
data-display|Bar chart|BarChart|p|
data-display|Column chart|BarChart|v|orientation vertical
data-display|Stacked bar chart|BarChart|v|
data-display|Pie chart|PieChart|p|
data-display|Donut chart|PieChart|v|
data-display|Scatter plot|ScatterChart|p|
data-display|Bubble chart|ScatterChart|v|
data-display|Heat map|HeatMap|p|
data-display|Histogram|BarChart|v|binned
data-display|Box plot|BoxPlot|p|
data-display|Bullet chart|BulletChart|p|
data-display|Gauge|Gauge|p|
data-display|Funnel|FunnelChart|p|
data-display|Waterfall|WaterfallChart|p|
data-display|Sankey diagram|SankeyDiagram|p|
data-display|Radar chart|RadarChart|p|
data-display|Sparkline|Sparkline|p|
data-display|Chart accessibility|chart-a11y|p|
data-display|Treemap|Treemap|p|
data-display|Combo chart|ComboChart|p|
data-display|Lollipop chart|LollipopChart|p|
data-display|Step chart|LineChart|v|curve step
data-display|Word cloud|WordCloud|p|
data-display|Gantt chart|GanttChart|p|
data-display|Choropleth map|GeoMap|v|
data-display|Chart interaction|chart-interaction|p|
data-display|Carousel|Carousel|p|
data-display|Map|GeoMap|p|
data-display|Graph / network|NetworkGraph|p|
data-display|Diagram|Diagram|p|
data-display|Timeline visualization|TimelineChart|p|
data-display|Comparison view|ComparisonView|p|
feedback|Banner|Banner|p|
feedback|Section message|Notice|p|
feedback|Status icon|StatusIcon|p|
feedback|Status badge|rec:badge@3C|c|badge covers feedback/Status badge
feedback|Count badge|rec:counter@3C|c|counter covers feedback/Count badge
feedback|Availability indicator|StatusDot|p|
feedback|Circular progress|ProgressCircle|p|
feedback|Progress tracker|ProgressSteps|d|same as navigation Stepper
feedback|Step progress|ProgressSteps|d|same as navigation Stepper
feedback|Loading overlay|LoadingOverlay|p|
feedback|Error state|EmptyState|p|tone error exists; own page
feedback|Warning state|EmptyState|v|
feedback|Success state|EmptyState|v|
feedback|Offline state|EmptyState|v|
feedback|Degraded state|EmptyState|v|
feedback|Permission-denied state|EmptyState|v|
feedback|Not-found state|EmptyState|v|
feedback|Maintenance state|EmptyState|v|
feedback|Retry pattern|Retry|p|
feedback|Undo pattern|Toast|p|
feedback|Completion state|EmptyState|v|
feedback|Disabled state|interaction-states|d|same as Disabled treatment
feedback|Read-only state|read-only-context|p|
overlays|Non-modal dialog|Dialog|p|
overlays|Prompt dialog|Dialog|v|
overlays|Full-screen dialog|Dialog|v|size="full" exists
overlays|Wizard dialog|WizardDialog|p|
overlays|Navigation drawer|NavPane|v|overlay mode
overlays|Inspector drawer|rec:inspector-region@4B|c|inspector-region covers overlays/Inspector drawer
overlays|Properties panel|rec:inspector-region@4B|c|inspector-region covers overlays/Properties panel
overlays|Help panel|HelpPanel|p|
overlays|Popover|Popover|p|
overlays|Popup|Popover|d|same as Popover
overlays|Inline dialog|Popover|d|Atlassian's name for a popover
overlays|Hover card|Popover|v|trigger hover
overlays|Rich tooltip|Tooltip|p|
overlays|Teaching bubble|TeachingBubble|p|
overlays|Contextual help|ContextualHelp|p|
overlays|Context menu|Menu|d|same as actions/Context menu
overlays|Dropdown surface|Menu|c|action-menu covers overlays/Dropdown surface
overlays|Anchored overlay|floating|d|same as Floating positioning
overlays|Popconfirm|Popconfirm|p|
overlays|Details|Details|p|
overlays|Truncate / expand|Text|v|expandable
overlays|Backdrop / scrim|Scrim|p|
overlays|Focus trap|rec:overlay-manager@4C|c|overlay-manager covers it
overlays|Focus restoration|rec:overlay-manager@4C|c|overlay-manager covers it
overlays|Scroll lock|scroll-lock|p|
overlays|Portal|Portal|p|
overlays|Floating positioning|floating|p|
overlays|Overlay accessibility|rec:overlay-manager@4C|c|overlay-manager covers it
patterns|Single selection|press-focus-select|v|useSelection single
patterns|Transfer list|TransferList|p|
patterns|Dual listbox|TransferList|d|same as Transfer list
patterns|Grouping|GroupBy|p|
patterns|Reordering|SortableList|d|same as Sortable list
patterns|Drag and drop|dnd|v|the pattern page on the engine
patterns|Sortable list|SortableList|p|
patterns|Drop target|DropZone|p|
patterns|Resize|Resizable|p|
patterns|Reposition|dnd|v|free move
patterns|Create flow|FormFlow|p|
patterns|Edit flow|FormFlow|v|
patterns|Multi-step form|Wizard|v|
patterns|Wizard|Wizard|p|
patterns|Inline editing|InlineEdit|d|same as Inline editable text
patterns|Autosave|Autosave|p|
patterns|Draft state|DraftState|p|
patterns|Save as|SaveAs|p|
patterns|Duplicate|DuplicateAction|d|same as actions/Duplicate
patterns|Import|ImportDialog|d|same as actions/Import
patterns|Export|ExportDialog|d|same as actions/Export
patterns|Delete flow|DeleteFlow|p|
patterns|Review flow|ReviewFlow|p|
patterns|Compare|ComparisonView|d|same as Comparison view
patterns|Approve|ReviewFlow|v|
patterns|Reject|ReviewFlow|v|
patterns|Assign|AssignControl|p|
patterns|Delegate|AssignControl|v|
patterns|Publish|Publish|p|
patterns|Unpublish|Publish|v|
patterns|Archive|ArchiveRestore|p|
patterns|Restore|ArchiveRestore|v|
patterns|Onboarding|Onboarding|p|
patterns|Product tour|Tour|p|
patterns|Spotlight|Spotlight|p|
patterns|Coach mark|TeachingBubble|d|same as Teaching bubble
patterns|Walkthrough|Tour|d|same as Product tour
patterns|Checklist|Checklist|p|
patterns|Contextual education|ContextualHelp|v|inline tip
patterns|Feature introduction|FeatureIntro|p|
patterns|Sign in|Auth|p|
patterns|Sign up|Auth|v|
patterns|Password reset|Auth|v|
patterns|Multi-factor authentication|Auth|v|
patterns|Single sign-on|Auth|v|
patterns|Account recovery|Auth|v|
patterns|Permissions|PermissionsEditor|p|
patterns|Roles|RoleManager|p|
patterns|Access request|AccessRequest|p|
patterns|Account connection|ConnectedAccounts|p|
patterns|Session timeout|SessionTimeout|p|
patterns|Import workflow|ImportWizard|p|
patterns|Export workflow|ExportDialog|v|background export mode
patterns|Data review workflow|ReviewFlow|v|review queue
patterns|Lifecycle journeys|content-guides|v|NOT CODE: a journey map linking Onboarding, Trial and upgrade, Offboarding
patterns|Trial and upgrade|TrialUpgrade|p|
patterns|Offboarding|Offboarding|p|
page-structures|Header|AppHeader|c|application-header covers page-structures/Header
page-structures|Global navigation|AppHeader|c|application-header covers it
page-structures|Sidebar|NavPane|c|side-navigation covers page-structures/Sidebar
page-structures|Split workspace|templates|v|
page-structures|Landing page|templates|p|
page-structures|Create page|templates|v|
page-structures|Edit page|templates|v|
page-structures|Authentication page|templates|v|uses Auth
page-structures|Error page|templates|v|
page-structures|Empty application state|rec:empty-state@3C|c|empty-state covers it
page-structures|Full-screen experience|templates|v|
page-structures|Page actions bar|ActionBar|p|
page-structures|Search template|rec:search-workspace@7B|c|search-workspace covers it
page-structures|Authentication template|templates|d|same as Authentication page
specialized|File|File|p|
specialized|Folder|File|v|
specialized|Asset|MediaCard|p|asset preset
specialized|Collection|MediaCard|v|collection stack
specialized|File browser|FileBrowser|p|
specialized|Folder browser|rec:tree-view@12A|c|tree-view covers it
specialized|Asset browser|rec:dam-template@12B|c|dam-template covers it
specialized|File list|FileList|p|
specialized|Asset grid|rec:dam-template@12B|c|dam-template covers it
specialized|Asset gallery|AssetGallery|p|
specialized|Asset card|MediaCard|c|media-card covers it
specialized|File row|FileRow|p|
specialized|Thumbnail|MediaCard|c|media-card covers specialized/Thumbnail
specialized|Media viewer|rec:media-lightbox@12C|c|media-lightbox covers it
specialized|Document viewer|DocumentViewer|p|
specialized|Image viewer|rec:media-lightbox@12C|c|media-lightbox covers it
specialized|Video player|MediaPlayer|p|
specialized|Audio player|MediaPlayer|v|
specialized|Upload manager|UploadManager|p|
specialized|Download manager|DownloadManager|p|
specialized|File picker|FilePicker|p|
specialized|Asset picker|FilePicker|v|assets mode
specialized|Metadata editor|MetadataEditor|p|
specialized|Version history|VersionHistory|p|
specialized|Version comparison|VersionCompare|p|
specialized|Related assets|RelatedAssets|p|
specialized|Renditions and derivatives|RenditionList|p|
specialized|Comment|Comment|p|
specialized|Comment thread|CommentThread|p|
specialized|Reply|CommentThread|v|reply composer
specialized|Mention|MentionInput|p|
specialized|Annotation|ImageAnnotation|p|
specialized|Inbox|rec:activity-stream@13B|c|activity-stream covers specialized/Inbox
specialized|Notification center|rec:notification-center@13B|c|notification-center covers it
specialized|Announcement|Announcement|p|
specialized|Activity feed|rec:activity-stream@13B|c|activity-stream covers it
specialized|Audit history|AuditLog|p|
specialized|Sharing|ShareDialog|p|
specialized|Presence|PresenceBar|p|live viewers (content/Presence is the avatar dot)
specialized|Approval workflow|ApprovalWorkflow|p|
specialized|Product discovery|Commerce|p|
specialized|Product listing|Commerce|v|
specialized|Product detail|Commerce|v|
specialized|Product options|ProductOptions|p|
specialized|Cart|Commerce|v|
specialized|Checkout|Commerce|v|
specialized|Payment|Commerce|v|UI only, no processing
specialized|Order confirmation|Commerce|v|
specialized|Order management|Commerce|v|
specialized|Subscription management|Commerce|v|
specialized|Returns|Commerce|v|
specialized|AI trigger|AIButton|p|
specialized|AI action|AIButton|v|
specialized|AI assistant|AssistantPanel|p|
specialized|AI chat|AIChat|p|
specialized|Prompt input|PromptInput|p|
specialized|Prompt suggestions|PromptSuggestions|p|
specialized|Prompt history|PromptHistory|p|
specialized|Streaming response|StreamingText|p|
specialized|Thinking / processing state|Thinking|p|
specialized|AI citation|Citation|p|
specialized|Source reference|Citation|v|source card/list
specialized|Generated content|GeneratedContent|p|
specialized|Suggested edit|SuggestedEdit|p|
specialized|Suggested action|SuggestedAction|p|
specialized|Accept / reject suggestion|SuggestedEdit|v|
specialized|Regenerate|GeneratedContent|v|
specialized|Refine|RefineMenu|p|
specialized|AI search|AISearch|p|
specialized|Semantic search|AISearch|v|
specialized|Recommendation|Recommendation|p|
specialized|Confidence / uncertainty|ConfidenceIndicator|p|
specialized|Human review|ReviewFlow|v|AI output review (in wave 14 lane C as a record + example only)
specialized|AI label|AILabel|p|
specialized|AI explainability|AIExplanation|p|
specialized|AI disclaimer|AIDisclaimer|p|
interaction|Focus order|focus-order|p|
interaction|Keyboard shortcuts|ShortcutsDialog|p|
interaction|Shortcut hints|rec:keyboard-hint@11C|c|keyboard-hint covers interaction/Shortcut hints
interaction|Pointer interaction|rec:device-behavior@1C|c|device-behavior covers it
interaction|Touch interaction|rec:device-behavior@1C|c|device-behavior covers it
interaction|Gesture interaction|gesture|p|
interaction|Pressable|press-focus-select|p|
interaction|Focusable|press-focus-select|v|
interaction|Selectable|press-focus-select|v|useSelection
interaction|Drag handle|DragHandle|p|
interaction|Accessible descriptions|accessible-descriptions|p|
interaction|Live regions|LiveRegion|p|
interaction|Semantic HTML|semantic-html|p|
interaction|Color contrast|contrast|d|same as Contrast rules
interaction|Touch-target sizing|rec:device-behavior@1C|c|device-behavior covers it
interaction|Reduced motion|rec:motion@1C|c|motion covers interaction/Reduced motion
interaction|High contrast|forced-colors|p|
interaction|RTL / bidirectional UI|direction|p|
interaction|Accessible drag and drop|dnd|v|keyboard drag + announcements
interaction|WCAG guidance|content-guides|v|NOT CODE: generated table from records' a11y fields
interaction|Use of color|use-of-color|p|
interaction|Captions and transcripts|MediaPlayer|v|
interaction|Accessibility testing|impl-records|v|record over tests/a11y.test.js + a11y-report.js (exists)
interaction|Internationalization|i18n|p|
interaction|Portal|Portal|d|same as overlays/Portal
interaction|Floating positioner|floating|d|same as Floating positioning
interaction|Scroll lock|scroll-lock|d|same as overlays/Scroll lock
interaction|Intersection observer|useIntersection|p|
interaction|Truncate|Text|v|truncate
interaction|Clamp|Text|v|lines
interaction|Clipboard|clipboard|p|
interaction|Hotkey|hotkey|p|
interaction|Virtualization|virtualizer|p|
interaction|Drag-and-drop engine|dnd|p|
implementation|Platforms standard|impl-records|p|platforms-standard.js exists
implementation|Mobile web|impl-records|v|
implementation|Desktop|impl-records|v|
implementation|Vue|pkg-vue|p|
implementation|Angular|pkg-angular|p|
implementation|Web components|pkg-wc|p|
implementation|Native implementation|impl-records|v|build-mobile.js, iOS/Android tokens exist
implementation|Theming|themes-extra|c|themes covers implementation/Theming
implementation|Performance|perf-budget|p|
implementation|Virtualization|virtualizer|d|same as interaction/Virtualization
implementation|Analytics instrumentation|analytics|p|
implementation|Lint tooling|pkg-lint|p|
implementation|Design-system MCP tooling|pkg-mcp|p|
implementation|Browser support policy|browser-support|p|
implementation|Figma libraries|pkg-figma|p|
`;
