"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/data-display";
import { Select, TextInput } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { PillTabs } from "@/components/ui/tab-bar";
import type { PhoneNumber } from "@/lib/phone-numbers";
import { queues } from "@/lib/queues";
import { users } from "@/lib/users";

const routeKinds = ["Queues", "Agents"] as const;
type RouteKind = (typeof routeKinds)[number];

const queueOptions = [...new Set(queues.map((q) => q.name))];
const agentOptions = users.map((u) => u.name);

const findIn = (options: string[], value: string) =>
  options.find((o) => o.toLowerCase() === value.toLowerCase());

/** Work out which tab and option match the number's current "Routed to". */
function initialRoute(routedTo: string): { kind: RouteKind; queue: string; agent: string } {
  const queue = findIn(queueOptions, routedTo);
  if (queue) return { kind: "Queues", queue, agent: "" };
  const agent = findIn(agentOptions, routedTo);
  if (agent) return { kind: "Agents", queue: "", agent };
  // Routed to someone not in the agent list yet (or not routed at all).
  if (routedTo && routedTo !== "--") return { kind: "Agents", queue: "", agent: routedTo };
  return { kind: "Queues", queue: "", agent: "" };
}

type EditNumberModalProps = {
  number: PhoneNumber;
  onClose: () => void;
  onSave: (changes: Pick<PhoneNumber, "label" | "routedTo">) => void;
};

/** Mount with a `key` per number so the form resets each time it opens. */
export function EditNumberModal({ number, onClose, onSave }: EditNumberModalProps) {
  const start = initialRoute(number.routedTo);
  const [label, setLabel] = useState(number.label === "New number" ? "" : number.label);
  const [kind, setKind] = useState<RouteKind>(start.kind);
  const [queue, setQueue] = useState(start.queue);
  const [agent, setAgent] = useState(start.agent);

  const agents = agent && !agentOptions.includes(agent) ? [...agentOptions, agent] : agentOptions;
  const target = kind === "Queues" ? queue : agent;

  const save = () => {
    onSave({ label: label.trim() || number.label, routedTo: target || "--" });
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      className="max-w-[520px]"
      title={
        <>
          {number.number}
          <StatusBadge active={number.active} />
        </>
      }
      subtitle={`${number.routedTo || "--"} • ${number.type}`}
      footer={
        <div className="flex justify-end">
          <Button variant="primary" className="h-10 px-5" onClick={save}>
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
          <span className="mb-2 block text-[15px] font-medium">Label</span>
          <TextInput
            placeholder="Enter number label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="h-11"
          />
        </label>

        <div>
          <span className="mb-2 block text-[15px] font-medium">Route to</span>
          <PillTabs tabs={routeKinds} value={kind} onChange={setKind} label="Route to" />
        </div>

        <label className="block">
          <span className="mb-2 block text-[15px] font-medium">{kind === "Queues" ? "Queue" : "Agent"}</span>
          {kind === "Queues" ? (
            <Select
              placeholder="Select queue"
              options={queueOptions}
              value={queue}
              onChange={(e) => setQueue(e.target.value)}
            />
          ) : (
            <Select
              placeholder="Select agent"
              options={agents}
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            />
          )}
        </label>
      </form>
    </Modal>
  );
}
