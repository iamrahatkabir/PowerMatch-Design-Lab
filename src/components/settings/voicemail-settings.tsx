"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldRow, FormPage, Section, Select, TextArea } from "@/components/ui/form";

const greetingTypes = ["Typed text, read aloud", "Uploaded recording", "Default greeting"] as const;
const lengths = ["1 minute", "2 minutes", "3 minutes", "5 minutes", "10 minutes"] as const;

export function VoicemailSettings() {
  const [greetingType, setGreetingType] = useState<string>(greetingTypes[0]);
  const [greeting, setGreeting] = useState(
    "This call is recorded for quality and documentation purposes. Press 1 if you do not wish to be recorded.",
  );
  const [maxLength, setMaxLength] = useState("2 minutes");

  return (
    <FormPage>
      <Section title="Greetings">
        <FieldRow label="What caller hear before leaving a message" top>
          <div className="space-y-3">
            <Select
              aria-label="Greeting type"
              options={greetingTypes}
              value={greetingType}
              onChange={(e) => setGreetingType(e.target.value)}
            />
            {greetingType === "Typed text, read aloud" && (
              <TextArea
                aria-label="Greeting text"
                rows={5}
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
              />
            )}
          </div>
        </FieldRow>
      </Section>

      <Section title="Voicemails">
        <FieldRow label="Max voicemail length">
          <Select
            aria-label="Max voicemail length"
            options={lengths}
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </FieldRow>
      </Section>

      <Button variant="primary" className="h-10 px-5">
        Save changes
      </Button>
    </FormPage>
  );
}
