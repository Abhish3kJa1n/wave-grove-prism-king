export type MortgageInput = {
  principal: number;
  annualRate: number;
  termYears: number;
  extraPayment: number;
};

export type YearRow = {
  year: number;
  interest: number;
  principalPaid: number;
  extraPaid: number;
  balance: number;
};

export type MortgageResult = {
  monthlyPi: number;
  monthlyWithExtra: number;
  totalInterest: number;
  totalPaid: number;
  months: number;
  baselineInterest: number;
  baselineMonths: number;
  interestSaved: number;
  monthsSaved: number;
  schedule: YearRow[];
};

export function monthlyPi(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) return 0;
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / n;
  const pow = (1 + r) ** n;
  return (principal * r * pow) / (pow - 1);
}

export function amortize(input: MortgageInput): MortgageResult | null {
  const { principal, annualRate, termYears, extraPayment } = input;
  if (principal <= 0 || termYears <= 0) return null;

  const n = Math.round(termYears * 12);
  const r = annualRate / 100 / 12;
  const base = monthlyPi(principal, annualRate, termYears);
  const scheduled = base + Math.max(0, extraPayment);

  const baseline = runSchedule(principal, r, n, base);
  const withExtra = extraPayment > 0 ? runSchedule(principal, r, n, scheduled) : baseline;

  return {
    monthlyPi: base,
    monthlyWithExtra: scheduled,
    totalInterest: withExtra.totalInterest,
    totalPaid: principal + withExtra.totalInterest,
    months: withExtra.months,
    baselineInterest: baseline.totalInterest,
    baselineMonths: baseline.months,
    interestSaved: Math.max(0, baseline.totalInterest - withExtra.totalInterest),
    monthsSaved: Math.max(0, baseline.months - withExtra.months),
    schedule: withExtra.schedule,
  };
}

function runSchedule(
  principal: number,
  monthlyRate: number,
  maxMonths: number,
  payment: number,
): { totalInterest: number; months: number; schedule: YearRow[] } {
  let balance = principal;
  let totalInterest = 0;
  let month = 0;
  const schedule: YearRow[] = [];
  let yearInterest = 0;
  let yearPrincipal = 0;
  let yearExtra = 0;

  const safety = maxMonths + 12;
  while (balance > 0.005 && month < safety) {
    month += 1;
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    let principalPaid = payment - interest;
    if (principalPaid <= 0 && monthlyRate > 0) {
      // Payment does not cover interest — stop rather than looping forever.
      break;
    }
    if (principalPaid > balance) principalPaid = balance;
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    yearInterest += interest;
    yearPrincipal += principalPaid;

    const baseThisMonth = monthlyRate === 0 ? principal / maxMonths : 0;
    // Extra is whatever of the payment exceeded the original PI on this remaining balance.
    // Tracked only as residual of principal beyond a typical PI share — skip, use year buckets.
    void baseThisMonth;

    if (month % 12 === 0 || balance <= 0.005) {
      schedule.push({
        year: Math.ceil(month / 12),
        interest: yearInterest,
        principalPaid: yearPrincipal,
        extraPaid: yearExtra,
        balance,
      });
      yearInterest = 0;
      yearPrincipal = 0;
      yearExtra = 0;
    }
  }

  if (month === 0) {
    return { totalInterest: 0, months: 0, schedule: [] };
  }

  return { totalInterest, months: month, schedule };
}
