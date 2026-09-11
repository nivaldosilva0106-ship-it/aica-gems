import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/aica-logo.png.asset.json";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/sobre", label: "AICA 2026" },
  { to: "/nomeados", label: "Nomeados" },
  { to: "/categorias", label: "Categorias" },
  { to: "/votacao", label: "Votação" },
  { to: "/gala", label: "Gala" },
  { to: "/noticias", label: "Notícias" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <img src={logo.url} alt="AICA — Angola Influence & Communication Awards" className="h-11 w-11 object-contain" />
          <span className="hidden font-display text-sm tracking-[0.32em] text-foreground sm:block">
            AICA <span className="text-gold">2026</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/votacao"
            className="hidden border border-gold/60 px-6 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground sm:inline-block"
          >
            Votar agora
          </Link>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-border lg:hidden"
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
          "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-[26rem]" : "max-h-0",
        )}
      >
        <nav className="mx-auto flex max-w-[1240px] flex-col gap-1 px-6 py-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
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
