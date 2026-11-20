"use client";

import { useState } from "react";
import { PenLine, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { phoneNumbers as initialNumbers } from "@/lib/phone-numbers";

export function PhoneNumbersTable() {
  const [numbers, setNumbers] = useState(initialNumbers);

  const setActive = (id: string, active: boolean) =>
    setNumbers((rows) => rows.map((row) => (row.id === id ? { ...row, active } : row)));

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3 text-[15px] text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-canvas"
        >
          <Plus className="size-4" strokeWidth={1.8} />
          Add numbers
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[760px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-line text-[13px] text-[#475467]">
              <th className="h-10 w-[19%] px-5 font-medium">Phone number</th>
              <th className="w-[17%] px-5 font-medium">Label</th>
              <th className="w-[19%] px-5 font-medium">Routed to</th>
              <th className="w-[19%] px-5 font-medium">Status</th>
              <th className="px-5">
                <span className="sr-only">Enabled</span>
              </th>
              <th className="w-16 px-5">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((row) => (
              <tr key={row.id} className="h-[52px] border-b border-line whitespace-nowrap last:border-b-0">
                <td className="px-5">{row.number}</td>
                <td className="px-5">{row.label}</td>
                <td className="px-5">{row.routedTo}</td>
                <td className="px-5">
                  <StatusBadge active={row.active} />
                </td>
                <td className="px-5">
                  <Switch
                    checked={row.active}
                    onChange={(active) => setActive(row.id, active)}
                    label={`${row.active ? "Deactivate" : "Activate"} ${row.number}`}
                  />
                </td>
                <td className="px-5 text-right">
                  <button
                    type="button"
                    aria-label={`Edit ${row.number}`}
                    className="rounded p-1 text-ink hover:bg-canvas"
                  >
                    <PenLine className="size-[18px]" strokeWidth={1.6} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="rounded-md bg-success-soft px-1.5 py-0.5 text-[13px] font-medium text-success">
      Active
    </span>
  ) : (
    <span className="rounded-md bg-[#f2f4f7] px-1.5 py-0.5 text-[13px] font-medium text-[#475467]">
      Inactive
    </span>
  );
}
