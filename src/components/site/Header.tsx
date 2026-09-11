import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
const logoSrc = "/aica-logo.png";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "AICA 2026" },
  { to: "/nomeados", label: "Nomeados" },
  { to: "/categorias", label: "Categorias" },
  { to: "/votacao", label: "Votação" },
  { to: "/sobre", label: "Sobre o AICA" },
  { to: "/noticias", label: "Notícias" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoSrc}
            alt="AICA — Angola Influence & Communication Awards"
            className="h-14 w-14 object-contain"
          />
          <span className="hidden font-display text-sm tracking-[0.32em] text-foreground sm:block">
            AICA <span className="text-gold">2026</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {NAV.map((item) => (
            <Link
              key={`${item.to}-${item.label}`}
              to={item.to}
              className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/votacao"
            className="group relative hidden overflow-hidden border border-gold/70 px-7 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:border-gold hover:text-primary-foreground sm:inline-flex sm:items-center sm:gap-2"
          >
            {/* shimmer sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/90 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
            />
            {/* gold fill on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 scale-x-0 bg-gold origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <span className="relative z-10">Votar agora</span>
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
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-border lg:flex xl:hidden"
          >
            <span
              className={cn(
                "h-px w-4 bg-gold transition-transform duration-300",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span className={cn("h-px w-4 bg-gold transition-opacity", open && "opacity-0")} />
            <span
              className={cn(
                "h-px w-4 bg-gold transition-transform duration-300",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 xl:hidden",
          open ? "max-h-[32rem]" : "max-h-0",
        )}
      >
        <nav className="mx-auto flex max-w-[1240px] flex-col gap-1 px-6 py-6">
          {NAV.map((item) => (
            <Link
              key={`${item.to}-${item.label}-m`}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-4 text-xs uppercase tracking-[0.28em] text-muted-foreground"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/votacao"
            onClick={() => setOpen(false)}
            className="mt-4 bg-gold py-4 text-center text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground"
          >
            Votar agora
          </Link>
        </nav>
      </div>
    </header>
  );
}
