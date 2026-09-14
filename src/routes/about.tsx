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
            {SITE.name} is a small set of US housing calculators: monthly mortgage
            payment, home affordability, and take-home pay after federal and state
            taxes. The aim is a calm, accurate planning surface — large inputs, clear
            results, and no account required.
          </p>
          <p>
            Calculations run in your browser. We do not underwrite loans, collect
            applications, or sell personal financial data. If a figure looks useful,
            take it to a lender, tax professional, or housing counselor before you act.
          </p>
          <h2 className="pt-4 text-xl font-semibold text-foreground">2026 assumptions</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Default 30-year fixed rate of 6.76%, the Freddie Mac Primary Mortgage
              Market Survey average for the week of September 10, 2026. Enter the rate
              you were quoted.
            </li>
            <li>
              Federal income tax uses 2026 brackets and standard deductions from IRS
              Rev. Proc. 2025-32. Social Security wage base is $184,500.
            </li>
            <li>
              Property tax defaults to 1.1% of home value. Insurance defaults to $1,800
              a year. PMI of 0.55% applies when the down payment is under 20%.
            </li>
            <li>
              State income tax uses simplified 2026 structures. Local taxes are omitted.
            </li>
          </ul>
          <h2 className="pt-4 text-xl font-semibold text-foreground">How to use the tools</h2>
          <p>
            Start with the{" "}
            <Link to="/" className="text-primary underline-offset-4 hover:underline">
              mortgage payment calculator
            </Link>{" "}
            if you already have a loan amount. Use affordability if you are still
            sizing a budget, and take-home pay if you want net income rather than
            gross. Share results from any calculator, or reset to the defaults.
          </p>
          <p>
            Read the{" "}
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
