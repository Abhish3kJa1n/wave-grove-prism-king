import type { ReactNode } from "react";

export function Education({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export function EmptyResult({ message }: { message: string }) {
  return (
    <div className="flex min-h-48 items-center rounded-xl bg-muted/70 px-5 py-8 text-sm text-muted-foreground">
      {message}
    </div>
  );
}
