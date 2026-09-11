import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { portraitHue } from "@/data/aica";

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
      to={to as never}
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

export function Portrait({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const hue = portraitHue(name);

  return (
    <div
      className={cn("facet-bg relative flex items-end justify-center overflow-hidden", className)}
      style={{
        background: `linear-gradient(165deg,
          oklch(0.22 0.04 ${hue}) 0%,
          oklch(0.14 0.02 ${hue}) 42%,
          oklch(0.1 0.01 60) 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, oklch(0.85 0.08 90 / 0.35), transparent 42%),
            radial-gradient(circle at 80% 80%, oklch(0.7 0.12 ${hue} / 0.35), transparent 40%)`,
        }}
      />
      <div className="relative z-[1] mb-[18%] flex flex-col items-center">
        <span className="font-display text-4xl tracking-[0.22em] text-gold-gradient md:text-5xl">
          {initials}
        </span>
        <span className="mt-4 text-[0.55rem] uppercase tracking-[0.4em] text-gold/70">
          Diamante
        </span>
      </div>
    </div>
  );
}

export function Monogram({ name, className }: { name: string; className?: string }) {
  if (className) return <Portrait name={name} className={className} />;
  return <Portrait name={name} />;
}
