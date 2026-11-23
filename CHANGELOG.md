# Changelog

Newest first. Each entry says what changed and where, so a new session can catch up without reading the code. See `CLAUDE.md` for the project map and rules.

## 2026-11-23

### Numbers & hours
- **Voicemail voice recording:** "Record a greeting now" uses the new `ui/voice-recorder.tsx`, which follows the three designs:
  1. A **Record** button.
  2. While recording: a stop button, a live green waveform and a timer.
  3. Afterwards: play/pause, a waveform that turns green as it plays, the length, and a bin to delete.

  It uses the real microphone. A blocked microphone shows an error. Save stays disabled until there's a recording.
- **Voicemail audio upload:** choosing "An uploaded audio file" shows the design's drop zone (`ui/audio-upload.tsx`). Click or drag in an `.m4a` file up to 10 MB; anything else shows a red error.
  - The uploaded state (my own design) is a file card with name, size and length, a play/pause preview with progress, Replace, and remove.
  - Save stays disabled until a file is uploaded.
- **Voicemail greeting options:** the greeting dropdown now offers "Typed text, read aloud", "An uploaded audio file" and "Record a greeting now". Only the first shows the text box. The other two show nothing extra until their designs arrive.

### Everywhere (dropdowns)
- **Custom dropdowns replace browser dropdowns.** The new `ui/select.tsx` (`Select`) matches the design: a grey halo, a ✓ on the chosen option, keyboard support, and Esc closing only the dropdown. It's used for Voicemail (greeting type, max length), Compliance & data, and the Queue field in Edit number. The old native `Select` was removed from `ui/form.tsx`, and `onChange` now receives the value directly.

### Numbers & hours (earlier today)
- **Incomplete holidays block Save:** after **Add holiday**, Save changes stays disabled until the new holiday has a name, a start date and an end date. Clearing a name disables it again.
- **Holiday date pickers:** holiday start and end dates use `DatePicker` (`ui/date-picker.tsx`), matching the design.
  - It's a month calendar with arrows, Monday first. The selected day is a yellow circle and today is grey.
  - It opens upward when there's no room below.
  - It works with the keyboard: arrows, Page Up/Down and Enter.
  - An end date before the start date shows an error and blocks Save.
  - Holiday dates are now stored as ISO dates, with real 2026 dates. "Ester" was renamed "Easter". New holidays start with empty "Start date" and "End date" fields.
- **Business hours validation:** an end time at or before its start time turns the end field red and shows "End time must be later than start time." under that row. Save changes is disabled until it's fixed; closed days are skipped. `TimeSelect` gained `invalid` and `errorId` props. Monday's sample 12:00–12:00 range is now 12:00–13:00.
- **Business hours time dropdowns.** Start and end times now use `TimeSelect` (`ui/time-select.tsx`), matching the design: a scrolling list in 15-minute steps, with the chosen time ticked and highlighted. They work with the arrow keys and Enter, and are locked on closed days. The **+** button adds a range that starts where the last one ends and lasts an hour.

### Everywhere
- **"Save changes" only appears after a change.** This covers Business hours, Voicemail, Compliance & data, and the Edit number, queue and outcome popups. The Wrap-up reorder already worked this way.
  - New helper: `ui/use-unsaved-changes.ts`.
  - Undoing a change hides the button again.
  - Page saves now show the toast "Changes have been saved."
  - A popup with no changes and nothing deletable has no footer at all.

### Wrap-up outcomes
- **"Default" badge:** default outcomes show a grey "Default" chip (the shared `Chip`) next to their name in the Buttons table.
- **Icon dropdown with all Lucide icons.** The outcome popup's Icon field (`IconSelect` in `ui/icon-picker.tsx`) opens a dropdown with a search box and a grid of all ~2,100 Lucide icons. The full set loads on first open, and more icons draw as you scroll. Outcomes store `{ name, Icon }` (`lib/queues.ts`).
- Tried Hugeicons (free Stroke Rounded set), first as a picker popup and then as a dropdown. **Removed it** in favour of Lucide; the packages are uninstalled.
- **Colour picker removed.** Outcomes no longer have coloured dots; every outcome has an icon. "Default" is now an explicit `isDefault` flag rather than "has an icon".
- **Default outcomes can't be deleted.** There's no Delete button for `isDefault` outcomes.
- **Preview order is separate from the table.** Reordering buttons changes only the preview. **Save changes** appears only when the preview order differs from the last save, and shows the toast "Button order has been saved." (`wrap-up-outcomes.tsx`)
- Table columns are now **Buttons · Created at** (the Queues column was removed). Pencil icons replaced the › arrows. The Save changes button under the table was removed.
- **Add / Edit outcome popup** (`outcome-modal.tsx`): name, icon, and three switches (asks for date & time, requires a note, auto archive). Edit adds Delete with confirmation. Toasts on add, save and delete.
- **Drag-to-reorder preview** (`wrap-up-preview.tsx`): hovering shows a grip handle; dragging shows a dashed gap, a floating copy and a blue landing line. Drops go to the grid cell nearest the pointer, including the left or right slot of the top row. Arrow keys move a focused button.

### Queues
- **Delete queue:** the edit popup's title is the queue name ("Sales queue") and it has a red Delete button. A "Delete queue?" confirmation (`ui/confirm-dialog.tsx`) leads to the toast "Sales queue has been deleted successfully!".
- **Create / Edit queue popup** (`queue-modal.tsx`): name, numbers, channels and members as checkbox dropdowns (`ui/multi-select.tsx`). Numbers routed to another queue are disabled with a "Feeding …" tag. Queues can have several numbers (the table shows "+N").
- The first tab stays named **"Queues"** (owner's decision).

### Numbers & hours
- **Edit number popup** (`edit-number-modal.tsx`): label, Route to (Queues / Agents tabs), and a queue select or an agent select with photos (`ui/avatar-select.tsx`). All fields are 40px. Saving shows a toast.
- **Add numbers flow** (`add-numbers-modal.tsx`):
  1. Pick numbers, filtered by All / Mobile / Landline, with a running total in kr.
  2. Each number shows "Setting up…", then "Added" with a tick or "Failed" with Retry (simulated ~30% failure).
  3. Done adds the numbers to the table and shows a toast.
- The phone numbers table gained a **Type** column. "Routed to" was renamed **Queue/Agent**.

### Shared and other
- Avatars show photos, using one placeholder cropped from the mock (`public/avatars/placeholder.png`, `users.ts`). This applies to the top bar, User management, queue member stacks and agent dropdowns.
- `use-floating-menu.ts` holds the shared dropdown logic. Menus flip upward when there's no room below, and scrolling inside a menu no longer closes it.
- `modal.tsx`: unique title IDs, so popups can stack, and `data-autofocus` to choose which field gets focus.
- `button.tsx`: new `danger` variant.

## 2026-11-20

- **Built the rest of Settings:**
  - Numbers & hours: Business hours and Voicemail tabs.
  - Queues & wrap-up: Queues and Wrap-up outcomes tabs.
  - User management (search, delete member).
  - Compliance & data.
- **Sidebar:** "Agents" was renamed "User management" and "Sign-in & access" was removed, following the newer designs.
- **Real PowerMatch logo** in the sidebar. The favicon is only the yellow mark (`src/app/icon.svg`).
- **Phone numbers screen:** the app shell (sidebar and top bar), tabs, and a table with working Active/Inactive toggles.
- **Project set up:** Next.js 16, React 19, TypeScript, Tailwind v4, Inter, `lucide-react`. The home screen lists categories; only Settings exists for now.
