import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-[1240px] px-6 py-24 md:py-32", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-5 text-3xl uppercase leading-tight md:text-4xl">
        <span className="text-gold-gradient">{title}</span>
      </h2>
      {intro ? (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  );
}

export function GoldLink({
  to,
  children,
  variant = "solid",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] transition-all duration-500",
        variant === "solid"
          ? "bg-gold text-primary-foreground hover:bg-gold-soft"
          : "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Monogram({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      className={cn(
        "facet-bg flex items-center justify-center bg-secondary/60 text-3xl tracking-[0.2em]",
        className,
      )}
    >
      <span className="font-display text-gold-gradient">{initials}</span>
    </div>
  );
}
