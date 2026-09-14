import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as moneyCompact } from "./routes-DgZ3FjcO.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/amortization-chart-D2YFqKSX.js
var import_jsx_runtime = require_jsx_runtime();
function AmortizationChart({ schedule }) {
	if (schedule.length === 0) return null;
	const data = schedule.map((row) => ({
		year: `Y${row.year}`,
		balance: Math.round(row.balance),
		interest: Math.round(row.interest)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full min-w-0 overflow-hidden sm:h-64",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "balanceFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-primary)",
							stopOpacity: .28
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-primary)",
							stopOpacity: .02
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "year",
						tick: {
							fill: "var(--color-muted-foreground)",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						interval: "preserveStartEnd"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tickFormatter: (v) => moneyCompact(Number(v)),
						tick: {
							fill: "var(--color-muted-foreground)",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						width: 56
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: {
							borderRadius: 12,
							border: "1px solid var(--color-border)",
							background: "var(--color-card)",
							color: "var(--color-foreground)"
						},
						formatter: (value) => moneyCompact(Number(value ?? 0)),
						labelFormatter: (label) => `Year ${String(label).replace("Y", "")}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "balance",
						name: "Remaining balance",
						stroke: "var(--color-primary)",
						strokeWidth: 2,
						fill: "url(#balanceFill)"
					})
				]
			})
		})
	});
}
//#endregion
export { AmortizationChart };
