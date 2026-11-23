"use client";

import { useState } from "react";
import { BusinessHours } from "@/components/settings/business-hours";
import { PhoneNumbersTable } from "@/components/settings/phone-numbers-table";
import { VoicemailSettings } from "@/components/settings/voicemail-settings";
import { TabBar } from "@/components/ui/tab-bar";

const tabs = ["Phone numbers", "Business hours", "Voicemail"] as const;

export default function NumbersAndHoursPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Phone numbers");

  return (
    <>
      <TabBar tabs={tabs} value={tab} onChange={setTab} />
      {tab === "Phone numbers" && <PhoneNumbersTable />}
      {tab === "Business hours" && <BusinessHours />}
      {tab === "Voicemail" && <VoicemailSettings />}
    </>
  );
}
