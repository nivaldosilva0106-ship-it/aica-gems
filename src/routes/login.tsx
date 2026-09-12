import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Section } from "@/components/site/ui";

type Search = {
  mode?: "login" | "signup";
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): Search => {
    return {
      mode: search["mode"] === "signup" ? "signup" : "login",
    };
  },
  head: () => ({
    meta: [
      { title: "Entrar ou Criar Conta — AICA 2026" },
      { name: "description", content: "Aceda à sua conta AICA para votar, acompanhar os seus diamantes e gerir o seu perfil oficial." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, user } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">(search.mode || "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate({ to: "/perfil" });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "login") {
      const ok = await login(email, password);
      if (ok) {
        navigate({ to: "/perfil" });
      }
    } else {
      const ok = await signup(name, email, password);
      if (ok) {
        navigate({ to: "/perfil" });
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const ok = await loginWithGoogle();
    if (ok) {
      navigate({ to: "/perfil" });
    }
    setLoading(false);
  };

  return (
    <Section className="pt-40 pb-28">
      <div className="mx-auto max-w-md border border-border/80 bg-background/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <p className="eyebrow">AICA 2026</p>
          <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.1em] text-gold-gradient">
            {mode === "login" ? "Entrar na Conta" : "Criar Conta AICA"}
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">
            {mode === "login"
              ? "Introduza os seus dados para aceder à sua conta oficial e votar."
              : "Registe-se gratuitamente para participar e acompanhar as votações."}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-8 flex border-b border-border/60">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors ${
              mode === "login" ? "border-b-2 border-gold text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors ${
              mode === "signup" ? "border-b-2 border-gold text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Criar Conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {mode === "signup" && (
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Nome Completo</label>
              <input
                type="text"
                required
                placeholder="Ex: Manuel Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Endereço de E-mail</label>
            <input
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Palavra-passe</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold py-4 text-xs uppercase tracking-[0.28em] text-primary-foreground font-semibold hover:bg-gold-soft transition-colors disabled:opacity-50"
          >
            {loading ? "A processar..." : mode === "login" ? "Entrar na Conta" : "Concluir Cadastro"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-border/60" />
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">ou</span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-3 border border-border py-3 text-xs uppercase tracking-[0.2em] text-foreground hover:border-gold/60 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Entrar com Google
        </button>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          {mode === "login" ? (
            <p>
              Ainda não tem conta?{" "}
              <button type="button" onClick={() => setMode("signup")} className="text-gold underline font-semibold">
                Cadastre-se aqui
              </button>
            </p>
          ) : (
            <p>
              Já tem uma conta?{" "}
              <button type="button" onClick={() => setMode("login")} className="text-gold underline font-semibold">
                Inicie sessão aqui
              </button>
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
