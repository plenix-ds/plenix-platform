### Added
- Library wave 13, lane A (Claude): ProductCard and ProductPrice, ProductOptions (sizes, color swatches, quantity), and
  the Commerce templates (discovery, listing, detail, cart, checkout, payment form UI only, confirmation, orders,
  subscriptions, returns), each claiming its page kind.
- By Codex (PRs #102–#106, #109–#112, checked by the integrator; CI blocked by billing):
  - Wave 12 B: AssetGallery, DownloadManager, MediaPlayer, MetadataEditor, RelatedAssets.
  - Wave 12 C: AttachmentPicker, FilePicker, RenditionList, DocumentViewer, VersionHistory.
  - Wave 13 B: Comment, CommentThread, ImageAnnotation, PresenceBar.
  - Wave 13 C: MentionInput, Announcement, AuditLog, ApprovalWorkflow.
  - Wave 14 B and C (AI parts, existing roles and the sparkle icon only, no AI color): AILabel, GeneratedContent,
    PromptHistory, Citation, SuggestedAction, AISearch, Recommendation, AIButton, AIDisclaimer, ConfidenceIndicator,
    AIExplanation, PromptSuggestions, SuggestedEdit, RefineMenu, Thinking states.
  - DataTable (RedSave DT-1, 2, 3, 4, 9, 11, 17): a default sort, a visible row menu button, documented row-menu items,
    remembered views, text direction per cell, hidden selection counted, clicks on controls inside rows ignored.
- Native designs for all of them.
### Changed
- The other applications use the command bar (Codex, #110); the Asset Manager's Search workspace moved off BulkActions,
  which is deprecated (use CommandBar's selection state) and stays exported for one release (#109).
