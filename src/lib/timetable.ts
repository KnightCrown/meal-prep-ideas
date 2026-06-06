import { MealCategory, getStarredForCategory } from "./mealUtils";

export type TimetableSlot = string | null;
export type TimetableRow = TimetableSlot[];
export type Timetable = Record<MealCategory, TimetableRow>;

const WEEKDAY_COUNT = 5;

function createSeededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  return () => {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickLeastUsed(items: string[], counts: Map<string, number>, random: () => number): string {
  let minCount = Infinity;
  for (const item of items) {
    minCount = Math.min(minCount, counts.get(item) ?? 0);
  }

  const candidates = items.filter((item) => (counts.get(item) ?? 0) === minCount);
  return candidates[Math.floor(random() * candidates.length)];
}

function buildBalancedAssignments(items: string[], random: () => number): string[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item, 0);
  }

  const assignments: string[] = [];

  for (const item of items) {
    if (assignments.length >= WEEKDAY_COUNT) break;
    assignments.push(item);
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  while (assignments.length < WEEKDAY_COUNT) {
    const chosen = pickLeastUsed(items, counts, random);
    assignments.push(chosen);
    counts.set(chosen, (counts.get(chosen) ?? 0) + 1);
  }

  return shuffle(assignments, random);
}

function assignCategoryToWeekdays(
  starredIds: string[],
  category: MealCategory
): TimetableRow {
  const categoryStarred = getStarredForCategory(starredIds, category);
  const items = categoryStarred.slice(0, WEEKDAY_COUNT);
  const weekend: TimetableSlot[] = [null, null];

  if (items.length === 0) {
    return [...Array(WEEKDAY_COUNT).fill(null), ...weekend];
  }

  const random = createSeededRandom(`${category}:${items.join("|")}`);
  const weekdays = buildBalancedAssignments(items, random);

  return [...weekdays, ...weekend];
}

export function buildTimetable(starredIds: string[]): Timetable {
  return {
    breakfast: assignCategoryToWeekdays(starredIds, "breakfast"),
    lunch: assignCategoryToWeekdays(starredIds, "lunch"),
    dinner: assignCategoryToWeekdays(starredIds, "dinner"),
    snacks: assignCategoryToWeekdays(starredIds, "snacks"),
  };
}

export function emptyTimetable(): Timetable {
  const emptyRow: TimetableRow = Array(7).fill(null);
  return {
    breakfast: [...emptyRow],
    lunch: [...emptyRow],
    dinner: [...emptyRow],
    snacks: [...emptyRow],
  };
}
