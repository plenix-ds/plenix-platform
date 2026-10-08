# Password Manager PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Password Manager |
| **Capability ID** | password_manager |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST securely store and manage credentials, sensitive data, and secure notes within an AES-256-GCM encrypted vault with master-password access, auto-lock, configurable password generation, and one-click clipboard copy with auto-clear.

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

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Password Manager

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Encrypted vault — logins, secure notes, credit cards** | 🔵 Planned | Use case: The user manages many passwords, API keys, secure notes, and payment details across their personal and professional life. Storing these in a browser password manager means they are tied to one browser and potentially synced through a third-party cloud the user does not control. Plenix includes a built-in encrypted vault that stores three types of records: Logins (username, password, URL, notes — the standard password entry), Secure notes (freeform encrypted text — for storing API keys, recovery codes, software license keys, or any text the user needs to keep private), and Credit cards (cardholder name, card number, expiry, CVV, billing address). Each record is an individual encrypted entry. The vault lives within Plenix but its contents are completely isolated — other Plenix features cannot read vault data without an explicit vault unlock action. |
| F02 | **AES-256-GCM encryption with PBKDF2 key derivation** | 🔵 Planned | Vault data is encrypted at rest using AES-256-GCM — the same standard used by 1Password, Bitwarden, and other leading password managers. The encryption key is derived from the user's master password using PBKDF2 (Password-Based Key Derivation Function 2) with a high iteration count (minimum 600,000 iterations as recommended by OWASP 2024) and a unique per-vault salt. The master password itself is never stored anywhere — neither locally nor on any server. The only way to decrypt the vault is to enter the correct master password. If the master password is forgotten, there is no recovery path (by design — this is the zero-knowledge guarantee). An optional recovery key (a long random string) can be generated at setup and stored offline for emergency access. |
| F03 | **Auto-lock — configurable timeout and close-on-exit** | 🔵 Planned | The vault locks automatically after a configurable period of inactivity (options: 1 minute, 5 minutes, 15 minutes, 1 hour, Never). When locked, all vault content is hidden and the UI shows only the master password entry field. The vault also locks immediately when the application window is closed — it does not remain unlocked in memory when Plenix is not the active window (configurable: can be set to stay unlocked while the app is open). Re-authentication requires entering the master password. On supported devices, biometric authentication (Face ID, Touch ID, Windows Hello) can be used as a convenience unlock without requiring the full master password to be typed — but the biometric unlock only works after the master password has been entered at least once in the current session. |
| F04 | **Password generator — configurable character sets and length** | 🔵 Planned | The vault includes a built-in password generator accessible from any login entry's password field and from a standalone generator tool in the vault. Configuration options: Length (8–128 characters, slider), Character sets (toggles for: Uppercase letters A–Z, Lowercase letters a–z, Numbers 0–9, Symbols !@#$%^&*() etc.), Exclude ambiguous characters (option to exclude characters that look similar — 0/O, 1/l/I — useful for passwords that must be read aloud), and Exclude specific characters (freeform exclusion list). The generated password is shown in a large, easily readable font. A Copy button copies it to the clipboard. A Regenerate button creates a new password with the same settings. Password strength is shown as a color-coded bar (Weak / Fair / Strong / Very Strong) calculated using entropy estimation. |
| F05 | **One-click copy with automatic clipboard clearing** | 🔵 Planned | Any credential field (password, username, card number, CVV) can be copied with a single click — no need to reveal the field first. A toast notification confirms the copy. The clipboard is automatically cleared after a configurable timeout (default: 30 seconds, options: 10s, 30s, 60s, Never). When the clipboard clears, a second toast notification confirms it. This prevents sensitive data from remaining in the clipboard after the user has finished using it — reducing the risk of clipboard-reading malware or inadvertent pastes. On macOS, the clipboard clearing uses a system-level clipboard write to overwrite the sensitive content rather than relying on an API call that some apps can intercept. |
| F06 | **Full-text search across vault items** | 🔵 Planned | The vault search bar queries across all item types simultaneously: login names, URLs, usernames, secure note titles and body text, and credit card cardholder names. The master password, actual passwords, card numbers, and CVVs are never included in the search index — only non-sensitive metadata is searchable. Searching 'amazon' finds a login entry named 'Amazon Shopping' and a secure note titled 'Amazon AWS keys'. Results are shown as a flat list with the item type icon (key for logins, lock for secure notes, card for credit cards). Tags can be added to vault items and are also searchable — useful for grouping items by context (Work, Personal, Client A, etc.). |

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

1. **Primary OSS reference: Vaultwarden (AGPL, self-hosted).** Vaultwarden is a Bitwarden-compatible server written in Rust. It is the primary tool to study and embed. It exposes the full Bitwarden API surface, runs in a single Docker container at approximately 50 MB RAM, and is compatible with all official Bitwarden client apps. License: AGPL-3.0 — embedding it in a distributed product requires that the combined product also be AGPL or that Plenix operates it as a networked service (SaaS model), which sidesteps the viral clause. Recommended disposition: run as a self-hosted service component within the Plenix server stack, not statically linked into the Plenix binary.

2. **Secondary OSS reference: Bitwarden Server (AGPL, reference only).** The official Bitwarden server is the authoritative specification for the API protocol, payload formats, and enterprise feature contracts (Organizations, Collections, SSO). It requires 1 GB+ RAM and a multi-container deployment. Do not embed or fork it. Use it solely as a protocol reference when Vaultwarden deviates from or omits an endpoint needed by a Bitwarden client. License: AGPL-3.0.

3. **Vault isolation is a hard architectural constraint.** The password vault MUST run as a logically and physically isolated service within the Plenix stack. It must not share a database, a process, a memory space, or an in-process API boundary with any other Plenix capability (notes, tasks, files, etc.). A breach or bug in another Plenix module must not provide a read path into vault data. Enforce this boundary via separate database credentials, a dedicated service process, and an internal API gateway that requires an explicit vault-unlock token for every request.

4. **Encryption: AES-256-GCM at rest, PBKDF2 for key derivation.** All vault record payloads are encrypted client-side before transmission using AES-256-GCM. The encryption key is derived from the user's master password via PBKDF2 with a minimum of 600,000 iterations (OWASP 2024 recommendation) and a unique per-vault salt. The master password is never transmitted or stored — only the derived key is used transiently in memory during an unlocked session. Vaultwarden implements this protocol natively; do not replace or re-implement it.

5. **Vault data stays on the Plenix server — no sync to Bitwarden.com.** When Plenix uses official Bitwarden client apps pointing at the Vaultwarden instance, those clients must be configured to use the Plenix server URL rather than bitwarden.com. Plenix must clearly communicate to users that their vault is self-hosted and that Bitwarden.com has zero access to their data. This is a key trust differentiator and must be reflected in onboarding copy and settings UI.

6. **Integration pattern: Bitwarden client apps as the vault UI, not a bespoke Plenix UI.** Rather than building a custom password-manager UI from scratch, Plenix should deep-link into or embed a Bitwarden-compatible client (browser extension, or official Bitwarden desktop app pre-configured to the Plenix server). The Plenix app manages authentication context (passing the unlock token) and provides the entry point, but the vault CRUD UI is delegated to the Bitwarden client. This avoids reimplementing a complex, security-critical UI and reduces surface area for bugs.

7. **What Plenix builds natively.** Plenix is responsible for: (a) provisioning and lifecycle-managing the Vaultwarden container as part of the Plenix server install; (b) the master-password setup and change flow surfaced in Plenix onboarding; (c) the auto-lock timer and biometric convenience-unlock integration at the OS layer; (d) the clipboard-copy-with-auto-clear widget used throughout the Plenix UI; (e) the password generator component (can use the Bitwarden client generator or a standalone crypto-safe generator library such as `zxcvbn` for strength estimation plus `crypto.getRandomValues` for generation); and (f) the vault-unlock token handshake between the Plenix session and the Vaultwarden service.

8. **What Plenix defers to Vaultwarden.** Vaultwarden owns: all encrypted storage, the Bitwarden sync protocol, organization and collection logic, two-step login (TOTP, WebAuthn/FIDO2), send functionality, and attachment handling. Do not reimplement any of these. Track the Vaultwarden release changelog and update the bundled version on a regular cadence — security patches in a password manager are not optional updates.

9. **AGPL license warning.** Both Vaultwarden and the Bitwarden Server are AGPL-3.0. If Plenix ever distributes a binary that statically or dynamically links Vaultwarden code, the entire Plenix binary would need to be released under AGPL or a commercial licensing agreement would be required. The safe path is to run Vaultwarden as a separate process/container and communicate with it over HTTP — this is a standard network-service boundary that does not trigger AGPL's linking clause. Document this architectural decision explicitly and enforce it in code review.

10. **Platform fragility warning: Bitwarden client compatibility.** Vaultwarden's compatibility with official Bitwarden clients depends on Vaultwarden tracking the Bitwarden API. If Bitwarden introduces breaking API changes in a client update and Vaultwarden has not yet caught up, Plenix users will face a broken vault UX. Mitigate by: pinning Bitwarden client app versions in Plenix distribution, monitoring the Vaultwarden issue tracker, and having a rollback path for client app versions.

11. **Master-password loss is irrecoverable by design.** There is no server-side recovery mechanism. If a user loses their master password and has not saved their recovery key, all vault data is permanently inaccessible. Plenix must surface this clearly during vault setup (not in fine print), prompt the user to generate and safely store a recovery key, and include a periodic reminder to verify the recovery key is accessible. Do not build a server-side escrow or "forgot password" flow for the vault — doing so would break the zero-knowledge guarantee.

12. **Audit and penetration testing requirement.** Before shipping the password manager capability to any user, the vault integration (Vaultwarden configuration, isolation boundary, key-derivation parameters, clipboard-clearing implementation, and biometric-unlock handshake) must be reviewed by a qualified security engineer with password-manager or cryptographic systems experience. Do not rely solely on internal review. The cost of a vault breach — credential exposure across every service a user has stored — is categorically higher than any other Plenix data loss scenario.

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
