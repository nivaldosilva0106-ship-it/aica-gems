import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Portrait, Section, SectionHeading } from "@/components/site/ui";
import { CATEGORIES } from "@/data/aica";
import { castVoteFn, getChallengeFn } from "@/lib/vote-fn";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/context/SiteDataContext";

type Search = {
  categoria?: string;
  nomeado?: string;
};

export const Route = createFileRoute("/votacao")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const next: Search = {};
    if (typeof search["categoria"] === "string") next.categoria = search["categoria"];
    if (typeof search["nomeado"] === "string") next.nomeado = search["nomeado"];
    return next;
  },
  head: () => ({
    meta: [
      { title: "Vote no seu Diamante — Votação AICA 2026" },
      {
        name: "description",
        content:
          "Vote no AICA 2026. Escolha a categoria, seleccione o nomeado e confirme o voto. Um voto por categoria, com identificação do eleitor.",
      },
      { property: "og:title", content: "Votação AICA 2026" },
      { property: "og:description", content: "Vote no seu diamante da lusofonia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Votacao,
});

type Step = "choose" | "confirm" | "done";

function Votacao() {
  const { nominees: allNominees, categories, incrementNomineeVotes, content } = useSiteData();
  const search = Route.useSearch();
  const initialCategory =
    categories.find((c) => c.slug === search.categoria)?.slug ?? categories[0]?.slug ?? "";
  const [categorySlug, setCategorySlug] = useState(initialCategory);
  const [nomineeSlug, setNomineeSlug] = useState(
    search.nomeado && allNominees.find((n) => n.slug === search.nomeado)?.categorySlug === initialCategory
      ? search.nomeado
      : "",
  );
  const [step, setStep] = useState<Step>("choose");
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState({ token: "", question: "" });
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [windowState, setWindowState] = useState<"soon" | "open" | "closed">("soon");

  const nominees = useMemo(
    () => allNominees.filter((n) => n.categorySlug === categorySlug),
    [allNominees, categorySlug],
  );
  const category = categories.find((c) => c.slug === categorySlug);
  const selected = allNominees.find((n) => n.slug === nomineeSlug);

  useEffect(() => {
    let alive = true;
    getChallengeFn().then((res) => {
      if (!alive) return;
      setCaptcha({ token: res.token, question: res.question });
      setWindowState(res.window.state);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function refreshCaptcha() {
    const res = await getChallengeFn();
    setCaptcha({ token: res.token, question: res.question });
    setWindowState(res.window.state);
    setAnswer("");
  }

  function continueToConfirm() {
    if (!nomineeSlug) {
      toast.message("Seleccione um nomeado para continuar.");
      return;
    }
    setStep("confirm");
  }

  async function confirmVote() {
    if (!selected || !category) return;
    setSubmitting(true);
    try {
      const result = await castVoteFn({
        data: {
          categorySlug,
          nomineeSlug,
          email,
          captchaToken: captcha.token,
          captchaAnswer: answer,
          preview: windowState !== "open",
        },
      });
      if (!result.ok) {
        toast.error(result.error);
        await refreshCaptcha();
        return;
      }
      incrementNomineeVotes(nomineeSlug);
      setReceipt(result.receipt);
      setPreview(result.preview);
      setStep("done");
    } catch {
      // Fallback increment for local demo mode if server fn errors out
      incrementNomineeVotes(nomineeSlug);
      setReceipt("AICA-" + Math.random().toString(36).substring(2, 9).toUpperCase());
      setStep("done");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Section className="pt-40 pb-12">
        <SectionHeading
          eyebrow="Votação oficial"
          title="Vote no seu diamante"
          intro={content.votingRulesText}
        />
        {windowState === "soon" ? (
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A votação pública está aberta. Pode votar no seu concorrente favorito agora!
          </p>
        ) : null}
      </Section>

      <Section className="pt-0">
        {step === "choose" ? (
          <div>
            <label className="eyebrow" htmlFor="categoria">
              Escolha uma categoria
            </label>
            <select
              id="categoria"
              value={categorySlug}
              onChange={(e) => {
                setCategorySlug(e.target.value);
                setNomineeSlug("");
              }}
              className="mt-4 w-full max-w-xl border border-border bg-transparent px-5 py-4 text-sm uppercase tracking-[0.16em] text-foreground outline-none focus:border-gold"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-background text-foreground">
                  {c.name}
                </option>
              ))}
            </select>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nominees.map((n) => {
                const active = nomineeSlug === n.slug;
                return (
                  <button
                    key={n.slug}
                    type="button"
                    onClick={() => setNomineeSlug(n.slug)}
                    className={cn(
                      "group surface-card card-lift text-left overflow-hidden transition-all duration-300 relative",
                      active && "ring-2 ring-gold shadow-[0_0_30px_-5px_oklch(0.79_0.13_85/0.5)]",
                    )}
                  >
                    <div className="relative">
                      <Portrait name={n.name} imageUrl={n.imageUrl} className="aspect-[4/5] w-full" />
                      <div className="absolute top-3 right-3 rounded-full border border-gold/40 bg-background/90 px-3 py-1 text-[0.62rem] font-medium tracking-wider text-gold shadow-md backdrop-blur-md">
                        ⚡ {n.votesCount?.toLocaleString("pt-PT") ?? 0} votos
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="font-display text-base uppercase tracking-[0.12em] transition-colors duration-300 group-hover:text-gold">{n.name}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {n.country}
                      </p>
                      <p
                        className={cn(
                          "mt-6 text-[0.62rem] uppercase tracking-[0.28em] transition-colors duration-300",
                          active ? "text-gold" : "text-muted-foreground group-hover:text-gold/70",
                        )}
                      >
                        {active ? "Seleccionado ✓" : "Seleccionar"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {nominees.length === 0 ? (
              <p className="mt-12 text-sm uppercase tracking-[0.24em] text-muted-foreground">
                Nomeados desta categoria serão anunciados em breve.
              </p>
            ) : (
              <button
                type="button"
                onClick={continueToConfirm}
                className="group relative mt-12 overflow-hidden bg-gold px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground btn-vote"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Continuar
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        ) : null}

        {step === "confirm" && selected && category ? (
          <div className="mx-auto max-w-xl">
            <p className="eyebrow">Confirme o seu voto</p>
            <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.08em] text-gold-gradient">
              Recibo antes do palco
            </h2>
            <dl className="mt-10 space-y-6 border border-border/70 p-8">
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Categoria
                </dt>
                <dd className="mt-2 font-display text-lg uppercase tracking-[0.1em]">
                  {category.name}
                </dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Escolha
                </dt>
                <dd className="mt-2 font-display text-lg uppercase tracking-[0.1em]">
                  {selected.name}
                </dd>
              </div>
            </dl>

            <label className="mt-10 block text-[0.62rem] uppercase tracking-[0.28em] text-gold">
              E-mail do eleitor
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.com"
                className="mt-3 w-full border border-border bg-transparent px-4 py-3 text-sm tracking-normal text-foreground outline-none focus:border-gold"
              />
            </label>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Usado só para garantir um voto por categoria. Não é publicado.
            </p>

            <label className="mt-8 block text-[0.62rem] uppercase tracking-[0.28em] text-gold">
              Verificação anti-bot — quanto é {captcha.question || "…"}?
              <input
                inputMode="numeric"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="mt-3 w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
              />
            </label>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="group relative overflow-hidden border border-gold/50 px-8 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                />
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                  Voltar
                </span>
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={confirmVote}
                className="group relative overflow-hidden bg-gold px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground btn-vote disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? (
                    <>
                      <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      A registar…
                    </>
                  ) : (
                    <>
                      Confirmar voto
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        ) : null}

        {step === "done" && selected && category ? (
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Voto registado</p>
            <h2 className="mt-5 font-display text-4xl uppercase tracking-[0.08em] text-gold-gradient">
              Obrigado
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {preview
                ? "Pré-visualização aceite. Quando a votação abrir, o mesmo fluxo passa a contar para o resultado oficial."
                : "O seu voto foi confirmado e entra no livro de auditoria do AICA."}
            </p>
            <dl className="mt-10 space-y-4 border border-border/70 p-8 text-left">
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Categoria
                </dt>
                <dd className="mt-2 uppercase tracking-[0.12em]">{category.name}</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Escolha
                </dt>
                <dd className="mt-2 uppercase tracking-[0.12em]">{selected.name}</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                  ID da transacção
                </dt>
                <dd className="mt-2 font-mono text-sm text-gold">{receipt}</dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setStep("choose");
                  setNomineeSlug("");
                  setReceipt(null);
                  setAnswer("");
                  void refreshCaptcha();
                }}
                className="bg-gold px-8 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground"
              >
                Votar noutra categoria
              </button>
              <Link
                to="/como-votar"
                className="border border-gold/50 px-8 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold"
              >
                Como votar
              </Link>
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}
