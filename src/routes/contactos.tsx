import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — AICA 2026" },
      {
        name: "description",
        content: "Contactos oficiais do Angola Influence & Communication Awards.",
      },
      { property: "og:title", content: "Contactos AICA 2026" },
      { property: "og:description", content: "Luanda — geral@aica.ao — imprensa@aica.ao" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contactos,
});

function Contactos() {
  return (
    <Section className="pt-40">
      <SectionHeading
        eyebrow="AICA"
        title="Contactos"
        intro="Luanda — Angola. Uma língua, oito territórios, uma secretaria."
      />
      <dl className="mt-14 grid max-w-xl gap-8">
        {[
          { t: "Geral", d: "geral@aica.ao" },
          { t: "Imprensa", d: "imprensa@aica.ao" },
          { t: "Parcerias", d: "parceiros@aica.ao" },
          { t: "Votação", d: "votacao@aica.ao" },
        ].map((c) => (
          <div key={c.t} className="border-b border-border/60 pb-6">
            <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">{c.t}</dt>
            <dd className="mt-2 text-lg text-foreground">{c.d}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
