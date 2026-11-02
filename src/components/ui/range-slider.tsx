"use client";

import { useId, useState } from "react";
import { Slider } from "radix-ui";
import { clamp, formatNumber } from "@/lib/utils";
import type { Range } from "@/types/vehicle";

const thumb =
  "relative block size-6 rounded-full border-2 border-ink bg-paper shadow-[0_1px_3px_rgb(10_10_10/0.25)] transition-transform duration-150 after:absolute after:-inset-2.5 after:content-[''] hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600";

function NumberField({
  label,
  value,
  onCommit,
  prefix,
  suffix,
  plain,
}: {
  label: string;
  value: number;
  onCommit: (n: number) => void;
  prefix?: string;
  suffix?: string;
  plain?: boolean;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft === null) return;
    const n = parseInt(draft.replace(/\D/g, ""), 10);
    if (!Number.isNaN(n)) onCommit(n);
    setDraft(null);
  };
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-1 block text-xs text-text-3">
        {label}
      </label>
      <div className="flex h-11 items-center gap-1.5 rounded-ctl border border-line-strong bg-white px-3 focus-within:border-ink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bronze-600">
        {prefix ? <span className="text-sm text-text-3">{prefix}</span> : null}
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={draft ?? (plain ? String(value) : formatNumber(value))}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={(e) => {
            setDraft(String(value));
            e.currentTarget.select();
          }}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="num min-w-0 flex-1 bg-transparent text-sm text-ink outline-none"
        />
        {suffix ? <span className="text-sm text-text-3">{suffix}</span> : null}
      </div>
    </div>
  );
}

/** Dual-thumb range with numeric inputs. Calls onChange on every drag tick so result counts stay live. */
export function RangeSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  prefix,
  suffix,
  plain,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: Range;
  onChange: (v: Range) => void;
  prefix?: string;
  suffix?: string;
  /** Show raw digits (years) instead of thousands separators. */
  plain?: boolean;
}) {
  return (
    <div className="space-y-4">
      <Slider.Root
        className="relative flex h-6 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange([v[0], v[1]])}
        minStepsBetweenThumbs={0}
      >
        <Slider.Track className="relative h-1 grow rounded-full bg-line">
          <Slider.Range className="absolute h-full rounded-full bg-bronze-600" />
        </Slider.Track>
        <Slider.Thumb className={thumb} aria-label={`${label}, mínimo`} />
        <Slider.Thumb className={thumb} aria-label={`${label}, máximo`} />
      </Slider.Root>
      <div className="flex items-end gap-3">
        <NumberField
          label="Mínimo"
          value={value[0]}
          prefix={prefix}
          suffix={suffix}
          plain={plain}
          onCommit={(n) => onChange([clamp(n, min, value[1]), value[1]])}
        />
        <span aria-hidden className="pb-5 text-text-3">
          –
        </span>
        <NumberField
          label="Máximo"
          value={value[1]}
          prefix={prefix}
          suffix={suffix}
          plain={plain}
          onCommit={(n) => onChange([value[0], clamp(n, value[0], max)])}
        />
      </div>
    </div>
  );
}

export function SingleSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <Slider.Root
      className="relative flex h-6 w-full touch-none select-none items-center"
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(v) => onChange(v[0])}
    >
      <Slider.Track className="relative h-1 grow rounded-full bg-line">
        <Slider.Range className="absolute h-full rounded-full bg-bronze-600" />
      </Slider.Track>
      <Slider.Thumb className={thumb} aria-label={label} />
    </Slider.Root>
  );
}
