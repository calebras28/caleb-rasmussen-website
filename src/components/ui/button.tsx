import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper dark:bg-paper dark:text-ink",
  secondary: "bg-surface text-foreground",
  accent: "bg-accent text-accent-foreground",
  ghost:
    "bg-transparent text-foreground border-transparent shadow-none hover:bg-surface-alt",
  danger: "bg-brand-red text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
};

const base =
  "inline-flex items-center justify-center font-semibold border-brutal shadow-brutal hover-brutal disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap font-display";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "md", className, ...rest } = props;
    const classes = cn(base, variants[variant], sizes[size], className);

    if (props.href !== undefined) {
      const { href, ...anchorRest } = rest as Omit<
        ButtonAsLink,
        "variant" | "size" | "className"
      >;
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
            {...anchorRest}
          />
        );
      }
      return <Link href={href} className={classes} {...anchorRest} />;
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  },
);
