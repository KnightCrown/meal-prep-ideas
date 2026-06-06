"use client";

import { useEffect, useLayoutEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { mealPlan, Meal } from "@/data/mealPlan";
import { useStarredMeals } from "@/hooks/useStarredMeals";
import {
  CATEGORY_LABELS,
  getMealId,
  MEAL_CATEGORIES,
  MealCategory,
  parseMealId,
  WEEKDAYS,
  WEEKDAY_SHORT,
  getTodayWeekdayIndex,
} from "@/lib/mealUtils";
import { buildTimetable, emptyTimetable } from "@/lib/timetable";
import GymGrid from "@/components/GymGrid";

type ViewType = "timetable" | "meals" | "gym";
type FilterType = "All" | "Breakfast" | "Lunch" | "Dinner" | "Snacks";
type SelectedMeal = { meal: Meal; category: MealCategory };

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
  const [selectedMeal, setSelectedMeal] = useState<SelectedMeal | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const { starred, toggleStar, isStarred, loaded } = useStarredMeals();

  const filters: FilterType[] = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
  const views: { id: ViewType; label: string }[] = [
    { id: "timetable", label: "Timetable" },
    { id: "meals", label: "Meals" },
    { id: "gym", label: "Gym" },
  ];

  const timetable = useMemo(
    () => (loaded ? buildTimetable(starred) : emptyTimetable()),
    [starred, loaded]
  );

  useLayoutEffect(() => {
    setSelectedDayIndex(getTodayWeekdayIndex());
  }, []);

  useEffect(() => {
    if (!selectedMeal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMeal(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedMeal]);

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

  const openLightbox = (meal: Meal, category: MealCategory) => {
    setSelectedMeal({ meal, category });
  };

  const renderStarButton = (mealId: string, starred: boolean, className = "p-1") => (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        toggleStar(mealId);
      }}
      className={`flex-shrink-0 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${className}`}
      aria-label={starred ? "Remove from timetable" : "Add to timetable"}
      aria-pressed={starred}
    >
      <StarIcon filled={starred} />
    </button>
  );

  const renderMealCard = (
    meal: Meal,
    category: MealCategory,
    variant: "default" | "timetable" | "timetable-mobile" = "default"
  ) => {
    const mealId = getMealId(category, meal);
    const starred = isStarred(mealId);
    const isTimetable = variant === "timetable";
    const isMobileDay = variant === "timetable-mobile";

    const cardInteractionProps = {
      role: "button" as const,
      tabIndex: 0,
      onClick: () => openLightbox(meal, category),
      onKeyDown: (event: ReactKeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(meal, category);
        }
      },
    };

    if (isTimetable || isMobileDay) {
      return (
        <div
          {...cardInteractionProps}
          className={`w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer ${
            isMobileDay
              ? "p-4 min-h-[120px] h-auto"
              : `${TIMETABLE_CELL_HEIGHT} p-3.5 overflow-hidden`
          }`}
        >
          <div className={`flex items-start justify-between gap-2 flex-shrink-0 ${isMobileDay ? "mb-3" : "mb-2"}`}>
            <div className="min-w-0 flex-1">
              <h3
                className={`font-bold text-zinc-900 dark:text-zinc-50 leading-snug ${
                  isMobileDay ? "text-lg mb-1" : "text-base truncate"
                }`}
              >
                {meal.name}
              </h3>
              <div
                className={`inline-block rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium whitespace-nowrap px-2.5 py-0.5 leading-none ${
                  isMobileDay ? "text-sm" : "text-xs mt-1"
                }`}
              >
                {meal.calories} cal
              </div>
            </div>
            {renderStarButton(mealId, starred, "p-0.5")}
          </div>

          {meal.items && meal.items.length > 0 && (
            <ul className={`space-y-1.5 ${isMobileDay ? "" : "flex-1 min-h-0 overflow-y-auto"}`}>
              {meal.items.map((item, idx) => (
                <li
                  key={idx}
                  className={`leading-snug text-zinc-600 dark:text-zinc-400 flex items-start ${
                    isMobileDay ? "text-sm" : "text-xs"
                  }`}
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
      <div
        {...cardInteractionProps}
        className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col p-6 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1 leading-tight">
              {meal.name}
            </h3>
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-semibold text-sm whitespace-nowrap">
              {meal.calories} cal
            </div>
          </div>
          {renderStarButton(mealId, starred)}
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

  const renderMealLightbox = () => {
    if (!selectedMeal) return null;

    const { meal, category } = selectedMeal;
    const mealId = getMealId(category, meal);
    const starred = isStarred(mealId);

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={() => setSelectedMeal(null)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="meal-lightbox-title"
      >
        <div
          className="relative w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setSelectedMeal(null)}
            className="absolute top-4 right-4 p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start justify-between gap-3 mb-5 pr-8">
            <div className="min-w-0 flex-1">
              <h2
                id="meal-lightbox-title"
                className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 leading-tight"
              >
                {meal.name}
              </h2>
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-semibold text-base whitespace-nowrap">
                {meal.calories} cal
              </div>
            </div>
            {renderStarButton(mealId, starred)}
          </div>

          {meal.items && meal.items.length > 0 && (
            <ul className="space-y-2.5">
              {meal.items.map((item, idx) => (
                <li
                  key={idx}
                  className="text-base text-zinc-600 dark:text-zinc-400 flex items-start"
                >
                  <span className="mr-2 mt-2 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
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

  const renderTimetableCell = (
    mealId: string | null,
    variant: "timetable" | "timetable-mobile" = "timetable"
  ) => {
    const emptyClass =
      variant === "timetable-mobile"
        ? "min-h-[120px] h-auto"
        : TIMETABLE_CELL_HEIGHT;

    if (!mealId) {
      return (
        <div
          className={`${emptyClass} w-full rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50`}
        />
      );
    }

    const parsed = parseMealId(mealId);
    if (!parsed) {
      return (
        <div
          className={`${emptyClass} w-full rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50`}
        />
      );
    }

    return renderMealCard(parsed.meal, parsed.category, variant);
  };

  const todayIndex = getTodayWeekdayIndex();

  const renderMobileTimetable = () => (
    <div className="lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {WEEKDAYS.map((day, index) => {
          const isSelected = selectedDayIndex === index;
          const isToday = todayIndex === index;

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDayIndex(index)}
              aria-label={day}
              aria-pressed={isSelected}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
              } ${isToday && !isSelected ? "ring-2 ring-amber-400/60 ring-offset-1 dark:ring-offset-black" : ""}`}
            >
              {WEEKDAY_SHORT[day]}
            </button>
          );
        })}
      </div>

      <p className="text-center text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-6">
        {WEEKDAYS[selectedDayIndex]}
      </p>

      <div className="space-y-6">
        {MEAL_CATEGORIES.map((category) => (
          <div key={category}>
            <h3 className="font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              {CATEGORY_LABELS[category]}
            </h3>
            {renderTimetableCell(
              timetable[category][selectedDayIndex],
              "timetable-mobile"
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDesktopTimetable = () => (
    <div className="hidden lg:block min-w-[1720px]">
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

  const renderTimetableGrid = () => (
    <>
      {renderMobileTimetable()}
      {renderDesktopTimetable()}
    </>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 sm:p-8 font-sans">
      <div
        className={`mx-auto ${
          view === "timetable" || view === "gym"
            ? "max-w-7xl lg:max-w-[1780px]"
            : "max-w-7xl"
        }`}
      >
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
            Meal Prep Plan
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            {view === "gym"
              ? "Weekly gym schedule"
              : `Daily Target: ${mealPlan.calorie_target_per_day} Calories`}
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

        <div
          className={`w-full pb-8 ${
            view === "timetable" || view === "gym" ? "lg:overflow-x-auto" : "overflow-x-auto"
          }`}
        >
          {view === "timetable" ? (
            renderTimetableGrid()
          ) : view === "gym" ? (
            <GymGrid />
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
      {renderMealLightbox()}
    </div>
  );
}
