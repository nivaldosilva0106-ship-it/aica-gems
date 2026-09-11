import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/ui";
import { PARTNERS } from "@/data/aica";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros oficiais — AICA 2026" },
      {
        name: "description",
        content: "Parceiros apresentadores, oficiais e de media da primeira edição do AICA.",
      },
      { property: "og:title", content: "Parceiros oficiais AICA 2026" },
      { property: "og:description", content: "Quem sustenta a edição Diamante." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Parceiros,
});

const TIERS = [
  { id: "apresentador", label: "Apresentador" },
  { id: "oficial", label: "Oficiais" },
  { id: "media", label: "Media" },
] as const;

function Parceiros() {
  return (
    <>
      <Section className="pt-40">
        <SectionHeading
          eyebrow="Edição Diamante"
          title="Parceiros oficiais"
          intro="Marcas que sustentam a primeira edição — com o mesmo critério de contenção visual do palco."
        />
      </Section>
      {TIERS.map((tier) => {
        const list = PARTNERS.filter((p) => p.tier === tier.id);
        return (
          <Section key={tier.id} className="pt-0">
            <p className="eyebrow">{tier.label}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {list.map((p) => (
                <article key={p.name} className="surface-card p-10">
                  <div className="flex h-24 items-center border border-gold/20 bg-secondary/40 px-8">
                    <p className="font-display text-2xl uppercase tracking-[0.2em] text-gold-gradient">
                      {p.name}
                    </p>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                </article>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
