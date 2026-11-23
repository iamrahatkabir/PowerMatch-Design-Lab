"use client";

import { useState, type DragEvent } from "react";
import { Ban, Check, ChevronRight, Clock, Mail, NotebookPen, PhoneCall, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChipList } from "@/components/ui/data-display";
import { SegmentedControl } from "@/components/ui/tab-bar";
import {
  chatEmailOutcomes,
  phoneCallOutcomes,
  type OutcomeMarker,
  type WrapUpOutcome,
} from "@/lib/queues";

const channels = ["Phone call", "Chats & Emails"] as const;
type Channel = (typeof channels)[number];

const icons = { check: Check, mail: Mail, clock: Clock, callback: PhoneCall, ban: Ban, note: NotebookPen };
const dotColors = { green: "bg-success", blue: "bg-[#2e90fa]", gray: "bg-[#98a2b3]" };

function Marker({ marker }: { marker: OutcomeMarker }) {
  if (marker.kind === "dot") {
    return <span className={`mx-[5px] size-2 shrink-0 rounded-full ${dotColors[marker.color]}`} />;
  }
  const Icon = icons[marker.icon];
  return <Icon className="size-[18px] shrink-0" strokeWidth={1.6} />;
}

export function WrapUpOutcomes() {
  const [channel, setChannel] = useState<Channel>("Phone call");
  const [outcomes, setOutcomes] = useState<Record<Channel, WrapUpOutcome[]>>({
    "Phone call": phoneCallOutcomes,
    "Chats & Emails": chatEmailOutcomes,
  });
  const [dragId, setDragId] = useState<string | null>(null);

  const list = outcomes[channel];

  /** Move the dragged button to the slot of the one it's dropped on. */
  const reorder = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    setOutcomes((all) => {
      const next = [...all[channel]];
      const from = next.findIndex((o) => o.id === dragId);
      const to = next.findIndex((o) => o.id === targetId);
      next.splice(to, 0, ...next.splice(from, 1));
      return { ...all, [channel]: next };
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <SegmentedControl tabs={channels} value={channel} onChange={setChannel} />
        <Button>
          <Plus className="size-4" strokeWidth={1.8} />
          Add outcome
        </Button>
      </div>

      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-[2.15] overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full min-w-[520px] text-left text-[15px]">
            <thead>
              <tr>
                <th className="h-11 w-[45%] px-5 text-[14.5px] font-normal text-[#475467]">Buttons</th>
                <th className="h-11 px-5 text-[14.5px] font-normal text-[#475467]">Queues</th>
                <th className="w-14">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((outcome) => (
                <tr key={outcome.id} className="h-[52px] cursor-pointer border-t border-line hover:bg-canvas">
                  <td className="px-5">
                    <span className="flex items-center gap-2.5 whitespace-nowrap">
                      <Marker marker={outcome.marker} />
                      {outcome.label}
                    </span>
                  </td>
                  <td className="px-5">
                    <ChipList items={outcome.queues} />
                  </td>
                  <td className="pr-5 text-right">
                    <ChevronRight className="ml-auto size-[18px]" strokeWidth={1.6} aria-label="Open" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="w-[358px] shrink-0 rounded-xl border border-line bg-white">
          <h2 className="flex h-11 items-center border-b border-line px-4 text-[14.5px] text-[#475467]">
            Reorder buttons
          </h2>
          <p className="flex h-[52px] items-center border-b border-line px-4 text-[15px]">Wrap up (Preview)</p>

          <ul className="grid grid-cols-2 gap-2 border-b border-line p-4">
            {list.map((outcome) => (
              <li
                key={outcome.id}
                draggable
                onDragStart={(e: DragEvent) => {
                  setDragId(outcome.id);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  reorder(outcome.id);
                }}
                onDragEnd={() => setDragId(null)}
                className={`flex h-9 cursor-grab items-center gap-2 rounded-lg border border-line px-3 text-[14.5px] whitespace-nowrap select-none active:cursor-grabbing ${
                  dragId === outcome.id ? "opacity-40" : ""
                }`}
              >
                <Marker marker={outcome.marker} />
                <span className="truncate">{outcome.label}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-2 p-4">
            <button
              type="button"
              disabled
              className="h-9 rounded-lg border border-line text-[14.5px] text-[#98a2b3]"
            >
              Later
            </button>
            <button type="button" disabled className="h-9 rounded-lg bg-[#f2f4f7] text-[14.5px] text-[#98a2b3]">
              Complete
            </button>
          </div>
        </aside>
      </div>

      <Button variant="primary" className="mt-4 h-10 px-5">
        Save changes
      </Button>
    </div>
  );
}
