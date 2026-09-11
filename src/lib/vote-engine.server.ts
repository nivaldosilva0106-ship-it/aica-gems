import { createHash, randomBytes } from "node:crypto";
import { getRequest, getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { CATEGORIES, NOMINEES, VOTING_CLOSES, VOTING_OPENS } from "@/data/aica";

export type VoteRecord = {
  id: string;
  categorySlug: string;
  nomineeSlug: string;
  voterHash: string;
  emailMasked: string;
  ipHash: string;
  deviceHash: string;
  sessionId: string;
  userAgent: string;
  createdAt: string;
  status: "confirmed" | "flagged" | "void";
  flagReason?: string;
};

export type AuditEvent = {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export type FraudAttempt = {
  id: string;
  at: string;
  ipHash: string;
  reason: string;
  categorySlug?: string;
};

type RateBucket = { count: number; windowStart: number };

type Tally = Record<string, number>;

const store = globalThis as typeof globalThis & {
  __aicaVotes?: VoteRecord[];
  __aicaAudit?: AuditEvent[];
  __aicaFraud?: FraudAttempt[];
  __aicaRate?: Map<string, RateBucket>;
  __aicaChallenges?: Map<string, { a: number; b: number; createdAt: number }>;
  __aicaTally?: Tally;
  __aicaUsers?: number;
  __aicaSeeded?: boolean;
};

function votes(): VoteRecord[] {
  if (!store.__aicaVotes) store.__aicaVotes = [];
  seedIfEmpty();
  return store.__aicaVotes;
}

function audit(): AuditEvent[] {
  if (!store.__aicaAudit) store.__aicaAudit = [];
  return store.__aicaAudit;
}

function fraud(): FraudAttempt[] {
  if (!store.__aicaFraud) store.__aicaFraud = [];
  return store.__aicaFraud;
}

function rateMap(): Map<string, RateBucket> {
  if (!store.__aicaRate) store.__aicaRate = new Map();
  return store.__aicaRate;
}

function challenges(): Map<string, { a: number; b: number; createdAt: number }> {
  if (!store.__aicaChallenges) store.__aicaChallenges = new Map();
  return store.__aicaChallenges;
}

function tally(): Tally {
  if (!store.__aicaTally) store.__aicaTally = {};
  return store.__aicaTally;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function id(prefix: string) {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "***";
  return `${user.slice(0, 1)}***@${domain}`;
}

export function clientFingerprint() {
  const request = getRequest();
  const ua = getRequestHeader("user-agent") ?? "unknown";
  const ip = getRequestIP({ xForwardedFor: true }) ?? "0.0.0.0";
  const lang = getRequestHeader("accept-language") ?? "";
  return {
    ip,
    ua,
    ipHash: hash(ip),
    deviceHash: hash(`${ua}|${lang}`),
    sessionId: hash(`${ip}|${ua}|${request.headers.get("cookie") ?? "anon"}`).slice(0, 24),
  };
}

const SEED: Array<[string, string, number]> = [
  ["melhor-apresentadora-lusofona", "patricia-pacheco", 1840],
  ["melhor-apresentadora-lusofona", "feliciana-marisa", 1210],
  ["melhor-apresentadora-lusofona", "soraia-nogueira", 980],
  ["apresentador-do-ano", "nelson-quintas", 1560],
  ["apresentador-do-ano", "rui-caldeira", 990],
  ["apresentador-do-ano", "helio-mateus", 740],
  ["influenciador-do-ano", "edson-macuacua", 2104],
  ["influenciador-do-ano", "bruno-kiala", 1677],
  ["influenciador-do-ano", "lara-tavares", 888],
  ["criador-digital-do-ano", "mariana-fortes", 1320],
  ["criador-digital-do-ano", "tiago-nunes", 1102],
  ["criador-digital-do-ano", "yara-monteiro", 905],
  ["podcast-do-ano", "joana-almeida", 760],
  ["podcast-do-ano", "palavra-aberta", 940],
  ["podcast-do-ano", "lusofonia-live", 612],
  ["artista-do-ano", "ruy-do-carmo", 1503],
  ["artista-do-ano", "pongo-luz", 1288],
  ["artista-do-ano", "nacia-gouveia", 701],
  ["empreendedor-do-ano", "carlos-menezes", 430],
  ["empreendedor-do-ano", "narnia-costa", 612],
  ["startup-do-ano", "tandala-tech", 890],
  ["startup-do-ano", "kubinga", 770],
  ["startup-do-ano", "paymoz", 540],
  ["voz-jovem-da-lusofonia", "sofia-lemos", 1204],
  ["voz-jovem-da-lusofonia", "kelson-dala", 998],
  ["projecto-social-do-ano", "aissa-embalo", 654],
  ["inovacao-do-ano", "kianda-labs", 812],
  ["marca-digital-do-ano", "revista-baia", 701],
  ["marca-digital-do-ano", "kamba-wear", 644],
];

function seedIfEmpty() {
  if (store.__aicaSeeded) return;
  store.__aicaSeeded = true;
  if (!store.__aicaVotes) store.__aicaVotes = [];
  if (!store.__aicaTally) store.__aicaTally = {};

  let total = 0;
  for (const [categorySlug, nomineeSlug, count] of SEED) {
    store.__aicaTally[nomineeSlug] = (store.__aicaTally[nomineeSlug] ?? 0) + count;
    total += count;
    store.__aicaVotes.push({
      id: id("vt"),
      categorySlug,
      nomineeSlug,
      voterHash: hash(`seed-${nomineeSlug}`),
      emailMasked: "s***@aica.ao",
      ipHash: hash("seed-ip"),
      deviceHash: hash("seed-dev"),
      sessionId: hash(`seed-${nomineeSlug}`).slice(0, 24),
      userAgent: "seed",
      createdAt: new Date(Date.now() - 36e5).toISOString(),
      status: "confirmed",
    });
  }
  store.__aicaUsers = Math.round(total * 0.42);
  audit().push({
    id: id("au"),
    at: new Date().toISOString(),
    actor: "system",
    action: "seed",
    detail: `Base de demonstração: ${total.toLocaleString("pt-PT")} votos agregados.`,
  });
}

export function issueChallenge() {
  const a = 4 + Math.floor(Math.random() * 12);
  const b = 3 + Math.floor(Math.random() * 9);
  const token = randomBytes(12).toString("hex");
  challenges().set(token, { a, b, createdAt: Date.now() });
  return { token, question: `${a} + ${b}` };
}

function consumeChallenge(token: string, answer: string) {
  const item = challenges().get(token);
  challenges().delete(token);
  if (!item) return false;
  if (Date.now() - item.createdAt > 10 * 60 * 1000) return false;
  const parsed = Number.parseInt(answer.trim(), 10);
  if (!Number.isFinite(parsed)) return false;
  return parsed === item.a + item.b;
}

function hitRate(key: string, limit: number, windowMs: number) {
  const map = rateMap();
  const now = Date.now();
  const bucket = map.get(key);
  if (!bucket || now - bucket.windowStart > windowMs) {
    map.set(key, { count: 1, windowStart: now });
    return { ok: true, count: 1 };
  }
  bucket.count += 1;
  return { ok: bucket.count <= limit, count: bucket.count };
}

export function votingWindow() {
  const now = Date.now();
  const opens = new Date(VOTING_OPENS).getTime();
  const closes = new Date(VOTING_CLOSES).getTime();
  if (now < opens)
    return { state: "soon" as const, opensAt: VOTING_OPENS, closesAt: VOTING_CLOSES };
  if (now > closes)
    return { state: "closed" as const, opensAt: VOTING_OPENS, closesAt: VOTING_CLOSES };
  return { state: "open" as const, opensAt: VOTING_OPENS, closesAt: VOTING_CLOSES };
}

export type CastVoteInput = {
  categorySlug: string;
  nomineeSlug: string;
  email: string;
  captchaToken: string;
  captchaAnswer: string;
  preview?: boolean;
};

function logFraud(ipHash: string, reason: string, categorySlug?: string) {
  const row: FraudAttempt = {
    id: id("fr"),
    at: new Date().toISOString(),
    ipHash,
    reason,
  };
  if (categorySlug) row.categorySlug = categorySlug;
  fraud().push(row);
}

export function castVote(input: CastVoteInput) {
  const fp = clientFingerprint();
  const window = votingWindow();
  const allowPreview = input.preview === true && window.state !== "open";

  const category = CATEGORIES.find((c) => c.slug === input.categorySlug);
  const nominee = NOMINEES.find((n) => n.slug === input.nomineeSlug);
  if (!category || !nominee || nominee.categorySlug !== category.slug) {
    logFraud(fp.ipHash, "candidato ou categoria inválidos", input.categorySlug);
    return { ok: false as const, error: "Categoria ou nomeado inválido." };
  }

  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: "Indique um e-mail válido para identificar o eleitor." };
  }

  const ipRate = hitRate(`ip:${fp.ipHash}`, 8, 10 * 60 * 1000);
  const emailRate = hitRate(`em:${email}`, 6, 10 * 60 * 1000);
  if (!ipRate.ok || !emailRate.ok) {
    logFraud(fp.ipHash, "rate limit excedido", input.categorySlug);
    return {
      ok: false as const,
      error: "Demasiadas tentativas. Aguarde alguns minutos e tente de novo.",
    };
  }

  if (!consumeChallenge(input.captchaToken, input.captchaAnswer)) {
    logFraud(fp.ipHash, "captcha falhado", input.categorySlug);
    return { ok: false as const, error: "Verificação anti-bot incorrecta. Peça um novo desafio." };
  }

  if (window.state === "closed") {
    return { ok: false as const, error: "A votação desta edição já encerrou." };
  }

  const voterHash = hash(email);
  const existing = votes().find(
    (v) =>
      v.voterHash === voterHash &&
      v.categorySlug === input.categorySlug &&
      v.status !== "void" &&
      v.userAgent !== "seed",
  );
  if (existing) {
    logFraud(fp.ipHash, "voto duplicado na categoria", input.categorySlug);
    return {
      ok: false as const,
      error: "Este eleitor já votou nesta categoria. O regulamento permite um voto por categoria.",
    };
  }

  const recentSameDevice = votes().filter(
    (v) =>
      v.deviceHash === fp.deviceHash &&
      v.userAgent !== "seed" &&
      Date.now() - Date.parse(v.createdAt) < 60_000,
  ).length;
  const flag = recentSameDevice >= 4;

  const record: VoteRecord = {
    id: id("vt"),
    categorySlug: input.categorySlug,
    nomineeSlug: input.nomineeSlug,
    voterHash,
    emailMasked: maskEmail(email),
    ipHash: fp.ipHash,
    deviceHash: fp.deviceHash,
    sessionId: fp.sessionId,
    userAgent: fp.ua.slice(0, 180),
    createdAt: new Date().toISOString(),
    status: flag ? "flagged" : "confirmed",
    ...(flag ? { flagReason: "actividade anormal no mesmo dispositivo" } : {}),
  };

  votes().push(record);
  if (record.status === "confirmed") {
    const t = tally();
    t[record.nomineeSlug] = (t[record.nomineeSlug] ?? 0) + 1;
  }
  audit().push({
    id: id("au"),
    at: record.createdAt,
    actor: record.emailMasked,
    action: flag ? "vote.flagged" : "vote.cast",
    detail: `${category.name} → ${nominee.name}${allowPreview ? " (pré-visualização)" : ""}`,
  });

  return {
    ok: true as const,
    receipt: record.id,
    flagged: flag,
    preview: allowPreview,
    category: category.name,
    nominee: nominee.name,
  };
}

export function dashboardSnapshot() {
  seedIfEmpty();
  const all = votes();
  const live = all.filter((v) => v.userAgent !== "seed");
  const confirmedLive = live.filter((v) => v.status === "confirmed");
  const today = new Date().toISOString().slice(0, 10);
  const votesToday = confirmedLive.filter((v) => v.createdAt.slice(0, 10) === today).length;
  const t = tally();
  const votesTotal = Object.values(t).reduce((a, b) => a + b, 0);
  const users = (store.__aicaUsers ?? 0) + new Set(confirmedLive.map((v) => v.voterHash)).size;

  const byCategory = CATEGORIES.map((c) => {
    const nominees = NOMINEES.filter((n) => n.categorySlug === c.slug);
    const rows = nominees.map((n) => ({ name: n.name, votes: t[n.slug] ?? 0 }));
    const votesCount = rows.reduce((a, b) => a + b.votes, 0);
    const leader = [...rows].sort((a, b) => b.votes - a.votes)[0];
    return {
      slug: c.slug,
      name: c.name,
      votes: votesCount,
      leader: leader && leader.votes > 0 ? leader.name : "—",
      leaderVotes: leader?.votes ?? 0,
    };
  });

  const byNominee = NOMINEES.map((n) => ({
    slug: n.slug,
    name: n.name,
    categorySlug: n.categorySlug,
    votes: t[n.slug] ?? 0,
  })).sort((a, b) => b.votes - a.votes);

  const recent = [...live].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 18);

  return {
    votesToday,
    votesTotal,
    users,
    categories: CATEGORIES.length,
    nominees: NOMINEES.length,
    flagged: live.filter((v) => v.status === "flagged").length,
    voided: live.filter((v) => v.status === "void").length,
    byCategory,
    byNominee: byNominee.slice(0, 16),
    recentVotes: recent.map((v) => ({
      id: v.id,
      at: v.createdAt,
      email: v.emailMasked,
      category: CATEGORIES.find((c) => c.slug === v.categorySlug)?.name ?? v.categorySlug,
      nominee: NOMINEES.find((n) => n.slug === v.nomineeSlug)?.name ?? v.nomineeSlug,
      status: v.status,
    })),
    fraud: [...fraud()].slice(-20).reverse(),
    audit: [...audit()].slice(-30).reverse(),
  };
}

export function voidVote(voteId: string, actor: string, reason: string) {
  const record = votes().find((v) => v.id === voteId);
  if (!record) return { ok: false as const, error: "Voto não encontrado." };
  if (record.status === "void")
    return { ok: false as const, error: "Este voto já estava anulado." };
  if (record.userAgent === "seed") {
    return {
      ok: false as const,
      error: "Votos de demonstração agregados não podem ser anulados um a um.",
    };
  }
  const wasConfirmed = record.status === "confirmed";
  record.status = "void";
  record.flagReason = reason;
  if (wasConfirmed) {
    const t = tally();
    t[record.nomineeSlug] = Math.max(0, (t[record.nomineeSlug] ?? 0) - 1);
  }
  audit().push({
    id: id("au"),
    at: new Date().toISOString(),
    actor,
    action: "vote.void",
    detail: `${voteId} — ${reason}`,
  });
  return { ok: true as const };
}
