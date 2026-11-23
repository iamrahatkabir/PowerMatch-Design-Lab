@AGENTS.md

# PowerMatch Design Lab

Front-end build of PowerMatch product screens from designs the owner shares as screenshots. The goal is to match each design closely and make it interactive, without a backend yet: all data is local sample data and resets on reload.

Read this file and `CHANGELOG.md` first; you shouldn't need to read every source file to continue. Update both when you change things (see "Keeping these docs current").

## Working rules (from the owner)

- **Never `git commit` or `git push`.** The owner does all git operations.
- Build from the shared design. When the design is ambiguous or inconsistent, pick the sensible option, build it, and say what you chose.
- Verify changes in the browser at 1440px wide before reporting done. Run `npx tsc --noEmit` and `npm run lint`; both must be clean.
- Keep the first Queues & wrap-up tab named **"Queues"**, even though some designs say "Queues & auto-pause".

## Stack

- Next.js 16 (App Router, `src/`), React 19, TypeScript, Tailwind CSS v4.
- Icons: `lucide-react` everywhere, including the user-selectable outcome icons. (Hugeicons was tried and removed.)
- Font: Inter (`next/font`). Light theme only.
- Run: `npm run dev` → http://localhost:3000. `.claude/launch.json` has a `dev` config for the preview browser.
- If new Tailwind theme colours don't apply, restart the dev server (stale cache).
- Next.js 16 may differ from older docs: check `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Design tokens (`src/app/globals.css`)

`brand` #f5e04a (yellow buttons/toggles), `brand-dark`, `ink` #1d2433 (text), `muted` #667085, `line` #eaecf0 (borders), `canvas` #f9fafb (page bg), `success`/`success-soft`, `danger`/`danger-soft`. Use these Tailwind names (`bg-brand`, `border-line`, …), not raw hex, where one exists.

Common sizes: inputs and selects are **40px tall** (`h-10`), table rows 52px, sidebar 248px, popups 520px wide.

## Routes

| Route | Screen |
|---|---|
| `/` | Categories home (only "Settings" for now) |
| `/settings` | Redirects to `/settings/numbers-hours` |
| `/settings/numbers-hours` | Tabs: Phone numbers · Business hours · Voicemail |
| `/settings/queues-wrap-up` | Tabs: Queues · Wrap-up outcomes |
| `/settings/user-management` | Members table with search |
| `/settings/compliance-data` | Recording & retention dropdowns |

`src/app/settings/layout.tsx` is the shell: sidebar + top bar (bell, Las Sabir avatar). Sidebar nav lives in `src/components/app-shell/sidebar.tsx`; only the four Admin settings pages are links.

## Where things are

**Sample data (`src/lib/`)**: replace these with real APIs later.
- `phone-numbers.ts`: owned numbers (label, routedTo, type Mobile/Landline, active) and `availableNumbers` offered for purchase.
- `queues.ts`: queues (name, phoneNumbers[], channels, members), wrap-up outcomes per channel, `OutcomeIcon` type, `queueLabel()`, `formatCreatedAt()`.
- `users.ts`: members (name, email, lastLogin, memberSince, photo), `photoFor()`, `PLACEHOLDER_PHOTO`.
- `categories.ts`: home screen categories.

**Shared UI (`src/components/ui/`)**: reuse these before writing new ones.
- `modal.tsx`: popup on native `<dialog>` (title, subtitle, footer; Esc/backdrop close; `data-autofocus` picks the focused field).
- `confirm-dialog.tsx`: red "Delete X?" confirmation that stacks over a popup.
- `toast.tsx`: bottom-right success toast, auto-hides after 5s.
- `button.tsx`: `Button` (variants `primary` yellow, `outline`, `danger` red) and `IconButton`.
- `form.tsx`: `TextInput`, `TextArea`, `Select` (native, supports `placeholder`), and `FormPage`/`Section`/`FieldRow` for the centred form pages.
- `tab-bar.tsx`: `TabBar` (underlined page tabs), `SegmentedControl`, `PillTabs` (full-width grey track).
- `data-display.tsx`: `Chip`, `ChipList` (+N), `Avatar` (photo or initials), `AvatarStack`, `StatusBadge`, `TableCard`, table class strings `th`/`tr`.
- `switch.tsx`: yellow toggle.
- `use-floating-menu.ts`: shared dropdown open/close/position (fixed, flips upward when there isn't room, closes on outside click or scroll).
- `avatar-select.tsx`: single-choice dropdown with avatars (Agent field).
- `multi-select.tsx`: checkbox dropdown with "N selected ×" (numbers, channels, members; disabled rows with a tag).
- `icon-picker.tsx`: `IconSelect` field + dropdown over all ~2,100 Lucide icons with search. The full set is loaded lazily on first open.

**Feature components (`src/components/settings/`)**
- Numbers & hours: `phone-numbers-table.tsx`, `add-numbers-modal.tsx` (select → setting up → added/failed + retry; failure is simulated ~30%), `edit-number-modal.tsx`, `business-hours.tsx`, `voicemail-settings.tsx`.
- Queues: `queues-table.tsx`, `queue-modal.tsx` (create/edit/delete).
- Wrap-up: `wrap-up-outcomes.tsx` (table + state), `wrap-up-preview.tsx` (drag-to-reorder card), `outcome-modal.tsx` (add/edit/delete), `outcome-marker.tsx` (draws an outcome's icon).

## Behaviour decisions worth knowing

- **Toasts:** every save, add and delete shows one, e.g. "Changes to X have been saved.", "X has been deleted successfully!".
- **Deletes:** always go through `ConfirmDialog`.
- **Phone numbers:**
  - Bought numbers are added as inactive "New number", routed to "--".
  - The Edit popup's Route to has Queues / Agents tabs.
  - The column is titled "Queue/Agent".
- **Queues:**
  - A number already routed to a different queue is disabled in the picker, with a tag like "Feeding sales".
  - A queue can have several numbers; the table shows the first number plus "+N".
- **Wrap-up outcomes:**
  - Columns are Buttons and Created at.
  - The **preview has its own button order**, separate from the table order.
  - **Save changes** only appears when the preview order differs from the last saved order.
  - Drag drops into the grid cell nearest the pointer; the blue line marks the exact landing slot. Arrow keys also move a focused button.
  - Outcomes with `isDefault: true` (Resolved, Info sent, Follow-up, Callback later, Wrong number, Kept note) **can't be deleted**. Their name, icon and options can still be edited.
  - Each outcome stores a Lucide icon `{ name, Icon }` and three switches: asks for date & time, requires a note, auto archive.
- **Avatars:** everyone with a photo uses one placeholder face cropped from the mock (`public/avatars/placeholder.png`); real photos go in `public/avatars/` via `users.ts`.
- **Logo:** `public/powermatch-logo.svg` (the real one). The favicon `src/app/icon.svg` is only the yellow mark.

## Not built yet / placeholders

- Nothing persists (no backend); every Save only updates local state.
- Not wired up: Add members, Voicemail/Compliance/Business hours Save changes (these show no toast yet).
- Tabs seen in designs but not built: Numbers & hours → Routing settings, Outbound & smart rotation; Queues → Answer-time targets.
- Sidebar items outside Admin settings are inert.

## Keeping these docs current

After each change: add a dated entry at the top of `CHANGELOG.md` (what changed and the files), and update this file if routes, shared components, data shapes or decisions changed.
