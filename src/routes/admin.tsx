import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getDashboardFn, voidVoteFn } from "@/lib/vote-fn";

type Dash = Awaited<ReturnType<typeof getDashboardFn>>;

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard AICA — Administração" },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content: "Painel interno de votos, anti-fraude e auditoria do AICA 2026.",
      },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [tab, setTab] = useState<"votos" | "categorias" | "nomeados" | "antifraude" | "relatorios">(
    "votos",
  );
  const [data, setData] = useState<Dash | null>(null);
  const [reason, setReason] = useState("");
  const [voteId, setVoteId] = useState("");

  async function load() {
    const snap = await getDashboardFn();
    setData(snap);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onVoid() {
    if (!voteId || reason.trim().length < 8) {
      toast.error("Indique o ID do voto e um motivo com pelo menos 8 caracteres.");
      return;
    }
    const res = await voidVoteFn({
      data: { voteId, actor: "admin@aica.ao", reason: reason.trim() },
    });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Voto anulado. A acção ficou no audit log.");
    setVoteId("");
    setReason("");
    await load();
  }

  const kpis = data
    ? [
        { t: "Votos hoje", v: data.votesToday.toLocaleString("pt-PT") },
        { t: "Votos totais", v: data.votesTotal.toLocaleString("pt-PT") },
        { t: "Utilizadores", v: data.users.toLocaleString("pt-PT") },
        { t: "Categorias", v: String(data.categories) },
        { t: "Nomeados", v: String(data.nominees) },
        { t: "Sinalizados", v: String(data.flagged) },
      ]
    : [];

  const tabs = [
    { id: "votos", label: "Votos" },
    { id: "categorias", label: "Categorias" },
    { id: "nomeados", label: "Nomeados" },
    { id: "antifraude", label: "Anti-fraude" },
    { id: "relatorios", label: "Relatórios" },
  ] as const;

  return (
    <div className="pt-28">
      <section className="mx-auto max-w-[1240px] px-6 py-12">
        <p className="eyebrow">Organização</p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.1em] text-gold-gradient">
          Dashboard AICA
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          Nenhum voto é alterado sem audit log. Anulações exigem motivo escrito.
        </p>

        <div className="mt-12 grid gap-px bg-border/60 sm:grid-cols-3 lg:grid-cols-6">
          {kpis.map((k) => (
            <div key={k.t} className="bg-background/80 px-5 py-8">
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                {k.t}
              </p>
              <p className="mt-3 font-display text-2xl text-gold-gradient">{k.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                tab === t.id
                  ? "border border-gold bg-gold/10 px-5 py-3 text-[0.62rem] uppercase tracking-[0.26em] text-gold"
                  : "border border-border px-5 py-3 text-[0.62rem] uppercase tracking-[0.26em] text-muted-foreground"
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {!data ? (
          <p className="mt-16 text-sm uppercase tracking-[0.24em] text-muted-foreground">
            A carregar…
          </p>
        ) : null}

        {data && tab === "votos" ? (
          <div className="mt-12 overflow-x-auto border border-border/70">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Quando</th>
                  <th className="px-4 py-4">Eleitor</th>
                  <th className="px-4 py-4">Categoria</th>
                  <th className="px-4 py-4">Nomeado</th>
                  <th className="px-4 py-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {data.recentVotes.map((v) => (
                  <tr key={v.id} className="border-b border-border/40">
                    <td className="px-4 py-3 font-mono text-xs text-gold">{v.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {v.at.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="px-4 py-3">{v.email}</td>
                    <td className="px-4 py-3">{v.category}</td>
                    <td className="px-4 py-3">{v.nominee}</td>
                    <td className="px-4 py-3 uppercase tracking-[0.16em] text-xs">{v.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {data && tab === "categorias" ? (
          <div className="mt-12 overflow-x-auto border border-border/70">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-4">Categoria</th>
                  <th className="px-4 py-4">Votos</th>
                  <th className="px-4 py-4">Líder</th>
                </tr>
              </thead>
              <tbody>
                {data.byCategory.map((c) => (
                  <tr key={c.slug} className="border-b border-border/40">
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3 text-gold">{c.votes.toLocaleString("pt-PT")}</td>
                    <td className="px-4 py-3">
                      {c.leader} ({c.leaderVotes.toLocaleString("pt-PT")})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {data && tab === "nomeados" ? (
          <div className="mt-12 overflow-x-auto border border-border/70">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-4">Nomeado</th>
                  <th className="px-4 py-4">Votos confirmados</th>
                </tr>
              </thead>
              <tbody>
                {data.byNominee.map((n) => (
                  <tr key={n.slug} className="border-b border-border/40">
                    <td className="px-4 py-3">{n.name}</td>
                    <td className="px-4 py-3 text-gold">{n.votes.toLocaleString("pt-PT")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {data && tab === "antifraude" ? (
          <div className="mt-12 space-y-10">
            <div className="border border-border/70 p-8">
              <p className="eyebrow">Anular voto</p>
              <p className="mt-3 text-sm text-muted-foreground">
                A anulação nunca apaga o registo original. Escreve uma linha no audit log.
              </p>
              <input
                value={voteId}
                onChange={(e) => setVoteId(e.target.value)}
                placeholder="ID do voto"
                className="mt-6 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Motivo (obrigatório)"
                className="mt-4 min-h-24 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={onVoid}
                className="mt-6 border border-gold/60 px-8 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-gold"
              >
                Anular com auditoria
              </button>
            </div>
            <div className="overflow-x-auto border border-border/70">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-4">Quando</th>
                    <th className="px-4 py-4">Motivo</th>
                    <th className="px-4 py-4">IP hash</th>
                  </tr>
                </thead>
                <tbody>
                  {data.fraud.map((f) => (
                    <tr key={f.id} className="border-b border-border/40">
                      <td className="px-4 py-3 text-muted-foreground">
                        {f.at.slice(0, 16).replace("T", " ")}
                      </td>
                      <td className="px-4 py-3">{f.reason}</td>
                      <td className="px-4 py-3 font-mono text-xs">{f.ipHash.slice(0, 12)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {data && tab === "relatorios" ? (
          <div className="mt-12 overflow-x-auto border border-border/70">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-4">Quando</th>
                  <th className="px-4 py-4">Actor</th>
                  <th className="px-4 py-4">Acção</th>
                  <th className="px-4 py-4">Detalhe</th>
                </tr>
              </thead>
              <tbody>
                {data.audit.map((a) => (
                  <tr key={a.id} className="border-b border-border/40">
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.at.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="px-4 py-3">{a.actor}</td>
                    <td className="px-4 py-3 text-gold">{a.action}</td>
                    <td className="px-4 py-3">{a.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  );
}
