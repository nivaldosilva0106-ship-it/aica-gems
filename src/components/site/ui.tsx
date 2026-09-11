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
    <div
      className={cn(
        "max-w-2xl animate-fade-up opacity-0 [animation-fill-mode:forwards]",
        align === "center" && "mx-auto text-center",
      )}
      style={{ animationDelay: "0.1s", animationDuration: "0.7s" }}
    >
      {eyebrow ? (
        <p className="eyebrow animate-fade-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: "0s" }}>
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-5 text-3xl uppercase leading-tight md:text-4xl">
        <span className="text-gold-gradient">{title}</span>
      </h1>
      {intro ? (
        <p
          className="mt-6 text-base leading-relaxed text-muted-foreground animate-fade-up opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.2s" }}
        >
          {intro}
        </p>
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
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] transition-all duration-500",
        variant === "solid"
          ? "bg-gold text-primary-foreground hover:bg-gold-soft"
          : "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10",
        className,
      )}
    >
      {/* shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10">{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          fillRule="evenodd"
          d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}

/** Gera URL de avatar fotográfico via DiceBear (estilo "personas") */
function avatarUrl(name: string): string {
  const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
  return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}&backgroundColor=1a1209,221a05,0d0d0d&radius=0`;
}

export function Portrait({
  name,
  imageUrl,
  className,
}: {
  name: string;
  imageUrl?: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const hue = portraitHue(name);
  const src = imageUrl && imageUrl.trim().length > 0 ? imageUrl : avatarUrl(name);

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
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, oklch(0.85 0.08 90 / 0.35), transparent 42%),
            radial-gradient(circle at 80% 80%, oklch(0.7 0.12 ${hue} / 0.35), transparent 40%)`,
        }}
      />

      {/* Avatar image */}
      <img
        src={src}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover object-top opacity-85 transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = avatarUrl(name);
        }}
      />

      {/* Bottom gradient scrim */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Fallback initials (shown if image fails) */}
      <div className="relative z-[1] mb-[18%] flex flex-col items-center">
        <span className="font-display text-4xl tracking-[0.22em] text-gold-gradient md:text-5xl drop-shadow-lg">
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


