import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/ui";
import { CATEGORIES, CATEGORY_GROUPS, nomineesByCategory } from "@/data/aica";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias AICA 2026 — 15 prémios da lusofonia" },
      {
        name: "description",
        content:
          "Todas as categorias do AICA 2026: influência, comunicação, cultura, empreendedorismo, impacto social e inovação.",
      },
      { property: "og:title", content: "Categorias AICA 2026" },
      {
        property: "og:description",
        content: "Descrição, nomeados e votação de cada categoria do AICA 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Categorias,
});

function Categorias() {
  return (
    <>
      <Section className="pt-40">
        <SectionHeading
          eyebrow="AICA 2026"
          title="Categorias"
          intro="Quinze prémios organizados em seis universos. Cada categoria tem descrição, nomeados e votação própria."
        />
      </Section>

      {CATEGORY_GROUPS.map((group) => {
        const items = CATEGORIES.filter((c) => c.group === group.id);
        return (
          <Section key={group.id} className="pt-0">
            <div className="border-t border-border/70 pt-10">
              <p className="font-display text-2xl uppercase tracking-[0.14em] text-gold-gradient">
                {group.label}
              </p>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">{group.blurb}</p>

              <div className="mt-10 grid gap-px bg-border/60 md:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <article key={c.slug} className="bg-background/80 p-8">
                    <h3 className="font-display text-lg uppercase tracking-[0.1em] text-foreground">
                      {c.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                    <p className="mt-6 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                      {nomineesByCategory(c.slug).length} nomeado(s)
                    </p>
                    <Link
                      to="/votacao"
                      className="mt-4 inline-block text-[0.65rem] uppercase tracking-[0.3em] text-gold hover:underline"
                    >
                      Votar nesta categoria
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </Section>
        );
      })}
    </>
  );
}
