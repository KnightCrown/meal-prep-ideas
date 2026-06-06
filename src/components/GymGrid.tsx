"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  buildWeeklyGymSchedule,
  GYM_ROW_LABELS,
  type ExerciseDetail,
  type GymDaySchedule,
  type Workout,
} from "@/data/gymPlan";
import { PRIORITY_EXERCISES } from "@/data/gymPriorityExercises";
import { getOtherExerciseCategories } from "@/data/gymExtraExercises";
import { getExerciseImageSrc } from "@/data/gymExerciseImages";
import { useGymWeek } from "@/hooks/useGymWeek";
import { getExerciseCardSummary, getExerciseLightboxName } from "@/lib/gymExerciseDisplay";
import {
  getTodayWeekdayIndex,
  WEEKDAYS,
  WEEKDAY_SHORT,
} from "@/lib/mealUtils";

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
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
  );
}

function ExerciseListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-base text-zinc-600 dark:text-zinc-400 flex items-start">
      <span className="mr-2 mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function PriorityExercisesModal({ onClose }: { onClose: () => void }) {
  const otherCategories = useMemo(() => getOtherExerciseCategories(), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="priority-exercises-title"
    >
      <div
        className="relative flex w-full max-w-md max-h-[90vh] flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton onClose={onClose} />

        <div className="flex-shrink-0 px-8 pt-8 pb-4">
          <h2
            id="priority-exercises-title"
            className="text-xl font-bold text-zinc-900 dark:text-zinc-50 pr-8"
          >
            Exercises
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-3">
            Priority
          </h3>
          <ul className="space-y-2.5">
            {PRIORITY_EXERCISES.map((exercise) => (
              <ExerciseListItem key={exercise}>{exercise}</ExerciseListItem>
            ))}
          </ul>

          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Other
          </h3>
          <div className="space-y-5">
            {otherCategories.map((category) => (
              <div key={category.name}>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-2">
                  {category.name}
                </p>
                <ul className="space-y-2.5">
                  {category.exercises.map((exercise) => (
                    <ExerciseListItem key={exercise.name}>{exercise.name}</ExerciseListItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkoutLightbox({
  workout,
  walkLabel,
  onClose,
}: {
  workout: Workout;
  walkLabel: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="workout-lightbox-title"
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton onClose={onClose} />

        <h2
          id="workout-lightbox-title"
          className={`text-xl font-bold text-zinc-900 dark:text-zinc-50 pr-8 ${
            walkLabel ? "mb-1" : "mb-6"
          }`}
        >
          {workout.title}
        </h2>
        {walkLabel && (
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-6">
            {walkLabel}
          </p>
        )}

        <div className="space-y-8">
          {workout.exercises.map((exercise) => {
            const imageSrc = getExerciseImageSrc(exercise.name);

            return (
              <div
                key={exercise.name}
                className="space-y-3 pb-8 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 last:pb-0"
              >
                {imageSrc && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                    <Image
                      src={imageSrc}
                      alt={exercise.name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 512px) 100vw, 512px"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {getExerciseLightboxName(exercise.name)}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{exercise.setsLabel}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{exercise.repsLabel}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Rest: {exercise.restLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Focus: {workout.focus.join(", ")}
        </p>
      </div>
    </div>
  );
}

const DAY_GRID = "grid grid-cols-7 gap-3 items-stretch";
const LABEL_WIDTH = "w-[100px]";

const cardShell =
  "w-full h-full min-h-0 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm flex flex-col p-3.5";
const activityHeading =
  "text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight";
const listText = "text-[13px] leading-[1.35] text-zinc-600 dark:text-zinc-400";
const focusListText = "text-[13px] leading-[1.35] text-zinc-700 dark:text-zinc-300";
const mobileSectionLabel =
  "font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 text-center";
const cardPatternBand =
  "h-3 w-full shrink-0 bg-[repeating-linear-gradient(135deg,rgba(99,102,241,0.18)_0,rgba(99,102,241,0.18)_1px,transparent_1px,transparent_7px)] dark:bg-[repeating-linear-gradient(135deg,rgba(129,140,248,0.22)_0,rgba(129,140,248,0.22)_1px,transparent_1px,transparent_7px)]";

function GymCardFrame({
  children,
  mobile = false,
  interactive = false,
  onClick,
  onKeyDown,
  className = "",
}: {
  children: React.ReactNode;
  mobile?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: ReactKeyboardEvent) => void;
  className?: string;
}) {
  const interactiveClass = interactive
    ? "cursor-pointer hover:shadow-md transition-shadow"
    : "";
  const interactiveProps = interactive
    ? { role: "button" as const, tabIndex: 0, onClick, onKeyDown }
    : {};

  if (mobile) {
    return (
      <div
        className={`relative overflow-hidden w-full min-h-[168px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm flex flex-col ${interactiveClass} ${className}`}
        {...interactiveProps}
      >
        <div className={cardPatternBand} aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center justify-center px-5 py-6 text-center">
          {children}
        </div>
        <div className={cardPatternBand} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`${cardShell} ${interactiveClass} ${className}`}
      {...interactiveProps}
    >
      {children}
    </div>
  );
}

function GymExerciseList({
  exercises,
  centered = false,
}: {
  exercises: ExerciseDetail[];
  centered?: boolean;
}) {
  return (
    <ul className={`flex flex-col gap-y-1.5 ${centered ? "items-center" : ""}`}>
      {exercises.map((exercise) => (
        <li
          key={exercise.name}
          className={`${listText} flex gap-2 ${centered ? "justify-center text-center" : ""}`}
        >
          <span
            className="mt-[0.45em] h-1 w-1 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="text-zinc-800 dark:text-zinc-200">{exercise.name}</span>
            {" — "}
            <span>{getExerciseCardSummary(exercise)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function CenteredFocusCell({
  items,
  mobile = false,
}: {
  items: string[];
  mobile?: boolean;
}) {
  const content = (
    <div className={`flex flex-col gap-1 ${mobile ? "" : "items-center justify-center text-center"}`}>
      {items.map((item) => (
        <p key={item} className={`${focusListText} font-medium`}>
          {item}
        </p>
      ))}
    </div>
  );

  if (mobile) {
    return <GymCardFrame mobile>{content}</GymCardFrame>;
  }

  return (
    <div className={`${cardShell} items-center justify-center text-center`}>{content}</div>
  );
}

function StrengthWorkoutCell({
  workout,
  walkLabel,
  onOpen,
  mobile = false,
}: {
  workout: Workout;
  walkLabel: string;
  onOpen: (workout: Workout) => void;
  mobile?: boolean;
}) {
  const content = (
    <>
      <div
        className={`space-y-1 ${
          mobile
            ? "mb-4 w-full border-b border-zinc-100 pb-4 dark:border-zinc-800"
            : "mb-2 border-b border-zinc-100 pb-2 dark:border-zinc-800"
        }`}
      >
        <h3 className={activityHeading}>{walkLabel}</h3>
        <h3 className={activityHeading}>{workout.title}</h3>
      </div>
      <GymExerciseList exercises={workout.exercises} centered={mobile} />
    </>
  );

  return (
    <GymCardFrame
      mobile={mobile}
      interactive
      onClick={() => onOpen(workout)}
      onKeyDown={(event: ReactKeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(workout);
        }
      }}
    >
      {content}
    </GymCardFrame>
  );
}

function HiitWorkoutCell({
  walkLabel,
  mobile = false,
}: {
  walkLabel: string;
  mobile?: boolean;
}) {
  const content = (
    <div className="space-y-1">
      <h3 className={activityHeading}>{walkLabel}</h3>
      <h3 className={activityHeading}>HIIT</h3>
    </div>
  );

  if (mobile) {
    return <GymCardFrame mobile>{content}</GymCardFrame>;
  }

  return (
    <div className={`${cardShell} items-center justify-center text-center`}>{content}</div>
  );
}

function SimpleActivityCell({
  label,
  mobile = false,
}: {
  label: string;
  mobile?: boolean;
}) {
  const content = <p className={`${activityHeading} text-base`}>{label}</p>;

  if (mobile) {
    return <GymCardFrame mobile>{content}</GymCardFrame>;
  }

  return (
    <div className={`${cardShell} items-center justify-center text-center`}>{content}</div>
  );
}

function GymWorkoutCell({
  day,
  onOpenWorkout,
  mobile = false,
}: {
  day: GymDaySchedule;
  onOpenWorkout: (workout: Workout) => void;
  mobile?: boolean;
}) {
  if (day.type === "strength" && day.strengthWorkout && day.workoutWalkLabel) {
    return (
      <StrengthWorkoutCell
        workout={day.strengthWorkout}
        walkLabel={day.workoutWalkLabel}
        onOpen={onOpenWorkout}
        mobile={mobile}
      />
    );
  }
  if (day.type === "hiit" && day.workoutWalkLabel) {
    return <HiitWorkoutCell walkLabel={day.workoutWalkLabel} mobile={mobile} />;
  }
  return <SimpleActivityCell label="Rest" mobile={mobile} />;
}

function GymFocusCell({
  day,
  mobile = false,
}: {
  day: GymDaySchedule;
  mobile?: boolean;
}) {
  if (day.type === "strength" && day.strengthWorkout) {
    return <CenteredFocusCell items={day.strengthWorkout.focus} mobile={mobile} />;
  }
  if (day.type === "hiit" && day.focusLabel) {
    return <CenteredFocusCell items={[day.focusLabel]} mobile={mobile} />;
  }
  if (day.type === "rest") {
    return <CenteredFocusCell items={["Rest"]} mobile={mobile} />;
  }
  return null;
}

export default function GymGrid() {
  const { week, loaded } = useGymWeek();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [showPriorityExercises, setShowPriorityExercises] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<{
    workout: Workout;
    walkLabel: string | null;
  } | null>(null);
  const todayIndex = getTodayWeekdayIndex();

  const schedule = useMemo(
    () => buildWeeklyGymSchedule(loaded ? week : 1),
    [week, loaded]
  );

  useLayoutEffect(() => {
    setSelectedDayIndex(getTodayWeekdayIndex());
  }, []);

  const pillButtonClass = (active: boolean) =>
    `flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
        : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
    }`;

  const selectedDay = schedule[selectedDayIndex];

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-6">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          Week {week} of 3
        </p>
        <button
          type="button"
          onClick={() => setShowPriorityExercises(true)}
          className="p-1 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
          aria-label="View priority exercises"
        >
          <InfoIcon />
        </button>
      </div>

      {showPriorityExercises && (
        <PriorityExercisesModal onClose={() => setShowPriorityExercises(false)} />
      )}

      {selectedWorkout && (
        <WorkoutLightbox
          workout={selectedWorkout.workout}
          walkLabel={selectedWorkout.walkLabel}
          onClose={() => setSelectedWorkout(null)}
        />
      )}

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
                className={`${pillButtonClass(isSelected)} ${
                  isToday && !isSelected
                    ? "ring-2 ring-indigo-400/60 ring-offset-1 dark:ring-offset-black"
                    : ""
                }`}
              >
                {WEEKDAY_SHORT[day]}
              </button>
            );
          })}
        </div>

        <p className="text-center text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-6">
          {WEEKDAYS[selectedDayIndex]}
        </p>

        {selectedDay && (
          <div className="space-y-6">
            <div>
              <h3 className={mobileSectionLabel}>Workout</h3>
              <GymWorkoutCell
                day={selectedDay}
                mobile
                onOpenWorkout={(workout) =>
                  setSelectedWorkout({
                    workout,
                    walkLabel: selectedDay.workoutWalkLabel,
                  })
                }
              />
            </div>
            <div>
              <h3 className={mobileSectionLabel}>Focus</h3>
              <GymFocusCell day={selectedDay} mobile />
            </div>
          </div>
        )}
      </div>

      <div className="hidden lg:block min-w-[1720px]">
        <div className="flex gap-3 mb-3">
          <div className={LABEL_WIDTH} />
          <div className={`flex-1 min-w-0 ${DAY_GRID}`}>
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-stretch">
            <div
              className={`${LABEL_WIDTH} flex-shrink-0 flex items-center font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide`}
            >
              {GYM_ROW_LABELS[0]}
            </div>
            <div className={`flex-1 min-w-0 ${DAY_GRID}`}>
              {schedule.map((day, dayIndex) => (
                <GymWorkoutCell
                  key={`workout-${dayIndex}`}
                  day={day}
                  onOpenWorkout={(workout) =>
                    setSelectedWorkout({
                      workout,
                      walkLabel: day.workoutWalkLabel,
                    })
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 items-stretch">
            <div
              className={`${LABEL_WIDTH} flex-shrink-0 flex items-center font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide`}
            >
              {GYM_ROW_LABELS[1]}
            </div>
            <div className={`flex-1 min-w-0 ${DAY_GRID}`}>
              {schedule.map((day, dayIndex) => (
                <GymFocusCell key={`focus-${dayIndex}`} day={day} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
