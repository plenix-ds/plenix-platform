# Content Calendar PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Content Calendar |
| **Capability ID** | content_calendar |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST plan and schedule content across channels with status tracking and media attachments.

## 2. Problem Statement

Not yet defined.

## 3. Goals & Non-Goals

### Goals

Not yet defined.

### Non-Goals

Not yet defined.

## 4. User Types / Actors

| Actor | Description |
|---|---|
| Owner | Full control over this capability |
| Admin | Administrative access |
| Team Member | Internal user with scoped access |
| Consultant | External specialist with limited access |
| Client Portal User | External client with restricted view |
| AI Agent | Automated AI operations |

## 5. User Stories

Not yet defined.

## 6. Use Cases / Scenarios

### UC-01 — Not yet defined

| Item | Detail |
|---|---|
| Actor | Not yet defined. |
| Goal | Not yet defined. |
| Main Flow | Not yet defined. |
| System Response | Not yet defined. |
| Alternate Flow | Not yet defined. |

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | 🔴 Features not yet defined | 🔴 Not Defined | Use this PRD template to complete this capability document. |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Not yet defined

| Rule | Behavior |
|---|---|

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|

## 12. Database / Schema Notes

Not yet defined.

## 13. Permissions Matrix

| Role | Create | View | Edit | Delete | Archive | Export | Share | AI Access |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Owner | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Admin | Yes | Yes | Yes | Limited | Yes | Yes | Yes | Yes |
| Team Member | Yes | Scoped | Scoped | No | Maybe | Maybe | No | Scoped |
| Consultant | Maybe | Assigned | Limited | No | No | No | No | Limited |
| Client Portal | No | Client-visible | Limited | No | No | Maybe | No | Limited |

## 14. UI / UX Requirements

### 10.1 Screens

| Screen | Purpose |
|---|---|

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|

## 15. Workflow Requirements

| Operation | Required Behavior | Shared/Core Handling |
|---|---|---|
| Create | Not yet defined. | |
| Edit | Not yet defined. | |
| Delete | Not yet defined. | |
| Search | Not yet defined. | |

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|

## 19. OSS / Build-vs-Buy Decision

1. **Primary OSS reference — Mixpost (MIT).** Study Mixpost for the unified publishing dashboard, content calendar UI, connected-accounts model, media library, post templates, approval workflow, and team/client permission structure. MIT license permits direct code reference, pattern adoption, and embedding of isolated modules without copyleft obligations. Treat it as the canonical shape for traditional social media management inside Plenix.

2. **Secondary OSS reference — Postiz (AGPL).** Study Postiz for AI-assisted content generation, agentic scheduling logic, and the broader 30+ platform connector surface. AGPL license prohibits embedding or linking without releasing Plenix under AGPL in turn — use Postiz as a reference only (read the source, adapt the ideas, write Plenix's own implementation). Never copy Postiz code into the Plenix codebase.

3. **License boundary is hard.** Mixpost (MIT) = embed-safe. Postiz (AGPL) = reference only. Any third-party OAuth connector library, scheduler, or queue worker pulled in must be audited for license before inclusion. Maintain a running THIRD-PARTY-LICENSES.md entry for every OSS artifact that touches the Content Calendar module.

4. **Content Calendar vs Campaign Calendar are distinct capabilities.** Content Calendar manages individual post scheduling and publishing state across channels. Campaign Calendar manages higher-level campaign phases, milestones, and briefs. These share a timeline UI shell but must not share a data model. Cross-references between a post and a campaign are foreign-key links, not merged entities.

5. **Platform connector architecture.** Model each social platform (LinkedIn, Instagram, X, Facebook, YouTube, TikTok, etc.) as a pluggable adapter behind a common `SocialConnector` interface (post, schedule, delete, fetchAnalytics). Study Mixpost's 11-adapter pattern and Postiz's 30-adapter pattern for the interface contract. Plenix builds the adapter shell and ships the highest-priority connectors natively; long-tail platforms are deferred to a community-adapter registry or a self-hosted Postiz sidecar callable via REST.

6. **OAuth token management is self-hosted, not delegated.** Plenix stores per-workspace OAuth tokens encrypted at rest. Do not route tokens through any third-party relay (no shared Mixpost or Postiz cloud). Each workspace's credentials are isolated; token refresh is handled by Plenix's own background job queue. This is a hard E2EE/privacy boundary.

7. **Platform API fragility warning.** Social platform APIs (especially Instagram Graph, TikTok, and X v2) change rate limits, endpoint paths, and permission scopes with little notice. Isolate each adapter behind a versioned interface so a breaking platform change requires updating one adapter file, not the core scheduler. Pin API versions in adapter config; emit a deprecation warning metric when a pinned version is sunset.

8. **Media library integration.** Content Calendar posts reference assets from the Plenix Media Library (a separate capability). The Content Calendar module must not store its own copy of media blobs — it holds references (asset IDs) only. On publish, the connector adapter fetches the resolved URL or binary from the Media Library. This prevents storage duplication and keeps E2EE asset handling in one place.

9. **Scheduling and queue backend.** Use a durable job queue (e.g., BullMQ backed by Redis, or a Postgres-backed queue like pg-boss) for scheduled publish jobs. Do not rely on cron alone — a missed cron window must not silently drop a scheduled post. Each job must be idempotent: if a post is already published, a retry must detect and skip, not double-publish.

10. **Approval workflow.** Borrow Mixpost's approval model: posts can be in Draft, Pending Review, Approved, Scheduled, Published, or Failed states. Only users with the Approver or Admin role can move a post from Pending Review to Approved. State transitions are append-only audit log entries, not in-place status mutations, to support compliance and client-facing transparency.

11. **AI content generation is deferred to a service boundary.** Plenix does not embed an LLM directly in the Content Calendar module. AI caption suggestions, hashtag generation, and optimal-time recommendations are called via an internal AI service endpoint (which wraps the Claude API or another provider). This keeps the Content Calendar module stateless with respect to model versions and allows the AI layer to be upgraded independently. Reference Postiz's agentic prompting patterns for the prompt templates only.

12. **White-label and multi-workspace warning.** Mixpost supports white-label deployments. If Plenix adopts a similar multi-workspace/client model, ensure that connected account credentials, post drafts, and analytics data are strictly partitioned by workspace ID at the database query level — not just at the application layer — to prevent cross-workspace data leaks in a shared-infrastructure deployment.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|

### Related Capabilities

| Capability | Relationship |
|---|---|

## 21. Notifications / Activity

Not yet defined.

## 22. Non-Functional Requirements

### Performance

Not yet defined.

### Accessibility

Not yet defined.

### Security / Privacy

Not yet defined.

## 23. Reporting / Analytics

Not yet defined.

## 24. Migration / Import / Export

Not yet defined.

## 25. Open Questions

| Question | Status | Notes |
|---|---:|---|

## 26. Risks & Decisions

### Risks

Not yet defined.

### Decisions Made

Not yet defined.

## 27. Verification & Testing

### Acceptance Criteria

Not yet defined.

### Testing Requirements

Not yet defined.

## 28. Readiness Gate

```
[ ] PRD sections 1-27 complete
[ ] Data model approved
[ ] Field-level spec complete
[ ] Schema drafted
[ ] Permissions matrix approved
[ ] API contract drafted
[ ] UI skeleton approved
[ ] Workflow rules documented
[ ] OSS decision finalized
[ ] Integration map confirmed both directions
[ ] AI/search rules defined
[ ] Notification/activity rules defined
[ ] Security/privacy rules defined
[ ] Edge cases documented
[ ] Acceptance criteria written
[ ] Testing requirements written
[ ] Performance requirements defined
[ ] MVP/future scope separated
[ ] Open questions resolved or deferred
[ ] Risks documented
[ ] Decisions recorded
```
