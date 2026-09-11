import { createFileRoute } from "@tanstack/react-router";
import { GoldLink, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/como-votar")({
  head: () => ({
    meta: [
      { title: "Como votar no AICA 2026" },
      {
        name: "description",
        content:
          "Guia didáctico da votação AICA 2026: escolha a categoria, seleccione o nomeado, confirme e receba o recibo.",
      },
      { property: "og:title", content: "Como votar no AICA" },
      { property: "og:description", content: "Quatro passos para votar no seu diamante." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComoVotar,
});

const STEPS = [
  {
    n: "01",
    t: "Escolha a categoria",
    d: "Dezasseis categorias, seis universos. Vote apenas nas que acompanhou de perto.",
  },
  {
    n: "02",
    t: "Escolha o seu nomeado",
    d: "Veja a fotografia, o país e o perfil. Um clique selecciona. Outro confirma.",
  },
  {
    n: "03",
    t: "Confirme o voto",
    d: "Identifique-se com e-mail, resolva o desafio anti-bot e confirme. Um voto por categoria.",
  },
  {
    n: "04",
    t: "Receba a confirmação",
    d: "Guarde o ID da transacção. É o seu recibo no livro de auditoria do AICA.",
  },
];

function ComoVotar() {
  return (
    <>
      <Section className="pt-40">
        <SectionHeading
          eyebrow="Guia"
          title="Como votar no AICA"
          intro="O fluxo foi desenhado para caber num telemóvel, sem ruído. Quatro passos, um recibo."
        />
      </Section>
      <Section className="pt-0">
        <ol className="grid gap-px bg-border/60 md:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-background/80 p-10">
              <p className="font-display text-3xl text-gold-gradient">{s.n}</p>
              <h2 className="mt-6 font-display text-xl uppercase tracking-[0.12em]">{s.t}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <GoldLink to="/votacao" className="mt-12">
          Começar a votar
        </GoldLink>
      </Section>
    </>
  );
}
