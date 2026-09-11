import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — AICA 2026" },
      {
        name: "description",
        content: "Como o AICA trata e-mail, IP, dispositivo e sessão no motor de votação.",
      },
      { property: "og:title", content: "Política de Privacidade AICA 2026" },
      { property: "og:description", content: "Dados do eleitor, retenção e finalidade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <Section className="pt-40">
      <SectionHeading eyebrow="Legal" title="Política de Privacidade" />
      <div className="mt-12 max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          Recolhemos o e-mail do eleitor para garantir um voto por categoria. O endereço é
          armazenado sob hash; a interface pública só mostra uma máscara.
        </p>
        <p>
          IP, user-agent e um identificador de sessão são hashed e usados para rate limiting,
          anti-bot e auditoria. Não vendemos estes dados. Não os usamos para publicidade.
        </p>
        <p>
          Os logs de auditoria conservam-se até 24 meses após a Gala, para defender a integridade do
          resultado. Pedidos: privacidade@aica.ao.
        </p>
      </div>
    </Section>
  );
}
