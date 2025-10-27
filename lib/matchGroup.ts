import { prisma } from "@/lib/prisma";

export type MatchUser = {
  id: string;
  name: string;
  email: string;
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

export async function formEventGroups(eventId: string) {
  const participants = await prisma.eventParticipant.findMany({
    where: { eventId },
    include: { user: true },
  });

  const users: MatchUser[] = participants.map((p) => p.user as MatchUser);
  const groups: MatchUser[][] = [];
  const used = new Set<string>();

  for (let i = 0; i < users.length; i++) {
    if (used.has(users[i].id)) continue;
    const seed = users[i];

    const candidates = users
      .filter((u) => u.id !== seed.id && !used.has(u.id))
      .map((u) => ({
        ...u,
        score: computeScore(seed, u),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // 3–4 members total per group

    const group = [seed, ...candidates];
    group.forEach((u) => used.add(u.id));
    groups.push(group);
  }

  return groups;
}
