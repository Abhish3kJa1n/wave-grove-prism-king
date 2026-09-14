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
          "Wellstead calculators run in your browser. We do not require accounts. This policy explains what limited data a website visit may involve and how advertising may work in the future.",
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
            {SITE.name} (“we”, “us”, or “our”) provides free US mortgage, affordability, and take-home pay calculators. This Privacy Policy explains how we handle information when you visit or use the site.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">1. Calculations stay on your device</h2>
          <p>
            All loan amounts, incomes, debts, interest rates, and similar inputs are processed entirely in your browser. We do not require an account, we do not store your personal financial inputs on our servers, and we do not use those inputs to create a user profile or to underwrite credit.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">2. Information a visit may create</h2>
          <p>
            Like most websites, our hosting provider and content delivery network may automatically receive standard technical data such as:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Referring URL and pages requested</li>
            <li>Date and time of the request</li>
          </ul>
          <p>
            This information is used only to operate, secure, diagnose, and improve the service. It is not used to identify you personally for marketing purposes.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">3. Cookies, analytics, and advertising</h2>
          <p>
            The calculators themselves do not require advertising cookies to function. In the future we may add:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Analytics tools (for example Google Analytics) to understand how the site is used</li>
            <li>Advertising networks (such as Google AdSense or similar) to support the free tools</li>
          </ul>
          <p>
            If we add analytics or advertising, this Privacy Policy will be updated to describe the specific services, the data they collect, and how you can control them. You can already manage cookies through your browser settings.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">4. Sharing results</h2>
          <p>
            If you use the Share feature, your device’s share sheet or clipboard may include the numbers you entered and a link that contains those values in the page address. Anyone with that link can see the same estimate. Do not share a link if it contains information you want to keep private.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">5. Third-party services</h2>
          <p>
            We may use third-party providers for hosting, content delivery, and (in the future) analytics or advertising. Those providers have their own privacy policies. We only share the limited technical data necessary for them to perform their services.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">6. Children</h2>
          <p>
            The site is intended for adults making housing or pay decisions. It is not directed at children under 13, and we do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">7. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy as the product or applicable law changes. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the updated policy.
          </p>

          <h2 className="pt-2 text-xl font-semibold text-foreground">8. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can reach us through the contact method published on the About page (or the contact details shown on the site at the time of your request).
          </p>

          <p>
            See also the{" "}
            <Link to="/disclaimer" className="text-primary underline-offset-4 hover:underline">
              Disclaimer
            </Link>
            .
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
