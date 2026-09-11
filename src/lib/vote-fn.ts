import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getChallengeFn = createServerFn({ method: "GET" }).handler(async () => {
  const { issueChallenge, votingWindow } = await import("./vote-engine.server");
  return { ...issueChallenge(), window: votingWindow() };
});

export const getVotingWindowFn = createServerFn({ method: "GET" }).handler(async () => {
  const { votingWindow } = await import("./vote-engine.server");
  return votingWindow();
});

const castSchema = z.object({
  categorySlug: z.string().min(1),
  nomineeSlug: z.string().min(1),
  email: z.string().min(3),
  captchaToken: z.string().min(8),
  captchaAnswer: z.string().min(1),
  preview: z.boolean().optional(),
});

export const castVoteFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => castSchema.parse(input))
  .handler(async ({ data }) => {
    const { castVote } = await import("./vote-engine.server");
    return castVote({
      categorySlug: data.categorySlug,
      nomineeSlug: data.nomineeSlug,
      email: data.email,
      captchaToken: data.captchaToken,
      captchaAnswer: data.captchaAnswer,
      ...(data.preview === undefined ? {} : { preview: data.preview }),
    });
  });

export const getDashboardFn = createServerFn({ method: "GET" }).handler(async () => {
  const { dashboardSnapshot } = await import("./vote-engine.server");
  return dashboardSnapshot();
});

const voidSchema = z.object({
  voteId: z.string().min(3),
  actor: z.string().min(2),
  reason: z.string().min(8),
});

export const voidVoteFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => voidSchema.parse(input))
  .handler(async ({ data }) => {
    const { voidVote } = await import("./vote-engine.server");
    return voidVote(data.voteId, data.actor, data.reason);
  });
