// lib/matchGroup.ts
import { prisma } from "@/lib/prisma";

export type MatchUser = {
  id: string;
  name: string;
  email: string;
  gender?: string;
  connectionStyles: string;
  communicationStyles: string;
  socialStyles: string;
  healthAndFitness: string;
  family: string;
  spirituality: string;
  politicalNews: string;
  incorrectHumor: string;
  kindOfPeople: string[];
};

function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  return a.toLowerCase() === b.toLowerCase() ? 1 : 0;
}

function arraySimilarity(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  const overlap = a.filter((item) => b.includes(item)).length;
  return overlap / Math.max(a.length, b.length);
}

function computeScore(u: MatchUser, c: MatchUser): number {
  let score = 0;
  score += similarity(u.connectionStyles, c.connectionStyles);
  score += similarity(u.communicationStyles, c.communicationStyles);
  score += similarity(u.socialStyles, c.socialStyles);
  score += 0.5 * similarity(u.healthAndFitness, c.healthAndFitness);
  score += 0.5 * similarity(u.family, c.family);
  score += 0.5 * similarity(u.spirituality, c.spirituality);
  score += 0.5 * similarity(u.politicalNews, c.politicalNews);
  score += 0.5 * similarity(u.incorrectHumor, c.incorrectHumor);
  score += arraySimilarity(u.kindOfPeople, c.kindOfPeople);
  return score;
}

/**
 * Forms groups for an event and saves them in the MatchGroup table.
 */
export async function formEventGroups(eventId: string) {
  const participants = await prisma.eventParticipant.findMany({
    where: { eventId },
    include: { user: true },
  });

  const users: MatchUser[] = participants.map((p) => p.user as MatchUser);
  if (users.length === 0) return [];

  const females = users.filter((u) => u.gender?.toLowerCase() === "female");
  const males = users.filter((u) => u.gender?.toLowerCase() === "male");
  const others = users.filter(
    (u) => u.gender?.toLowerCase() !== "female" && u.gender?.toLowerCase() !== "male"
  );

  const allUsers = [...females, ...males, ...others];
  const used = new Set<string>();
  const groups: MatchUser[][] = [];

  for (let i = 0; i < allUsers.length; i++) {
    if (used.has(allUsers[i].id)) continue;
    const seed = allUsers[i];

    const candidates = allUsers
      .filter((u) => u.id !== seed.id && !used.has(u.id))
      .map((u) => ({
        ...u,
        score: computeScore(seed, u),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // 4 per group total

    const group = [seed, ...candidates];

    // 🟣 ensure at least one female if possible
    if (!group.some((u) => u.gender?.toLowerCase() === "female") && females.length > 0) {
      const extraFemale = females.find((f) => !used.has(f.id));
      if (extraFemale) group.push(extraFemale);
    }

    group.forEach((u) => used.add(u.id));
    groups.push(group);
  }

  // 💾 Save groups in the DB
  for (const group of groups) {
    await prisma.matchGroup.create({
      data: {
        eventId,
        members: group.map((u) => u.id),
      },
    });
  }

  return groups;
}
