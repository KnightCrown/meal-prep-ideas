"use client";

import { useState } from "react";
import { mealPlan, Meal } from "@/data/mealPlan";

type FilterType = "All" | "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export default function Home() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filters: FilterType[] = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

  // Find the maximum number of rows needed for the "All" view
  const maxRows = Math.max(
    mealPlan.breakfast.length,
    mealPlan.lunch.length,
    mealPlan.dinner.length,
    mealPlan.snacks.length
  );

  const renderCell = (meal?: Meal) => {
    if (!meal) {
      return <div className="p-4 rounded-xl border border-transparent bg-zinc-50 dark:bg-zinc-900/50 h-full"></div>;
    }

    return (
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1 leading-tight">
            {meal.name}
          </h3>
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-semibold text-sm">
            {meal.calories} cal
          </div>
        </div>
        
        {meal.items && meal.items.length > 0 && (
          <ul className="mt-auto space-y-2">
            {meal.items.map((item, idx) => (
              <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start">
                <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
            Meal Prep Plan
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Daily Target: {mealPlan.calorie_target_per_day} Calories
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table Layout */}
        <div className="w-full overflow-x-auto pb-8">
          {filter === "All" ? (
            <div className="min-w-[1000px]">
              {/* Headers */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {["Breakfast", "Lunch", "Dinner", "Snacks"].map((header) => (
                  <div key={header} className="text-center font-bold text-lg text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                    {header}
                  </div>
                ))}
              </div>
              
              {/* Rows */}
              <div className="flex flex-col gap-4">
                {Array.from({ length: maxRows }).map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-4 gap-4">
                    {renderCell(mealPlan.breakfast[rowIndex])}
                    {renderCell(mealPlan.lunch[rowIndex])}
                    {renderCell(mealPlan.dinner[rowIndex])}
                    {renderCell(mealPlan.snacks[rowIndex])}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Single Category Layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mealPlan[filter.toLowerCase() as keyof Omit<typeof mealPlan, "calorie_target_per_day">].map((meal, idx) => (
                <div key={idx}>
                  {renderCell(meal)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
