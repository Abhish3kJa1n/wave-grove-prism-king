import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: `Disclaimer | ${SITE.name} Mortgage Calculator` },
      {
        name: "description",
        content:
          "Wellstead calculators provide estimates only. They are not financial, tax, or lending advice and are not a commitment to lend.",
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Disclaimer</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: September 14, 2026</p>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            {SITE.name} provides educational calculators. The outputs are estimates for
            personal planning. They are not advice, a quote, a pre-approval, or a
            commitment to lend.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Not financial or tax advice</h2>
          <p>
            Nothing on this site is financial, tax, legal, accounting, or real-estate
            advice. Tax rules, credits, local levies, and withholding elections can
            change a paycheck. Mortgage pricing depends on credit, occupancy, property
            type, points, and the lender.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Estimates, not guarantees</h2>
          <p>
            Default rates, tax brackets, FICA limits, property-tax percentages, insurance
            amounts, and PMI rates are simplifying assumptions for 2026. Your actual
            payment, tax, or approved loan amount may be higher or lower. Amortization
            ignores extra fees, recasts, and most ARM features.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">No lender relationship</h2>
          <p>
            {SITE.name} is not a bank, mortgage broker, or NMLS-registered originator.
            Using a calculator does not create a customer relationship and does not
            start a loan application under federal or state lending law.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE.name} and its operators are
            not liable for decisions made using these tools, including offers accepted,
            homes purchased, or taxes paid or unpaid. The site is provided “as is”
            without warranties of accuracy or fitness for a particular purpose.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Professional help</h2>
          <p>
            Confirm figures with a licensed lender, a tax professional, or a HUD-approved
            housing counselor before you buy, refinance, or file a return.
          </p>
          <p>
            Related:{" "}
            <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/about" className="text-primary underline-offset-4 hover:underline">
              About
            </Link>
            .
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
