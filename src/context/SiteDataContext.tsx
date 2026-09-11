import React, { createContext, useContext, useEffect, useState } from "react";
import { NOMINEES as INITIAL_NOMINEES, CATEGORIES as INITIAL_CATEGORIES, type Nominee, type Category } from "@/data/aica";

export type SiteContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  galaTitle: string;
  galaDate: string;
  galaLocation: string;
  galaDescription: string;
  votingRulesText: string;
  aboutText: string;
};

export type EditableNominee = Nominee & {
  imageUrl?: string;
  votesCount?: number;
};

const DEFAULT_CONTENT: SiteContent = {
  heroEyebrow: "Angola Influence & Communication Awards",
  heroTitle: "Diamante",
  heroSubtitle: "Celebrando os diamantes humanos da lusofonia",
  galaTitle: "A Grande Gala AICA 2026",
  galaDate: "Novembro de 2026",
  galaLocation: "Luanda, Angola",
  galaDescription: "A noite máxima de celebração da lusofonia digital e midiática.",
  votingRulesText: "Cada eleitor pode votar uma vez por categoria com validação rápida por e-mail.",
  aboutText: "O Angola Influence & Communication Awards é uma plataforma de reconhecimento dedicada a personalidades, criadores, profissionais, empreendedores e projectos que geram influência, comunicação, criatividade e impacto no space lusófono.",
};

// Map initial default vote counts for nominees
const INITIAL_EDITABLE_NOMINEES: EditableNominee[] = INITIAL_NOMINEES.map((n, index) => ({
  ...n,
  votesCount: Math.floor(450 + (index * 137) % 1800),
}));

type SiteDataContextType = {
  content: SiteContent;
  nominees: EditableNominee[];
  categories: Category[];
  updateContent: (newContent: Partial<SiteContent>) => void;
  updateNominee: (slug: string, nomineeData: Partial<EditableNominee>) => void;
  addNominee: (newNominee: EditableNominee) => void;
  deleteNominee: (slug: string) => void;
  setNomineeVotes: (slug: string, votesCount: number) => void;
  incrementNomineeVotes: (slug: string) => void;
  resetToDefaults: () => void;
};

const SiteDataContext = createContext<SiteDataContextType | null>(null);

const STORAGE_KEY = "aica_site_data_v2";

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [nominees, setNominees] = useState<EditableNominee[]>(INITIAL_EDITABLE_NOMINEES);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.content) setContent((prev) => ({ ...prev, ...parsed.content }));
        if (parsed.nominees && Array.isArray(parsed.nominees)) setNominees(parsed.nominees);
      }
    } catch (e) {
      console.error("Failed to load saved AICA site data from localStorage", e);
    }
  }, []);

  const saveState = (newContent: SiteContent, newNominees: EditableNominee[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ content: newContent, nominees: newNominees }));
    } catch (e) {
      console.error("Failed to save AICA site data to localStorage", e);
    }
  };

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...newContent };
      saveState(next, nominees);
      return next;
    });
  };

  const updateNominee = (slug: string, nomineeData: Partial<EditableNominee>) => {
    setNominees((prev) => {
      const next = prev.map((n) => (n.slug === slug ? { ...n, ...nomineeData } : n));
      saveState(content, next);
      return next;
    });
  };

  const addNominee = (newNominee: EditableNominee) => {
    setNominees((prev) => {
      const exists = prev.some((n) => n.slug === newNominee.slug);
      const next = exists
        ? prev.map((n) => (n.slug === newNominee.slug ? { ...n, ...newNominee } : n))
        : [...prev, { ...newNominee, votesCount: newNominee.votesCount ?? 0 }];
      saveState(content, next);
      return next;
    });
  };

  const deleteNominee = (slug: string) => {
    setNominees((prev) => {
      const next = prev.filter((n) => n.slug !== slug);
      saveState(content, next);
      return next;
    });
  };

  const setNomineeVotes = (slug: string, votesCount: number) => {
    setNominees((prev) => {
      const next = prev.map((n) => (n.slug === slug ? { ...n, votesCount: Math.max(0, votesCount) } : n));
      saveState(content, next);
      return next;
    });
  };

  const incrementNomineeVotes = (slug: string) => {
    setNominees((prev) => {
      const next = prev.map((n) =>
        n.slug === slug ? { ...n, votesCount: (n.votesCount ?? 0) + 1 } : n,
      );
      saveState(content, next);
      return next;
    });
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT);
    setNominees(INITIAL_EDITABLE_NOMINEES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        content,
        nominees,
        categories,
        updateContent,
        updateNominee,
        addNominee,
        deleteNominee,
        setNomineeVotes,
        incrementNomineeVotes,
        resetToDefaults,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}
