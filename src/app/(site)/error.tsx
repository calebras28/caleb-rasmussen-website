"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="border-brutal shadow-brutal max-w-md bg-surface p-8">
        <h1 className="font-display text-3xl font-black">Something went wrong</h1>
        <p className="mt-3 text-muted">
          We hit an unexpected error loading this page. It&apos;s not you —
          it&apos;s us.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="accent" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </div>
    </Container>
  );
}
