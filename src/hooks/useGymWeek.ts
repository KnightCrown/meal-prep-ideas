"use client";

import { useEffect, useState } from "react";
import type { GymWeek } from "@/data/gymPlan";

const STORAGE_KEY = "gym-week";

interface StoredGymWeek {
  week: GymWeek;
  anchorMonday: number;
}

function advanceWeek(week: GymWeek): GymWeek {
  return week === 3 ? 1 : ((week + 1) as GymWeek);
}

function getMondayMidnight(date: Date): Date {
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  const day = monday.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;
  monday.setDate(monday.getDate() - daysFromMonday);
  return monday;
}

function getNextMondayMidnight(fromMonday: Date): Date {
  const next = new Date(fromMonday);
  next.setDate(next.getDate() + 7);
  return next;
}

function resolveGymWeek(): StoredGymWeek {
  const now = Date.now();
  let stored: StoredGymWeek | null = null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredGymWeek;
      if (parsed.week >= 1 && parsed.week <= 3 && typeof parsed.anchorMonday === "number") {
        stored = parsed;
      }
    }
  } catch {
    // Ignore invalid stored data
  }

  let week: GymWeek = stored?.week ?? 1;
  let anchorMonday = stored?.anchorMonday ?? getMondayMidnight(new Date()).getTime();

  let nextMonday = getNextMondayMidnight(new Date(anchorMonday));
  while (nextMonday.getTime() <= now) {
    week = advanceWeek(week);
    anchorMonday = nextMonday.getTime();
    nextMonday = getNextMondayMidnight(new Date(anchorMonday));
  }

  const result = { week, anchorMonday };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  return result;
}

export function useGymWeek() {
  const [week, setWeek] = useState<GymWeek>(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { week: currentWeek } = resolveGymWeek();
    setWeek(currentWeek);
    setLoaded(true);

    const interval = setInterval(() => {
      const { week: updatedWeek } = resolveGymWeek();
      setWeek(updatedWeek);
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return { week, loaded };
}
