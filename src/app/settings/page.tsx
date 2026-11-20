import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">
        ← All categories
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-2 text-neutral-600">Settings screens will be built here from the designs.</p>
    </main>
  );
}
