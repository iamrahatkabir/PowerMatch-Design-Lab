export type Queue = {
  id: string;
  name: string;
  /** Numbers feeding this queue. */
  phoneNumbers: string[];
  channels: string[];
  /** Member names, matching users in lib/users. */
  members: string[];
};

export const allChannels = ["Phone", "Chat", "Email", "SMS"];

const team = [
  "Las sabir",
  "Pranto Kumar",
  "Patrick Andre",
  "Rahat Kabir",
  "Sebastian",
  "Adam James",
  "Ashikur Rahman",
  "Anas Ahmed",
  "Jhon Doe",
];

/** Sample data matching the design. Replace with a real data source later. */
export const queues: Queue[] = [
  ["Sales", "+45 29 47 58 63"],
  ["Customer support", "+45 31 82 74 19"],
  ["Recruiter", "+45 40 56 23 87"],
  ["Voicemail", "+45 22 91 45 30"],
  ["Sales", "+45 38 67 12 54"],
  ["Customer support", "+45 27 84 39 61"],
  ["Recruiter", "+45 33 19 72 48"],
  ["Voicemail", "+45 26 53 80 17"],
  ["Sales", "+45 35 68 41 29"],
  ["Customer support", "+45 30 72 56 84"],
].map(([name, phoneNumber], i) => ({
  id: String(i + 1),
  name,
  phoneNumbers: [phoneNumber],
  channels: allChannels,
  members: team,
}));

/** Colours an admin can pick for an outcome button, in picker order. */
export const outcomeColors = ["green", "blue", "purple", "magenta", "orange"] as const;
export type OutcomeColor = (typeof outcomeColors)[number] | "gray";

export type OutcomeMarker =
  | { kind: "icon"; icon: "check" | "mail" | "clock" | "callback" | "ban" | "note" }
  | { kind: "dot"; color: OutcomeColor };

export type OutcomeOptions = {
  /** Agent picks when to follow up (in 1 hour, today 16:00, or a specific time). */
  asksDateTime: boolean;
  /** Agent must add a note before wrapping up. */
  requiresNote: boolean;
  /** Archive the conversation when this outcome is applied. */
  autoArchive: boolean;
};

export type WrapUpOutcome = OutcomeOptions & {
  id: string;
  label: string;
  marker: OutcomeMarker;
  /** When the outcome was added, e.g. "22 May, 2026". */
  createdAt: string;
};

/** Formats a date the way the designs do: "22 May, 2026". */
export function formatCreatedAt(date: Date) {
  const month = date.toLocaleString("en-GB", { month: "short" });
  return `${date.getDate()} ${month}, ${date.getFullYear()}`;
}

const off: OutcomeOptions = { asksDateTime: false, requiresNote: false, autoArchive: false };
/** Follow-up style outcomes ask the agent for a date & time. */
const asksTime: OutcomeOptions = { ...off, asksDateTime: true };

export const phoneCallOutcomes: WrapUpOutcome[] = [
  { id: "resolved", label: "Resolved", marker: { kind: "icon", icon: "check" }, createdAt: "22 May, 2026", ...off },
  { id: "info-sent", label: "Info sent", marker: { kind: "icon", icon: "mail" }, createdAt: "22 May, 2026", ...off },
  { id: "follow-up", label: "Follow-up", marker: { kind: "icon", icon: "clock" }, createdAt: "22 May, 2026", ...asksTime },
  { id: "callback-later", label: "Callback later", marker: { kind: "icon", icon: "callback" }, createdAt: "22 May, 2026", ...asksTime },
  { id: "wrong-number", label: "Wrong number", marker: { kind: "icon", icon: "ban" }, createdAt: "22 May, 2026", ...off },
  { id: "onboarded", label: "Onboarded", marker: { kind: "dot", color: "green" }, createdAt: "22 May, 2026", ...off },
  { id: "interview-booked", label: "Interview booked", marker: { kind: "dot", color: "blue" }, createdAt: "22 May, 2026", ...off },
  { id: "not-interested", label: "Not interested", marker: { kind: "dot", color: "gray" }, createdAt: "22 May, 2026", ...off },
];

export const chatEmailOutcomes: WrapUpOutcome[] = [
  { id: "c-resolved", label: "Resolved", marker: { kind: "icon", icon: "check" }, createdAt: "22 May, 2026", ...off },
  { id: "c-info-sent", label: "Info sent", marker: { kind: "icon", icon: "mail" }, createdAt: "22 May, 2026", ...off },
  { id: "c-kept-note", label: "Kept note", marker: { kind: "icon", icon: "note" }, createdAt: "22 May, 2026", ...off },
  { id: "c-follow-up", label: "Follow-up", marker: { kind: "icon", icon: "clock" }, createdAt: "22 May, 2026", ...asksTime },
  { id: "c-interview-booked", label: "Interview booked", marker: { kind: "dot", color: "blue" }, createdAt: "22 May, 2026", ...off },
];

/** "Sales" → "Sales queue", but leaves "Sales queue" as is. */
export const queueLabel = (name: string) => (/\bqueue$/i.test(name.trim()) ? name.trim() : `${name.trim()} queue`);
