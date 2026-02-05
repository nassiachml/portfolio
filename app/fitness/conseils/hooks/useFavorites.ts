"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fitness-conseils-favorites";

function loadFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(loadFavorites());
  }, []);

  const toggle = useCallback((articleId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId];
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (articleId: string) => favoriteIds.includes(articleId),
    [favoriteIds]
  );

  return { favoriteIds, toggle, isFavorite };
}
