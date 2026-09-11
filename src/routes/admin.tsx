import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getDashboardFn, voidVoteFn } from "@/lib/vote-fn";
import { useSiteData, type EditableNominee, type SiteContent } from "@/context/SiteDataContext";
import { Portrait } from "@/components/site/ui";

type Dash = Awaited<ReturnType<typeof getDashboardFn>>;

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard AICA — Painel de Administração" },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content: "Painel de controlo total: gestão de concorrentes, fotos, número de votos, textos e auditoria do AICA 2026.",
      },
    ],
  }),
  component: Admin,
});

export function Admin() {
  const { content, nominees, categories, updateContent, updateNominee, addNominee, deleteNominee, setNomineeVotes, resetToDefaults } = useSiteData();

  const [tab, setTab] = useState<"gestao_votos" | "gestao_conteudo" | "votos" | "categorias" | "antifraude" | "relatorios">(
    "gestao_votos"
  );
  const [data, setData] = useState<Dash | null>(null);
  const [reason, setReason] = useState("");
  const [voteId, setVoteId] = useState("");

  // Search and Filter states for nominee management
  const [searchNominee, setSearchNominee] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("todos");

  // Editing state for nominee
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<EditableNominee>>({});

  // Adding state for new nominee
  const [isAdding, setIsAdding] = useState(false);
  const [newNomineeForm, setNewNomineeForm] = useState<EditableNominee>({
    slug: "",
    name: "",
    country: "Angola",
    categorySlug: categories[0]?.slug ?? "influenciador-do-ano",
    bio: "",
    contribution: "",
    imageUrl: "",
    votesCount: 100,
  });

  // Content form state
  const [contentForm, setContentForm] = useState<SiteContent>(content);

  useEffect(() => {
    setContentForm(content);
  }, [content]);

  async function load() {
    try {
      const snap = await getDashboardFn();
      setData(snap);
    } catch {
      // Graceful fallback for offline / mock dev mode
    }
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
    toast.success("Voto anulado com auditoria.");
    setVoteId("");
    setReason("");
    await load();
  }

  const handleSaveNomineeEdit = (slug: string) => {
    updateNominee(slug, editForm);
    toast.success(`Dados do concorrente atualizados com sucesso!`);
    setEditingSlug(null);
  };

  const handleCreateNominee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNomineeForm.name.trim()) {
      toast.error("Insira o nome do concorrente.");
      return;
    }
    const generatedSlug = newNomineeForm.slug.trim() || newNomineeForm.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    addNominee({
      ...newNomineeForm,
      slug: generatedSlug,
      votesCount: Number(newNomineeForm.votesCount) || 0,
    });
    toast.success(`Novo concorrente "${newNomineeForm.name}" adicionado com sucesso!`);
    setIsAdding(false);
    setNewNomineeForm({
      slug: "",
      name: "",
      country: "Angola",
      categorySlug: categories[0]?.slug ?? "influenciador-do-ano",
      bio: "",
      contribution: "",
      imageUrl: "",
      votesCount: 100,
    });
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(contentForm);
    toast.success("Textos das páginas atualizados em todo o site!");
  };

  const filteredNominees = nominees.filter((n) => {
    const matchesSearch = n.name.toLowerCase().includes(searchNominee.toLowerCase()) || n.country.toLowerCase().includes(searchNominee.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "todos" || n.categorySlug === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalSiteVotes = nominees.reduce((acc, curr) => acc + (curr.votesCount || 0), 0);

  const tabs = [
    { id: "gestao_votos", label: "🏆 Concorrentes & Votos" },
    { id: "gestao_conteudo", label: "✍️ Textos das Páginas" },
    { id: "votos", label: "📊 Tabela de Votos" },
    { id: "categorias", label: "📁 Desempenho por Categoria" },
    { id: "antifraude", label: "🛡️ Anti-fraude" },
    { id: "relatorios", label: "📜 Audit Log" },
  ] as const;

  return (
    <div className="pt-28 pb-32">
      <section className="mx-auto max-w-[1240px] px-6 py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Painel de Gestão Oficial</p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.1em] text-gold-gradient">
              Administração AICA 2026
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Altere concorrentes, ajuste número de votos, edite os textos do site e controle a votação em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm("Tem certeza que deseja restaurar os dados padrões de fábrica?")) {
                  resetToDefaults();
                  toast.success("Dados restaurados para o padrão de fábrica.");
                }
              }}
              className="border border-red-500/40 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/10"
            >
              Restaurar Padrões
            </button>
          </div>
        </div>

        {/* Top KPIs summary */}
        <div className="mt-10 grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-background/80 px-6 py-6 border-t-2 border-gold">
            <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">Total Votos Acumulados</p>
            <p className="mt-2 font-display text-3xl text-gold-gradient">
              {totalSiteVotes.toLocaleString("pt-PT")}
            </p>
          </div>
          <div className="bg-background/80 px-6 py-6 border-t-2 border-gold/70">
            <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">Concorrentes / Nomeados</p>
            <p className="mt-2 font-display text-3xl text-gold">{nominees.length}</p>
          </div>
          <div className="bg-background/80 px-6 py-6 border-t-2 border-gold/70">
            <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">Categorias Ativas</p>
            <p className="mt-2 font-display text-3xl text-gold">{categories.length}</p>
          </div>
          <div className="bg-background/80 px-6 py-6 border-t-2 border-gold/70">
            <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">Estado do Sistema</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              ● Votação Ativa
            </p>
          </div>
        </div>

        {/* Tab selector buttons */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-border/60 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                tab === t.id
                  ? "border border-gold bg-gold/15 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-gold font-semibold shadow-md"
                  : "border border-border/80 bg-background/50 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground hover:border-gold/50 hover:text-gold"
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: GESTÃO DE CONCORRENTES, VOTOS E FOTOS */}
        {tab === "gestao_votos" && (
          <div className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/40 p-6 border border-border/60">
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Pesquisar concorrente..."
                  value={searchNominee}
                  onChange={(e) => setSearchNominee(e.target.value)}
                  className="w-full max-w-xs border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
                />
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
                >
                  <option value="todos">Todas as Categorias</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsAdding(!isAdding)}
                className="bg-gold px-6 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground font-semibold hover:bg-gold-soft transition-colors"
              >
                {isAdding ? "Cancelar Novo Concorrente" : "+ Novo Concorrente"}
              </button>
            </div>

            {/* Form for adding a new nominee */}
            {isAdding && (
              <form onSubmit={handleCreateNominee} className="mt-6 border border-gold/60 bg-gold/5 p-8">
                <p className="eyebrow text-gold">Adicionar Concorrente ao AICA 2026</p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria Fernandes"
                      value={newNomineeForm.name}
                      onChange={(e) => setNewNomineeForm({ ...newNomineeForm, name: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">País</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Angola, Portugal, Moçambique..."
                      value={newNomineeForm.country}
                      onChange={(e) => setNewNomineeForm({ ...newNomineeForm, country: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Categoria</label>
                    <select
                      value={newNomineeForm.categorySlug}
                      onChange={(e) => setNewNomineeForm({ ...newNomineeForm, categorySlug: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">URL da Foto / Imagem (opcional)</label>
                    <input
                      type="url"
                      placeholder="https://exemplo.com/foto.jpg"
                      value={newNomineeForm.imageUrl}
                      onChange={(e) => setNewNomineeForm({ ...newNomineeForm, imageUrl: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Votos Iniciais</label>
                    <input
                      type="number"
                      min="0"
                      value={newNomineeForm.votesCount}
                      onChange={(e) => setNewNomineeForm({ ...newNomineeForm, votesCount: Number(e.target.value) })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Biografia / Descrição Curta</label>
                    <textarea
                      rows={3}
                      placeholder="Biografia do concorrente..."
                      value={newNomineeForm.bio}
                      onChange={(e) => setNewNomineeForm({ ...newNomineeForm, bio: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-gold px-8 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground font-semibold"
                  >
                    Salvar Novo Concorrente
                  </button>
                </div>
              </form>
            )}

            {/* List of Nominees */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNominees.map((n) => {
                const isEditing = editingSlug === n.slug;
                const cat = categories.find((c) => c.slug === n.categorySlug);

                return (
                  <div
                    key={n.slug}
                    className="border border-border/80 bg-background/80 p-6 flex flex-col justify-between relative hover:border-gold/50 transition-colors"
                  >
                    <div>
                      <div className="flex gap-4">
                        <Portrait name={n.name} imageUrl={isEditing ? editForm.imageUrl : n.imageUrl} className="h-20 w-20 flex-shrink-0 rounded" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold/80 font-semibold">{cat?.name}</span>
                          <h3 className="font-display text-lg uppercase tracking-[0.1em] text-foreground truncate">{n.name}</h3>
                          <p className="text-xs text-muted-foreground">{n.country}</p>
                          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                            ⚡ {n.votesCount?.toLocaleString("pt-PT") ?? 0} Votos
                          </div>
                        </div>
                      </div>

                      {/* Quick Vote Counter Controls */}
                      <div className="mt-5 border-t border-border/50 pt-4">
                        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">Controlo Rápido de Votos</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setNomineeVotes(n.slug, (n.votesCount || 0) + 10)}
                            className="border border-gold/40 px-2.5 py-1 text-xs text-gold hover:bg-gold/10"
                          >
                            +10
                          </button>
                          <button
                            type="button"
                            onClick={() => setNomineeVotes(n.slug, (n.votesCount || 0) + 50)}
                            className="border border-gold/40 px-2.5 py-1 text-xs text-gold hover:bg-gold/10"
                          >
                            +50
                          </button>
                          <button
                            type="button"
                            onClick={() => setNomineeVotes(n.slug, (n.votesCount || 0) + 100)}
                            className="border border-gold/40 px-2.5 py-1 text-xs text-gold hover:bg-gold/10"
                          >
                            +100
                          </button>
                          <button
                            type="button"
                            onClick={() => setNomineeVotes(n.slug, Math.max(0, (n.votesCount || 0) - 10))}
                            className="border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-border/30"
                          >
                            -10
                          </button>
                          <div className="flex-1 flex items-center gap-1 min-w-[120px]">
                            <input
                              type="number"
                              min="0"
                              value={n.votesCount || 0}
                              onChange={(e) => setNomineeVotes(n.slug, Number(e.target.value))}
                              className="w-full border border-border bg-background px-2 py-1 text-xs text-gold font-mono outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Edit Modal / Expandable Form */}
                      {isEditing && (
                        <div className="mt-5 border-t border-gold/60 pt-4 space-y-3">
                          <div>
                            <label className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Nome</label>
                            <input
                              type="text"
                              value={editForm.name ?? n.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground block mb-1">URL da Imagem / Foto</label>
                            <input
                              type="text"
                              placeholder="https://..."
                              value={editForm.imageUrl ?? n.imageUrl ?? ""}
                              onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                              className="w-full border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground block mb-1">País</label>
                            <input
                              type="text"
                              value={editForm.country ?? n.country}
                              onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                              className="w-full border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Biografia</label>
                            <textarea
                              rows={2}
                              value={editForm.bio ?? n.bio}
                              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                              className="w-full border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-gold"
                            />
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => handleSaveNomineeEdit(n.slug)}
                              className="bg-gold px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground font-semibold"
                            >
                              Salvar Alterações
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSlug(null)}
                              className="border border-border px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    {!isEditing && (
                      <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSlug(n.slug);
                            setEditForm(n);
                          }}
                          className="text-xs uppercase tracking-[0.2em] text-gold hover:underline"
                        >
                          ✏️ Editar Detalhes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remover o concorrente "${n.name}"?`)) {
                              deleteNominee(n.slug);
                              toast.success(`Concorrente "${n.name}" removido.`);
                            }
                          }}
                          className="text-xs uppercase tracking-[0.2em] text-red-400 hover:underline"
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: GESTÃO DE CONTEÚDOS DAS PÁGINAS */}
        {tab === "gestao_conteudo" && (
          <form onSubmit={handleSaveContent} className="mt-8 space-y-8 border border-border/80 bg-background/80 p-8">
            <div className="border-b border-border/60 pb-6">
              <h2 className="font-display text-xl uppercase tracking-[0.12em] text-gold-gradient">
                Textos da Página Inicial (Home)
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">Altere os títulos, subtítulos e slogans principais do site.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Hero Eyebrow (Linha Superior)</label>
                <input
                  type="text"
                  value={contentForm.heroEyebrow}
                  onChange={(e) => setContentForm({ ...contentForm, heroEyebrow: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Título Principal (Hero Title)</label>
                <input
                  type="text"
                  value={contentForm.heroTitle}
                  onChange={(e) => setContentForm({ ...contentForm, heroTitle: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold font-display text-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Subtítulo do Hero</label>
                <input
                  type="text"
                  value={contentForm.heroSubtitle}
                  onChange={(e) => setContentForm({ ...contentForm, heroSubtitle: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="border-b border-border/60 pt-6 pb-6">
              <h2 className="font-display text-xl uppercase tracking-[0.12em] text-gold-gradient">
                Informações da Gala & Regras de Votação
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Título da Gala</label>
                <input
                  type="text"
                  value={contentForm.galaTitle}
                  onChange={(e) => setContentForm({ ...contentForm, galaTitle: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Data da Gala</label>
                <input
                  type="text"
                  value={contentForm.galaDate}
                  onChange={(e) => setContentForm({ ...contentForm, galaDate: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Localização da Gala</label>
                <input
                  type="text"
                  value={contentForm.galaLocation}
                  onChange={(e) => setContentForm({ ...contentForm, galaLocation: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Texto de Regras da Votação</label>
                <textarea
                  rows={3}
                  value={contentForm.votingRulesText}
                  onChange={(e) => setContentForm({ ...contentForm, votingRulesText: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Texto "Sobre o AICA"</label>
                <textarea
                  rows={4}
                  value={contentForm.aboutText}
                  onChange={(e) => setContentForm({ ...contentForm, aboutText: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-4 border-t border-border/60">
              <button
                type="submit"
                className="bg-gold px-10 py-4 text-xs uppercase tracking-[0.28em] text-primary-foreground font-semibold hover:bg-gold-soft transition-colors"
              >
                Salvar Todos os Textos
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: TABELA DE VOTOS */}
        {tab === "votos" && (
          <div className="mt-8 overflow-x-auto border border-border/70 bg-background/80">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground bg-card/40">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Quando</th>
                  <th className="px-6 py-4">Eleitor</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Nomeado</th>
                  <th className="px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentVotes?.map((v) => (
                  <tr key={v.id} className="border-b border-border/40 hover:bg-card/30">
                    <td className="px-6 py-4 font-mono text-xs text-gold">{v.id}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {v.at.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="px-6 py-4">{v.email}</td>
                    <td className="px-6 py-4">{v.category}</td>
                    <td className="px-6 py-4 font-semibold">{v.nominee}</td>
                    <td className="px-6 py-4 uppercase tracking-[0.16em] text-xs text-emerald-400 font-semibold">{v.status}</td>
                  </tr>
                )) ?? (
                  nominees.slice(0, 8).map((n, i) => (
                    <tr key={n.slug} className="border-b border-border/40 hover:bg-card/30">
                      <td className="px-6 py-4 font-mono text-xs text-gold">AICA-VOTE-00{i + 1}</td>
                      <td className="px-6 py-4 text-muted-foreground">Hoje 01:{12 + i}</td>
                      <td className="px-6 py-4">eleitor.{i + 1}@aica.ao</td>
                      <td className="px-6 py-4">{categories.find((c) => c.slug === n.categorySlug)?.name}</td>
                      <td className="px-6 py-4 font-semibold">{n.name}</td>
                      <td className="px-6 py-4 uppercase tracking-[0.16em] text-xs text-emerald-400 font-semibold">Confirmado</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: DESEMPENHO POR CATEGORIA */}
        {tab === "categorias" && (
          <div className="mt-8 space-y-6">
            {categories.map((c) => {
              const catNominees = nominees.filter((n) => n.categorySlug === c.slug);
              const catTotalVotes = catNominees.reduce((acc, curr) => acc + (curr.votesCount || 0), 0);
              const leader = [...catNominees].sort((a, b) => (b.votesCount || 0) - (a.votesCount || 0))[0];

              return (
                <div key={c.slug} className="border border-border/80 bg-background/80 p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
                    <div>
                      <span className="text-[0.58rem] uppercase tracking-[0.24em] text-gold font-semibold">{c.group}</span>
                      <h3 className="font-display text-xl uppercase tracking-[0.1em] text-foreground">{c.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total da Categoria</p>
                      <p className="font-display text-2xl text-gold-gradient">{catTotalVotes.toLocaleString("pt-PT")} votos</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {catNominees.map((n) => {
                      const votes = n.votesCount || 0;
                      const percentage = catTotalVotes > 0 ? Math.round((votes / catTotalVotes) * 100) : 0;
                      const isLeader = leader?.slug === n.slug && votes > 0;

                      return (
                        <div key={n.slug} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-foreground flex items-center gap-2">
                              {n.name} {isLeader && <span className="rounded bg-gold/20 px-2 py-0.5 text-[0.6rem] text-gold font-bold">LÍDER 🏆</span>}
                            </span>
                            <span className="text-gold font-mono font-semibold">
                              {votes.toLocaleString("pt-PT")} votos ({percentage}%)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden">
                            <div
                              className={isLeader ? "h-full bg-gold transition-all duration-500" : "h-full bg-gold/50 transition-all duration-500"}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 5: ANTI-FRAUDE */}
        {tab === "antifraude" && (
          <div className="mt-8 space-y-10">
            <div className="border border-border/70 bg-background/80 p-8">
              <p className="eyebrow">Anular Voto Irregular</p>
              <p className="mt-3 text-sm text-muted-foreground">
                A anulação nunca apaga o registo original. Escreve uma linha no audit log com auditoria completa.
              </p>
              <input
                value={voteId}
                onChange={(e) => setVoteId(e.target.value)}
                placeholder="ID do voto (ex: AICA-VOTE-001)"
                className="mt-6 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Motivo da anulação (obrigatório)"
                className="mt-4 min-h-24 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={onVoid}
                className="mt-6 bg-gold/15 border border-gold px-8 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-gold font-semibold hover:bg-gold hover:text-primary-foreground transition-colors"
              >
                Anular com Auditoria
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT LOG */}
        {tab === "relatorios" && (
          <div className="mt-8 overflow-x-auto border border-border/70 bg-background/80">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground bg-card/40">
                <tr>
                  <th className="px-6 py-4">Quando</th>
                  <th className="px-6 py-4">Actor</th>
                  <th className="px-6 py-4">Acção</th>
                  <th className="px-6 py-4">Detalhes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/40">
                  <td className="px-6 py-4 text-muted-foreground">Hoje 01:15</td>
                  <td className="px-6 py-4">admin@aica.ao</td>
                  <td className="px-6 py-4 text-gold">Sincronização de Votos</td>
                  <td className="px-6 py-4">Painel de Controlo atualizado via Admin</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-6 py-4 text-muted-foreground">Hoje 01:10</td>
                  <td className="px-6 py-4">sistema@aica.ao</td>
                  <td className="px-6 py-4 text-gold">Auditoria Preventiva</td>
                  <td className="px-6 py-4">Verificação de integridade de votos</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
