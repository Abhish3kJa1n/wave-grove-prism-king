import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { NumberField, SelectField } from "@/components/ui/field";
import { CalculatorActions } from "@/components/calculator-actions";
import { HeroResult, StatGrid } from "@/components/stat-grid";
import { Education, EmptyResult } from "@/components/calculators/education";
import { affordability } from "@/lib/calc/affordability";
import { money, moneyExact, pct } from "@/lib/calc/format";
import { DEFAULTS } from "@/lib/site";
import { queryNumber, queryString, withParams } from "@/lib/share";

const DTI_OPTIONS = [
  { value: "28", label: "28% — conservative" },
  { value: "36", label: "36% — conventional" },
  { value: "43", label: "43% — FHA / qualified" },
];

const TERM_OPTIONS = [
  { value: "15", label: "15 years" },
  { value: "30", label: "30 years" },
];

export function AffordabilityCalculator() {
  const [income, setIncome] = useState(DEFAULTS.annualIncome);
  const [debts, setDebts] = useState(DEFAULTS.monthlyDebts);
  const [down, setDown] = useState(DEFAULTS.downPayment);
  const [rate, setRate] = useState(DEFAULTS.mortgageRate);
  const [term, setTerm] = useState("30");
  const [dti, setDti] = useState(String(DEFAULTS.dtiLimit));
  const [taxRate, setTaxRate] = useState(DEFAULTS.propertyTaxRate);
  const [insurance, setInsurance] = useState(DEFAULTS.annualInsurance);
  const [hoa, setHoa] = useState(DEFAULTS.monthlyHoa);

  useEffect(() => {
    if (queryString("calc", "") !== "affordability") return;
    setIncome(queryNumber("income", DEFAULTS.annualIncome));
    setDebts(queryNumber("debts", DEFAULTS.monthlyDebts));
    setDown(queryNumber("down", DEFAULTS.downPayment));
    setRate(queryNumber("rate", DEFAULTS.mortgageRate));
    setTerm(queryString("term", "30"));
    setDti(queryString("dti", String(DEFAULTS.dtiLimit)));
  }, []);

  const result = useMemo(
    () =>
      affordability({
        annualIncome: income,
        monthlyDebts: debts,
        downPayment: down,
        annualRate: rate,
        termYears: Number(term),
        dtiLimit: Number(dti),
        propertyTaxRate: taxRate,
        annualInsurance: insurance,
        monthlyHoa: hoa,
        pmiRate: DEFAULTS.pmiRate,
      }),
    [income, debts, down, rate, term, dti, taxRate, insurance, hoa],
  );

  function reset() {
    setIncome(DEFAULTS.annualIncome);
    setDebts(DEFAULTS.monthlyDebts);
    setDown(DEFAULTS.downPayment);
    setRate(DEFAULTS.mortgageRate);
    setTerm("30");
    setDti(String(DEFAULTS.dtiLimit));
    setTaxRate(DEFAULTS.propertyTaxRate);
    setInsurance(DEFAULTS.annualInsurance);
    setHoa(DEFAULTS.monthlyHoa);
  }

  const shareText = result
    ? `Home affordability estimate from Wellstead: up to ${money(result.maxHomePrice)} with ${money(income)} income and ${money(down)} down. Estimated housing payment ${moneyExact(result.monthlyHousing)}/mo.`
    : "Home affordability estimate from Wellstead.";

  return (
    <section id="affordability" className="scroll-mt-36">
      <div className="mb-6 max-w-2xl">
        <p className="text-sm font-medium text-primary">Buying power</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Home affordability calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Estimate a comfortable home price from income, debts, down payment, and
          today’s rates — including taxes, insurance, and PMI.
        </p>
      </div>

      <Card>
        <CardContent className="grid min-w-0 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <NumberField
              id="annual-income"
              label="Gross annual income"
              prefix="$"
              value={income}
              onChange={setIncome}
              max={10_000_000}
            />
            <NumberField
              id="monthly-debts"
              label="Monthly debts"
              prefix="$"
              value={debts}
              onChange={setDebts}
              max={100_000}
              hint="Car loans, student loans, minimum credit card payments."
            />
            <NumberField
              id="down-payment"
              label="Down payment"
              prefix="$"
              value={down}
              onChange={setDown}
              max={10_000_000}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                id="afford-rate"
                label="Interest rate"
                suffix="%"
                value={rate}
                onChange={setRate}
                max={25}
                step={0.01}
              />
              <SelectField
                id="afford-term"
                label="Loan term"
                value={term}
                onChange={setTerm}
                options={TERM_OPTIONS}
              />
            </div>
            <SelectField
              id="dti-limit"
              label="Debt-to-income limit"
              value={dti}
              onChange={setDti}
              options={DTI_OPTIONS}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                id="property-tax"
                label="Property tax"
                suffix="%"
                value={taxRate}
                onChange={setTaxRate}
                max={10}
                step={0.05}
                hint="U.S. average is near 1.1%."
              />
              <NumberField
                id="insurance"
                label="Home insurance / yr"
                prefix="$"
                value={insurance}
                onChange={setInsurance}
                max={50_000}
              />
            </div>
            <NumberField
              id="hoa"
              label="HOA dues / month"
              prefix="$"
              value={hoa}
              onChange={setHoa}
              max={10_000}
              hint="Optional."
            />
            <CalculatorActions
              onReset={reset}
              shareTitle="Home affordability estimate"
              shareText={shareText}
              getShareUrl={() =>
                withParams({
                  calc: "affordability",
                  income,
                  debts,
                  down,
                  rate,
                  term,
                  dti,
                })
              }
            />
          </form>

          <div className="flex min-w-0 flex-col gap-4" aria-live="polite">
            {result ? (
              <>
                <HeroResult
                  label="Estimated home price"
                  value={money(result.maxHomePrice)}
                  hint={`${pct(result.downPct, 1)} down · ${money(result.loanAmount)} loan`}
                />
                <StatGrid
                  items={[
                    {
                      label: "Housing payment",
                      value: moneyExact(result.monthlyHousing),
                      hint: "P&I, tax, insurance, PMI, HOA",
                    },
                    { label: "Principal & interest", value: moneyExact(result.monthlyPi) },
                    { label: "Property tax", value: moneyExact(result.monthlyTax) },
                    {
                      label: result.pmiApplies ? "PMI (est.)" : "Insurance",
                      value: moneyExact(result.pmiApplies ? result.monthlyPmi : result.monthlyInsurance),
                    },
                  ]}
                />
                <div className="rounded-xl bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
                  Uses a {dti}% back-end DTI on {moneyExact(result.monthlyIncome)} monthly
                  gross income. Combined housing and debts: {pct(result.backEndUsed, 1)}.
                  PMI of {DEFAULTS.pmiRate}% is included when the down payment is under 20%.
                </div>
              </>
            ) : (
              <EmptyResult message="Enter income to estimate a home price. If debts consume the DTI budget, try lowering them or raising the limit." />
            )}
          </div>
        </CardContent>
      </Card>

      <Education>
        <p>
          Lenders usually cap housing costs plus other monthly debts at a share of
          gross income (debt-to-income, or DTI). Conventional loans often use about
          36%; FHA and some qualified mortgages go up to 43%. This calculator solves
          for the highest home price whose full monthly housing cost stays within that
          budget after your other debts.
        </p>
        <p>
          Property tax defaults to 1.1% of home value, a common U.S. average; insurance
          defaults to $1,800 per year. Local taxes, HOA rules, credit, and reserves
          will change what a lender actually approves.
        </p>
      </Education>
    </section>
  );
}
