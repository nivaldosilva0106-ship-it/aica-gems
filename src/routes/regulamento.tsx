import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/regulamento")({
  head: () => ({
    meta: [
      { title: "Regulamento da Votação — AICA 2026" },
      {
        name: "description",
        content:
          "Regras da votação pública: um voto por categoria, identificação, anti-fraude e auditoria.",
      },
      { property: "og:title", content: "Regulamento da Votação AICA 2026" },
      { property: "og:description", content: "Limites, identificação e credibilidade do voto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Regulamento,
});

function Regulamento() {
  return (
    <Section className="pt-40">
      <SectionHeading
        eyebrow="Votação"
        title="Regulamento"
        intro="A credibilidade do AICA depende de regras claras. O administrador não altera votos sem deixar rasto."
      />
      <ol className="mt-14 max-w-2xl space-y-8">
        {[
          "A votação pública abre a 1 de Outubro de 2026 e encerra a 14 de Novembro de 2026.",
          "Cada eleitor identificado por e-mail pode votar uma vez por categoria.",
          "O sistema aplica CAPTCHA, rate limiting e detecção de actividade anormal no mesmo dispositivo.",
          "São registados, de forma hashed, identificador do eleitor, IP, dispositivo e sessão — conforme a política de privacidade.",
          "Votos assinalados por fraude ficam em quarentena. A anulação exige motivo escrito e entra no audit log.",
          "Os totais oficiais são anunciados em palco. Até lá, o dashboard interno não substitui o resultado da Gala.",
        ].map((item, i) => (
          <li
            key={item}
            className="border-b border-border/60 pb-6 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mr-4 text-gold">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
    </Section>
  );
}
