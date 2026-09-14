import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${SITE.name} | US Mortgage Calculator` },
      {
        name: "description",
        content:
          "Wellstead publishes free US mortgage, affordability, and take-home pay calculators using 2026 tax and rate assumptions. How the tools work, and what they are not.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-medium text-primary">About</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Why Wellstead exists</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            {SITE.name} is a free set of US housing and paycheck calculators. The goal is simple: give people clear, private tools to estimate a monthly mortgage payment, a realistic home price they can carry, and take-home pay after federal and state taxes — without requiring an account or selling their data.
          </p>
          <p>
            All calculations run in your browser. We do not underwrite loans, collect loan applications, or sell personal financial information. The numbers are estimates for planning only. If a result looks useful, take it to a licensed lender, tax professional, or HUD-approved housing counselor before you make any decision.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-foreground">What the tools cover</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Mortgage payment calculator</strong> — principal and interest, extra payments, total interest, and a year-by-year amortization summary.
            </li>
            <li>
              <strong>Home affordability calculator</strong> — estimates a comfortable home price based on income, debts, down payment, DTI limits, property tax, insurance, and PMI.
            </li>
            <li>
              <strong>Take-home pay calculator</strong> — 2026 federal income tax, Social Security, Medicare, and simplified state income tax so you can plan from net pay.
            </li>
          </ul>

          <h2 className="pt-4 text-xl font-semibold text-foreground">2026 assumptions</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Default 30-year fixed rate of 6.76%, based on the Freddie Mac Primary Mortgage Market Survey average for mid-September 2026. Always enter the actual rate you were quoted.
            </li>
            <li>
              Federal income tax uses 2026 brackets and standard deductions from IRS Rev. Proc. 2025-32. Social Security wage base is $184,500.
            </li>
            <li>
              Property tax defaults to 1.1% of home value (a common U.S. average). Homeowners insurance defaults to $1,800 per year. PMI of 0.55% applies when the down payment is under 20%.
            </li>
            <li>
              State income tax uses simplified 2026 structures. Local income taxes (for example New York City or certain Maryland counties) are omitted.
            </li>
          </ul>

          <h2 className="pt-4 text-xl font-semibold text-foreground">How to use the tools</h2>
          <p>
            Start with the{" "}
            <Link to="/" className="text-primary underline-offset-4 hover:underline">
              mortgage payment calculator
            </Link>{" "}
            if you already know the loan amount. Use the affordability calculator if you are still deciding how much house you can carry. Use the take-home pay calculator when you want to budget from net income rather than gross. Every tool lets you share results or reset to the defaults.
          </p>

          <p>
            Please read the{" "}
            <Link to="/disclaimer" className="text-primary underline-offset-4 hover:underline">
              disclaimer
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">
              privacy policy
            </Link>{" "}
            before relying on any number.
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
