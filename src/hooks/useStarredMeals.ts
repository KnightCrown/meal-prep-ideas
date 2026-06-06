"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "meal-prep-starred";

export function useStarredMeals() {
  const [starred, setStarred] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setStarred(parsed.filter((id): id is string => typeof id === "string"));
        }
      }
    } catch {
      // Ignore invalid stored data
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starred));
  }, [starred, loaded]);

  const toggleStar = useCallback((id: string) => {
    setStarred((prev) => {
      if (prev.includes(id)) {
        return prev.filter((mealId) => mealId !== id);
      }
      return [...prev, id];
    });
  }, []);

  const isStarred = useCallback(
    (id: string) => starred.includes(id),
    [starred]
  );

  return { starred, toggleStar, isStarred, loaded };
}
