import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos e Condições — AICA 2026" },
      { name: "description", content: "Termos de utilização do site oficial do AICA 2026." },
      { property: "og:title", content: "Termos e Condições AICA 2026" },
      { property: "og:description", content: "Condições de utilização da plataforma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Termos,
});

function Termos() {
  return (
    <Section className="pt-40">
      <SectionHeading eyebrow="Legal" title="Termos e Condições" />
      <div className="mt-12 max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          O site aica.ao é operado pela organização do Angola Influence & Communication Awards. A
          utilização implica aceitação destes termos e do regulamento da votação.
        </p>
        <p>
          Conteúdos, marcas e materiais visuais são propriedade do AICA ou dos respectivos
          titulares. É proibida a reprodução comercial sem autorização escrita.
        </p>
        <p>
          A organização pode suspender contas, votos ou acessos em caso de fraude, abuso ou violação
          do regulamento, com registo no livro de auditoria.
        </p>
      </div>
    </Section>
  );
}
