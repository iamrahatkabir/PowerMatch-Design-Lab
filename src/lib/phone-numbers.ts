export type PhoneNumber = {
  id: string;
  number: string;
  label: string;
  routedTo: string;
  active: boolean;
};

/** Sample data matching the design. Replace with a real data source later. */
export const phoneNumbers: PhoneNumber[] = [
  { id: "1", number: "+45 29 47 58 63", label: "Main Sales", routedTo: "Sales", active: true },
  { id: "2", number: "+45 31 82 74 19", label: "Main Customer support", routedTo: "Customer support", active: false },
  { id: "3", number: "+45 40 56 23 87", label: "Las Sabir Main", routedTo: "Las Sabir", active: true },
  { id: "4", number: "+45 22 91 45 30", label: "Voicemail Only", routedTo: "Voicemail", active: false },
  { id: "5", number: "+45 38 67 12 54", label: "Prantos’ Main", routedTo: "Pranto Kumar", active: true },
  { id: "6", number: "+45 27 84 39 61", label: "Main Customer support", routedTo: "Customer support", active: false },
  { id: "7", number: "+45 33 19 72 48", label: "Patricks’ Main", routedTo: "Patrick Andre", active: true },
  { id: "8", number: "+45 26 53 80 17", label: "Voicemail V2", routedTo: "Voicemail", active: false },
  { id: "9", number: "+45 35 68 41 29", label: "Anams’ Personal", routedTo: "Anam", active: true },
  { id: "10", number: "+45 30 72 56 84", label: "Main support", routedTo: "Customer support", active: false },
];
