import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { YearRow } from "@/lib/calc/mortgage";
import { moneyCompact } from "@/lib/calc/format";

export function AmortizationChart({ schedule }: { schedule: YearRow[] }) {
  if (schedule.length === 0) return null;
  const data = schedule.map((row) => ({
    year: `Y${row.year}`,
    balance: Math.round(row.balance),
    interest: Math.round(row.interest),
  }));

  return (
    <div className="h-56 w-full min-w-0 overflow-hidden sm:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={(v) => moneyCompact(Number(v))}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-card)",
              color: "var(--color-foreground)",
            }}
            formatter={(value) => moneyCompact(Number(value ?? 0))}
            labelFormatter={(label) => `Year ${String(label).replace("Y", "")}`}
          />
          <Area
            type="monotone"
            dataKey="balance"
            name="Remaining balance"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="url(#balanceFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
