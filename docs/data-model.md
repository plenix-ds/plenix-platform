# Data Model

**Every item type in {APP_NAME} and the fields it carries. All types extend the 4 Anchor fields.**

---

## Anchors (Classification)

Every item type in the system carries these 4 universal fields. They are called **Anchors** internally and **Classification** in the UI.

| Field | Type | Source | Description | UI |
|---|---|---|---|---|
| `projectType` | string \| null | `window.PROJ_TYPES` | Single project type — user-defined in Settings > Project Types | Dropdown (single select) |
| `projects` | string[] | `window.PROJECTS` | Projects this item belongs to — many-to-many | Search-to-select with create |
| `categories` | string[] | `window.CAT_FLAT` | Category paths e.g. Client Work > Design — many-to-many | Grouped search-to-select with create |
| `tags` | string[] | `window.DEFAULT_TAGS` | Flat keyword identifiers — many-to-many | Grouped search-to-select with create, auto-lowercased |

These fields appear natively in every create/edit form via the **ClassificationWidget**, not as a separate panel.

---

## Base Fields

Every item type also carries:

| Field | Type | Description |
|---|---|---|
| `id` | string | UUID — unique identifier |
| `createdAt` | string | ISO 8601 timestamp |
| `updatedAt` | string | ISO 8601 timestamp |

---

## Capabilities with Anchors Applied

All 73 capabilities carry the Anchor fields on their items:

**Universal — Platform:** About, Activity, Dashboard, Navigation, Projects, Search & Filters, Settings
**Universal — Communication:** Calendar, Contacts, Email, Messaging
**Universal — Productivity:** Forms, Goals, Habits, Journal, Notes, Tasks, Text Templates
**Universal — Files:** Files, Smart File Naming
**Universal — Media:** Audio, Images, Video
**Universal — Knowledge:** Bookmarks, Books, Browser Extension / Mobile Capture, Capture, Duplicates & Broken Links, Highlights, Import / Export / Backup, Reader / Articles, Sharing / Collaboration, Tags, Web Archive, Wiki
**Universal — AI:** AI Agents, AI Chat, Automations, Connectors, Model Selection, Prompt Studio, Voice Input
**Universal — Finance:** Bookkeeping, Expenses, Income
**Universal — Utilities:** Password Manager, Translation & Dictionary
**Client — Pipeline:** Client Portal, Contracts, Deals, Estimates, Invoices, Leads, Payments, Proposals, Rate Cards, Scheduling, Services
**Project / Work — Marketing:** Analytics, Campaigns, Channels, Content Calendar, Mood Boards
**Project / Work — Project Control:** Changes, Issues, Purchase Orders, Resourcing, Risks, Roadmap, Suppliers, Time Tracking, Timesheets

---

## Item Types

Each item type extends Anchors + Base fields with its own specific fields.

### Note

**Capability:** Notes | **Icon:** note

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `content` | string | | | Rich text / Markdown |
| `folder` | string | | | User-defined folder name |
| `pinned` | boolean | | `false` | |

### Task

**Capability:** Tasks | **Icon:** task

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `due` | string | | | ISO 8601 date |
| `priority` | enum | | | `low` \| `medium` \| `high` \| `urgent` |
| `done` | boolean | | `false` | |
| `assignee` | string | | | Contact/user reference |
| `subtasks` | array | | | |

### File

**Capability:** Files | **Icon:** file

Any file type — PDF, DOCX, XLSX, MP3, MP4, etc.

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | Original filename |
| `extension` | string | | | |
| `mimeType` | string | | | |
| `size` | number | | | Bytes |
| `path` | string | | | Storage path |
| `source` | string | | | Where file came from |
| `aiName` | string | | | AI-suggested intelligent file name |

### Link / Bookmark

**Capability:** Links | **Icon:** link

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `url` | string | Yes | | |
| `title` | string | | | |
| `description` | string | | | |
| `thumbnail` | string | | | |
| `collection` | string | | | |
| `archived` | boolean | | `false` | |
| `contentSaved` | boolean | | | |

### Image

**Capability:** Images | **Icon:** images

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `filename` | string | Yes | | |
| `path` | string | | | |
| `width` | number | | | Pixels |
| `height` | number | | | Pixels |
| `dateTaken` | string | | | ISO 8601 |
| `location` | string | | | GPS / place name |
| `faces` | array | | | Facial recognition (V2) |
| `aiCaption` | string | | | AI-generated description |
| `moodBoard` | string | | | Linked mood board |

### Contact

**Capability:** Contacts | **Icon:** contact

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `email` | string | | | |
| `phone` | string | | | |
| `company` | string | | | |
| `role` | string | | | |
| `avatar` | string | | | |
| `source` | string | | | |

### Calendar Event

**Capability:** Calendar | **Icon:** cal

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `start` | string | | | ISO 8601 |
| `end` | string | | | ISO 8601 |
| `allDay` | boolean | | | |
| `calendar` | string | | | Calendar source name |
| `location` | string | | | |
| `meetingUrl` | string | | | |
| `platform` | enum | | | `zoom` \| `google-meet` \| `teams` \| `other` |

### Deal

**Capability:** Deals | **Icon:** deals

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `value` | number | | | |
| `currency` | string | | `USD` | |
| `stage` | enum | | | `lead` \| `qualified` \| `proposal` \| `negotiation` \| `won` \| `lost` |
| `contact` | string | | | |
| `closeDate` | string | | | |

### Estimate

**Capability:** Estimates | **Icon:** estimates

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `number` | string | | | |
| `client` | string | | | |
| `lineItems` | array | | | |
| `subtotal` | number | | | |
| `tax` | number | | | |
| `total` | number | | | |
| `status` | enum | | | `draft` \| `sent` \| `accepted` \| `declined` \| `expired` |
| `validUntil` | string | | | |

### Proposal

**Capability:** Proposals | **Icon:** proposals

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `client` | string | | | |
| `content` | string | | | |
| `status` | enum | | | `draft` \| `sent` \| `viewed` \| `accepted` \| `declined` |
| `sentAt` | string | | | |

### Contract

**Capability:** Contracts | **Icon:** contracts

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `client` | string | | | |
| `value` | number | | | |
| `status` | enum | | | `draft` \| `sent` \| `signed` \| `active` \| `expired` \| `terminated` |
| `startDate` | string | | | |
| `endDate` | string | | | |
| `signedAt` | string | | | |

### Invoice

**Capability:** Invoices | **Icon:** invoices

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `number` | string | | | |
| `client` | string | | | |
| `lineItems` | array | | | |
| `subtotal` | number | | | |
| `tax` | number | | | |
| `total` | number | | | |
| `currency` | string | | `USD` | |
| `status` | enum | | | `draft` \| `sent` \| `paid` \| `overdue` \| `canceled` |
| `dueDate` | string | | | |
| `paidAt` | string | | | |

### Payment

**Capability:** Invoices | **Icon:** finance

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `amount` | number | Yes | | |
| `currency` | string | | `USD` | |
| `method` | enum | | | `bank` \| `card` \| `cash` \| `crypto` \| `other` |
| `invoiceId` | string | | | |
| `contact` | string | | | |
| `date` | string | | | |
| `reference` | string | | | |

### Income

**Capability:** Income | **Icon:** income

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `description` | string | | | |
| `amount` | number | Yes | | |
| `currency` | string | | `USD` | |
| `source` | string | | | |
| `date` | string | | | |
| `recurring` | boolean | | | |
| `interval` | string | | | |

### Expense

**Capability:** Expenses | **Icon:** expenses

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `description` | string | | | |
| `amount` | number | Yes | | |
| `currency` | string | | `USD` | |
| `vendor` | string | | | |
| `date` | string | | | |
| `receipt` | string | | | |
| `billable` | boolean | | `false` | |

### Supplier

**Capability:** Suppliers | **Icon:** suppliers

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `contact` | string | | | |
| `category` | string | | | |
| `status` | enum | | | `active` \| `inactive` \| `preferred` |
| `leadTime` | number | | | |
| `notes` | string | | | |

### Purchase Order

**Capability:** Purchase Orders | **Icon:** purchase_orders

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `number` | string | | | |
| `supplier` | string | Yes | | |
| `lineItems` | array | | | |
| `total` | number | | | |
| `currency` | string | | `USD` | |
| `status` | enum | | | `draft` \| `sent` \| `confirmed` \| `received` \| `canceled` |
| `expectedAt` | string | | | |

### Service

**Capability:** Services | **Icon:** services

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `description` | string | | | |
| `rate` | number | | | |
| `rateUnit` | enum | | | `hour` \| `day` \| `project` \| `month` \| `unit` |
| `currency` | string | | `USD` | |
| `active` | boolean | | `true` | |

### Rate Card

**Capability:** Rate Cards | **Icon:** rate_cards

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `client` | string | | | |
| `services` | array | | | |
| `validFrom` | string | | | |
| `validTo` | string | | | |
| `status` | enum | | | `draft` \| `active` \| `archived` |

### Meeting

**Capability:** Meetings | **Icon:** meetings

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `date` | string | | | |
| `duration` | number | | | Minutes |
| `platform` | enum | | | `zoom` \| `google-meet` \| `teams` \| `in-person` \| `phone` \| `other` |
| `meetingUrl` | string | | | |
| `attendees` | array | | | |
| `agenda` | string | | | |
| `notes` | string | | | |
| `recording` | string | | | |

### Time Entry

**Capability:** Time Tracking | **Icon:** time

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `description` | string | | | |
| `duration` | number | Yes | | Minutes |
| `date` | string | | | |
| `billable` | boolean | | `true` | |
| `rate` | number | | | |
| `contact` | string | | | |
| `approved` | boolean | | `false` | |

### Issue

**Capability:** Issues | **Icon:** issues

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `description` | string | | | |
| `severity` | enum | | | `critical` \| `high` \| `medium` \| `low` |
| `status` | enum | | | `open` \| `in-progress` \| `resolved` \| `closed` \| `wont-fix` |
| `assignee` | string | | | |
| `reportedBy` | string | | | |
| `resolvedAt` | string | | | |

### Risk

**Capability:** Risks | **Icon:** risks

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `description` | string | | | |
| `likelihood` | enum | | | `low` \| `medium` \| `high` |
| `impact` | enum | | | `low` \| `medium` \| `high` |
| `status` | enum | | | `identified` \| `mitigating` \| `mitigated` \| `accepted` \| `closed` |
| `owner` | string | | | |
| `mitigation` | string | | | |

### Change Request

**Capability:** Changes | **Icon:** changes

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `description` | string | | | |
| `requestedBy` | string | | | |
| `impact` | string | | | |
| `status` | enum | | | `draft` \| `submitted` \| `reviewing` \| `approved` \| `rejected` \| `implemented` |
| `priority` | enum | | | `low` \| `medium` \| `high` \| `critical` |
| `implementedAt` | string | | | |

### Campaign

**Capability:** Campaigns | **Icon:** campaigns

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `type` | enum | | | `email` \| `social` \| `paid` \| `content` \| `event` \| `other` |
| `status` | enum | | | `draft` \| `active` \| `paused` \| `completed` \| `canceled` |
| `startDate` | string | | | |
| `endDate` | string | | | |
| `budget` | number | | | |
| `goal` | string | | | |
| `metrics` | object | | | |

### Lead

**Capability:** Leads | **Icon:** leads

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `contact` | string | | | |
| `source` | enum | | | `website` \| `referral` \| `social` \| `cold-outreach` \| `event` \| `other` |
| `status` | enum | | | `new` \| `contacted` \| `qualified` \| `unqualified` \| `converted` |
| `value` | number | | | |
| `notes` | string | | | |

### Content Calendar Item

**Capability:** Content Calendar | **Icon:** content_cal

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `type` | enum | | | `post` \| `article` \| `video` \| `email` \| `ad` \| `story` \| `other` |
| `platform` | string | | | |
| `status` | enum | | | `idea` \| `draft` \| `review` \| `scheduled` \| `published` \| `archived` |
| `scheduledAt` | string | | | |
| `publishedAt` | string | | | |
| `body` | string | | | |
| `mediaFiles` | array | | | |

### Mood Board

**Capability:** Mood Boards | **Icon:** mood

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `description` | string | | | |
| `images` | array | | | |
| `palette` | array | | | Color values |
| `fonts` | array | | | |

### Wiki Page

**Capability:** Wiki | **Icon:** wiki

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `content` | string | | | |
| `parent` | string | | | Parent page reference |
| `slug` | string | | | URL-safe identifier |
| `version` | number | | `1` | |

### Form

**Capability:** Forms | **Icon:** forms

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `fields` | array | | | Form field definitions |
| `status` | enum | | | `draft` \| `active` \| `closed` |
| `submissions` | number | | `0` | |

### Roadmap Item

**Capability:** Roadmap | **Icon:** roadmap

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `description` | string | | | |
| `status` | enum | | | `backlog` \| `planned` \| `in-progress` \| `completed` \| `canceled` |
| `priority` | enum | | | `low` \| `medium` \| `high` \| `critical` |
| `startDate` | string | | | |
| `endDate` | string | | | |
| `milestone` | boolean | | `false` | |

### Channel

**Capability:** Channels | **Icon:** channels

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `platform` | enum | | | `instagram` \| `linkedin` \| `twitter` \| `facebook` \| `youtube` \| `tiktok` \| `email` \| `blog` \| `other` |
| `url` | string | | | |
| `status` | enum | | | `active` \| `inactive` \| `archived` |
| `metrics` | object | | | |

### Timesheet Entry

**Capability:** Timesheets | **Icon:** timesheets

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `employee` | string | Yes | | |
| `period` | string | | | |
| `entries` | array | | | |
| `totalHours` | number | | | |
| `status` | enum | | | `draft` \| `submitted` \| `approved` \| `rejected` |

### Bookkeeping Entry

**Capability:** Bookkeeping | **Icon:** bookkeeping

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `date` | string | Yes | | |
| `description` | string | | | |
| `debit` | number | | | |
| `credit` | number | | | |
| `account` | string | | | |
| `reconciled` | boolean | | `false` | |

### Analytics Report

**Capability:** Analytics | **Icon:** analytics

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `period` | string | | | |
| `metrics` | object | | | |
| `dimensions` | array | | | |
| `generatedAt` | string | | | |

### Resource Allocation

**Capability:** Resourcing | **Icon:** resourcing

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `resource` | string | Yes | | |
| `role` | string | | | |
| `allocation` | number | | | Percentage 0–100 |
| `startDate` | string | | | |
| `endDate` | string | | | |
| `notes` | string | | | |

### Bookmark

**Capability:** Bookmarks | **Icon:** bookmark

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `url` | string | Yes | | |
| `title` | string | | | |
| `description` | string | | | |
| `thumbnail` | string | | | |
| `folder` | string | | | Bookmark folder reference |
| `archived` | boolean | | `false` | Web archive saved |
| `contentSaved` | boolean | | `false` | |
| `readingProgress` | number | | `0` | Percentage 0–100 |
| `highlights` | array | | | Highlight references |

### Bookmark Folder

**Capability:** Bookmarks | **Icon:** collection

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `description` | string | | | |
| `icon` | string | | | |
| `color` | string | | | |
| `parent` | string | | | Parent folder reference |
| `sortOrder` | number | | `0` | |
| `layout` | enum | | `grid` | `grid` \| `list` \| `board` |
| `pinned` | boolean | | `false` | |

### Tag

**Capability:** Tags | **Icon:** tag

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | Auto-lowercased |
| `group` | string | | | Tag group for organization |
| `color` | string | | | |
| `usageCount` | number | | `0` | Auto-incremented |

### Highlight

**Capability:** Highlights | **Icon:** highlight

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `text` | string | Yes | | Selected passage |
| `color` | enum | | `yellow` | `yellow` \| `blue` \| `green` \| `red` \| `purple` |
| `note` | string | | | Annotation |
| `sourceUrl` | string | | | |
| `sourceTitle` | string | | | |
| `position` | object | | | DOM position for re-anchoring |

### Project

**Capability:** Projects | **Icon:** project

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `description` | string | | | |
| `status` | enum | | `active` | `active` \| `paused` \| `completed` \| `archived` |
| `capabilities` | array | | | Enabled capabilities for this project |
| `contacts` | array | | | Linked contacts |
| `startDate` | string | | | |
| `endDate` | string | | | |
| `template` | string | | | Project template reference |

### Email Message

**Capability:** Email | **Icon:** email

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `subject` | string | | | |
| `from` | string | | | |
| `to` | array | | | |
| `cc` | array | | | |
| `body` | string | | | |
| `attachments` | array | | | |
| `status` | enum | | | `draft` \| `sent` \| `received` \| `archived` |
| `threadId` | string | | | |

### Conversation

**Capability:** Messaging | **Icon:** messaging

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `channel` | enum | Yes | | `sms` \| `whatsapp` \| `slack` \| `teams` |
| `participants` | array | | | |
| `lastMessage` | string | | | |
| `lastMessageAt` | string | | | |
| `unread` | number | | `0` | |
| `pinned` | boolean | | `false` | |

### Automation

**Capability:** Automations | **Icon:** automations

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `trigger` | enum | | | `schedule` \| `event` \| `webhook` \| `manual` |
| `schedule` | string | | | Cron expression |
| `actions` | array | | | Action definitions |
| `enabled` | boolean | | `true` | |
| `lastRun` | string | | | |

### Connector

**Capability:** Connectors | **Icon:** connectors

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `provider` | string | | | Service name |
| `type` | enum | | | `oauth` \| `api-key` \| `webhook` |
| `status` | enum | | | `connected` \| `disconnected` \| `error` |
| `lastSync` | string | | | |
| `config` | object | | | Provider-specific settings |

### AI Chat Thread

**Capability:** AI Chat | **Icon:** ai_chat

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | | | Auto-generated or user-set |
| `model` | string | | | AI model used |
| `messages` | array | | | Message history |
| `attachments` | array | | | Files sent to AI |
| `pinned` | boolean | | `false` | |

### AI Agent

**Capability:** AI Agents | **Icon:** ai_agents

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `systemPrompt` | string | | | |
| `model` | string | | | |
| `tools` | array | | | Permitted tool references |
| `channels` | array | | | Channels this agent responds on |
| `enabled` | boolean | | `true` | |
| `escalationRule` | string | | | |

### Prompt

**Capability:** Prompt Studio | **Icon:** prompt_studio

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `content` | string | | | Prompt text |
| `modality` | enum | | | `chat` \| `writing` \| `code` \| `image` \| `video` \| `audio` \| `agent` \| `system` \| `workflow` \| `eval` |
| `variables` | array | | | Template variables `{{name}}` |
| `version` | number | | `1` | |
| `rating` | number | | | 1–5 stars |
| `folder` | string | | | |

### Password Entry

**Capability:** Password Manager | **Icon:** password

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `username` | string | | | |
| `password` | string | | | AES-256-GCM encrypted |
| `url` | string | | | |
| `notes` | string | | | Encrypted |
| `folder` | string | | | |
| `lastUsed` | string | | | |

### Template

**Capability:** Text Templates | **Icon:** templates

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `content` | string | | | Template body with `{{variables}}` |
| `type` | enum | | | `email` \| `message` \| `document` \| `note` \| `other` |
| `variables` | array | | | Extracted variable names |
| `folder` | string | | | |

### Journal Entry

**Capability:** Journal | **Icon:** journal

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `date` | string | Yes | | ISO 8601 date |
| `content` | string | | | Rich text |
| `mood` | enum | | | `great` \| `good` \| `neutral` \| `bad` \| `terrible` |
| `prompt` | string | | | Prompt that inspired the entry |
| `linkedPeople` | array | | | Contact references |
| `linkedEvents` | array | | | Calendar event references |

### Habit

**Capability:** Habits | **Icon:** habits

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | | |
| `frequency` | enum | | `daily` | `daily` \| `weekly` \| `custom` |
| `targetCount` | number | | `1` | Times per frequency period |
| `streak` | number | | `0` | Current consecutive completions |
| `bestStreak` | number | | `0` | |
| `completions` | array | | | Date + count log |

### Goal

**Capability:** Goals | **Icon:** goals

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `target` | number | | | Target metric value |
| `current` | number | | `0` | Current progress |
| `unit` | string | | | Metric unit (e.g. "pages", "$", "km") |
| `deadline` | string | | | |
| `reviewCadence` | enum | | `weekly` | `daily` \| `weekly` \| `monthly` \| `quarterly` |

### Document

**Capability:** Documents | **Icon:** documents

**Note:** Merged into Files capability. Documents (docx, pdf, xls, csv, etc.) are managed through the Files capability.

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `content` | string | | | Rich text / Markdown |
| `folder` | string | | | |
| `storageProvider` | enum | | | `local` \| `onedrive` \| `gdrive` \| `dropbox` |
| `externalPath` | string | | | Path in external storage |
| `version` | number | | `1` | |

### Audio Clip

**Capability:** Audio | **Icon:** audio

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `filename` | string | Yes | | |
| `duration` | number | | | Seconds |
| `format` | string | | | `mp3` \| `wav` \| `m4a` \| `ogg` |
| `transcript` | string | | | AI-generated transcription |
| `source` | string | | | |

### Book

**Capability:** Books | **Icon:** books

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `title` | string | Yes | | |
| `author` | string | | | |
| `format` | enum | | | `epub` \| `pdf` \| `audiobook` |
| `progress` | number | | `0` | Percentage 0–100 |
| `highlights` | array | | | |
| `rating` | number | | | 1–5 stars |

### Video Clip

**Capability:** Video | **Icon:** video

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `filename` | string | Yes | | |
| `duration` | number | | | Seconds |
| `resolution` | string | | | e.g. "1920x1080" |
| `thumbnail` | string | | | |
| `transcript` | string | | | AI-generated transcription |
| `source` | string | | | |

### Web Archive Entry

**Capability:** Web Archive | **Icon:** web_archive

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `url` | string | Yes | | Original URL |
| `title` | string | | | |
| `savedContent` | string | | | Archived HTML/text |
| `savedAt` | string | | | |
| `contentHash` | string | | | For dedup |
| `status` | enum | | | `saved` \| `failed` \| `expired` |

### Capture Item

**Capability:** Capture | **Icon:** capture

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `content` | string | | | Raw captured content |
| `source` | enum | | | `browser-extension` \| `share-sheet` \| `hotkey` \| `drag-drop` \| `api` \| `manual` |
| `type` | enum | | | `url` \| `text` \| `image` \| `file` \| `screenshot` |
| `processedAs` | string | | | Target capability (bookmark, note, file, etc.) |
| `aiMetadata` | object | | | AI-extracted tags, summary, entities |

### Voice Recording

**Capability:** Voice Input | **Icon:** voice

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `duration` | number | | | Seconds |
| `transcript` | string | | | AI transcription |
| `targetAction` | enum | | | `note` \| `task` \| `search` \| `command` |
| `processedResult` | string | | | Reference to created item |

### Translation Entry

**Capability:** Translation & Dictionary | **Icon:** translation

| Field | Type | Required | Default | Notes |
|---|---|---:|---|---|
| `sourceText` | string | Yes | | |
| `sourceLang` | string | | | ISO 639-1 |
| `targetLang` | string | | | ISO 639-1 |
| `translation` | string | | | |
| `context` | string | | | Usage context |
| `saved` | boolean | | `false` | In vocabulary list |
