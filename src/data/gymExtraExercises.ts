/**
 * Additional exercise library — saved for future use, not shown in the app yet.
 */

export interface ExtraExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes?: string;
}

export interface ExtraExerciseCategory {
  name: string;
  exercises: ExtraExercise[];
}

export const EXTRA_EXERCISES: ExtraExerciseCategory[] = [
  {
    name: "Lower Body",
    exercises: [
      {
        name: "Goblet Squat",
        sets: "3 sets",
        reps: "8-12 reps",
        rest: "60-90 seconds",
      },
      {
        name: "Reverse Lunge",
        sets: "3 sets",
        reps: "8-10 reps per leg",
        rest: "60-90 seconds",
      },
      {
        name: "Walking Lunge",
        sets: "2-3 sets",
        reps: "10-12 steps per leg",
        rest: "60-90 seconds",
      },
      {
        name: "Romanian Deadlift (RDL)",
        sets: "3 sets",
        reps: "8-12 reps",
        rest: "60-90 seconds",
      },
      {
        name: "Split Squat",
        sets: "3 sets",
        reps: "8-10 reps per leg",
        rest: "60-90 seconds",
      },
      {
        name: "Step-Ups",
        sets: "3 sets",
        reps: "10 reps per leg",
        rest: "60-90 seconds",
      },
      {
        name: "Standing Calf Raise",
        sets: "3 sets",
        reps: "15-20 reps",
        rest: "30-60 seconds",
      },
    ],
  },
  {
    name: "Chest",
    exercises: [
      {
        name: "Dumbbell Floor Press",
        sets: "3 sets",
        reps: "8-12 reps",
        rest: "60-90 seconds",
      },
      {
        name: "Push-Ups",
        sets: "3 sets",
        reps: "As many reps as possible while maintaining good form",
        rest: "60 seconds",
        notes: "Stop 1-2 reps before failure",
      },
    ],
  },
  {
    name: "Back",
    exercises: [
      {
        name: "One-Arm Dumbbell Row",
        sets: "3 sets",
        reps: "8-12 reps per arm",
        rest: "60 seconds",
      },
      {
        name: "Bent-Over Dumbbell Row",
        sets: "3 sets",
        reps: "8-12 reps",
        rest: "60-90 seconds",
      },
    ],
  },
  {
    name: "Shoulders",
    exercises: [
      {
        name: "Dumbbell Shoulder Press",
        sets: "3 sets",
        reps: "8-12 reps",
        rest: "60-90 seconds",
      },
      {
        name: "Dumbbell Lateral Raise",
        sets: "3 sets",
        reps: "12-15 reps",
        rest: "45-60 seconds",
        notes:
          "20 lb may be too heavy for lateral raises. It's fine to do one arm at a time, use reduced range of motion initially, or eventually buy lighter dumbbells for isolation work.",
      },
      {
        name: "Dumbbell Front Raise",
        sets: "3 sets",
        reps: "10-15 reps",
        rest: "45-60 seconds",
      },
      {
        name: "Rear Delt Fly",
        sets: "3 sets",
        reps: "12-15 reps",
        rest: "45-60 seconds",
      },
    ],
  },
  {
    name: "Arms",
    exercises: [
      {
        name: "Bicep Curl",
        sets: "3 sets",
        reps: "8-12 reps",
        rest: "45-60 seconds",
      },
      {
        name: "Hammer Curl",
        sets: "3 sets",
        reps: "8-12 reps",
        rest: "45-60 seconds",
      },
      {
        name: "Overhead Tricep Extension",
        sets: "3 sets",
        reps: "10-15 reps",
        rest: "45-60 seconds",
      },
      {
        name: "Tricep Kickback",
        sets: "3 sets",
        reps: "12-15 reps",
        rest: "45-60 seconds",
      },
    ],
  },
  {
    name: "Core",
    exercises: [
      {
        name: "Farmer's Carry",
        sets: "3 rounds",
        reps: "30-60 seconds walking",
        rest: "60 seconds",
      },
      {
        name: "Suitcase Carry",
        sets: "3 rounds per side",
        reps: "30-60 seconds",
        rest: "30-60 seconds",
      },
      {
        name: "Russian Twist",
        sets: "3 sets",
        reps: "15-20 reps per side",
        rest: "",
      },
      {
        name: "Weighted Sit-Up",
        sets: "3 sets",
        reps: "10-15 reps",
        rest: "",
      },
      {
        name: "Plank",
        sets: "3 rounds",
        reps: "30-60 seconds",
        rest: "",
      },
      {
        name: "Side Plank",
        sets: "3 rounds",
        reps: "20-45 seconds per side",
        rest: "",
      },
    ],
  },
];
