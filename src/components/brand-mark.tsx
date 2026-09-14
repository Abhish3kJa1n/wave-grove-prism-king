export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M8.5 16.2 16 10.2l7.5 6V22.2c0 .7-.6 1.3-1.3 1.3h-4.1v-4.2h-4.2v4.2H9.8c-.7 0-1.3-.6-1.3-1.3v-6z"
        className="fill-primary-foreground"
      />
    </svg>
  );
}
