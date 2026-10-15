// the final wave of every target (data.js keeps the first draft numbers); lanes are computed by gen.js
const by = {
  1: 'format contrast use-of-color dataviz-colors aspect-ratio-scale layout-grid keylines floating Portal scroll-lock LiveRegion accessible-descriptions useIntersection clipboard hotkey virtualizer interaction-states',
  2: 'read-only-context press-focus-select focus-order semantic-html forced-colors direction loading-motion gesture Text SectionHeading Link Code Blockquote List RichText',
  3: 'Stack Columns ResponsiveVisibility Sticky Preview ContentGrid AppShell Image Figure Illustration IconTile Pictogram BrandMark brand-application themes-extra ai-visual-language',
  4: 'Time VersionLabel StatusDot Avatar AvatarGroup Persona ColorSwatch ColorPicker QRCode Barcode StatusIcon ProgressCircle Scrim LoadingOverlay Banner Notice EmptyState Toast Retry',
  5: 'Popover Popconfirm ContextualHelp Tooltip Details TeachingBubble Spotlight Dialog Menu SplitButton CommandMenu CommandPalette FloatingActionButton BackToTop CopyButton DownloadButton print MegaMenu',
  6: 'Form Fieldset ErrorSummary InputGroup Field Input InlineEdit OtpInput Button NumberInput Slider FileInput Combobox SearchField RichTextEditor CodeEditor',
  7: 'Calendar DatePicker TimePicker RelativeDateInput TimeZoneSelect CountrySelect EntityPicker TreeSelect TransferList Cascader MillerColumns ImageUpload AvatarUpload ChartKit ProgressSteps Tabs LoadMore NavPane AppHeader BottomSheetNav',
  8: 'SearchResult FilterPanel QueryBuilder ResourceList VirtualList Timeline Carousel Card FeatureCard UserCard PeopleGroup RoleLabel PermissionSummary chart-parts',
  9: 'chart-a11y chart-interaction LineChart AreaChart BarChart ComboChart LollipopChart Sparkline Metric PieChart ScatterChart Gauge BulletChart HeatMap BoxPlot FunnelChart WaterfallChart RadarChart Treemap SankeyDiagram WordCloud GanttChart TimelineChart GeoMap NetworkGraph Diagram ComparisonView',
  10: 'Wizard WizardDialog FormFlow Autosave DraftState SaveAs DeleteFlow DuplicateAction RenameAction ArchiveRestore Publish ReviewFlow AssignControl GroupBy dnd SortableList DragHandle DropZone Resizable',
  11: 'ImportDialog ImportWizard ExportDialog ShareDialog Auth SessionTimeout PermissionsEditor RoleManager AccessRequest ConnectedAccounts Tour Checklist Onboarding FeatureIntro TrialUpgrade Offboarding ShortcutsDialog HelpPanel File FileRow',
  12: 'FileList FileBrowser AttachmentPicker MediaCard AssetGallery UploadManager DownloadManager FilePicker RenditionList MediaPlayer DocumentViewer MetadataEditor VersionHistory VersionCompare RelatedAssets',
  13: 'Comment CommentThread MentionInput ImageAnnotation Announcement AuditLog PresenceBar ApprovalWorkflow ProductCard ProductOptions Commerce',
  14: 'AIButton AILabel AIDisclaimer GeneratedContent ConfidenceIndicator AIExplanation PromptInput PromptSuggestions PromptHistory StreamingText Thinking AIChat Citation SuggestedEdit SuggestedAction RefineMenu AssistantPanel AISearch Recommendation',
  15: 'templates ActionBar content-lint i18n content-guides impl-records perf-budget analytics browser-support pkg-vue pkg-angular pkg-wc pkg-lint pkg-mcp pkg-figma'
};
const W = {}; Object.entries(by).forEach(([w, s]) => s.split(' ').forEach((n) => { W[n] = +w; }));
module.exports = { W, REC: { 1: 2, 3: 4, 4: 5, 7: 8, 11: 11, 12: 12, 13: 13 } };
