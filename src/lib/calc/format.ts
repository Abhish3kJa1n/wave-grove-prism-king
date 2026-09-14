const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdExact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function money(n: number, opts?: { exact?: boolean }): string {
  if (!Number.isFinite(n)) return "—";
  return (opts?.exact ? usdExact : usd).format(n);
}

export function moneyExact(n: number): string {
  return money(n, { exact: true });
}

export function moneyCompact(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return compactUsd.format(n);
}

export function pct(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(digits)}%`;
}

export function monthsToLabel(totalMonths: number): string {
  const months = Math.max(0, Math.round(totalMonths));
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return rem === 1 ? "1 month" : `${rem} months`;
  if (rem === 0) return years === 1 ? "1 year" : `${years} years`;
  return `${years} yr ${rem} mo`;
}

export function parseNumber(raw: string): number {
  const cleaned = raw.replace(/[^0-9.-]/g, "");
  if (!cleaned || cleaned === "-" || cleaned === ".") return 0;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}
