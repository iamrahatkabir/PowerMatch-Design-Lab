"use client";

import { useState } from "react";
import { PhoneNumbersTable } from "@/components/settings/phone-numbers-table";

const tabs = ["Phone numbers", "Business hours", "Voicemail"] as const;
type Tab = (typeof tabs)[number];

export default function NumbersAndHoursPage() {
  const [tab, setTab] = useState<Tab>("Phone numbers");

  return (
    <>
      <div role="tablist" className="flex gap-1 border-b border-line bg-white px-4">
        {tabs.map((name) => {
          const selected = name === tab;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(name)}
              className={`-mb-px h-12 border-b-2 px-2 text-[15px] transition-colors ${
                selected ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {tab === "Phone numbers" ? (
        <PhoneNumbersTable />
      ) : (
        <p className="p-8 text-sm text-muted">{tab} hasn’t been designed yet.</p>
      )}
    </>
  );
}
