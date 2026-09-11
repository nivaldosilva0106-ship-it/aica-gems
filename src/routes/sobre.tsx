import { createFileRoute } from "@tanstack/react-router";
import { GoldLink, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o AICA — Angola Influence & Communication Awards" },
      {
        name: "description",
        content:
          "Conheça o AICA: plataforma lusófona que reconhece influência, comunicação, criatividade e impacto. Angola como país-sede, Diamante como conceito.",
      },
      { property: "og:title", content: "Sobre o AICA 2026" },
      {
        property: "og:description",
        content: "A missão, o conceito Diamante e a dimensão lusófona do AICA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <>
      <Section className="pt-40">
        <SectionHeading
          eyebrow="Sobre"
          title="O AICA"
          intro="O Angola Influence & Communication Awards é uma plataforma de reconhecimento dedicada a personalidades, criadores, profissionais, empreendedores e projectos que geram influência, comunicação, criatividade e impacto no espaço lusófono."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-px bg-border/60 md:grid-cols-3">
          {[
            {
              t: "Angola",
              d: "País-sede da primeira edição, ponto de encontro de uma conversa que atravessa oceanos.",
            },
            {
              t: "Lusofonia",
              d: "Oito territórios, uma língua e um mesmo critério de excelência.",
            },
            {
              t: "Diamante",
              d: "O conceito da edição inaugural: valor formado sob pressão, brilho conquistado com tempo.",
            },
          ].map((b) => (
            <div key={b.t} className="bg-background/80 p-10">
              <p className="font-display text-2xl uppercase tracking-[0.14em] text-gold-gradient">
                {b.t}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            A primeira edição do AICA nasce da constatação de que a influência lusófona já não é
            periférica: define tendências, move mercados e forma opinião. Faltava-lhe uma cerimónia
            à sua altura.
          </p>
          <p>
            O processo assenta em três fases — indicação pública, curadoria de um conselho
            independente e votação aberta com regulamento auditável. Cada voto é registado, cada
            resultado é verificável.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <GoldLink to="/categorias" variant="outline">
            Ver categorias
          </GoldLink>
          <GoldLink to="/votacao">Votar agora</GoldLink>
        </div>
      </Section>
    </>
  );
}
