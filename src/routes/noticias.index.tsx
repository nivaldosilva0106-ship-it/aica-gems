import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/ui";
import { ARTICLES } from "@/data/aica";

export const Route = createFileRoute("/noticias/")({
  head: () => ({
    meta: [
      { title: "AICA Journal — Notícias da edição Diamante" },
      {
        name: "description",
        content:
          "Conheça os nomeados, histórias dos diamantes, entrevistas, bastidores e actualizações da votação e da Gala.",
      },
      { property: "og:title", content: "AICA Journal" },
      { property: "og:description", content: "A propriedade editorial permanente do AICA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journal,
});

function Journal() {
  return (
    <>
      <Section className="pt-40">
        <SectionHeading
          eyebrow="AICA Journal"
          title="A conversa permanente"
          intro="Conheça os nomeados. Histórias dos Diamantes. Entrevistas. Bastidores. Actualizações da votação. Notícias da Gala."
        />
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to="/noticias/$slug"
              params={{ slug: a.slug }}
              className="surface-card block p-10"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold">{a.tag}</p>
              <h2 className="mt-5 font-display text-2xl uppercase leading-snug tracking-[0.08em]">
                {a.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              <p className="mt-6 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                {a.date}
              </p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
