export const SITE = {
  name: "Wellstead",
  shortName: "Wellstead",
  tagline: "Clear US mortgage, affordability, and take-home pay tools.",
} as const;

export const DEFAULTS = {
  mortgageRate: 6.76 as number,
  mortgageTermYears: 30 as number,
  loanAmount: 320_000 as number,
  extraPayment: 0 as number,
  homePrice: 400_000 as number,
  annualIncome: 90_000 as number,
  monthlyDebts: 450 as number,
  downPayment: 80_000 as number,
  propertyTaxRate: 1.1 as number,
  annualInsurance: 1_800 as number,
  monthlyHoa: 0 as number,
  pmiRate: 0.55 as number,
  dtiLimit: 36 as number,
  grossPay: 90_000 as number,
  pretaxDeferral: 0 as number,
};
