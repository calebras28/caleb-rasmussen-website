"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b-[3px] border-border bg-background transition-shadow",
        scrolled && "shadow-brutal-sm",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-extrabold"
        >
          <span className="grid h-9 w-9 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal-sm transition-transform group-hover:-translate-y-0.5">
            {"</>"}
          </span>
          <span className="hidden sm:inline">Portfolio</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "border-2 border-transparent px-3 py-1.5 font-medium transition-colors hover:bg-surface-alt",
                  isActive(link.href) &&
                    "border-brutal bg-accent text-accent-foreground shadow-brutal-sm hover:bg-accent",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="border-brutal shadow-brutal-sm hover-brutal grid h-10 w-10 place-items-center bg-surface lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top border-b-[3px] border-border bg-background lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "border-brutal flex items-center justify-between bg-surface px-4 py-3 font-display font-bold shadow-brutal-sm hover-brutal",
                  isActive(link.href) && "bg-accent text-accent-foreground",
                )}
              >
                {link.label}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
