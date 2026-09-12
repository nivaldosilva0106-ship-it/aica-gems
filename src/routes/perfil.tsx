import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Portrait, Section } from "@/components/site/ui";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu Perfil — AICA 2026" },
      { name: "description", content: "Perfil oficial de eleitor AICA. Altere o seu avatar, informações pessoais e consulte o seu histórico de votos." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, votes, logout, updateProfileData } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [photoURL, setPhotoURL] = useState(profile?.photoURL || "");
  const [country, setCountry] = useState(profile?.country || "Angola");
  const [bio, setBio] = useState(profile?.bio || "");
  const [loading, setLoading] = useState(false);

  if (!user && typeof window !== "undefined") {
    // If not logged in, direct user to login page
    return (
      <Section className="pt-40 pb-28 text-center">
        <div className="mx-auto max-w-md border border-border/80 bg-background/90 p-8">
          <p className="eyebrow">AICA 2026</p>
          <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.1em] text-gold-gradient">
            Acesso Reservado
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Inicie sessão ou crie uma conta para aceder ao seu perfil de eleitor e histórico de votos.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-gold px-8 py-3 text-xs uppercase tracking-[0.24em] text-primary-foreground font-semibold"
            >
              Entrar na Conta
            </Link>
            <Link
              to="/login"
              search={{ mode: "signup" }}
              className="border border-gold/50 px-8 py-3 text-xs uppercase tracking-[0.24em] text-gold"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await updateProfileData({
      displayName,
      photoURL,
      country,
      bio,
    });
    if (ok) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  return (
    <Section className="pt-40 pb-32">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Profile Card Header */}
        <div className="border border-border/80 bg-background/90 p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <Portrait
              name={profile?.displayName || user?.displayName || "Eleitor"}
              imageUrl={profile?.photoURL || user?.photoURL || undefined}
              className="h-32 w-32 flex-shrink-0 rounded-full border-2 border-gold/60 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            />

            <div className="flex-1 min-w-0">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-gold font-semibold">Eleitor Oficial AICA</span>
              <h1 className="mt-2 font-display text-3xl uppercase tracking-[0.1em] text-gold-gradient">
                {profile?.displayName || user?.displayName || "Eleitor AICA"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{profile?.email || user?.email}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold/80">📍 {profile?.country || "Angola"}</p>
              {profile?.bio && (
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground border-t border-border/50 pt-3">
                  {profile.bio}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 min-w-[140px]">
              <button
                type="button"
                onClick={() => {
                  setDisplayName(profile?.displayName || "");
                  setPhotoURL(profile?.photoURL || "");
                  setCountry(profile?.country || "Angola");
                  setBio(profile?.bio || "");
                  setIsEditing(!isEditing);
                }}
                className="border border-gold/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold/10 transition-colors"
              >
                {isEditing ? "Cancelar Edição" : "✏️ Editar Perfil"}
              </button>

              <button
                type="button"
                onClick={async () => {
                  await logout();
                  navigate({ to: "/" });
                }}
                className="border border-red-500/40 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Sair da Conta
              </button>
            </div>
          </div>

          {/* Edit Profile Form Modal/Section */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="mt-10 border-t border-gold/50 pt-8 space-y-6">
              <h3 className="font-display text-xl uppercase tracking-[0.1em] text-gold">Editar Dados do Perfil</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">URL da Foto / Avatar de Perfil</label>
                  <input
                    type="url"
                    placeholder="https://exemplo.com/foto.jpg"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">País</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Biografia</label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold px-8 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground font-semibold hover:bg-gold-soft transition-colors"
                >
                  {loading ? "A Guardar..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* User Voting History */}
        <div className="border border-border/80 bg-background/90 p-8">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <p className="eyebrow">Registo Oficial no Firebase</p>
              <h2 className="mt-1 font-display text-2xl uppercase tracking-[0.1em] text-gold-gradient">
                Histórico de Votos Efetuados
              </h2>
            </div>
            <Link
              to="/votacao"
              className="bg-gold px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground font-semibold hover:bg-gold-soft transition-colors"
            >
              + Novo Voto
            </Link>
          </div>

          <div className="mt-6">
            {votes.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                  Ainda não registou votos com a sua conta.
                </p>
                <Link
                  to="/votacao"
                  className="mt-6 inline-block border border-gold/60 px-8 py-3 text-xs uppercase tracking-[0.28em] text-gold"
                >
                  Ir para a página de Votação
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border/70 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                    <tr>
                      <th className="py-3">Data e Hora</th>
                      <th className="py-3">Concorrente Votado</th>
                      <th className="py-3">Categoria</th>
                      <th className="py-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {votes.map((v) => (
                      <tr key={v.id} className="border-b border-border/40">
                        <td className="py-4 text-xs font-mono text-muted-foreground">
                          {new Date(v.timestamp).toLocaleString("pt-PT")}
                        </td>
                        <td className="py-4 font-semibold text-gold">{v.nomineeName}</td>
                        <td className="py-4 text-xs text-foreground uppercase">{v.categorySlug}</td>
                        <td className="py-4 text-xs uppercase text-emerald-400 font-semibold">
                          ✓ Registado na Nuvem
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
