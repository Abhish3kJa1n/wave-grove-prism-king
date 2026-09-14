import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { NumberField, SelectField } from "@/components/ui/field";
import { CalculatorActions } from "@/components/calculator-actions";
import { HeroResult, StatGrid } from "@/components/stat-grid";
import { Education, EmptyResult } from "@/components/calculators/education";
import {
  FILING_LABEL,
  STATES,
  takeHome,
  type FilingStatus,
} from "@/lib/calc/tax";
import { money, moneyExact, pct } from "@/lib/calc/format";
import { DEFAULTS } from "@/lib/site";
import { queryNumber, queryString, withParams } from "@/lib/share";

const STATUS_OPTIONS = (Object.keys(FILING_LABEL) as FilingStatus[]).map((value) => ({
  value,
  label: FILING_LABEL[value],
}));

const STATE_OPTIONS = STATES.map((s) => ({ value: s.code, label: s.name }));

export function TakeHomeCalculator() {
  const [gross, setGross] = useState(DEFAULTS.grossPay);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [state, setState] = useState("TX");
  const [pretax, setPretax] = useState(DEFAULTS.pretaxDeferral);

  useEffect(() => {
    if (queryString("calc", "") !== "take-home") return;
    setGross(queryNumber("gross", DEFAULTS.grossPay));
    const nextStatus = queryString("status", "single");
    if (nextStatus === "single" || nextStatus === "mfj" || nextStatus === "mfs" || nextStatus === "hoh") {
      setStatus(nextStatus);
    }
    setState(queryString("state", "TX"));
    setPretax(queryNumber("pretax", DEFAULTS.pretaxDeferral));
  }, []);

  const result = useMemo(
    () => takeHome({ gross, status, state, pretax }),
    [gross, status, state, pretax],
  );

  function reset() {
    setGross(DEFAULTS.grossPay);
    setStatus("single");
    setState("TX");
    setPretax(DEFAULTS.pretaxDeferral);
  }

  const shareText = result
    ? `Take-home pay estimate from Wellstead: ${money(result.takeHome)}/year (${moneyExact(result.monthly)}/mo) on ${money(gross)} gross in ${result.stateName}. Effective tax rate ${pct(result.effectiveRate, 1)}.`
    : "Take-home pay estimate from Wellstead.";

  return (
    <section id="take-home" className="scroll-mt-36">
      <div className="mb-6 max-w-2xl">
        <p className="text-sm font-medium text-primary">Paycheck estimate</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Take-home pay calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Estimate 2026 federal income tax, FICA, and state income tax so you can
          plan a housing budget from net pay.
        </p>
      </div>

      <Card>
        <CardContent className="grid min-w-0 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <NumberField
              id="gross-pay"
              label="Gross annual pay"
              prefix="$"
              value={gross}
              onChange={setGross}
              max={10_000_000}
            />
            <SelectField
              id="filing-status"
              label="Filing status"
              value={status}
              onChange={(v) => setStatus(v as FilingStatus)}
              options={STATUS_OPTIONS}
            />
            <SelectField
              id="state"
              label="State"
              value={state}
              onChange={setState}
              options={STATE_OPTIONS}
            />
            <NumberField
              id="pretax"
              label="Pre-tax deferrals / year"
              prefix="$"
              value={pretax}
              onChange={setPretax}
              max={gross}
              hint="401(k), traditional IRA, HSA, and similar contributions."
            />
            <CalculatorActions
              onReset={reset}
              shareTitle="Take-home pay estimate"
              shareText={shareText}
              getShareUrl={() =>
                withParams({
                  calc: "take-home",
                  gross,
                  status,
                  state,
                  pretax,
                })
              }
            />
          </form>

          <div className="flex min-w-0 flex-col gap-4" aria-live="polite">
            {result ? (
              <>
                <HeroResult
                  label="Annual take-home pay"
                  value={money(result.takeHome)}
                  hint={`${moneyExact(result.monthly)} per month · ${pct(result.effectiveRate, 1)} effective tax`}
                />
                <StatGrid
                  items={[
                    { label: "Federal income tax", value: money(result.federal) },
                    { label: "Social Security + Medicare", value: money(result.fica) },
                    { label: `${result.stateName} tax`, value: money(result.stateTax) },
                    { label: "Biweekly paycheck", value: moneyExact(result.biweekly) },
                  ]}
                />
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      <Row label="Gross pay" value={money(result.gross)} />
                      {result.pretax > 0 ? (
                        <Row label="Pre-tax deferrals" value={`−${money(result.pretax)}`} />
                      ) : null}
                      <Row label="Federal income tax" value={`−${money(result.federal)}`} />
                      <Row
                        label="Social Security"
                        value={`−${money(result.socialSecurity)}`}
                      />
                      <Row
                        label="Medicare"
                        value={`−${money(result.medicare + result.additionalMedicare)}`}
                      />
                      <Row label={`${result.stateName} income tax`} value={`−${money(result.stateTax)}`} />
                      <Row label="Take-home" value={money(result.takeHome)} emphasize />
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Marginal federal rate {pct(result.marginalFederal * 100, 0)}. Local
                  income taxes, credits, and withholding elections are not included.
                </p>
              </>
            ) : (
              <EmptyResult message="Enter gross pay to estimate take-home pay after 2026 federal and state taxes." />
            )}
          </div>
        </CardContent>
      </Card>

      <Education>
        <p>
          This calculator estimates 2026 federal income tax, Social Security, Medicare, and simplified state income tax. Federal brackets and standard deductions follow IRS Rev. Proc. 2025-32 ($16,100 single / $32,200 married filing jointly / $24,150 head of household). Social Security is 6.2% up to the $184,500 wage base; Medicare is 1.45% plus the 0.9% Additional Medicare Tax above $200,000 ($250,000 joint).
        </p>
        <p>
          State figures are simplified 2026 estimates (flat rates or condensed brackets) and deliberately omit most local income taxes such as New York City or certain Maryland counties. Pre-tax contributions (401(k), traditional IRA, HSA, etc.) reduce taxable income and are reflected when you enter them.
        </p>
        <p>
          Use the results for planning a housing budget from net pay. Do not use them for tax filing — actual withholding, credits, and local taxes can change the final number significantly. Confirm important figures with a tax professional or your payroll provider.
        </p>
      </Education>
    </section>
  );
}

function Row({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <tr className="border-t border-border first:border-t-0">
      <th
        scope="row"
        className={`px-4 py-2.5 text-left font-medium ${emphasize ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </th>
      <td
        className={`px-4 py-2.5 text-right tabular-nums ${emphasize ? "font-semibold text-foreground" : "text-foreground"}`}
      >
        {value}
      </td>
    </tr>
  );
}
