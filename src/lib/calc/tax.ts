export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

export type Bracket = { upTo: number; rate: number };

export type StateTax = {
  code: string;
  name: string;
  brackets: Bracket[];
  deduction: number;
};

export type TakeHomeInput = {
  gross: number;
  status: FilingStatus;
  state: string;
  pretax: number;
};

export type TakeHomeResult = {
  gross: number;
  taxableFederal: number;
  federal: number;
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  fica: number;
  stateTax: number;
  stateName: string;
  pretax: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
  marginalFederal: number;
  monthly: number;
  biweekly: number;
  weekly: number;
};

const INF = Number.POSITIVE_INFINITY;

const FEDERAL: Record<FilingStatus, { deduction: number; brackets: Bracket[] }> = {
  single: {
    deduction: 16_100,
    brackets: [
      { upTo: 12_400, rate: 0.1 },
      { upTo: 50_400, rate: 0.12 },
      { upTo: 105_700, rate: 0.22 },
      { upTo: 201_775, rate: 0.24 },
      { upTo: 256_225, rate: 0.32 },
      { upTo: 640_600, rate: 0.35 },
      { upTo: INF, rate: 0.37 },
    ],
  },
  mfj: {
    deduction: 32_200,
    brackets: [
      { upTo: 24_800, rate: 0.1 },
      { upTo: 100_800, rate: 0.12 },
      { upTo: 211_400, rate: 0.22 },
      { upTo: 403_550, rate: 0.24 },
      { upTo: 512_450, rate: 0.32 },
      { upTo: 768_700, rate: 0.35 },
      { upTo: INF, rate: 0.37 },
    ],
  },
  mfs: {
    deduction: 16_100,
    brackets: [
      { upTo: 12_400, rate: 0.1 },
      { upTo: 50_400, rate: 0.12 },
      { upTo: 105_700, rate: 0.22 },
      { upTo: 201_775, rate: 0.24 },
      { upTo: 256_225, rate: 0.32 },
      { upTo: 384_350, rate: 0.35 },
      { upTo: INF, rate: 0.37 },
    ],
  },
  hoh: {
    deduction: 24_150,
    brackets: [
      { upTo: 17_700, rate: 0.1 },
      { upTo: 67_450, rate: 0.12 },
      { upTo: 105_700, rate: 0.22 },
      { upTo: 201_775, rate: 0.24 },
      { upTo: 256_200, rate: 0.32 },
      { upTo: 640_600, rate: 0.35 },
      { upTo: INF, rate: 0.37 },
    ],
  },
};

const SS_RATE = 0.062;
const SS_WAGE_BASE = 184_500;
const MEDICARE_RATE = 0.0145;
const ADD_MEDICARE_RATE = 0.009;
const ADD_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  hoh: 200_000,
  mfj: 250_000,
  mfs: 125_000,
};

function b(pairs: Array<[number, number]>): Bracket[] {
  return pairs.map(([upTo, rate]) => ({ upTo, rate }));
}

const NONE: Bracket[] = [{ upTo: INF, rate: 0 }];

export const STATES: StateTax[] = [
  { code: "AL", name: "Alabama", deduction: 3_000, brackets: b([[500, 0.02], [3_000, 0.04], [INF, 0.05]]) },
  { code: "AK", name: "Alaska", deduction: 0, brackets: NONE },
  { code: "AZ", name: "Arizona", deduction: 8_350, brackets: b([[INF, 0.025]]) },
  { code: "AR", name: "Arkansas", deduction: 2_470, brackets: b([[4_600, 0.02], [INF, 0.039]]) },
  {
    code: "CA",
    name: "California",
    deduction: 5_540,
    brackets: b([
      [10_756, 0.01],
      [25_499, 0.02],
      [40_245, 0.04],
      [55_866, 0.06],
      [70_606, 0.08],
      [360_659, 0.093],
      [432_787, 0.103],
      [721_314, 0.113],
      [1_000_000, 0.123],
      [INF, 0.133],
    ]),
  },
  { code: "CO", name: "Colorado", deduction: 15_000, brackets: b([[INF, 0.044]]) },
  {
    code: "CT",
    name: "Connecticut",
    deduction: 0,
    brackets: b([
      [10_000, 0.02],
      [50_000, 0.045],
      [100_000, 0.055],
      [200_000, 0.06],
      [250_000, 0.065],
      [500_000, 0.069],
      [INF, 0.0699],
    ]),
  },
  {
    code: "DE",
    name: "Delaware",
    deduction: 3_250,
    brackets: b([
      [2_000, 0],
      [5_000, 0.022],
      [10_000, 0.039],
      [20_000, 0.048],
      [25_000, 0.052],
      [60_000, 0.0555],
      [INF, 0.066],
    ]),
  },
  { code: "DC", name: "District of Columbia", deduction: 15_000, brackets: b([[10_000, 0.04], [40_000, 0.06], [60_000, 0.065], [250_000, 0.085], [500_000, 0.0925], [1_000_000, 0.0975], [INF, 0.1075]]) },
  { code: "FL", name: "Florida", deduction: 0, brackets: NONE },
  { code: "GA", name: "Georgia", deduction: 12_000, brackets: b([[INF, 0.0519]]) },
  {
    code: "HI",
    name: "Hawaii",
    deduction: 2_200,
    brackets: b([
      [2_400, 0.014],
      [4_800, 0.032],
      [9_600, 0.055],
      [14_400, 0.064],
      [19_200, 0.068],
      [24_000, 0.072],
      [36_000, 0.076],
      [48_000, 0.079],
      [150_000, 0.0825],
      [175_000, 0.09],
      [200_000, 0.1],
      [INF, 0.11],
    ]),
  },
  { code: "ID", name: "Idaho", deduction: 15_000, brackets: b([[INF, 0.053]]) },
  { code: "IL", name: "Illinois", deduction: 2_775, brackets: b([[INF, 0.0495]]) },
  { code: "IN", name: "Indiana", deduction: 1_000, brackets: b([[INF, 0.03]]) },
  { code: "IA", name: "Iowa", deduction: 0, brackets: b([[INF, 0.038]]) },
  { code: "KS", name: "Kansas", deduction: 3_605, brackets: b([[15_000, 0.052], [30_000, 0.056], [INF, 0.0578]]) },
  { code: "KY", name: "Kentucky", deduction: 3_160, brackets: b([[INF, 0.04]]) },
  { code: "LA", name: "Louisiana", deduction: 4_500, brackets: b([[INF, 0.03]]) },
  { code: "ME", name: "Maine", deduction: 15_000, brackets: b([[26_800, 0.058], [63_450, 0.0675], [INF, 0.0715]]) },
  { code: "MD", name: "Maryland", deduction: 2_550, brackets: b([[1_000, 0.02], [2_000, 0.03], [3_000, 0.04], [100_000, 0.0475], [125_000, 0.05], [150_000, 0.0525], [250_000, 0.055], [INF, 0.0575]]) },
  { code: "MA", name: "Massachusetts", deduction: 4_400, brackets: b([[1_000_000, 0.05], [INF, 0.09]]) },
  { code: "MI", name: "Michigan", deduction: 5_000, brackets: b([[INF, 0.0425]]) },
  { code: "MN", name: "Minnesota", deduction: 14_950, brackets: b([[31_690, 0.0535], [104_090, 0.068], [193_240, 0.0785], [INF, 0.0985]]) },
  { code: "MS", name: "Mississippi", deduction: 2_300, brackets: b([[10_000, 0], [INF, 0.044]]) },
  { code: "MO", name: "Missouri", deduction: 15_000, brackets: b([[1_313, 0], [2_626, 0.02], [3_939, 0.025], [5_252, 0.03], [6_565, 0.035], [7_878, 0.04], [9_191, 0.045], [INF, 0.047]]) },
  { code: "MT", name: "Montana", deduction: 15_000, brackets: b([[21_100, 0.047], [INF, 0.059]]) },
  { code: "NE", name: "Nebraska", deduction: 8_500, brackets: b([[3_770, 0.0246], [22_630, 0.0351], [36_480, 0.0501], [INF, 0.052]]) },
  { code: "NV", name: "Nevada", deduction: 0, brackets: NONE },
  { code: "NH", name: "New Hampshire", deduction: 0, brackets: NONE },
  {
    code: "NJ",
    name: "New Jersey",
    deduction: 1_000,
    brackets: b([
      [20_000, 0.014],
      [35_000, 0.0175],
      [40_000, 0.035],
      [75_000, 0.05525],
      [500_000, 0.0637],
      [1_000_000, 0.0897],
      [INF, 0.1075],
    ]),
  },
  { code: "NM", name: "New Mexico", deduction: 15_000, brackets: b([[5_500, 0.015], [11_000, 0.032], [16_000, 0.042], [210_000, 0.047], [INF, 0.059]]) },
  {
    code: "NY",
    name: "New York",
    deduction: 8_000,
    brackets: b([
      [8_500, 0.04],
      [11_700, 0.045],
      [13_900, 0.0525],
      [80_650, 0.055],
      [215_400, 0.06],
      [1_077_550, 0.0685],
      [5_000_000, 0.0965],
      [25_000_000, 0.103],
      [INF, 0.109],
    ]),
  },
  { code: "NC", name: "North Carolina", deduction: 12_750, brackets: b([[INF, 0.0399]]) },
  { code: "ND", name: "North Dakota", deduction: 15_000, brackets: b([[44_725, 0], [225_975, 0.0195], [INF, 0.025]]) },
  { code: "OH", name: "Ohio", deduction: 0, brackets: b([[26_050, 0], [INF, 0.0275]]) },
  { code: "OK", name: "Oklahoma", deduction: 6_350, brackets: b([[1_000, 0.0025], [2_500, 0.0075], [3_750, 0.0175], [4_900, 0.0275], [7_200, 0.0375], [INF, 0.0475]]) },
  { code: "OR", name: "Oregon", deduction: 2_745, brackets: b([[4_300, 0.0475], [10_750, 0.0675], [125_000, 0.0875], [INF, 0.099]]) },
  { code: "PA", name: "Pennsylvania", deduction: 0, brackets: b([[INF, 0.0307]]) },
  { code: "RI", name: "Rhode Island", deduction: 10_550, brackets: b([[77_450, 0.0375], [176_050, 0.0475], [INF, 0.0599]]) },
  { code: "SC", name: "South Carolina", deduction: 15_000, brackets: b([[3_460, 0], [17_330, 0.03], [INF, 0.062]]) },
  { code: "SD", name: "South Dakota", deduction: 0, brackets: NONE },
  { code: "TN", name: "Tennessee", deduction: 0, brackets: NONE },
  { code: "TX", name: "Texas", deduction: 0, brackets: NONE },
  { code: "UT", name: "Utah", deduction: 0, brackets: b([[INF, 0.0455]]) },
  { code: "VT", name: "Vermont", deduction: 7_000, brackets: b([[45_400, 0.0335], [110_050, 0.066], [229_550, 0.076], [INF, 0.0875]]) },
  { code: "VA", name: "Virginia", deduction: 8_000, brackets: b([[3_000, 0.02], [5_000, 0.03], [17_000, 0.05], [INF, 0.0575]]) },
  { code: "WA", name: "Washington", deduction: 0, brackets: NONE },
  { code: "WV", name: "West Virginia", deduction: 0, brackets: b([[10_000, 0.0236], [25_000, 0.0315], [40_000, 0.0354], [60_000, 0.0472], [INF, 0.0512]]) },
  { code: "WI", name: "Wisconsin", deduction: 13_230, brackets: b([[14_320, 0.035], [28_650, 0.044], [315_310, 0.053], [INF, 0.0765]]) },
  { code: "WY", name: "Wyoming", deduction: 0, brackets: NONE },
];

export const STATE_BY_CODE: Record<string, StateTax> = Object.fromEntries(
  STATES.map((s) => [s.code, s]),
);

export function taxFromBrackets(income: number, brackets: Bracket[]): { tax: number; marginal: number } {
  if (income <= 0) return { tax: 0, marginal: brackets[0]?.rate ?? 0 };
  let remainingPrev = 0;
  let tax = 0;
  let marginal = 0;
  for (const bracket of brackets) {
    const slice = Math.min(income, bracket.upTo) - remainingPrev;
    if (slice > 0) {
      tax += slice * bracket.rate;
      marginal = bracket.rate;
    }
    remainingPrev = bracket.upTo;
    if (income <= bracket.upTo) break;
  }
  return { tax, marginal };
}

export function takeHome(input: TakeHomeInput): TakeHomeResult | null {
  const gross = input.gross;
  if (gross <= 0) return null;
  const pretax = Math.min(Math.max(0, input.pretax), gross);
  const wages = Math.max(0, gross - pretax);
  const fed = FEDERAL[input.status];
  const taxableFederal = Math.max(0, wages - fed.deduction);
  const federal = taxFromBrackets(taxableFederal, fed.brackets);

  const socialSecurity = Math.min(wages, SS_WAGE_BASE) * SS_RATE;
  const medicare = wages * MEDICARE_RATE;
  const additionalMedicare = Math.max(0, wages - ADD_MEDICARE_THRESHOLD[input.status]) * ADD_MEDICARE_RATE;
  const fica = socialSecurity + medicare + additionalMedicare;

  const state = STATE_BY_CODE[input.state] ?? STATE_BY_CODE.TX;
  const taxableState = Math.max(0, wages - state.deduction);
  const stateTax = taxFromBrackets(taxableState, state.brackets).tax;

  const totalTax = federal.tax + fica + stateTax;
  const net = gross - pretax - totalTax;

  return {
    gross,
    taxableFederal,
    federal: federal.tax,
    socialSecurity,
    medicare,
    additionalMedicare,
    fica,
    stateTax,
    stateName: state.name,
    pretax,
    totalTax,
    takeHome: net,
    effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0,
    marginalFederal: federal.marginal,
    monthly: net / 12,
    biweekly: net / 26,
    weekly: net / 52,
  };
}

export const FILING_LABEL: Record<FilingStatus, string> = {
  single: "Single",
  mfj: "Married filing jointly",
  mfs: "Married filing separately",
  hoh: "Head of household",
};
