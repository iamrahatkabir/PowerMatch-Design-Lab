"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldRow, FormPage, Section } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import { useUnsavedChanges } from "@/components/ui/use-unsaved-changes";

const recordOptions = ["All", "Only queue calls", "None"] as const;
const retentionOptions = ["30 days", "90 days", "6 months", "1 year", "2 years", "Forever"] as const;

export default function ComplianceDataPage() {
  const [settings, setSettings] = useState({
    incoming: "All",
    outgoing: "All",
    recordings: "90 days",
    transcripts: "1 year",
  });

  // Save changes only shows once something differs from the last save.
  const { dirty, markSaved } = useUnsavedChanges(settings);
  const [toast, setToast] = useState<string | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);
  const save = () => {
    markSaved();
    setToast("Changes have been saved.");
  };

  const field = (key: keyof typeof settings, label: string, options: readonly string[]) => (
    <FieldRow label={label}>
      <Select
        label={label}
        options={options}
        value={settings[key]}
        onChange={(value) => setSettings((s) => ({ ...s, [key]: value }))}
      />
    </FieldRow>
  );

  return (
    <FormPage>
      <Section title="What is recorded">
        {field("incoming", "Incoming calls", recordOptions)}
        {field("outgoing", "Outgoing calls", recordOptions)}
      </Section>

      <Section title="Retention & storage">
        {field("recordings", "Keep recordings for", retentionOptions)}
        {field("transcripts", "Keep transcripts for", retentionOptions)}
      </Section>

      {dirty && (
        <Button variant="primary" className="h-10 px-5" onClick={save}>
          Save changes
        </Button>
      )}
      <Toast message={toast} onDismiss={dismissToast} />
    </FormPage>
  );
}
