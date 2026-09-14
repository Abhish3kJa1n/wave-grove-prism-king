import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { parseNumber } from "@/lib/calc/format";

type NumberFieldProps = {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
};

export function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step,
}: NumberFieldProps) {
  const [text, setText] = React.useState(formatRaw(value));
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    if (!focused) setText(formatRaw(value));
  }, [value, focused]);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-sm font-medium text-muted-foreground">
            {prefix}
          </span>
        ) : null}
        <Input
          id={id}
          inputMode="decimal"
          value={text}
          min={min}
          max={max}
          step={step}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            const next = clamp(parseNumber(text), min, max);
            onChange(next);
            setText(formatRaw(next));
          }}
          onChange={(e) => {
            const raw = e.target.value;
            setText(raw);
            if (raw === "" || raw === "." || raw === "-" || raw === "-.") return;
            const n = parseNumber(raw);
            if (!Number.isFinite(n)) return;
            onChange(clamp(n, min, max));
          }}
          className={cn(
            "tabular-nums text-lg font-medium",
            prefix && "pl-10",
            suffix && "pr-12",
          )}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center text-sm font-medium text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </div>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-12 w-full appearance-none rounded-md border border-input bg-card px-3 pr-10 text-base font-medium text-foreground shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

function formatRaw(n: number): string {
  if (!Number.isFinite(n)) return "";
  if (Number.isInteger(n)) return String(n);
  return String(n);
}

function clamp(n: number, min?: number, max?: number): number {
  let v = n;
  if (min !== undefined) v = Math.max(min, v);
  if (max !== undefined) v = Math.min(max, v);
  return v;
}
