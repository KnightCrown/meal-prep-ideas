"use client";

import { useMemo, useState } from "react";
import { mealPlan, Meal } from "@/data/mealPlan";
import { useStarredMeals } from "@/hooks/useStarredMeals";
import {
  CATEGORY_LABELS,
  getMealId,
  MEAL_CATEGORIES,
  MealCategory,
  parseMealId,
  WEEKDAYS,
} from "@/lib/mealUtils";
import { buildTimetable, emptyTimetable } from "@/lib/timetable";

type ViewType = "timetable" | "meals";
type FilterType = "All" | "Breakfast" | "Lunch" | "Dinner" | "Snacks";

const TIMETABLE_DAY_GRID = "grid grid-cols-7 gap-3";
const TIMETABLE_CELL_HEIGHT = "h-[148px]";
const TIMETABLE_LABEL_WIDTH = "w-[100px]";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className={`w-5 h-5 ${filled ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}`}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

export default function Home() {
  const [view, setView] = useState<ViewType>("timetable");
  const [filter, setFilter] = useState<FilterType>("All");
  const { starred, toggleStar, isStarred, loaded } = useStarredMeals();

  const filters: FilterType[] = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
  const views: { id: ViewType; label: string }[] = [
    { id: "timetable", label: "Timetable" },
    { id: "meals", label: "Meals" },
  ];

  const timetable = useMemo(
    () => (loaded ? buildTimetable(starred) : emptyTimetable()),
    [starred, loaded]
  );

  const maxRows = Math.max(
    mealPlan.breakfast.length,
    mealPlan.lunch.length,
    mealPlan.dinner.length,
    mealPlan.snacks.length
  );

  const pillButtonClass = (active: boolean) =>
    `px-6 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
        : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
    }`;

  const renderMealCard = (
    meal: Meal,
    category: MealCategory,
    variant: "default" | "timetable" = "default"
  ) => {
    const mealId = getMealId(category, meal);
    const starred = isStarred(mealId);
    const isTimetable = variant === "timetable";

    if (isTimetable) {
      return (
        <div
          className={`${TIMETABLE_CELL_HEIGHT} w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow flex flex-col p-3.5 overflow-hidden`}
        >
          <div className="flex items-start justify-between gap-2 mb-2 flex-shrink-0">
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 leading-snug truncate">
                {meal.name}
              </h3>
              <div className="inline-block mt-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium whitespace-nowrap px-2.5 py-0.5 text-xs leading-none">
                {meal.calories} cal
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleStar(mealId)}
              className="flex-shrink-0 p-0.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label={starred ? "Remove from timetable" : "Add to timetable"}
              aria-pressed={starred}
            >
              <StarIcon filled={starred} />
            </button>
          </div>

          {meal.items && meal.items.length > 0 && (
            <ul className="flex-1 min-h-0 overflow-y-auto space-y-1">
              {meal.items.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs leading-snug text-zinc-600 dark:text-zinc-400 flex items-start"
                >
                  <span className="mr-1.5 mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col p-6">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1 leading-tight">
              {meal.name}
            </h3>
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-semibold text-sm whitespace-nowrap">
              {meal.calories} cal
            </div>
          </div>
          <button
            type="button"
            onClick={() => toggleStar(mealId)}
            className="flex-shrink-0 p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label={starred ? "Remove from timetable" : "Add to timetable"}
            aria-pressed={starred}
          >
            <StarIcon filled={starred} />
          </button>
        </div>

        {meal.items && meal.items.length > 0 && (
          <ul className="mt-auto space-y-2">
            {meal.items.map((item, idx) => (
              <li
                key={idx}
                className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start"
              >
                <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderCell = (meal?: Meal, category?: MealCategory) => {
    if (!meal || !category) {
      return (
        <div className="p-4 rounded-xl border border-transparent bg-zinc-50 dark:bg-zinc-900/50 h-full min-h-[80px]" />
      );
    }

    return renderMealCard(meal, category);
  };

  const renderTimetableCell = (mealId: string | null) => {
    if (!mealId) {
      return (
        <div
          className={`${TIMETABLE_CELL_HEIGHT} w-full rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50`}
        />
      );
    }

    const parsed = parseMealId(mealId);
    if (!parsed) {
      return (
        <div
          className={`${TIMETABLE_CELL_HEIGHT} w-full rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50`}
        />
      );
    }

    return renderMealCard(parsed.meal, parsed.category, "timetable");
  };

  const renderTimetableGrid = () => (
    <div className="min-w-[1720px]">
      <div className="flex gap-3">
        <div className={`${TIMETABLE_LABEL_WIDTH} flex-shrink-0`}>
          <div className="h-7 mb-3" />
          <div className="flex flex-col gap-3">
            {MEAL_CATEGORIES.map((category) => (
              <div
                key={category}
                className={`${TIMETABLE_CELL_HEIGHT} flex items-center font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide pr-2`}
              >
                {CATEGORY_LABELS[category]}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className={`${TIMETABLE_DAY_GRID} mb-3`}>
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {MEAL_CATEGORIES.map((category) => (
              <div key={category} className={TIMETABLE_DAY_GRID}>
                {timetable[category].map((mealId, dayIndex) => (
                  <div key={`${category}-${dayIndex}`}>
                    {renderTimetableCell(mealId)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 sm:p-8 font-sans">
      <div className={`mx-auto ${view === "timetable" ? "max-w-[1780px]" : "max-w-7xl"}`}>
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
            Meal Prep Plan
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Daily Target: {mealPlan.calorie_target_per_day} Calories
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={pillButtonClass(view === v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>

        {view === "meals" && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={pillButtonClass(filter === f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <div className="w-full overflow-x-auto pb-8">
          {view === "timetable" ? (
            renderTimetableGrid()
          ) : filter === "All" ? (
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {["Breakfast", "Lunch", "Dinner", "Snacks"].map((header) => (
                  <div
                    key={header}
                    className="text-center font-bold text-lg text-zinc-800 dark:text-zinc-200 uppercase tracking-wider"
                  >
                    {header}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {Array.from({ length: maxRows }).map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-4 gap-4">
                    {renderCell(mealPlan.breakfast[rowIndex], "breakfast")}
                    {renderCell(mealPlan.lunch[rowIndex], "lunch")}
                    {renderCell(mealPlan.dinner[rowIndex], "dinner")}
                    {renderCell(mealPlan.snacks[rowIndex], "snacks")}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mealPlan[
                filter.toLowerCase() as keyof Omit<
                  typeof mealPlan,
                  "calorie_target_per_day"
                >
              ].map((meal) => (
                <div key={getMealId(filter.toLowerCase() as MealCategory, meal)}>
                  {renderMealCard(meal, filter.toLowerCase() as MealCategory)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
