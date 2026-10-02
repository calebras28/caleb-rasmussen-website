import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  as?: React.ElementType;
}

export function Card({
  className,
  interactive = false,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "border-brutal shadow-brutal bg-surface",
        interactive && "hover-brutal cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 sm:p-6", className)} {...props} />;
}

export function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-t-[3px] border-border p-5 sm:p-6", className)}
      {...props}
    />
  );
}
