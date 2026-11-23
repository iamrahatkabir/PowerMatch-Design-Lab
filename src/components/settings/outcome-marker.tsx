import { Ban, Check, Clock, Mail, NotebookPen, PhoneCall } from "lucide-react";
import type { OutcomeColor, OutcomeMarker as Marker } from "@/lib/queues";

const icons = { check: Check, mail: Mail, clock: Clock, callback: PhoneCall, ban: Ban, note: NotebookPen };
/** Background class per outcome colour (also used by the colour picker). */
export const outcomeColorClass: Record<OutcomeColor, string> = {
  green: "bg-success",
  blue: "bg-[#2e90fa]",
  purple: "bg-[#875bf7]",
  magenta: "bg-[#d444f1]",
  orange: "bg-[#ef6820]",
  gray: "bg-[#98a2b3]",
};

/** The icon or coloured dot shown before a wrap-up outcome's label. */
export function OutcomeMarker({ marker }: { marker: Marker }) {
  if (marker.kind === "dot") {
    return <span className={`mx-[5px] size-2 shrink-0 rounded-full ${outcomeColorClass[marker.color]}`} />;
  }
  const Icon = icons[marker.icon];
  return <Icon className="size-[18px] shrink-0" strokeWidth={1.6} />;
}
