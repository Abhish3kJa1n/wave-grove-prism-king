import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "Calculators", hash: undefined as string | undefined },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 text-foreground no-underline">
          <BrandMark className="size-8" />
          <span className="text-sm font-semibold tracking-tight">{SITE.name}</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
