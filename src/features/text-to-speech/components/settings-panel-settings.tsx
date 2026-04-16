"use client";

import { useStore } from "@tanstack/react-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useTypedAppFormContext } from "@/hooks/use-app-form";

import { sliders } from "../data/slider";
import { ttsFormOptions } from "./text-to-speech-form";
import { VoiceSelector } from "./voice-selector";

export function SettingsPanelSettings() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <>
      {/* Voice Style Dropdown Section */}
      <div className="border-b border-dashed p-4">
        <VoiceSelector />
      </div>

      {/* Voice Adjustments Section */}
      <div className="flex-1 p-4">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {slider.leftLabel}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {slider.rightLabel}
                    </span>
                  </div>
                  <Slider
                    value={[field.state.value ?? 0]}
                    // onValueChange={(value) => field.handleChange(value[0])} -> this assumes array or value , input is not fixed
                    onValueChange={(value) => {
                      field.handleChange(
                        Array.isArray(value) ? value[0] : value
                      );
                    }}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                    className="**:data-[slot=slider-thumb]:bg-foreground **:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-track]:h-1"
                  />
                  console.log(field.state.value);
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
}
