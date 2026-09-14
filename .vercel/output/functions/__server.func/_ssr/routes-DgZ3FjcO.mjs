import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ChevronDown, n as Share2, r as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as __exportAll, n as DEFAULTS, r as SITE } from "./router-B4hmSBMT.mjs";
import { t as SiteShell } from "./site-shell-BN6DhJBj.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DgZ3FjcO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var usd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0
});
var usdExact = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
var compactUsd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	notation: "compact",
	maximumFractionDigits: 1
});
function money(n, opts) {
	if (!Number.isFinite(n)) return "—";
	return (opts?.exact ? usdExact : usd).format(n);
}
function moneyExact(n) {
	return money(n, { exact: true });
}
function moneyCompact(n) {
	if (!Number.isFinite(n)) return "—";
	return compactUsd.format(n);
}
function pct(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	return `${n.toFixed(digits)}%`;
}
function monthsToLabel(totalMonths) {
	const months = Math.max(0, Math.round(totalMonths));
	const years = Math.floor(months / 12);
	const rem = months % 12;
	if (years === 0) return rem === 1 ? "1 month" : `${rem} months`;
	if (rem === 0) return years === 1 ? "1 year" : `${years} years`;
	return `${years} yr ${rem} mo`;
}
function parseNumber(raw) {
	const cleaned = raw.replace(/[^0-9.-]/g, "");
	if (!cleaned || cleaned === "-" || cleaned === ".") return 0;
	const n = Number(cleaned);
	return Number.isFinite(n) ? n : 0;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("min-w-0 rounded-2xl bg-card text-card-foreground shadow-card", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-6", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-12 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-sm transition-[border-color,box-shadow] duration-150 ease-out", "placeholder:text-muted-foreground/70", "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function NumberField({ id, label, hint, value, onChange, prefix, suffix, min = 0, max, step }) {
	const [text, setText] = import_react.useState(formatRaw(value));
	const [focused, setFocused] = import_react.useState(false);
	import_react.useEffect(() => {
		if (!focused) setText(formatRaw(value));
	}, [value, focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					prefix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-sm font-medium text-muted-foreground",
						children: prefix
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id,
						inputMode: "decimal",
						value: text,
						min,
						max,
						step,
						onFocus: () => setFocused(true),
						onBlur: () => {
							setFocused(false);
							const next = clamp(parseNumber(text), min, max);
							onChange(next);
							setText(formatRaw(next));
						},
						onChange: (e) => {
							const raw = e.target.value;
							setText(raw);
							if (raw === "" || raw === "." || raw === "-" || raw === "-.") return;
							const n = parseNumber(raw);
							if (!Number.isFinite(n)) return;
							onChange(clamp(n, min, max));
						},
						className: cn("tabular-nums text-lg font-medium", prefix && "pl-10", suffix && "pr-12")
					}),
					suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center text-sm font-medium text-muted-foreground",
						children: suffix
					}) : null
				]
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function SelectField({ id, label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id,
				value,
				onChange: (e) => onChange(e.target.value),
				className: "flex h-12 w-full appearance-none rounded-md border border-input bg-card px-3 pr-10 text-base font-medium text-foreground shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
				children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: opt.value,
					children: opt.label
				}, opt.value))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" })]
		})]
	});
}
function formatRaw(n) {
	if (!Number.isFinite(n)) return "";
	if (Number.isInteger(n)) return String(n);
	return String(n);
}
function clamp(n, min, max) {
	let v = n;
	if (min !== void 0) v = Math.max(min, v);
	if (max !== void 0) v = Math.min(max, v);
	return v;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "border border-border bg-card text-foreground shadow-sm hover:bg-muted",
			ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
async function shareOrCopy(payload) {
	const url = payload.url ?? (typeof window !== "undefined" ? window.location.href : "");
	const text = payload.text;
	if (typeof navigator !== "undefined" && typeof navigator.share === "function") try {
		await navigator.share({
			title: payload.title,
			text,
			url
		});
		return "shared";
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
	}
	const packed = url ? `${text}\n${url}` : text;
	await navigator.clipboard.writeText(packed);
	return "copied";
}
function withParams(params) {
	if (typeof window === "undefined") return "/";
	const url = new URL(window.location.href);
	url.hash = "";
	for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
	return url.toString();
}
function queryNumber(key, fallback) {
	if (typeof window === "undefined") return fallback;
	const raw = new URLSearchParams(window.location.search).get(key);
	if (raw == null || raw === "") return fallback;
	const n = Number(raw);
	return Number.isFinite(n) ? n : fallback;
}
function queryString(key, fallback) {
	if (typeof window === "undefined") return fallback;
	return new URLSearchParams(window.location.search).get(key) ?? fallback;
}
function CalculatorActions({ onReset, shareTitle, shareText, getShareUrl }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			onClick: async () => {
				const result = await shareOrCopy({
					title: shareTitle,
					text: shareText,
					url: getShareUrl()
				});
				if (result === "copied") toast.success("Results copied to clipboard");
				if (result === "shared") toast.success("Results shared");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), "Share results"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "ghost",
			onClick: onReset,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Reset"]
		})]
	});
}
function StatGrid({ items, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: cn("grid grid-cols-2 gap-3", className),
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-muted/80 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs font-medium text-muted-foreground",
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 tabular-stat text-lg font-semibold tracking-tight text-foreground",
					children: item.value
				}),
				item.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: item.hint
				}) : null
			]
		}, item.label))
	});
}
function HeroResult({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-primary px-5 py-6 text-primary-foreground shadow-result",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary-foreground/80",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 tabular-stat text-3xl font-semibold tracking-tight sm:text-5xl",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-primary-foreground/80",
				children: hint
			}) : null
		]
	});
}
function Education({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground",
		children
	});
}
function EmptyResult({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-48 items-center rounded-xl bg-muted/70 px-5 py-8 text-sm text-muted-foreground",
		children: message
	});
}
function monthlyPi(principal, annualRate, termYears) {
	if (principal <= 0 || termYears <= 0) return 0;
	const n = termYears * 12;
	const r = annualRate / 100 / 12;
	if (r === 0) return principal / n;
	const pow = (1 + r) ** n;
	return principal * r * pow / (pow - 1);
}
function amortize(input) {
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
		schedule: withExtra.schedule
	};
}
function runSchedule(principal, monthlyRate, maxMonths, payment) {
	let balance = principal;
	let totalInterest = 0;
	let month = 0;
	const schedule = [];
	let yearInterest = 0;
	let yearPrincipal = 0;
	let yearExtra = 0;
	const safety = maxMonths + 12;
	while (balance > .005 && month < safety) {
		month += 1;
		const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
		let principalPaid = payment - interest;
		if (principalPaid <= 0 && monthlyRate > 0) break;
		if (principalPaid > balance) principalPaid = balance;
		balance = Math.max(0, balance - principalPaid);
		totalInterest += interest;
		yearInterest += interest;
		yearPrincipal += principalPaid;
		monthlyRate === 0 && principal / maxMonths;
		if (month % 12 === 0 || balance <= .005) {
			schedule.push({
				year: Math.ceil(month / 12),
				interest: yearInterest,
				principalPaid: yearPrincipal,
				extraPaid: yearExtra,
				balance
			});
			yearInterest = 0;
			yearPrincipal = 0;
			yearExtra = 0;
		}
	}
	if (month === 0) return {
		totalInterest: 0,
		months: 0,
		schedule: []
	};
	return {
		totalInterest,
		months: month,
		schedule
	};
}
var TERM_OPTIONS$1 = [
	{
		value: "15",
		label: "15 years"
	},
	{
		value: "20",
		label: "20 years"
	},
	{
		value: "30",
		label: "30 years"
	}
];
var AmortizationChart = (0, import_react.lazy)(() => import("./amortization-chart-D2YFqKSX.mjs").then((mod) => ({ default: mod.AmortizationChart })));
function MortgageCalculator() {
	const [principal, setPrincipal] = (0, import_react.useState)(DEFAULTS.loanAmount);
	const [rate, setRate] = (0, import_react.useState)(DEFAULTS.mortgageRate);
	const [term, setTerm] = (0, import_react.useState)(String(DEFAULTS.mortgageTermYears));
	const [extra, setExtra] = (0, import_react.useState)(DEFAULTS.extraPayment);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const calc = queryString("calc", "");
		if (calc && calc !== "mortgage") return;
		if (!window.location.search.includes("amount") && calc !== "mortgage") return;
		setPrincipal(queryNumber("amount", DEFAULTS.loanAmount));
		setRate(queryNumber("rate", DEFAULTS.mortgageRate));
		setTerm(queryString("term", String(DEFAULTS.mortgageTermYears)));
		setExtra(queryNumber("extra", DEFAULTS.extraPayment));
	}, []);
	const result = (0, import_react.useMemo)(() => amortize({
		principal,
		annualRate: rate,
		termYears: Number(term),
		extraPayment: extra
	}), [
		principal,
		rate,
		term,
		extra
	]);
	function reset() {
		setPrincipal(DEFAULTS.loanAmount);
		setRate(DEFAULTS.mortgageRate);
		setTerm(String(DEFAULTS.mortgageTermYears));
		setExtra(DEFAULTS.extraPayment);
	}
	const shareText = result ? `Mortgage payment estimate from Wellstead: ${moneyExact(result.monthlyWithExtra)}/mo on a ${money(principal)} loan at ${rate}% for ${term} years. Total interest ${money(result.totalInterest)}.` : "US mortgage payment estimate from Wellstead.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "mortgage",
		className: "scroll-mt-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: "Payment calculator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "Mortgage payment calculator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Estimate principal and interest, see what extra payments save, and review a year-by-year amortization summary."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid min-w-0 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-5",
					onSubmit: (e) => e.preventDefault(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "loan-amount",
							label: "Loan amount",
							prefix: "$",
							value: principal,
							onChange: setPrincipal,
							max: 2e7,
							hint: "The amount you borrow after the down payment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "interest-rate",
							label: "Interest rate",
							suffix: "%",
							value: rate,
							onChange: setRate,
							max: 25,
							step: .01,
							hint: "National 30-year average is about 6.76% as of September 2026."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "loan-term",
							label: "Loan term",
							value: term,
							onChange: setTerm,
							options: TERM_OPTIONS$1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "extra-payment",
							label: "Extra monthly payment",
							prefix: "$",
							value: extra,
							onChange: setExtra,
							max: 5e4,
							hint: "Applied to principal each month. Optional."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatorActions, {
							onReset: reset,
							shareTitle: "Mortgage payment estimate",
							shareText,
							getShareUrl: () => withParams({
								calc: "mortgage",
								amount: principal,
								rate,
								term,
								extra
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-0 flex-col gap-4",
					"aria-live": "polite",
					children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroResult, {
							label: "Monthly principal & interest",
							value: moneyExact(result.monthlyWithExtra),
							hint: extra > 0 ? `Includes ${money(extra)} extra · base P&I ${moneyExact(result.monthlyPi)}` : "Fixed-rate estimate, excluding taxes and insurance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
							{
								label: "Total interest",
								value: money(result.totalInterest)
							},
							{
								label: "Total paid",
								value: money(result.totalPaid)
							},
							{
								label: "Payoff time",
								value: monthsToLabel(result.months)
							},
							extra > 0 ? {
								label: "Interest saved",
								value: money(result.interestSaved),
								hint: `${monthsToLabel(result.monthsSaved)} sooner`
							} : {
								label: "Payments",
								value: String(result.months),
								hint: "Scheduled monthly payments"
							}
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-muted/60 p-4 sm:p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-sm font-medium",
								children: "Remaining balance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmortizationChart, { schedule: result.schedule })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmortizationTable, { schedule: result.schedule })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyResult, { message: "Enter a loan amount to see your monthly payment." })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Education, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A fixed-rate mortgage payment is calculated with the standard amortization formula. Your rate is divided by 12 to get a monthly rate, and the term is converted to months. Extra principal payments reduce the balance faster, so less interest accrues and the loan can be paid off earlier." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This tool shows principal and interest only. A full housing payment also typically includes property taxes, homeowners insurance, and possibly PMI or HOA dues — those are estimated in the affordability calculator below." })] })
		]
	});
}
function AmortizationTable({ schedule }) {
	if (schedule.length === 0) return null;
	const collapsed = schedule.length > 8;
	const rows = collapsed ? [...schedule.slice(0, 5), schedule[schedule.length - 1]] : schedule;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-xl border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-left text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "sr-only",
					children: "Amortization summary by year"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/80 text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-medium",
							children: "Year"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-medium",
							children: "Principal paid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-medium",
							children: "Interest paid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-medium",
							children: "Balance"
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [collapsed && i === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						colSpan: 4,
						className: "px-4 py-2 text-center text-xs text-muted-foreground",
						children: [
							"Years 6–",
							schedule.length - 1,
							" omitted"
						]
					})
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: row.year
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: money(row.principalPaid)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: money(row.interest)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5 tabular-nums",
							children: money(row.balance)
						})
					]
				})] }, row.year)) })
			]
		})
	});
}
function affordability(input) {
	const monthlyIncome = input.annualIncome / 12;
	if (monthlyIncome <= 0 || input.termYears <= 0) return null;
	const maxHousingBudget = Math.max(0, monthlyIncome * (input.dtiLimit / 100) - Math.max(0, input.monthlyDebts));
	if (maxHousingBudget <= 0) return null;
	const down = Math.max(0, input.downPayment);
	let lo = down;
	let hi = Math.max(down + 1e3, down + maxHousingBudget * input.termYears * 12);
	hi = Math.min(hi, 2e7);
	for (let i = 0; i < 48; i += 1) {
		const mid = (lo + hi) / 2;
		if (housingCost(mid, down, input).monthlyHousing > maxHousingBudget) hi = mid;
		else lo = mid;
	}
	const price = Math.floor(lo);
	const cost = housingCost(price, down, input);
	const loan = Math.max(0, price - down);
	const downPct = price > 0 ? down / price * 100 : 0;
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
		backEndUsed: monthlyIncome > 0 ? (cost.monthlyHousing + input.monthlyDebts) / monthlyIncome * 100 : 0,
		pmiApplies: cost.monthlyPmi > 0
	};
}
function housingCost(price, down, input) {
	const loan = Math.max(0, price - down);
	const pi = monthlyPi(loan, input.annualRate, input.termYears);
	const monthlyTax = price * (input.propertyTaxRate / 100) / 12;
	const monthlyInsurance = input.annualInsurance / 12;
	const monthlyHoa = Math.max(0, input.monthlyHoa);
	const monthlyPmi = (price > 0 ? down / price : 1) < .2 && loan > 0 ? loan * (input.pmiRate / 100) / 12 : 0;
	return {
		monthlyPi: pi,
		monthlyTax,
		monthlyInsurance,
		monthlyPmi,
		monthlyHoa,
		monthlyHousing: pi + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa
	};
}
var DTI_OPTIONS = [
	{
		value: "28",
		label: "28% — conservative"
	},
	{
		value: "36",
		label: "36% — conventional"
	},
	{
		value: "43",
		label: "43% — FHA / qualified"
	}
];
var TERM_OPTIONS = [{
	value: "15",
	label: "15 years"
}, {
	value: "30",
	label: "30 years"
}];
function AffordabilityCalculator() {
	const [income, setIncome] = (0, import_react.useState)(DEFAULTS.annualIncome);
	const [debts, setDebts] = (0, import_react.useState)(DEFAULTS.monthlyDebts);
	const [down, setDown] = (0, import_react.useState)(DEFAULTS.downPayment);
	const [rate, setRate] = (0, import_react.useState)(DEFAULTS.mortgageRate);
	const [term, setTerm] = (0, import_react.useState)("30");
	const [dti, setDti] = (0, import_react.useState)(String(DEFAULTS.dtiLimit));
	const [taxRate, setTaxRate] = (0, import_react.useState)(DEFAULTS.propertyTaxRate);
	const [insurance, setInsurance] = (0, import_react.useState)(DEFAULTS.annualInsurance);
	const [hoa, setHoa] = (0, import_react.useState)(DEFAULTS.monthlyHoa);
	(0, import_react.useEffect)(() => {
		if (queryString("calc", "") !== "affordability") return;
		setIncome(queryNumber("income", DEFAULTS.annualIncome));
		setDebts(queryNumber("debts", DEFAULTS.monthlyDebts));
		setDown(queryNumber("down", DEFAULTS.downPayment));
		setRate(queryNumber("rate", DEFAULTS.mortgageRate));
		setTerm(queryString("term", "30"));
		setDti(queryString("dti", String(DEFAULTS.dtiLimit)));
	}, []);
	const result = (0, import_react.useMemo)(() => affordability({
		annualIncome: income,
		monthlyDebts: debts,
		downPayment: down,
		annualRate: rate,
		termYears: Number(term),
		dtiLimit: Number(dti),
		propertyTaxRate: taxRate,
		annualInsurance: insurance,
		monthlyHoa: hoa,
		pmiRate: DEFAULTS.pmiRate
	}), [
		income,
		debts,
		down,
		rate,
		term,
		dti,
		taxRate,
		insurance,
		hoa
	]);
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
	const shareText = result ? `Home affordability estimate from Wellstead: up to ${money(result.maxHomePrice)} with ${money(income)} income and ${money(down)} down. Estimated housing payment ${moneyExact(result.monthlyHousing)}/mo.` : "Home affordability estimate from Wellstead.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "affordability",
		className: "scroll-mt-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: "Buying power"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "Home affordability calculator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Estimate a comfortable home price from income, debts, down payment, and today’s rates — including taxes, insurance, and PMI."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid min-w-0 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-5",
					onSubmit: (e) => e.preventDefault(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "annual-income",
							label: "Gross annual income",
							prefix: "$",
							value: income,
							onChange: setIncome,
							max: 1e7
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "monthly-debts",
							label: "Monthly debts",
							prefix: "$",
							value: debts,
							onChange: setDebts,
							max: 1e5,
							hint: "Car loans, student loans, minimum credit card payments."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "down-payment",
							label: "Down payment",
							prefix: "$",
							value: down,
							onChange: setDown,
							max: 1e7
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								id: "afford-rate",
								label: "Interest rate",
								suffix: "%",
								value: rate,
								onChange: setRate,
								max: 25,
								step: .01
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								id: "afford-term",
								label: "Loan term",
								value: term,
								onChange: setTerm,
								options: TERM_OPTIONS
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "dti-limit",
							label: "Debt-to-income limit",
							value: dti,
							onChange: setDti,
							options: DTI_OPTIONS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								id: "property-tax",
								label: "Property tax",
								suffix: "%",
								value: taxRate,
								onChange: setTaxRate,
								max: 10,
								step: .05,
								hint: "U.S. average is near 1.1%."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								id: "insurance",
								label: "Home insurance / yr",
								prefix: "$",
								value: insurance,
								onChange: setInsurance,
								max: 5e4
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "hoa",
							label: "HOA dues / month",
							prefix: "$",
							value: hoa,
							onChange: setHoa,
							max: 1e4,
							hint: "Optional."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatorActions, {
							onReset: reset,
							shareTitle: "Home affordability estimate",
							shareText,
							getShareUrl: () => withParams({
								calc: "affordability",
								income,
								debts,
								down,
								rate,
								term,
								dti
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-0 flex-col gap-4",
					"aria-live": "polite",
					children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroResult, {
							label: "Estimated home price",
							value: money(result.maxHomePrice),
							hint: `${pct(result.downPct, 1)} down · ${money(result.loanAmount)} loan`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
							{
								label: "Housing payment",
								value: moneyExact(result.monthlyHousing),
								hint: "P&I, tax, insurance, PMI, HOA"
							},
							{
								label: "Principal & interest",
								value: moneyExact(result.monthlyPi)
							},
							{
								label: "Property tax",
								value: moneyExact(result.monthlyTax)
							},
							{
								label: result.pmiApplies ? "PMI (est.)" : "Insurance",
								value: moneyExact(result.pmiApplies ? result.monthlyPmi : result.monthlyInsurance)
							}
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-muted/70 px-4 py-3 text-sm text-muted-foreground",
							children: [
								"Uses a ",
								dti,
								"% back-end DTI on ",
								moneyExact(result.monthlyIncome),
								" monthly gross income. Combined housing and debts: ",
								pct(result.backEndUsed, 1),
								". PMI of ",
								DEFAULTS.pmiRate,
								"% is included when the down payment is under 20%."
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyResult, { message: "Enter income to estimate a home price. If debts consume the DTI budget, try lowering them or raising the limit." })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Education, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lenders usually cap housing costs plus other monthly debts at a share of gross income (debt-to-income, or DTI). Conventional loans often use about 36%; FHA and some qualified mortgages go up to 43%. This calculator solves for the highest home price whose full monthly housing cost stays within that budget after your other debts." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Property tax defaults to 1.1% of home value, a common U.S. average; insurance defaults to $1,800 per year. Local taxes, HOA rules, credit, and reserves will change what a lender actually approves." })] })
		]
	});
}
var INF = Number.POSITIVE_INFINITY;
var FEDERAL = {
	single: {
		deduction: 16100,
		brackets: [
			{
				upTo: 12400,
				rate: .1
			},
			{
				upTo: 50400,
				rate: .12
			},
			{
				upTo: 105700,
				rate: .22
			},
			{
				upTo: 201775,
				rate: .24
			},
			{
				upTo: 256225,
				rate: .32
			},
			{
				upTo: 640600,
				rate: .35
			},
			{
				upTo: INF,
				rate: .37
			}
		]
	},
	mfj: {
		deduction: 32200,
		brackets: [
			{
				upTo: 24800,
				rate: .1
			},
			{
				upTo: 100800,
				rate: .12
			},
			{
				upTo: 211400,
				rate: .22
			},
			{
				upTo: 403550,
				rate: .24
			},
			{
				upTo: 512450,
				rate: .32
			},
			{
				upTo: 768700,
				rate: .35
			},
			{
				upTo: INF,
				rate: .37
			}
		]
	},
	mfs: {
		deduction: 16100,
		brackets: [
			{
				upTo: 12400,
				rate: .1
			},
			{
				upTo: 50400,
				rate: .12
			},
			{
				upTo: 105700,
				rate: .22
			},
			{
				upTo: 201775,
				rate: .24
			},
			{
				upTo: 256225,
				rate: .32
			},
			{
				upTo: 384350,
				rate: .35
			},
			{
				upTo: INF,
				rate: .37
			}
		]
	},
	hoh: {
		deduction: 24150,
		brackets: [
			{
				upTo: 17700,
				rate: .1
			},
			{
				upTo: 67450,
				rate: .12
			},
			{
				upTo: 105700,
				rate: .22
			},
			{
				upTo: 201775,
				rate: .24
			},
			{
				upTo: 256200,
				rate: .32
			},
			{
				upTo: 640600,
				rate: .35
			},
			{
				upTo: INF,
				rate: .37
			}
		]
	}
};
var SS_RATE = .062;
var SS_WAGE_BASE = 184500;
var MEDICARE_RATE = .0145;
var ADD_MEDICARE_RATE = .009;
var ADD_MEDICARE_THRESHOLD = {
	single: 2e5,
	hoh: 2e5,
	mfj: 25e4,
	mfs: 125e3
};
function b(pairs) {
	return pairs.map(([upTo, rate]) => ({
		upTo,
		rate
	}));
}
var NONE = [{
	upTo: INF,
	rate: 0
}];
var STATES = [
	{
		code: "AL",
		name: "Alabama",
		deduction: 3e3,
		brackets: b([
			[500, .02],
			[3e3, .04],
			[INF, .05]
		])
	},
	{
		code: "AK",
		name: "Alaska",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "AZ",
		name: "Arizona",
		deduction: 8350,
		brackets: b([[INF, .025]])
	},
	{
		code: "AR",
		name: "Arkansas",
		deduction: 2470,
		brackets: b([[4600, .02], [INF, .039]])
	},
	{
		code: "CA",
		name: "California",
		deduction: 5540,
		brackets: b([
			[10756, .01],
			[25499, .02],
			[40245, .04],
			[55866, .06],
			[70606, .08],
			[360659, .093],
			[432787, .103],
			[721314, .113],
			[1e6, .123],
			[INF, .133]
		])
	},
	{
		code: "CO",
		name: "Colorado",
		deduction: 15e3,
		brackets: b([[INF, .044]])
	},
	{
		code: "CT",
		name: "Connecticut",
		deduction: 0,
		brackets: b([
			[1e4, .02],
			[5e4, .045],
			[1e5, .055],
			[2e5, .06],
			[25e4, .065],
			[5e5, .069],
			[INF, .0699]
		])
	},
	{
		code: "DE",
		name: "Delaware",
		deduction: 3250,
		brackets: b([
			[2e3, 0],
			[5e3, .022],
			[1e4, .039],
			[2e4, .048],
			[25e3, .052],
			[6e4, .0555],
			[INF, .066]
		])
	},
	{
		code: "DC",
		name: "District of Columbia",
		deduction: 15e3,
		brackets: b([
			[1e4, .04],
			[4e4, .06],
			[6e4, .065],
			[25e4, .085],
			[5e5, .0925],
			[1e6, .0975],
			[INF, .1075]
		])
	},
	{
		code: "FL",
		name: "Florida",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "GA",
		name: "Georgia",
		deduction: 12e3,
		brackets: b([[INF, .0519]])
	},
	{
		code: "HI",
		name: "Hawaii",
		deduction: 2200,
		brackets: b([
			[2400, .014],
			[4800, .032],
			[9600, .055],
			[14400, .064],
			[19200, .068],
			[24e3, .072],
			[36e3, .076],
			[48e3, .079],
			[15e4, .0825],
			[175e3, .09],
			[2e5, .1],
			[INF, .11]
		])
	},
	{
		code: "ID",
		name: "Idaho",
		deduction: 15e3,
		brackets: b([[INF, .053]])
	},
	{
		code: "IL",
		name: "Illinois",
		deduction: 2775,
		brackets: b([[INF, .0495]])
	},
	{
		code: "IN",
		name: "Indiana",
		deduction: 1e3,
		brackets: b([[INF, .03]])
	},
	{
		code: "IA",
		name: "Iowa",
		deduction: 0,
		brackets: b([[INF, .038]])
	},
	{
		code: "KS",
		name: "Kansas",
		deduction: 3605,
		brackets: b([
			[15e3, .052],
			[3e4, .056],
			[INF, .0578]
		])
	},
	{
		code: "KY",
		name: "Kentucky",
		deduction: 3160,
		brackets: b([[INF, .04]])
	},
	{
		code: "LA",
		name: "Louisiana",
		deduction: 4500,
		brackets: b([[INF, .03]])
	},
	{
		code: "ME",
		name: "Maine",
		deduction: 15e3,
		brackets: b([
			[26800, .058],
			[63450, .0675],
			[INF, .0715]
		])
	},
	{
		code: "MD",
		name: "Maryland",
		deduction: 2550,
		brackets: b([
			[1e3, .02],
			[2e3, .03],
			[3e3, .04],
			[1e5, .0475],
			[125e3, .05],
			[15e4, .0525],
			[25e4, .055],
			[INF, .0575]
		])
	},
	{
		code: "MA",
		name: "Massachusetts",
		deduction: 4400,
		brackets: b([[1e6, .05], [INF, .09]])
	},
	{
		code: "MI",
		name: "Michigan",
		deduction: 5e3,
		brackets: b([[INF, .0425]])
	},
	{
		code: "MN",
		name: "Minnesota",
		deduction: 14950,
		brackets: b([
			[31690, .0535],
			[104090, .068],
			[193240, .0785],
			[INF, .0985]
		])
	},
	{
		code: "MS",
		name: "Mississippi",
		deduction: 2300,
		brackets: b([[1e4, 0], [INF, .044]])
	},
	{
		code: "MO",
		name: "Missouri",
		deduction: 15e3,
		brackets: b([
			[1313, 0],
			[2626, .02],
			[3939, .025],
			[5252, .03],
			[6565, .035],
			[7878, .04],
			[9191, .045],
			[INF, .047]
		])
	},
	{
		code: "MT",
		name: "Montana",
		deduction: 15e3,
		brackets: b([[21100, .047], [INF, .059]])
	},
	{
		code: "NE",
		name: "Nebraska",
		deduction: 8500,
		brackets: b([
			[3770, .0246],
			[22630, .0351],
			[36480, .0501],
			[INF, .052]
		])
	},
	{
		code: "NV",
		name: "Nevada",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "NH",
		name: "New Hampshire",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "NJ",
		name: "New Jersey",
		deduction: 1e3,
		brackets: b([
			[2e4, .014],
			[35e3, .0175],
			[4e4, .035],
			[75e3, .05525],
			[5e5, .0637],
			[1e6, .0897],
			[INF, .1075]
		])
	},
	{
		code: "NM",
		name: "New Mexico",
		deduction: 15e3,
		brackets: b([
			[5500, .015],
			[11e3, .032],
			[16e3, .042],
			[21e4, .047],
			[INF, .059]
		])
	},
	{
		code: "NY",
		name: "New York",
		deduction: 8e3,
		brackets: b([
			[8500, .04],
			[11700, .045],
			[13900, .0525],
			[80650, .055],
			[215400, .06],
			[1077550, .0685],
			[5e6, .0965],
			[25e6, .103],
			[INF, .109]
		])
	},
	{
		code: "NC",
		name: "North Carolina",
		deduction: 12750,
		brackets: b([[INF, .0399]])
	},
	{
		code: "ND",
		name: "North Dakota",
		deduction: 15e3,
		brackets: b([
			[44725, 0],
			[225975, .0195],
			[INF, .025]
		])
	},
	{
		code: "OH",
		name: "Ohio",
		deduction: 0,
		brackets: b([[26050, 0], [INF, .0275]])
	},
	{
		code: "OK",
		name: "Oklahoma",
		deduction: 6350,
		brackets: b([
			[1e3, .0025],
			[2500, .0075],
			[3750, .0175],
			[4900, .0275],
			[7200, .0375],
			[INF, .0475]
		])
	},
	{
		code: "OR",
		name: "Oregon",
		deduction: 2745,
		brackets: b([
			[4300, .0475],
			[10750, .0675],
			[125e3, .0875],
			[INF, .099]
		])
	},
	{
		code: "PA",
		name: "Pennsylvania",
		deduction: 0,
		brackets: b([[INF, .0307]])
	},
	{
		code: "RI",
		name: "Rhode Island",
		deduction: 10550,
		brackets: b([
			[77450, .0375],
			[176050, .0475],
			[INF, .0599]
		])
	},
	{
		code: "SC",
		name: "South Carolina",
		deduction: 15e3,
		brackets: b([
			[3460, 0],
			[17330, .03],
			[INF, .062]
		])
	},
	{
		code: "SD",
		name: "South Dakota",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "TN",
		name: "Tennessee",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "TX",
		name: "Texas",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "UT",
		name: "Utah",
		deduction: 0,
		brackets: b([[INF, .0455]])
	},
	{
		code: "VT",
		name: "Vermont",
		deduction: 7e3,
		brackets: b([
			[45400, .0335],
			[110050, .066],
			[229550, .076],
			[INF, .0875]
		])
	},
	{
		code: "VA",
		name: "Virginia",
		deduction: 8e3,
		brackets: b([
			[3e3, .02],
			[5e3, .03],
			[17e3, .05],
			[INF, .0575]
		])
	},
	{
		code: "WA",
		name: "Washington",
		deduction: 0,
		brackets: NONE
	},
	{
		code: "WV",
		name: "West Virginia",
		deduction: 0,
		brackets: b([
			[1e4, .0236],
			[25e3, .0315],
			[4e4, .0354],
			[6e4, .0472],
			[INF, .0512]
		])
	},
	{
		code: "WI",
		name: "Wisconsin",
		deduction: 13230,
		brackets: b([
			[14320, .035],
			[28650, .044],
			[315310, .053],
			[INF, .0765]
		])
	},
	{
		code: "WY",
		name: "Wyoming",
		deduction: 0,
		brackets: NONE
	}
];
var STATE_BY_CODE = Object.fromEntries(STATES.map((s) => [s.code, s]));
function taxFromBrackets(income, brackets) {
	if (income <= 0) return {
		tax: 0,
		marginal: brackets[0]?.rate ?? 0
	};
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
	return {
		tax,
		marginal
	};
}
function takeHome(input) {
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
	const stateTax = taxFromBrackets(Math.max(0, wages - state.deduction), state.brackets).tax;
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
		effectiveRate: gross > 0 ? totalTax / gross * 100 : 0,
		marginalFederal: federal.marginal,
		monthly: net / 12,
		biweekly: net / 26,
		weekly: net / 52
	};
}
var FILING_LABEL = {
	single: "Single",
	mfj: "Married filing jointly",
	mfs: "Married filing separately",
	hoh: "Head of household"
};
var STATUS_OPTIONS = Object.keys(FILING_LABEL).map((value) => ({
	value,
	label: FILING_LABEL[value]
}));
var STATE_OPTIONS = STATES.map((s) => ({
	value: s.code,
	label: s.name
}));
function TakeHomeCalculator() {
	const [gross, setGross] = (0, import_react.useState)(DEFAULTS.grossPay);
	const [status, setStatus] = (0, import_react.useState)("single");
	const [state, setState] = (0, import_react.useState)("TX");
	const [pretax, setPretax] = (0, import_react.useState)(DEFAULTS.pretaxDeferral);
	(0, import_react.useEffect)(() => {
		if (queryString("calc", "") !== "take-home") return;
		setGross(queryNumber("gross", DEFAULTS.grossPay));
		const nextStatus = queryString("status", "single");
		if (nextStatus === "single" || nextStatus === "mfj" || nextStatus === "mfs" || nextStatus === "hoh") setStatus(nextStatus);
		setState(queryString("state", "TX"));
		setPretax(queryNumber("pretax", DEFAULTS.pretaxDeferral));
	}, []);
	const result = (0, import_react.useMemo)(() => takeHome({
		gross,
		status,
		state,
		pretax
	}), [
		gross,
		status,
		state,
		pretax
	]);
	function reset() {
		setGross(DEFAULTS.grossPay);
		setStatus("single");
		setState("TX");
		setPretax(DEFAULTS.pretaxDeferral);
	}
	const shareText = result ? `Take-home pay estimate from Wellstead: ${money(result.takeHome)}/year (${moneyExact(result.monthly)}/mo) on ${money(gross)} gross in ${result.stateName}. Effective tax rate ${pct(result.effectiveRate, 1)}.` : "Take-home pay estimate from Wellstead.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "take-home",
		className: "scroll-mt-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: "Paycheck estimate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "Take-home pay calculator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Estimate 2026 federal income tax, FICA, and state income tax so you can plan a housing budget from net pay."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid min-w-0 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-5",
					onSubmit: (e) => e.preventDefault(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "gross-pay",
							label: "Gross annual pay",
							prefix: "$",
							value: gross,
							onChange: setGross,
							max: 1e7
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "filing-status",
							label: "Filing status",
							value: status,
							onChange: (v) => setStatus(v),
							options: STATUS_OPTIONS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "state",
							label: "State",
							value: state,
							onChange: setState,
							options: STATE_OPTIONS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "pretax",
							label: "Pre-tax deferrals / year",
							prefix: "$",
							value: pretax,
							onChange: setPretax,
							max: gross,
							hint: "401(k), traditional IRA, HSA, and similar contributions."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatorActions, {
							onReset: reset,
							shareTitle: "Take-home pay estimate",
							shareText,
							getShareUrl: () => withParams({
								calc: "take-home",
								gross,
								status,
								state,
								pretax
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-0 flex-col gap-4",
					"aria-live": "polite",
					children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroResult, {
							label: "Annual take-home pay",
							value: money(result.takeHome),
							hint: `${moneyExact(result.monthly)} per month · ${pct(result.effectiveRate, 1)} effective tax`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
							{
								label: "Federal income tax",
								value: money(result.federal)
							},
							{
								label: "Social Security + Medicare",
								value: money(result.fica)
							},
							{
								label: `${result.stateName} tax`,
								value: money(result.stateTax)
							},
							{
								label: "Biweekly paycheck",
								value: moneyExact(result.biweekly)
							}
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
								className: "w-full text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Gross pay",
										value: money(result.gross)
									}),
									result.pretax > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Pre-tax deferrals",
										value: `−${money(result.pretax)}`
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Federal income tax",
										value: `−${money(result.federal)}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Social Security",
										value: `−${money(result.socialSecurity)}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Medicare",
										value: `−${money(result.medicare + result.additionalMedicare)}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: `${result.stateName} income tax`,
										value: `−${money(result.stateTax)}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Take-home",
										value: money(result.takeHome),
										emphasize: true
									})
								] })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Marginal federal rate ",
								pct(result.marginalFederal * 100, 0),
								". Local income taxes, credits, and withholding elections are not included."
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyResult, { message: "Enter gross pay to estimate take-home pay after 2026 federal and state taxes." })
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Education, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "2026 federal brackets and standard deductions follow IRS Rev. Proc. 2025-32: $16,100 single / $32,200 married filing jointly / $24,150 head of household. Social Security is 6.2% up to the $184,500 wage base; Medicare is 1.45% plus 0.9% Additional Medicare Tax above $200,000 ($250,000 joint)." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "State figures are simplified 2026 estimates (flat rates or condensed brackets) and omit local taxes such as New York City or Maryland counties. Use them for planning, not for filing." })] })
		]
	});
}
function Row({ label, value, emphasize }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-border first:border-t-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			scope: "row",
			className: `px-4 py-2.5 text-left font-medium ${emphasize ? "text-foreground" : "text-muted-foreground"}`,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: `px-4 py-2.5 text-right tabular-nums ${emphasize ? "font-semibold text-foreground" : "text-foreground"}`,
			children: value
		})]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	const schema = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				name: SITE.name,
				description: SITE.tagline
			},
			{
				"@type": "WebApplication",
				name: "US Mortgage Payment Calculator",
				applicationCategory: "FinanceApplication",
				operatingSystem: "All",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD"
				},
				description: "Estimate monthly principal and interest, total interest, and amortization for a US fixed-rate mortgage."
			},
			{
				"@type": "FAQPage",
				mainEntity: [
					{
						"@type": "Question",
						name: "How is a mortgage payment calculated?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "A fixed-rate mortgage payment uses the standard amortization formula: monthly rate times the loan amount, adjusted for the number of months in the term. Extra principal payments reduce interest and can shorten the loan."
						}
					},
					{
						"@type": "Question",
						name: "What debt-to-income ratio do lenders use?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Conventional loans often cap combined housing and other debts near 36% of gross monthly income. FHA and some qualified mortgages may allow up to 43%."
						}
					},
					{
						"@type": "Question",
						name: "Which tax year does the take-home pay calculator use?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Federal brackets, standard deductions, and the Social Security wage base follow published 2026 IRS figures. State taxes are simplified 2026 estimates."
						}
					}
				]
			}
		]
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JumpNav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 sm:px-6 sm:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MortgageCalculator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 sm:h-12",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AffordabilityCalculator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 sm:h-12",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TakeHomeCalculator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {})
			]
		})
	] })] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-primary",
					children: "United States · 2026 figures"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-none",
					children: "US mortgage calculator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
					children: "Estimate a monthly payment, a home price you can carry, and take-home pay after federal and state taxes. Private, instant, and built for planning — not a loan offer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid max-w-2xl grid-cols-3 gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
							label: "30-year rate",
							value: "6.76%",
							hint: "Freddie Mac, Sep 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
							label: "Std. deduction",
							value: "$16,100",
							hint: "Single, tax year 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
							label: "SS wage base",
							value: "$184,500",
							hint: "Social Security 2026"
						})
					]
				})
			]
		})
	});
}
function HeroStat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-background px-3 py-3 sm:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 tabular-stat text-lg font-semibold tracking-tight sm:text-xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 hidden text-xs text-muted-foreground sm:block",
				children: hint
			})
		]
	});
}
function JumpNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Calculators",
		className: "sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6",
			children: [
				{
					href: "#mortgage",
					label: "Payment"
				},
				{
					href: "#affordability",
					label: "Affordability"
				},
				{
					href: "#take-home",
					label: "Take-home pay"
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: item.href,
				className: "inline-flex h-11 shrink-0 items-center rounded-md px-3 text-sm font-medium text-muted-foreground no-underline transition-colors duration-150 hover:bg-muted hover:text-foreground",
				children: item.label
			}, item.href))
		})
	});
}
function Faq() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-3xl",
		"aria-labelledby": "faq-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "faq-heading",
			className: "text-2xl font-semibold tracking-tight",
			children: "Common questions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 divide-y divide-border border-y border-border",
			children: [
				{
					q: "Are these calculators free to use?",
					a: "Yes. All three tools run in your browser. Nothing is saved to an account, and you can share a results link if you choose."
				},
				{
					q: "Do the numbers include taxes and insurance?",
					a: "The payment calculator shows principal and interest. The affordability calculator adds estimated property tax, homeowners insurance, PMI when the down payment is under 20%, and optional HOA dues."
				},
				{
					q: "How current are the tax figures?",
					a: "Federal brackets, standard deductions, and FICA use published 2026 IRS and SSA amounts. State taxes are simplified 2026 estimates and omit most local income taxes."
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "group py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer list-none text-base font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-between gap-4",
						children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground group-open:rotate-45",
							children: "+"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
					children: item.a
				})]
			}, item.q))
		})]
	});
}
//#endregion
export { moneyCompact as n, routes_exports as t };
