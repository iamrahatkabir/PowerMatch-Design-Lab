export type TeamUser = {
  id: string;
  name: string;
  email: string;
  /** null = never logged in (invitation still pending). */
  lastLogin: string | null;
  memberSince: string | null;
};

const joined = (lastLogin: string | null) => (lastLogin ? "22 May, 2026" : null);

/** Sample data matching the design. Replace with a real data source later. */
export const users: TeamUser[] = (
  [
    ["Las sabir", "alice.martin@example.com", null],
    ["Sebastian", "benjamin.lee@domain.net", "19h 24m ago"],
    ["Pranto Kumar", "clara.jones@mailservice.org", null],
    ["Patrick Andre", "daniel.smith@webmail.com", "19h 24m ago"],
    ["Rahat Kabir", "emily.watson@inbox.co", null],
    ["Adam James", "frank.thomas@mailer.io", "19h 24m ago"],
    ["Ashikur Rahman", "grace.hill@postbox.net", "19h 24m ago"],
    ["Anas Ahmed", "henry.evans@fastmail.com", "19h 24m ago"],
    ["Jhon Doe", "isabella.moore@netmail.org", null],
    ["Hoblos Salah", "jackson.brown@cloudmail.co", "19h 24m ago"],
  ] as const
).map(([name, email, lastLogin], i) => ({
  id: String(i + 1),
  name,
  email,
  lastLogin,
  memberSince: joined(lastLogin),
}));
