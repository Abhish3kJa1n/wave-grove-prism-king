import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { MortgageCalculator } from "@/components/calculators/mortgage-calculator";
import { AffordabilityCalculator } from "@/components/calculators/affordability-calculator";
import { TakeHomeCalculator } from "@/components/calculators/take-home-calculator";
import { SITE } from "@/lib/site";

const TITLE = "US Mortgage Calculator (2026) | Payment, Affordability & Take-Home Pay";
const DESCRIPTION =
  "Calculate a US mortgage payment, estimate how much house you can afford, and see 2026 take-home pay after federal and state taxes. Instant, private, free.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "US mortgage calculator, monthly payment calculator, home affordability calculator, take-home pay calculator, 2026 tax brackets" },
    ],
  }),
  component: Home,
});

function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE.name,
        description: SITE.tagline,
      },
      {
        "@type": "WebApplication",
        name: "US Mortgage Payment Calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Estimate monthly principal and interest, total interest, and amortization for a US fixed-rate mortgage.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How is a mortgage payment calculated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A fixed-rate mortgage payment uses the standard amortization formula: monthly rate times the loan amount, adjusted for the number of months in the term. Extra principal payments reduce interest and can shorten the loan.",
            },
          },
          {
            "@type": "Question",
            name: "What debt-to-income ratio do lenders use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Conventional loans often cap combined housing and other debts near 36% of gross monthly income. FHA and some qualified mortgages may allow up to 43%.",
            },
          },
          {
            "@type": "Question",
            name: "Which tax year does the take-home pay calculator use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Federal brackets, standard deductions, and the Social Security wage base follow published 2026 IRS figures. State taxes are simplified 2026 estimates.",
            },
          },
        ],
      },
    ],
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main>
        <Hero />
        <JumpNav />
        <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 sm:px-6 sm:py-16">
          <MortgageCalculator />
          <div className="h-8 sm:h-12" aria-hidden="true" />
          <AffordabilityCalculator />
          <div className="h-8 sm:h-12" aria-hidden="true" />
          <TakeHomeCalculator />
          <Faq />
        </div>
      </main>
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="text-sm font-medium text-primary">United States · 2026 figures</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-none">
          US mortgage calculator
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Estimate a monthly payment, a home price you can carry, and take-home pay
          after federal and state taxes. Private, instant, and built for planning — not
          a loan offer.
        </p>
        <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-3 text-sm">
          <HeroStat label="30-year rate" value="6.76%" hint="Freddie Mac, Sep 2026" />
          <HeroStat label="Std. deduction" value="$16,100" hint="Single, tax year 2026" />
          <HeroStat label="SS wage base" value="$184,500" hint="Social Security 2026" />
        </dl>
      </div>
    </section>
  );
}

function HeroStat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl bg-background px-3 py-3 sm:px-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 tabular-stat text-lg font-semibold tracking-tight sm:text-xl">{value}</dd>
      <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">{hint}</p>
    </div>
  );
}

function JumpNav() {
  const items = [
    { href: "#mortgage", label: "Payment" },
    { href: "#affordability", label: "Affordability" },
    { href: "#take-home", label: "Take-home pay" },
  ];
  return (
    <nav
      aria-label="Calculators"
      className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="inline-flex h-11 shrink-0 items-center rounded-md px-3 text-sm font-medium text-muted-foreground no-underline transition-colors duration-150 hover:bg-muted hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Faq() {
  const items = [
    {
      q: "Are these calculators free to use?",
      a: "Yes. All three tools run in your browser. Nothing is saved to an account, and you can share a results link if you choose.",
    },
    {
      q: "Do the numbers include taxes and insurance?",
      a: "The payment calculator shows principal and interest. The affordability calculator adds estimated property tax, homeowners insurance, PMI when the down payment is under 20%, and optional HOA dues.",
    },
    {
      q: "How current are the tax figures?",
      a: "Federal brackets, standard deductions, and FICA use published 2026 IRS and SSA amounts. State taxes are simplified 2026 estimates and omit most local income taxes.",
    },
  ];

  return (
    <section className="max-w-3xl" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight">
        Common questions
      </h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="cursor-pointer list-none text-base font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-muted-foreground group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
