import { cn } from "@/lib/utils";

export function StatGrid({
  items,
  className,
}: {
  items: { label: string; value: string; hint?: string }[];
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-2 gap-3", className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl bg-muted/80 px-4 py-3">
          <dt className="text-xs font-medium text-muted-foreground">{item.label}</dt>
          <dd className="mt-1 tabular-stat text-lg font-semibold tracking-tight text-foreground">
            {item.value}
          </dd>
          {item.hint ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{item.hint}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

export function HeroResult({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl bg-primary px-5 py-6 text-primary-foreground shadow-result">
      <p className="text-sm font-medium text-primary-foreground/80">{label}</p>
      <p className="mt-1 tabular-stat text-3xl font-semibold tracking-tight sm:text-5xl">
        {value}
      </p>
      {hint ? <p className="mt-2 text-sm text-primary-foreground/80">{hint}</p> : null}
    </div>
  );
}
