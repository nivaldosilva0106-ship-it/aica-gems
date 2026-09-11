import { Link } from "@tanstack/react-router";
import logo from "@/assets/aica-logo.png.asset.json";

const LINKS = [
  { to: "/sobre", label: "Sobre o AICA" },
  { to: "/nomeados", label: "Nomeados" },
  { to: "/categorias", label: "Categorias" },
  { to: "/votacao", label: "Votação" },
  { to: "/como-votar", label: "Como votar" },
  { to: "/parceiros", label: "Parceiros" },
  { to: "/gala", label: "Gala" },
  { to: "/imprensa", label: "Imprensa" },
  { to: "/noticias", label: "AICA Journal" },
  { to: "/contactos", label: "Contactos" },
] as const;

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/60">
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img src={logo.url} alt="AICA 2026" className="h-16 w-16 object-contain" />
            <p className="mt-6 font-display text-lg tracking-[0.14em] text-foreground">AICA 2026</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Angola Influence &amp; Communication Awards — Influência • Comunicação • Impacto.
            </p>
          </div>

          <div>
            <p className="eyebrow">Navegação</p>
            <ul className="mt-6 space-y-3">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contactos</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>Luanda — Angola</li>
              <li>
                <a href="mailto:geral@aica.ao" className="hover:text-gold">
                  geral@aica.ao
                </a>
              </li>
              <li>
                <a href="mailto:imprensa@aica.ao" className="hover:text-gold">
                  imprensa@aica.ao
                </a>
              </li>
            </ul>
            <p className="eyebrow mt-10">Redes</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-gold my-12" />

        <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© AICA 2026 — Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/termos" className="hover:text-gold">
              Termos e Condições
            </Link>
            <Link to="/regulamento" className="hover:text-gold">
              Regulamento da Votação
            </Link>
            <Link to="/privacidade" className="hover:text-gold">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
