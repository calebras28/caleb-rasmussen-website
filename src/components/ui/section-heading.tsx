import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex w-fit border-brutal bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent-foreground">
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <Heading className="text-3xl sm:text-4xl md:text-5xl">{title}</Heading>
      ) : null}
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
