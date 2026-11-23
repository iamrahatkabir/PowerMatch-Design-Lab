# Changelog

Newest first. Each entry says what changed and where, so a new session can catch up without reading the code. See `CLAUDE.md` for the project map and rules.

## 2026-11-23

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
