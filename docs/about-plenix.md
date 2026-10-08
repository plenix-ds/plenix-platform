# About {APP_NAME}

**The product, the name, and the vision behind it.**

---

## The Name

**{APP_NAME}** — /PLEN-iks/

*"The completor" — that which makes whole.*

| Aspect | Detail |
|---|---|
| **Root** | Plenus (Latin) — full, complete, whole. The root of plenty, replenish, plenitude. |
| **Suffix** | -ix — a Latin agent noun ending (matrix, apex, codex) meaning "the thing that does." Gives the name the feel of a platform — structural and foundational. |
| **Together** | {APP_NAME} = the thing that makes full. The completor. The layer that fills the gaps between silos and makes digital life whole again. |
| **Brand** | Easy to say, easy to spell, works across languages. Modern and technical without being cold. One word. The whole picture. |

---

## Why It Fits This Product

The entire vision of {APP_NAME} is about solving fragmentation. Context is lost. Data is duplicated. Retrieval fails. The result is an incomplete picture of your own information. {APP_NAME} is the answer to that incompleteness.

| Principle | Meaning |
|---|---|
| Capture everything, lose nothing | That is *plenus*. Nothing missing. |
| One ecosystem, not one more app | Completeness, not another fragment. |
| Metadata is the fabric | The invisible layer that fills the gaps between silos. |
| The full view | Files, notes, tasks, messages, contacts, media — all connected, all present, all retrievable. |

---

## Core Data Model

| Concept | Description |
|---|---|
| **Projects** | A named container for work. The user enables capabilities (Tasks, Files, Notes, etc.). No preset types — fully user-defined. |
| **Categories** | Hierarchical taxonomy applied to any item. Two levels: Category and Subcategory. Example: Client Work > Design. |
| **Tags** | Flat keyword identifiers applied to any item. Descriptive, content-based. Example: mountain, snow, supplier, Q2. |
| **Project Type** | A flat label describing the nature of the project. Example: Photography, Client Project, Research. User-defined in Settings. |
| **Items** | Every entity (task, note, file, bookmark, contact, invoice, deal, etc.) carries `projectType`, `projects[]`, `categories[]`, and `tags[]` — the 4 Anchor fields. |

See **data-model.md** for the full schema of all 59 item types.

---

## Platform Statistics

These values are auto-generated from PRD files by `build-docs.js`.

- Capabilities: 73
- Features Documented: 781
- Capabilities with full content: 49
- Project Types: 33
