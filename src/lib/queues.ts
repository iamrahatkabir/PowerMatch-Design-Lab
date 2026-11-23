export type Queue = {
  id: string;
  name: string;
  phoneNumber: string;
  channels: string[];
  members: string[];
};

const team = [
  "Las Sabir",
  "Pranto Kumar",
  "Patrick Andre",
  "Rahat Kabir",
  "Anam Hossain",
  "Sebastian Dahl",
  "Adam James",
  "Anas Ahmed",
  "Jhon Doe",
];
const channels = ["Phone", "Chat", "Email", "SMS"];

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
].map(([name, phoneNumber], i) => ({ id: String(i + 1), name, phoneNumber, channels, members: team }));

export type OutcomeMarker =
  | { kind: "icon"; icon: "check" | "mail" | "clock" | "callback" | "ban" | "note" }
  | { kind: "dot"; color: "green" | "blue" | "gray" };

export type WrapUpOutcome = {
  id: string;
  label: string;
  marker: OutcomeMarker;
  queues: string[];
};

export const phoneCallOutcomes: WrapUpOutcome[] = [
  { id: "resolved", label: "Resolved", marker: { kind: "icon", icon: "check" }, queues: ["Sales", "Customer support", "Recruiter", "Voicemail"] },
  { id: "info-sent", label: "Info sent", marker: { kind: "icon", icon: "mail" }, queues: ["Recruiter", "Sales", "Customer support", "Voicemail"] },
  { id: "follow-up", label: "Follow-up", marker: { kind: "icon", icon: "clock" }, queues: ["Sales", "Recruiter"] },
  { id: "callback-later", label: "Callback later", marker: { kind: "icon", icon: "callback" }, queues: ["Sales", "Recruiter"] },
  { id: "wrong-number", label: "Wrong number", marker: { kind: "icon", icon: "ban" }, queues: ["Sales", "Recruiter"] },
  { id: "onboarded", label: "Onboarded", marker: { kind: "dot", color: "green" }, queues: ["Sales", "Recruiter"] },
  { id: "interview-booked", label: "Interview booked", marker: { kind: "dot", color: "blue" }, queues: ["Sales", "Recruiter"] },
  { id: "not-interested", label: "Not interested", marker: { kind: "dot", color: "gray" }, queues: ["Sales", "Recruiter"] },
];

export const chatEmailOutcomes: WrapUpOutcome[] = [
  { id: "c-resolved", label: "Resolved", marker: { kind: "icon", icon: "check" }, queues: ["Customer support", "Sales"] },
  { id: "c-info-sent", label: "Info sent", marker: { kind: "icon", icon: "mail" }, queues: ["Recruiter", "Sales"] },
  { id: "c-kept-note", label: "Kept note", marker: { kind: "icon", icon: "note" }, queues: ["Customer support"] },
  { id: "c-follow-up", label: "Follow-up", marker: { kind: "icon", icon: "clock" }, queues: ["Sales", "Recruiter"] },
  { id: "c-interview-booked", label: "Interview booked", marker: { kind: "dot", color: "blue" }, queues: ["Recruiter"] },
];
