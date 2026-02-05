"use client";

import type { UserStats } from "../hooks/useUserStats";
import type { ArticleSection, ArticleTag } from "../data/articles";

export function getPersonalizedContent(
  content: ArticleSection[],
  stats: UserStats | null
): ArticleSection[] {
  if (!stats) return content;
  return content.map((section) => ({
    ...section,
    body: section.body.map((text) => replacePlaceholders(text, stats)),
    list: section.list?.map((block) => ({
      ...block,
      items: block.items.map((text) => replacePlaceholders(text, stats)),
    })),
  }));
}

const PLACEHOLDERS: Record<string, (s: UserStats) => string | number> = {
  "{{weeklyCalories}}": (s) => s.weeklyCalories,
  "{{totalCalories}}": (s) => s.totalCalories,
  "{{sessionsCount}}": (s) => s.sessionsThisWeek,
  "{{sessionsTotal}}": (s) => s.totalSessions,
  "{{userName}}": (s) => s.userName,
  "{{level}}": (s) => s.level,
  "{{daysActive}}": (s) => s.daysActiveThisWeek,
  "{{regularityScore}}": (s) => s.regularityScore,
};

export function replacePlaceholders(text: string, stats: UserStats | null): string {
  if (!stats) return text;
  let out = text;
  for (const [key, fn] of Object.entries(PLACEHOLDERS)) {
    out = out.replace(new RegExp(key.replace(/[{}]/g, "\\$&"), "g"), String(fn(stats)));
  }
  return out;
}

export function getPersonalizedTip(stats: UserStats | null): string {
  if (!stats) {
    return "Connecte-toi pour recevoir des conseils adaptés à ton rythme.";
  }

  const { weeklyCalories, sessionsThisWeek, trend, regularityScore } = stats;

  if (sessionsThisWeek === 0 && stats.totalSessions === 0) {
    return "Une première séance cette semaine. Un pas, puis un autre.";
  }

  if (sessionsThisWeek === 0) {
    return "Une courte séance cette semaine peut faire la différence. À ton rythme.";
  }

  if (weeklyCalories < 500 && sessionsThisWeek < 2) {
    return "Une séance de plus cette semaine, si tu le sens. Chaque mouvement compte.";
  }

  if (weeklyCalories >= 1500 || sessionsThisWeek >= 4) {
    return "Belle régularité. Pense à récupérer et à t'hydrater.";
  }

  if (trend === "up") {
    return "Tu avances. Pense à l'hydratation.";
  }

  if (trend === "down" && regularityScore < 50) {
    return "Les hauts et les bas font partie du chemin. Reprends quand tu es prêt.";
  }

  if (regularityScore >= 70) {
    return "Tu ancres l'habitude. Varier les séances peut nourrir la constance.";
  }

  return "Chaque séance est une trace. Pas une obligation.";
}

export function getTrendLabel(trend: "up" | "down" | "stable"): string {
  switch (trend) {
    case "up":
      return "En hausse";
    case "down":
      return "En baisse";
    default:
      return "Stable";
  }
}

export function getAdaptedCta(
  articleCta: string,
  articleCtaHref: string,
  stats: UserStats | null
): { label: string; href: string } {
  if (!stats) return { label: "Voir", href: articleCtaHref };
  if (stats.sessionsThisWeek === 0 && articleCtaHref === "/fitness/sessions") {
    return { label: "Planifier une séance", href: "/fitness/sessions" };
  }
  if (stats.regularityScore < 50 && articleCtaHref === "/fitness") {
    return { label: "Consulter mes statistiques", href: "/fitness" };
  }
  return { label: "Voir", href: articleCtaHref };
}

export function sortArticlesByRelevance<T extends { id: string; tag: ArticleTag }>(
  articles: T[],
  stats: UserStats | null
): T[] {
  if (!stats) return [...articles];
  const primary = stats.primaryGoal ?? "";
  const lowRegularity = stats.regularityScore < 50;

  return [...articles].sort((a, b) => {
    const aNutri = a.tag === "nutrition" ? 1 : 0;
    const bNutri = b.tag === "nutrition" ? 1 : 0;
    if (primary.includes("perdre") || primary.includes("poids")) {
      if (aNutri !== bNutri) return bNutri - aNutri;
    }
    if (lowRegularity) {
      if (a.tag === "motivation" && b.tag !== "motivation") return -1;
      if (b.tag === "motivation" && a.tag !== "motivation") return 1;
    }
    return 0;
  });
}
