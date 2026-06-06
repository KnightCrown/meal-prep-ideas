export type WorkoutId = "A" | "B" | "C" | "D" | "E";
export type GymWeek = 1 | 2 | 3;
export type DayActivityType = "strength" | "hiit" | "rest";

export interface ExerciseDetail {
  name: string;
  setsLabel: string;
  repsLabel: string;
  restLabel: string;
}

export interface Workout {
  id: WorkoutId;
  title: string;
  exercises: ExerciseDetail[];
  focus: string[];
}

export interface GymDaySchedule {
  type: DayActivityType;
  strengthWorkout: Workout | null;
  workoutWalkLabel: string | null;
  focusLabel: string | null;
}

function ex(
  name: string,
  setsLabel: string,
  repsLabel: string,
  restLabel: string
): ExerciseDetail {
  return { name, setsLabel, repsLabel, restLabel };
}

const carry = (name: string) =>
  ex(name, "3 rounds", "Walk for 30-60 seconds", "60 seconds");

const plank = () =>
  ex("Plank", "3 rounds", "Hold for 30-60 seconds", "45-60 seconds");

export const WORKOUTS: Record<WorkoutId, Workout> = {
  A: {
    id: "A",
    title: "Workout A (Foundation)",
    exercises: [
      ex("Goblet Squat", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("One-Arm Dumbbell Row", "3 sets", "8-12 reps per arm", "60 seconds"),
      ex("Dumbbell Floor Press", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("Dumbbell Shoulder Press", "3 sets", "8-12 reps", "60-90 seconds"),
      carry("Farmer's Carry"),
      plank(),
    ],
    focus: ["Legs", "Back", "Chest", "Shoulders", "Core"],
  },
  B: {
    id: "B",
    title: "Workout B (Leg & Pull Emphasis)",
    exercises: [
      ex("Romanian Deadlift", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("Reverse Lunge", "3 sets", "8-10 reps per leg", "60-90 seconds"),
      ex("One-Arm Dumbbell Row", "3 sets", "8-12 reps per arm", "60 seconds"),
      ex("Bicep Curl", "3 sets", "8-12 reps", "45-60 seconds"),
      carry("Farmer's Carry"),
      plank(),
    ],
    focus: ["Hamstrings", "Glutes", "Back", "Biceps", "Core"],
  },
  C: {
    id: "C",
    title: "Workout C (Push Emphasis)",
    exercises: [
      ex("Goblet Squat", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("Dumbbell Floor Press", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("Dumbbell Shoulder Press", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("Overhead Tricep Extension", "3 sets", "10-15 reps", "45-60 seconds"),
      carry("Farmer's Carry"),
      plank(),
    ],
    focus: ["Chest", "Shoulders", "Triceps", "Legs", "Core"],
  },
  D: {
    id: "D",
    title: "Workout D (Posterior Chain Focus)",
    exercises: [
      ex("Romanian Deadlift", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("Goblet Squat", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("One-Arm Dumbbell Row", "3 sets", "8-12 reps per arm", "60 seconds"),
      ex("Bicep Curl", "3 sets", "8-12 reps", "45-60 seconds"),
      carry("Farmer's Carry"),
      plank(),
    ],
    focus: ["Back", "Hamstrings", "Glutes", "Biceps", "Core"],
  },
  E: {
    id: "E",
    title: "Workout E (Balanced Full Body)",
    exercises: [
      ex("Reverse Lunge", "3 sets", "8-10 reps per leg", "60-90 seconds"),
      ex("Dumbbell Floor Press", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("One-Arm Dumbbell Row", "3 sets", "8-12 reps per arm", "60 seconds"),
      ex("Dumbbell Shoulder Press", "3 sets", "8-12 reps", "60-90 seconds"),
      ex("Overhead Tricep Extension", "3 sets", "10-15 reps", "45-60 seconds"),
      carry("Farmer's Carry"),
    ],
    focus: ["Full-body balance", "Additional arm work", "Core stability"],
  },
};

export const GYM_STRENGTH_DAY_INDICES = [0, 3, 5] as const;

const ROTATION: Record<GymWeek, [WorkoutId, WorkoutId, WorkoutId]> = {
  1: ["A", "B", "C"],
  2: ["D", "E", "A"],
  3: ["B", "C", "D"],
};

const STRENGTH_DAY_TO_SLOT: Record<number, number> = {
  0: 0,
  3: 1,
  5: 2,
};

export const WORKOUT_WALK_LABEL = "30 Min Weighted Walk";

const WEEKLY_DAY_TEMPLATE: Pick<
  GymDaySchedule,
  "type" | "workoutWalkLabel" | "focusLabel"
>[] = [
  { type: "strength", workoutWalkLabel: WORKOUT_WALK_LABEL, focusLabel: null },
  { type: "hiit", workoutWalkLabel: WORKOUT_WALK_LABEL, focusLabel: "Cardiovascular" },
  { type: "rest", workoutWalkLabel: null, focusLabel: "Rest" },
  { type: "strength", workoutWalkLabel: WORKOUT_WALK_LABEL, focusLabel: null },
  { type: "hiit", workoutWalkLabel: WORKOUT_WALK_LABEL, focusLabel: "Cardiovascular" },
  { type: "strength", workoutWalkLabel: WORKOUT_WALK_LABEL, focusLabel: null },
  { type: "rest", workoutWalkLabel: null, focusLabel: "Rest" },
];

export function getWorkoutIdForDay(week: GymWeek, dayIndex: number): WorkoutId | null {
  const slot = STRENGTH_DAY_TO_SLOT[dayIndex];
  if (slot === undefined) return null;
  return ROTATION[week][slot];
}

export function getWorkoutForDay(week: GymWeek, dayIndex: number): Workout | null {
  const id = getWorkoutIdForDay(week, dayIndex);
  if (!id) return null;
  return WORKOUTS[id];
}

export function buildWeeklyGymSchedule(week: GymWeek): GymDaySchedule[] {
  return WEEKLY_DAY_TEMPLATE.map((template, dayIndex) => ({
    type: template.type,
    workoutWalkLabel: template.workoutWalkLabel,
    focusLabel: template.focusLabel,
    strengthWorkout:
      template.type === "strength" ? getWorkoutForDay(week, dayIndex) : null,
  }));
}

export const GYM_ROW_LABELS = ["Workout", "Focus"] as const;
