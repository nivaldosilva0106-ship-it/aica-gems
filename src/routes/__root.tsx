import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pt-20">
      <div className="max-w-lg text-center">
        <p className="eyebrow">AICA 2026</p>
        <h1 className="mt-6 text-6xl uppercase tracking-[0.12em]">
          <span className="text-gold-gradient">404</span>
        </h1>
        <p className="mt-6 text-sm uppercase tracking-[0.28em] text-muted-foreground">
          Esta página não existe — ou ainda não foi lapidada.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-gold px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground"
          >
            Ir para casa
          </Link>
          <Link
            to="/votacao"
            className="border border-gold/50 px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold"
          >
            Votar agora
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">AICA 2026</p>
        <h1 className="mt-6 font-display text-2xl uppercase tracking-[0.12em] text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Algo falhou do nosso lado. Pode tentar de novo ou regressar à página inicial.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-gold px-8 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-primary-foreground"
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="border border-gold/50 px-8 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold"
          >
            Ir para casa
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AICA 2026 — Diamante | Angola Influence & Communication Awards" },
      {
        name: "description",
        content:
          "AICA 2026: celebrando os diamantes humanos da lusofonia. Nomeados, categorias, votação oficial e Gala em Luanda.",
      },
      { name: "author", content: "AICA" },
      { property: "og:title", content: "AICA 2026 — Celebrando os Diamantes Humanos da Lusofonia" },
      {
        property: "og:description",
        content:
          "Votação oficial, nomeados e categorias do Angola Influence & Communication Awards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/aica-logo.png", type: "image/png" },
      { rel: "shortcut icon", href: "/aica-logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/aica-logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { SiteDataProvider } from "@/context/SiteDataContext";
import { AuthProvider } from "@/context/AuthContext";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SiteDataProvider>
          <SiteLayout>
            <Outlet />
          </SiteLayout>
          <Toaster />
        </SiteDataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

