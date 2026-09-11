import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideSticky = pathname.startsWith("/votacao") || pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 sm:pb-0">{children}</main>
      <Footer />
      {hideSticky ? null : (
        <Link
          to="/votacao"
          className="fixed inset-x-4 bottom-4 z-40 bg-gold py-4 text-center text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground shadow-[0_20px_50px_-20px_oklch(0.79_0.13_85/0.8)] sm:hidden"
        >
          Votar agora
        </Link>
      )}
    </div>
  );
}
