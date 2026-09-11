import { createFileRoute } from "@tanstack/react-router";
import { GoldLink, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/imprensa")({
  head: () => ({
    meta: [
      { title: "Imprensa — AICA 2026" },
      {
        name: "description",
        content: "Credenciação, kit de imprensa e contactos da edição Diamante do AICA.",
      },
      { property: "og:title", content: "Imprensa AICA 2026" },
      { property: "og:description", content: "Credenciação e kit de imprensa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Imprensa,
});

function Imprensa() {
  return (
    <Section className="pt-40">
      <SectionHeading
        eyebrow="Media"
        title="Imprensa"
        intro="Pedidos de credenciação, entrevistas com nomeados e cobertura da Gala. Embargo até ao anúncio em palco."
      />
      <div className="mt-14 max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Envie nome, órgão, função e país para imprensa@aica.ao. A credenciação da Gala é nominal e
          limitada.
        </p>
        <p>
          O kit inclui logótipo, paleta, regulamento resumido e biografias dos nomeados. Não
          publicamos totais de votos antes da cerimónia.
        </p>
      </div>
      <GoldLink to="/contactos" variant="outline" className="mt-12">
        Contactos
      </GoldLink>
    </Section>
  );
}
