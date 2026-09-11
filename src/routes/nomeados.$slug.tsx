import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GoldLink, Portrait, Section } from "@/components/site/ui";
import { getCategory, getNominee, nomineesByCategory } from "@/data/aica";

export const Route = createFileRoute("/nomeados/$slug")({
  loader: ({ params }) => {
    const nominee = getNominee(params.slug);
    if (!nominee) throw notFound();
    return { nominee, category: getCategory(nominee.categorySlug) ?? null };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Nomeado não encontrado — AICA 2026" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { nominee, category } = loaderData;
    const title = `${nominee.name} — ${category?.name ?? "Nomeado"} | AICA 2026`;
    return {
      meta: [
        { title },
        { name: "description", content: nominee.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: nominee.contribution },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: NomineePage,
});

function NomineePage() {
  const { nominee, category } = Route.useLoaderData();
  const peers = nomineesByCategory(nominee.categorySlug).filter((n) => n.slug !== nominee.slug);

  return (
    <Section className="pt-40">
      <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <Portrait name={nominee.name} className="aspect-[4/5] w-full" />
        <div>
          <p className="eyebrow">{category?.name}</p>
          <h1 className="mt-5 text-4xl uppercase leading-tight md:text-5xl">
            <span className="text-gold-gradient">{nominee.name}</span>
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {nominee.country}
          </p>
          <div className="rule-gold my-10" />
          <p className="text-base leading-relaxed text-muted-foreground">{nominee.bio}</p>
          <p className="eyebrow mt-10">Contributo</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {nominee.contribution}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/votacao"
              search={{ categoria: nominee.categorySlug, nomeado: nominee.slug }}
              className="inline-flex items-center justify-center bg-gold px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground"
            >
              Votar nesta categoria
            </Link>
            <GoldLink to="/nomeados" variant="outline">
              Todos os nomeados
            </GoldLink>
          </div>
          {peers.length > 0 ? (
            <p className="mt-12 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
              Também nomeados nesta categoria: {peers.map((p) => p.name).join(" · ")}
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
