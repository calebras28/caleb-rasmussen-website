import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-[120px] font-black leading-none text-accent sm:text-[180px]">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="accent" size="lg">
          Back home
        </Button>
        <Button href="/projects" variant="secondary" size="lg">
          View projects
        </Button>
      </div>
      <Link
        href="/contact"
        className="mt-6 text-sm font-semibold underline-offset-4 hover:underline"
      >
        Something broken? Let me know →
      </Link>
    </Container>
  );
}
