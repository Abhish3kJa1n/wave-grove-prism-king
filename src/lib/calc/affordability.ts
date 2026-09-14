import { monthlyPi } from "./mortgage";

export type AffordabilityInput = {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  annualRate: number;
  termYears: number;
  dtiLimit: number;
  propertyTaxRate: number;
  annualInsurance: number;
  monthlyHoa: number;
  pmiRate: number;
};

export type AffordabilityResult = {
  maxHomePrice: number;
  loanAmount: number;
  downPayment: number;
  downPct: number;
  monthlyPi: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  monthlyHousing: number;
  maxHousingBudget: number;
  monthlyIncome: number;
  backEndUsed: number;
  pmiApplies: boolean;
};

export function affordability(input: AffordabilityInput): AffordabilityResult | null {
  const monthlyIncome = input.annualIncome / 12;
  if (monthlyIncome <= 0 || input.termYears <= 0) return null;

  const maxHousingBudget = Math.max(
    0,
    monthlyIncome * (input.dtiLimit / 100) - Math.max(0, input.monthlyDebts),
  );
  if (maxHousingBudget <= 0) return null;

  const down = Math.max(0, input.downPayment);
  // Search home price. Lower bound is the down payment (100% down, zero loan).
  let lo = down;
  let hi = Math.max(down + 1_000, down + maxHousingBudget * input.termYears * 12);
  // Cap the search so extreme rates still terminate.
  hi = Math.min(hi, 20_000_000);

  for (let i = 0; i < 48; i += 1) {
    const mid = (lo + hi) / 2;
    const cost = housingCost(mid, down, input);
    if (cost.monthlyHousing > maxHousingBudget) hi = mid;
    else lo = mid;
  }

  const price = Math.floor(lo);
  const cost = housingCost(price, down, input);
  const loan = Math.max(0, price - down);
  const downPct = price > 0 ? (down / price) * 100 : 0;

  return {
    maxHomePrice: price,
    loanAmount: loan,
    downPayment: Math.min(down, price),
    downPct,
    monthlyPi: cost.monthlyPi,
    monthlyTax: cost.monthlyTax,
    monthlyInsurance: cost.monthlyInsurance,
    monthlyPmi: cost.monthlyPmi,
    monthlyHoa: cost.monthlyHoa,
    monthlyHousing: cost.monthlyHousing,
    maxHousingBudget,
    monthlyIncome,
    backEndUsed: monthlyIncome > 0 ? ((cost.monthlyHousing + input.monthlyDebts) / monthlyIncome) * 100 : 0,
    pmiApplies: cost.monthlyPmi > 0,
  };
}

function housingCost(price: number, down: number, input: AffordabilityInput) {
  const loan = Math.max(0, price - down);
  const pi = monthlyPi(loan, input.annualRate, input.termYears);
  const monthlyTax = (price * (input.propertyTaxRate / 100)) / 12;
  const monthlyInsurance = input.annualInsurance / 12;
  const monthlyHoa = Math.max(0, input.monthlyHoa);
  const downPct = price > 0 ? down / price : 1;
  const monthlyPmi = downPct < 0.2 && loan > 0 ? (loan * (input.pmiRate / 100)) / 12 : 0;
  return {
    monthlyPi: pi,
    monthlyTax,
    monthlyInsurance,
    monthlyPmi,
    monthlyHoa,
    monthlyHousing: pi + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa,
  };
}
