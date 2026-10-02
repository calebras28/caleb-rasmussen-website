import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-20">
      <div className="flex flex-col gap-6">
        <div className="h-10 w-2/3 animate-pulse border-brutal bg-surface-alt" />
        <div className="h-5 w-1/2 animate-pulse border-brutal bg-surface-alt" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse border-brutal bg-surface-alt"
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
