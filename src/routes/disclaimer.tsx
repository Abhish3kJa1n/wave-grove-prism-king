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
            {SITE.name} provides free educational calculators for personal planning only. The outputs are estimates. They are not advice, a quote, a pre-approval, a loan offer, or a commitment to lend.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">Not financial, tax, or legal advice</h2>
          <p>
            Nothing on this site is financial, tax, legal, accounting, real-estate, or investment advice. Tax rules, credits, local levies, withholding elections, and individual circumstances can change a paycheck or tax liability. Mortgage pricing depends on credit score, occupancy, property type, points, fees, and the specific lender.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">Estimates, not guarantees</h2>
          <p>
            Default rates, tax brackets, FICA limits, property-tax percentages, insurance amounts, and PMI rates are simplifying assumptions based on publicly available 2026 figures. Your actual payment, tax, approved loan amount, or closing costs may be higher or lower. Amortization schedules ignore many real-world fees, recasts, prepayment penalties, and adjustable-rate features.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">No lender or advisory relationship</h2>
          <p>
            {SITE.name} is not a bank, credit union, mortgage broker, or NMLS-registered originator. Using any calculator does not create a customer, client, or advisory relationship and does not start a loan application under federal or state lending law.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE.name} and its operators are not liable for any decisions made using these tools, including but not limited to offers accepted, homes purchased or not purchased, refinances, or taxes paid or unpaid. The site is provided “as is” and “as available” without warranties of any kind, express or implied, including accuracy, completeness, or fitness for a particular purpose.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">Seek professional help</h2>
          <p>
            Always confirm figures with a licensed lender, a qualified tax professional, a real-estate attorney, or a HUD-approved housing counselor before you buy, refinance, or file a tax return.
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
