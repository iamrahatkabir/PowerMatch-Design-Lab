"use client";

import { useState } from "react";
import { Check, ListChecks } from "lucide-react";
import { outcomeColorClass } from "@/components/settings/outcome-marker";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TextInput } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { outcomeColors, type OutcomeColor, type OutcomeOptions, type WrapUpOutcome } from "@/lib/queues";

export type OutcomeDraft = OutcomeOptions & {
  label: string;
  /** null keeps an existing icon outcome as it is (no colour picked). */
  color: OutcomeColor | null;
};

const options: { key: keyof OutcomeOptions; title: string; description: string }[] = [
  {
    key: "asksDateTime",
    title: "Asks for a date & time",
    description: "The agent picks when to follow up in 1 hour, today 16:00, or a specific time.",
  },
  {
    key: "requiresNote",
    title: "Requires a note",
    description: "Before wrapping up agents needs to add a note.",
  },
  {
    key: "autoArchive",
    title: "Auto archive conversation",
    description: "Auto archive a conversation if outcome is applied in wrap up.",
  },
];

/** New outcomes start like the design: green, and asking for a date & time. */
const newDraft: OutcomeDraft = {
  label: "",
  color: "green",
  asksDateTime: true,
  requiresNote: false,
  autoArchive: false,
};

function draftFrom(outcome: WrapUpOutcome): OutcomeDraft {
  return {
    label: outcome.label,
    color: outcome.marker.kind === "dot" ? outcome.marker.color : null,
    asksDateTime: outcome.asksDateTime,
    requiresNote: outcome.requiresNote,
    autoArchive: outcome.autoArchive,
  };
}

type OutcomeModalProps = {
  /** The outcome being edited; leave out to add a new one. */
  outcome?: WrapUpOutcome;
  onClose: () => void;
  onSave: (draft: OutcomeDraft) => void;
  onDelete?: () => void;
};

/** Mount with a `key` so the form resets each time it opens. */
export function OutcomeModal({ outcome, onClose, onSave, onDelete }: OutcomeModalProps) {
  const [draft, setDraft] = useState<OutcomeDraft>(outcome ? draftFrom(outcome) : newDraft);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const set = <K extends keyof OutcomeDraft>(key: K, value: OutcomeDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));
  const canSave = draft.label.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    onSave({ ...draft, label: draft.label.trim() });
    onClose();
  };

  const remove = () => {
    setConfirmingDelete(false);
    onDelete?.();
    onClose();
  };

  return (
    <>
      <Modal
        open
        onClose={onClose}
        className="max-w-[520px]"
        title={outcome ? "Edit outcome" : "Add new outcome"}
        subtitle={outcome ? "Make changes on your existing outcome." : "What agents pick when finishing a conversation."}
        footer={
          <div className="flex items-center justify-between">
            {outcome && onDelete ? (
              <Button variant="danger" className="h-10 px-5" onClick={() => setConfirmingDelete(true)}>
                Delete
              </Button>
            ) : (
              <span />
            )}
            <Button variant="primary" className="h-10 px-5" disabled={!canSave} onClick={save}>
              Save changes
            </Button>
          </div>
        }
      >
        <form
          className="space-y-6 px-6 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <label className="block">
            <span className="mb-2 block text-[15px] font-medium">Name</span>
            <TextInput placeholder="e.g., Callback" value={draft.label} onChange={(e) => set("label", e.target.value)} />
          </label>

          <div>
            <span id="outcome-color" className="mb-2.5 block text-[15px] font-medium">
              Select button color
            </span>
            <div role="radiogroup" aria-labelledby="outcome-color" className="flex gap-3">
              {outcomeColors.map((color) => {
                const selected = draft.color === color;
                return (
                  <button
                    key={color}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={color}
                    onClick={() => set("color", color)}
                    className={`grid size-10 place-items-center rounded-full text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98a2b3] ${outcomeColorClass[color]}`}
                  >
                    {selected && <Check className="size-5" strokeWidth={2.4} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-7 px-3 pt-1">
            {options.map(({ key, title, description }) => (
              <div key={key} className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium">{title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#475467]">{description}</p>
                </div>
                <Switch checked={draft[key]} onChange={(on) => set(key, on)} label={title} />
              </div>
            ))}
          </div>
        </form>
      </Modal>

      {outcome && (
        <ConfirmDialog
          open={confirmingDelete}
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={remove}
          icon={<ListChecks className="size-6" strokeWidth={1.6} />}
          title="Delete outcome?"
          confirmLabel="Yes! Delete"
        >
          Do you really want to delete <strong className="font-semibold text-ink">{outcome.label}</strong>?
        </ConfirmDialog>
      )}
    </>
  );
}
