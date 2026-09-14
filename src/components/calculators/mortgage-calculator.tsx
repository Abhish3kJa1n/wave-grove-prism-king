import { Fragment, lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { NumberField, SelectField } from "@/components/ui/field";
import { CalculatorActions } from "@/components/calculator-actions";
import { HeroResult, StatGrid } from "@/components/stat-grid";
import { Education, EmptyResult } from "@/components/calculators/education";
import { amortize } from "@/lib/calc/mortgage";
import { money, moneyExact, monthsToLabel } from "@/lib/calc/format";
import { DEFAULTS } from "@/lib/site";
import { queryNumber, queryString, withParams } from "@/lib/share";

const TERM_OPTIONS = [
  { value: "15", label: "15 years" },
  { value: "20", label: "20 years" },
  { value: "30", label: "30 years" },
];

const AmortizationChart = lazy(() =>
  import("@/components/calculators/amortization-chart").then((mod) => ({
    default: mod.AmortizationChart,
  })),
);

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState(DEFAULTS.loanAmount);
  const [rate, setRate] = useState(DEFAULTS.mortgageRate);
  const [term, setTerm] = useState(String(DEFAULTS.mortgageTermYears));
  const [extra, setExtra] = useState(DEFAULTS.extraPayment);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const calc = queryString("calc", "");
    if (calc && calc !== "mortgage") return;
    if (!window.location.search.includes("amount") && calc !== "mortgage") return;
    setPrincipal(queryNumber("amount", DEFAULTS.loanAmount));
    setRate(queryNumber("rate", DEFAULTS.mortgageRate));
    setTerm(queryString("term", String(DEFAULTS.mortgageTermYears)));
    setExtra(queryNumber("extra", DEFAULTS.extraPayment));
  }, []);

  const result = useMemo(
    () =>
      amortize({
        principal,
        annualRate: rate,
        termYears: Number(term),
        extraPayment: extra,
      }),
    [principal, rate, term, extra],
  );

  function reset() {
    setPrincipal(DEFAULTS.loanAmount);
    setRate(DEFAULTS.mortgageRate);
    setTerm(String(DEFAULTS.mortgageTermYears));
    setExtra(DEFAULTS.extraPayment);
  }

  const shareText = result
    ? `Mortgage payment estimate from Wellstead: ${moneyExact(result.monthlyWithExtra)}/mo on a ${money(principal)} loan at ${rate}% for ${term} years. Total interest ${money(result.totalInterest)}.`
    : "US mortgage payment estimate from Wellstead.";

  return (
    <section id="mortgage" className="scroll-mt-36">
      <div className="mb-6 max-w-2xl">
        <p className="text-sm font-medium text-primary">Payment calculator</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Mortgage payment calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Estimate principal and interest, see what extra payments save, and review a
          year-by-year amortization summary.
        </p>
      </div>

      <Card>
        <CardContent className="grid min-w-0 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <NumberField
              id="loan-amount"
              label="Loan amount"
              prefix="$"
              value={principal}
              onChange={setPrincipal}
              max={20_000_000}
              hint="The amount you borrow after the down payment."
            />
            <NumberField
              id="interest-rate"
              label="Interest rate"
              suffix="%"
              value={rate}
              onChange={setRate}
              max={25}
              step={0.01}
              hint="National 30-year average is about 6.76% as of September 2026."
            />
            <SelectField
              id="loan-term"
              label="Loan term"
              value={term}
              onChange={setTerm}
              options={TERM_OPTIONS}
            />
            <NumberField
              id="extra-payment"
              label="Extra monthly payment"
              prefix="$"
              value={extra}
              onChange={setExtra}
              max={50_000}
              hint="Applied to principal each month. Optional."
            />
            <CalculatorActions
              onReset={reset}
              shareTitle="Mortgage payment estimate"
              shareText={shareText}
              getShareUrl={() =>
                withParams({
                  calc: "mortgage",
                  amount: principal,
                  rate,
                  term,
                  extra,
                })
              }
            />
          </form>

          <div className="flex min-w-0 flex-col gap-4" aria-live="polite">
            {result ? (
              <>
                <HeroResult
                  label="Monthly principal & interest"
                  value={moneyExact(result.monthlyWithExtra)}
                  hint={
                    extra > 0
                      ? `Includes ${money(extra)} extra · base P&I ${moneyExact(result.monthlyPi)}`
                      : "Fixed-rate estimate, excluding taxes and insurance"
                  }
                />
                <StatGrid
                  items={[
                    { label: "Total interest", value: money(result.totalInterest) },
                    { label: "Total paid", value: money(result.totalPaid) },
                    { label: "Payoff time", value: monthsToLabel(result.months) },
                    extra > 0
                      ? {
                          label: "Interest saved",
                          value: money(result.interestSaved),
                          hint: `${monthsToLabel(result.monthsSaved)} sooner`,
                        }
                      : {
                          label: "Payments",
                          value: String(result.months),
                          hint: "Scheduled monthly payments",
                        },
                  ]}
                />
                <div className="rounded-xl bg-muted/60 p-4 sm:p-5">
                  <p className="mb-3 text-sm font-medium">Remaining balance</p>
                  <Suspense fallback={<div className="h-56" />}>
                    <AmortizationChart schedule={result.schedule} />
                  </Suspense>
                </div>
                <AmortizationTable schedule={result.schedule} />
              </>
            ) : (
              <EmptyResult message="Enter a loan amount to see your monthly payment." />
            )}
          </div>
        </CardContent>
      </Card>

      <Education>
        <p>
          A fixed-rate mortgage payment is calculated with the standard amortization
          formula. Your rate is divided by 12 to get a monthly rate, and the term is
          converted to months. Extra principal payments reduce the balance faster, so
          less interest accrues and the loan can be paid off earlier.
        </p>
        <p>
          This tool shows principal and interest only. A full housing payment also
          typically includes property taxes, homeowners insurance, and possibly PMI or
          HOA dues — those are estimated in the affordability calculator below.
        </p>
      </Education>
    </section>
  );
}

function AmortizationTable({
  schedule,
}: {
  schedule: { year: number; interest: number; principalPaid: number; balance: number }[];
}) {
  if (schedule.length === 0) return null;
  const collapsed = schedule.length > 8;
  const rows = collapsed ? [...schedule.slice(0, 5), schedule[schedule.length - 1]] : schedule;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Amortization summary by year</caption>
        <thead className="bg-muted/80 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">Year</th>
            <th className="px-4 py-2.5 font-medium">Principal paid</th>
            <th className="px-4 py-2.5 font-medium">Interest paid</th>
            <th className="px-4 py-2.5 font-medium">Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <Fragment key={row.year}>
              {collapsed && i === 5 ? (
                <tr className="border-t border-border">
                  <td colSpan={4} className="px-4 py-2 text-center text-xs text-muted-foreground">
                    Years 6–{schedule.length - 1} omitted
                  </td>
                </tr>
              ) : null}
              <tr className="border-t border-border">
                <td className="px-4 py-2.5 tabular-nums">{row.year}</td>
                <td className="px-4 py-2.5 tabular-nums">{money(row.principalPaid)}</td>
                <td className="px-4 py-2.5 tabular-nums">{money(row.interest)}</td>
                <td className="px-4 py-2.5 tabular-nums">{money(row.balance)}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
