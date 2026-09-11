import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Portrait, Section, SectionHeading } from "@/components/site/ui";
import {
  CATEGORIES,
  CATEGORY_GROUPS,
  type Category,
  type CategoryGroupId,
  nomineesByCategory,
} from "@/data/aica";

const GROUPS = new Set(CATEGORY_GROUPS.map((g) => g.id));

export const Route = createFileRoute("/categorias/$group")({
  loader: ({ params }) => {
    if (!GROUPS.has(params.group as CategoryGroupId)) throw notFound();
    const group = CATEGORY_GROUPS.find((g) => g.id === params.group);
    if (!group) throw notFound();
    const items = CATEGORIES.filter((c) => c.group === group.id);
    return { group, items };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.group.label ?? "Categorias"} — AICA 2026` },
      {
        name: "description",
        content: loaderData?.group.blurb ?? "Categorias do AICA 2026.",
      },
      { property: "og:title", content: `${loaderData?.group.label ?? "Categorias"} — AICA 2026` },
      { property: "og:description", content: loaderData?.group.blurb ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GroupPage,
});

function GroupPage() {
  const { group, items } = Route.useLoaderData();

  return (
    <>
      <Section className="pt-40">
        <SectionHeading eyebrow="Categorias" title={group.label} intro={group.blurb} />
      </Section>
      {items.map((c: Category) => {
        const nominees = nomineesByCategory(c.slug);
        return (
          <Section key={c.slug} className="pt-0">
            <div className="border-t border-border/70 pt-12">
              <h2 className="font-display text-2xl uppercase tracking-[0.12em] text-gold-gradient">
                {c.name}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {nominees.map((n) => (
                  <Link
                    key={n.slug}
                    to="/nomeados/$slug"
                    params={{ slug: n.slug }}
                    className="surface-card block"
                  >
                    <Portrait name={n.name} className="aspect-[4/5] w-full" />
                    <div className="p-6">
                      <p className="font-display text-base uppercase tracking-[0.12em]">{n.name}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {n.country}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/votacao"
                search={{ categoria: c.slug }}
                className="mt-10 inline-flex items-center justify-center bg-gold px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground"
              >
                Votar nesta categoria
              </Link>
            </div>
          </Section>
        );
      })}
    </>
  );
}
