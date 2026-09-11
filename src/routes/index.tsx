import { createFileRoute, Link } from "@tanstack/react-router";
const logoSrc = "/aica-logo.png";
import { Countdown } from "@/components/site/Countdown";
import { GoldLink, Portrait, Section, SectionHeading } from "@/components/site/ui";
import {
  CATEGORY_GROUPS,
  COUNTRIES,
  VOTING_OPENS,
  ARTICLES,
  getCategory,
} from "@/data/aica";
import { useSiteData } from "@/context/SiteDataContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AICA 2026 — Diamante | Angola Influence & Communication Awards" },
      {
        name: "description",
        content:
          "AICA 2026: celebrando os diamantes humanos da lusofonia. Nomeados, categorias e votação oficial. Gala em Novembro de 2026, Luanda.",
      },
      { property: "og:title", content: "AICA 2026 — Celebrando os Diamantes Humanos da Lusofonia" },
      {
        property: "og:description",
        content:
          "Votação oficial, nomeados e categorias do Angola Influence & Communication Awards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { content, nominees } = useSiteData();
  const featured = nominees.slice(0, 4);
  const journal = ARTICLES.slice(0, 3);

  return (
    <>
      <section className="facet-bg relative flex min-h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[-14rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
        <div className="relative mx-auto w-full max-w-[1240px] px-6 pb-24 pt-36 text-center">
          <img
            src={logoSrc}
            alt="AICA — Angola Influence & Communication Awards"
            className="mx-auto h-28 w-28 object-contain md:h-36 md:w-36 drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          />
          <p className="eyebrow mt-10">{content.heroEyebrow}</p>
          <h1 className="mt-8 text-[3.4rem] uppercase leading-[0.95] tracking-[0.08em] md:text-[7rem]">
            <span className="text-gold-gradient">{content.heroTitle}</span>
          </h1>
          <div className="rule-gold mx-auto mt-8 max-w-md" />
          <p className="mx-auto mt-8 max-w-xl text-base uppercase leading-relaxed tracking-[0.22em] text-muted-foreground md:text-lg">
            {content.heroSubtitle}
          </p>

          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldLink to="/votacao">Votar agora</GoldLink>
            <GoldLink to="/nomeados" variant="outline">
              Conhecer os nomeados
            </GoldLink>
          </div>

          <p className="mt-16 text-[0.65rem] uppercase tracking-[0.42em] text-muted-foreground">
            Gala • Novembro 2026 • Luanda
          </p>
        </div>
      </section>

      <Section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl border border-border/70 bg-card/40 px-6 py-14 md:px-12">
          <Countdown target={VOTING_OPENS} label="Votação abre em 01 Outubro 2026" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <SectionHeading
            eyebrow="O que é o AICA"
            title="Uma plataforma de reconhecimento lusófona"
            intro="O Angola Influence & Communication Awards é uma plataforma de reconhecimento dedicada a personalidades, criadores, profissionais, empreendedores e projectos que geram influência, comunicação, criatividade e impacto no espaço lusófono."
          />
          <div>
            <dl className="space-y-8">
              {[
                { t: "Angola", d: "País-sede" },
                { t: "Lusofonia", d: "Espaço de reconhecimento" },
                { t: "Diamante", d: "Conceito da primeira edição" },
              ].map((item) => (
                <div key={item.t} className="border-b border-border/60 pb-6">
                  <dt className="font-display text-xl uppercase tracking-[0.16em] text-foreground">
                    {item.t}
                  </dt>
                  <dd className="mt-2 text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    {item.d}
                  </dd>
                </div>
              ))}
            </dl>
            <GoldLink to="/sobre" variant="outline" className="mt-10">
              Conheça o AICA
            </GoldLink>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Em destaque" title="Nomeados AICA 2026" />
          <GoldLink to="/nomeados" variant="outline">
            Ver todos
          </GoldLink>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((n) => (
            <Link
              key={n.slug}
              to="/nomeados/$slug"
              params={{ slug: n.slug }}
              className="surface-card group block overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
            >
              <div className="relative">
                <Portrait name={n.name} imageUrl={n.imageUrl} className="aspect-[4/5] w-full" />
                <div className="absolute top-3 right-3 rounded-full border border-gold/40 bg-background/90 px-3 py-1 text-[0.62rem] font-medium tracking-wider text-gold shadow-md backdrop-blur-md">
                  ⚡ {n.votesCount?.toLocaleString("pt-PT") ?? 0} votos
                </div>
              </div>
              <div className="p-6">
                <p className="font-display text-base uppercase tracking-[0.12em] text-foreground group-hover:text-gold transition-colors">
                  {n.name}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {getCategory(n.categorySlug)?.name}
                </p>
                <p className="mt-5 text-[0.65rem] uppercase tracking-[0.3em] text-gold flex items-center gap-1">
                  Votar <span className="transition-transform group-hover:translate-x-1">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Categorias"
          title="Seis universos de reconhecimento"
          intro="Dezasseis categorias distribuídas por influência, comunicação, cultura, negócios, impacto e inovação."
        />
        <div className="mt-14 grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_GROUPS.map((g) => (
            <Link
              key={g.id}
              to="/categorias/$group"
              params={{ group: g.id }}
              className="bg-background/80 p-8 transition-colors hover:bg-card"
            >
              <p className="font-display text-lg uppercase tracking-[0.12em] text-gold-gradient">
                {g.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{g.blurb}</p>
            </Link>
          ))}
        </div>
        <GoldLink to="/categorias" variant="outline" className="mt-12">
          Ver categorias
        </GoldLink>
      </Section>

      <Section>
        <SectionHeading
          align="center"
          eyebrow="Dimensão internacional"
          title="Diamantes da Lusofonia"
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featured.map((n) => (
            <Link key={n.slug} to="/nomeados/$slug" params={{ slug: n.slug }} className="group">
              <Portrait name={n.name} className="aspect-[3/4] w-full" />
              <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground group-hover:text-gold">
                {n.country}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {COUNTRIES.map((c) => (
            <span
              key={c}
              className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="AICA Journal"
            title="Histórias dos diamantes"
            intro="Entrevistas, bastidores, actualizações da votação e notícias da Gala."
          />
          <GoldLink to="/noticias" variant="outline">
            Ler o Journal
          </GoldLink>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {journal.map((a) => (
            <Link
              key={a.slug}
              to="/noticias/$slug"
              params={{ slug: a.slug }}
              className="surface-card block p-8"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold">{a.tag}</p>
              <h3 className="mt-4 font-display text-xl uppercase leading-snug tracking-[0.08em]">
                {a.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
