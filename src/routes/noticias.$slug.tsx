import { createFileRoute, notFound } from "@tanstack/react-router";
import { GoldLink, Section } from "@/components/site/ui";
import { getArticle } from "@/data/aica";

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.article.title ?? "Artigo"} — AICA Journal` },
      { name: "description", content: loaderData?.article.excerpt ?? "" },
      { property: "og:title", content: loaderData?.article.title ?? "AICA Journal" },
      { property: "og:description", content: loaderData?.article.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  return (
    <Section className="pt-40">
      <p className="eyebrow">{article.tag}</p>
      <h1 className="mt-6 max-w-3xl text-4xl uppercase leading-tight md:text-5xl">
        <span className="text-gold-gradient">{article.title}</span>
      </h1>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {article.date}
      </p>
      <div className="rule-gold my-12 max-w-md" />
      <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground">
        {article.body.map((p: string) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <GoldLink to="/noticias" variant="outline" className="mt-14">
        Voltar ao Journal
      </GoldLink>
    </Section>
  );
}
