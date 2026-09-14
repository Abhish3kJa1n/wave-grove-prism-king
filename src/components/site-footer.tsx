import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-8" />
            <span className="text-sm font-semibold tracking-tight">{SITE.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline} Figures are estimates for planning only — not a loan offer,
            tax return, or financial advice.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="font-medium text-foreground">Tools</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground no-underline hover:text-foreground">
                  Mortgage payment
                </Link>
              </li>
              <li>
                <a href="/#affordability" className="text-muted-foreground no-underline hover:text-foreground">
                  Home affordability
                </a>
              </li>
              <li>
                <a href="/#take-home" className="text-muted-foreground no-underline hover:text-foreground">
                  Take-home pay
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground">Legal</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground no-underline hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground no-underline hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground no-underline hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Built for U.S. borrowers. 2026 tax and rate assumptions.</p>
        </div>
      </div>
    </footer>
  );
}
