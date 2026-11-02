"use client";

import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  hint?: string | number;
}

/**
 * Native radios/checkboxes dressed as chips: arrow-key navigation, grouping and
 * screen-reader semantics come from the browser, not from ARIA patches.
 */
export function ChoiceChips({
  legend,
  name,
  type = "radio",
  options,
  selected,
  onChange,
  className,
}: {
  legend: string;
  name: string;
  type?: "radio" | "checkbox";
  options: readonly Option[];
  selected: readonly string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="sr-only">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input
              className="peer sr-only"
              type={type}
              name={name}
              value={o.value}
              checked={selected.includes(o.value)}
              onChange={() => onChange(o.value)}
            />
            <span className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-medium text-ink transition-[background-color,border-color,color] duration-200 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze-600">
              {o.label}
              {o.hint !== undefined ? <span className="num text-xs opacity-60">{o.hint}</span> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
