import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy | ${SITE.name}` },
      {
        name: "description",
        content:
          "Wellstead calculators run in your browser. We do not require accounts. This policy explains what limited data a website visit may involve.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: September 14, 2026</p>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            {SITE.name} (“we”) provides mortgage, affordability, and take-home pay
            calculators. This policy describes how information is handled when you use
            the site.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Calculations stay on your device</h2>
          <p>
            Loan amounts, incomes, debts, and similar inputs are processed in your
            browser. We do not require an account, and we do not use those inputs to
            create a user profile or to underwrite credit.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Information a visit may create</h2>
          <p>
            Like most websites, our host and content delivery network may receive
            standard technical data such as IP address, browser type, referring URL,
            and pages requested. That information is used to operate, secure, and
            diagnose the service.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Cookies and advertising</h2>
          <p>
            The calculators themselves do not depend on advertising cookies. If ads or
            analytics are added later, this policy will be updated to describe them. You
            can control cookies through your browser.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Sharing results</h2>
          <p>
            If you use Share, your device’s share sheet or clipboard may include the
            numbers you entered and a link with those values in the page address. Anyone
            with that link can see the same estimate. Do not share a link if it contains
            information you want to keep private.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Children</h2>
          <p>
            The site is intended for adults making housing or pay decisions. It is not
            directed at children under 13.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">Changes</h2>
          <p>
            We may update this policy as the product changes. The date above will
            change when we do. Questions about privacy can be sent through whatever
            contact method is published on the site at the time.
          </p>
          <p>
            See also the{" "}
            <Link to="/disclaimer" className="text-primary underline-offset-4 hover:underline">
              disclaimer
            </Link>
            .
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
