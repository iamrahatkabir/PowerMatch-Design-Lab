"use client";

type TabBarProps<T extends string> = {
  tabs: readonly T[];
  value: T;
  onChange: (tab: T) => void;
};

/** The underlined page-level tabs that sit under the top bar. */
export function TabBar<T extends string>({ tabs, value, onChange }: TabBarProps<T>) {
  return (
    <div role="tablist" className="flex gap-1 border-b border-line bg-white px-4">
      {tabs.map((name) => {
        const selected = name === value;
        return (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(name)}
            className={`-mb-px h-12 border-b-2 px-2 text-[15px] transition-colors ${
              selected ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

/** The small boxed toggle (e.g. "Phone call / Chats & Emails"). */
export function SegmentedControl<T extends string>({ tabs, value, onChange }: TabBarProps<T>) {
  return (
    <div role="tablist" className="inline-flex gap-0.5 rounded-lg border border-line bg-white p-1">
      {tabs.map((name) => {
        const selected = name === value;
        return (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(name)}
            className={`h-7 rounded-md px-3 text-[13.5px] transition-colors ${
              selected ? "bg-[#f2f4f7] font-medium text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
