"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button, IconButton } from "@/components/ui/button";
import { FormPage, Section, TextInput } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

type Range = { id: number; from: string; to: string };
type Day = { name: string; open: boolean; ranges: Range[] };
type Holiday = { id: number; name: string; from: string; to: string };

let nextId = 100;
const range = (from: string, to: string): Range => ({ id: nextId++, from, to });

const initialDays: Day[] = [
  { name: "Monday", open: true, ranges: [range("08:00", "10:00"), range("12:00", "12:00"), range("15:00", "16:00")] },
  ...["Tuesday", "Wednesday", "Thursday", "Friday"].map((name) => ({
    name,
    open: true,
    ranges: [range("08:00", "16:00")],
  })),
  ...["Saturday", "Sunday"].map((name) => ({ name, open: false, ranges: [range("08:00", "16:00")] })),
];

const initialHolidays: Holiday[] = ["Ester", "Whitsun", "Sankt Hans", "Christmas"].map((name) => ({
  id: nextId++,
  name,
  from: "Apr 2, 2026",
  to: "Apr 2, 2026",
}));

export function BusinessHours() {
  const [days, setDays] = useState(initialDays);
  const [holidays, setHolidays] = useState(initialHolidays);

  const updateDay = (name: string, change: (day: Day) => Day) =>
    setDays((all) => all.map((day) => (day.name === name ? change(day) : day)));

  const updateRange = (dayName: string, id: number, field: "from" | "to", value: string) =>
    updateDay(dayName, (day) => ({
      ...day,
      ranges: day.ranges.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    }));

  const updateHoliday = (id: number, field: keyof Omit<Holiday, "id">, value: string) =>
    setHolidays((all) => all.map((h) => (h.id === id ? { ...h, [field]: value } : h)));

  return (
    <FormPage>
      <Section title="Weekly schedule">
        {days.map((day, dayIndex) => {
          // Consecutive closed days (the weekend) share one block in the design, so no divider between them.
          const nextDay = days[dayIndex + 1];
          const joinWithNext = !day.open && nextDay !== undefined && !nextDay.open;
          return (
            <div
              key={day.name}
              className={`grid grid-cols-2 gap-6 px-5 py-5 ${joinWithNext ? "!border-b-0" : ""}`}
            >
              <div className="flex h-10 items-center gap-2.5">
                <Switch
                  checked={day.open}
                  onChange={(open) => updateDay(day.name, (d) => ({ ...d, open }))}
                  label={`Open on ${day.name}`}
                />
                <span className={`text-[15px] font-medium ${day.open ? "text-ink" : "text-[#c4c9d2]"}`}>
                  {day.name}
                </span>
              </div>

              <div className="space-y-3">
                {day.ranges.map((r, i) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <TextInput
                      aria-label={`${day.name} start time`}
                      value={r.from}
                      disabled={!day.open}
                      onChange={(e) => updateRange(day.name, r.id, "from", e.target.value)}
                    />
                    <span className={day.open ? "text-ink" : "text-[#c4c9d2]"}>-</span>
                    <TextInput
                      aria-label={`${day.name} end time`}
                      value={r.to}
                      disabled={!day.open}
                      onChange={(e) => updateRange(day.name, r.id, "to", e.target.value)}
                    />
                    {i === 0 ? (
                      <IconButton
                        aria-label={`Add time range on ${day.name}`}
                        disabled={!day.open}
                        onClick={() =>
                          updateDay(day.name, (d) => ({ ...d, ranges: [...d.ranges, range("", "")] }))
                        }
                      >
                        <Plus className="size-[18px]" strokeWidth={1.6} />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label={`Remove time range on ${day.name}`}
                        disabled={!day.open}
                        onClick={() =>
                          updateDay(day.name, (d) => ({ ...d, ranges: d.ranges.filter((x) => x.id !== r.id) }))
                        }
                      >
                        <X className="size-[18px]" strokeWidth={1.6} />
                      </IconButton>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      <Section
        title="Danish holidays"
        action={
          <Button
            className="h-8 text-[14.5px]"
            onClick={() => setHolidays((all) => [...all, { id: nextId++, name: "", from: "", to: "" }])}
          >
            <Plus className="size-4" strokeWidth={1.8} />
            Add holiday
          </Button>
        }
      >
        {holidays.map((holiday) => (
          <div key={holiday.id} className="grid grid-cols-2 items-center gap-6 px-5 py-5">
            <input
              aria-label="Holiday name"
              placeholder="Holiday name"
              value={holiday.name}
              onChange={(e) => updateHoliday(holiday.id, "name", e.target.value)}
              className="h-10 bg-transparent text-[15px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-[#98a2b3]"
            />
            <div className="flex items-center gap-2">
              <TextInput
                aria-label={`${holiday.name || "Holiday"} start date`}
                placeholder="Start date"
                value={holiday.from}
                onChange={(e) => updateHoliday(holiday.id, "from", e.target.value)}
              />
              <span>-</span>
              <TextInput
                aria-label={`${holiday.name || "Holiday"} end date`}
                placeholder="End date"
                value={holiday.to}
                onChange={(e) => updateHoliday(holiday.id, "to", e.target.value)}
              />
              <IconButton
                aria-label={`Delete ${holiday.name || "holiday"}`}
                onClick={() => setHolidays((all) => all.filter((h) => h.id !== holiday.id))}
              >
                <Trash2 className="size-[18px]" strokeWidth={1.6} />
              </IconButton>
            </div>
          </div>
        ))}
      </Section>

      <Button variant="primary" className="h-10 px-5">
        Save changes
      </Button>
    </FormPage>
  );
}
