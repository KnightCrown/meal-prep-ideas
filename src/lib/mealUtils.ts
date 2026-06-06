import { mealPlan, Meal } from "@/data/mealPlan";

export type MealCategory = "breakfast" | "lunch" | "dinner" | "snacks";

export const MEAL_CATEGORIES: MealCategory[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
];

export const CATEGORY_LABELS: Record<MealCategory, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snacks: "Snacks",
};

export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

/** Monday = 0 … Sunday = 6 */
export function getTodayWeekdayIndex(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export const WEEKDAY_SHORT: Record<Weekday, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

export function getMealId(category: MealCategory, meal: Meal): string {
  return `${category}:${meal.name}`;
}

export function parseMealId(id: string): { category: MealCategory; meal: Meal } | null {
  const colonIndex = id.indexOf(":");
  if (colonIndex === -1) return null;

  const category = id.slice(0, colonIndex) as MealCategory;
  const name = id.slice(colonIndex + 1);

  if (!MEAL_CATEGORIES.includes(category)) return null;

  const meal = mealPlan[category].find((m) => m.name === name);
  if (!meal) return null;

  return { category, meal };
}

export function getStarredForCategory(
  starredIds: string[],
  category: MealCategory
): string[] {
  return starredIds.filter((id) => id.startsWith(`${category}:`));
}
