import { createFileRoute } from "@tanstack/react-router";
import { GoldLink, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/gala")({
  head: () => ({
    meta: [
      { title: "A Grande Noite — Gala AICA 2026, Luanda" },
      {
        name: "description",
        content:
          "Gala AICA 2026 em Novembro, Luanda. Local, dress code, red carpet, after party, imprensa e transmissão.",
      },
      { property: "og:title", content: "Gala AICA 2026 — Luanda" },
      { property: "og:description", content: "A Grande Noite da edição Diamante." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gala,
});

const BLOCKS = [
  {
    t: "Gala",
    d: "Cerimónia de entrega dos prémios da edição Diamante. Palco negro, ouro, silêncio entre os anúncios.",
  },
  {
    t: "Local",
    d: "Luanda — Angola. O endereço exacto é enviado com o convite e à imprensa credenciada.",
  },
  {
    t: "Dress code",
    d: "Black tie com um detalhe dourado. Sem logótipos visíveis no tapete, excepto parceiros oficiais.",
  },
  {
    t: "Convidados",
    d: "Nomeados, conselho, parceiros, corpo diplomático lusófono e convidados da organização.",
  },
  {
    t: "Red carpet",
    d: "Abre ao final da tarde. Fotografia oficial, entrevistas curtas, paleta controlada.",
  },
  {
    t: "After Party",
    d: "Por convite, depois da cerimónia. Som ao vivo, mesa fechada, lista nominal.",
  },
  {
    t: "Imprensa",
    d: "Credenciação em imprensa@aica.ao. Zona própria, kit digital e embargo até ao anúncio em palco.",
  },
  {
    t: "Transmissão",
    d: "Cobertura com parceiros de media. Detalhes de antena e streaming serão publicados no Journal.",
  },
];

function Gala() {
  return (
    <>
      <section className="facet-bg relative flex min-h-[70vh] items-center overflow-hidden pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1240px] px-6 py-28 text-center">
          <p className="eyebrow">A Grande Noite</p>
          <h1 className="mt-8 text-5xl uppercase tracking-[0.1em] md:text-7xl">
            <span className="text-gold-gradient">AICA 2026</span>
          </h1>
          <p className="mt-8 text-sm uppercase tracking-[0.42em] text-muted-foreground">
            Novembro 2026 · Luanda — Angola
          </p>
        </div>
      </section>
      <Section>
        <SectionHeading
          eyebrow="A cerimónia"
          title="Onde a lusofonia se senta à mesma mesa"
          intro="A Gala não é um programa de variedades. É o fecho ritual de um processo auditável — o momento em que o voto se torna palco."
        />
        <div className="mt-16 grid gap-px bg-border/60 sm:grid-cols-2">
          {BLOCKS.map((b) => (
            <div key={b.t} className="bg-background/80 p-10">
              <p className="font-display text-xl uppercase tracking-[0.14em] text-gold-gradient">
                {b.t}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <GoldLink to="/imprensa" variant="outline">
            Imprensa
          </GoldLink>
          <GoldLink to="/votacao">Votar agora</GoldLink>
        </div>
      </Section>
    </>
  );
}
