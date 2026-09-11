import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Monogram, Section, SectionHeading } from "@/components/site/ui";
import { CATEGORY_GROUPS, NOMINEES, getCategory } from "@/data/aica";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/nomeados/")({
  head: () => ({
    meta: [
      { title: "Nomeados AICA 2026 — Os diamantes da lusofonia" },
      {
        name: "description",
        content:
          "Conheça todos os nomeados do AICA 2026 por categoria: influência, comunicação, cultura, negócios, impacto e inovação.",
      },
      { property: "og:title", content: "Nomeados AICA 2026" },
      {
        property: "og:description",
        content: "Perfis, categorias e votação dos nomeados do AICA 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Nomeados,
});

const FILTERS = [{ id: "todos", label: "Todos" }, ...CATEGORY_GROUPS.map((g) => ({ id: g.id, label: g.label }))];

function Nomeados() {
  const [filter, setFilter] = useState<string>("todos");

  const list = NOMINEES.filter((n) => {
    if (filter === "todos") return true;
    return getCategory(n.categorySlug)?.group === filter;
  });

  return (
    <>
      <Section className="pt-40 pb-12">
        <SectionHeading
          eyebrow="AICA 2026"
          title="Nomeados"
          intro="Personalidades, criadores e projectos indicados pela curadoria do AICA para a edição Diamante."
        />
      </Section>

      <Section className="pt-0">
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "border px-5 py-3 text-[0.62rem] uppercase tracking-[0.26em] transition-colors",
                filter === f.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-gold",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((n) => (
            <article key={n.slug} className="surface-card">
              <Monogram name={n.name} className="aspect-[4/5] w-full" />
              <div className="p-7">
                <h2 className="font-display text-lg uppercase tracking-[0.1em] text-foreground">
                  {n.name}
                </h2>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {getCategory(n.categorySlug)?.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold/70">{n.country}</p>
                <div className="mt-7 flex items-center justify-between">
                  <Link
                    to="/nomeados/$slug"
                    params={{ slug: n.slug }}
                    className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground hover:text-gold"
                  >
                    Ver perfil
                  </Link>
                  <Link
                    to="/votacao"
                    className="border border-gold/50 px-5 py-3 text-[0.62rem] uppercase tracking-[0.28em] text-gold hover:bg-gold hover:text-primary-foreground"
                  >
                    Votar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-16 text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Nomeados desta área serão anunciados em breve.
          </p>
        ) : null}
      </Section>
    </>
  );
}
