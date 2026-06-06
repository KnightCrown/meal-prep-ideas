export const EXERCISE_IMAGES: Record<string, string> = {
  "Goblet Squat": "/exercises/goblet-squat.png",
  "Romanian Deadlift": "/exercises/romanian-deadlift.png",
  "Reverse Lunge": "/exercises/reverse-lunge.png",
  "One-Arm Dumbbell Row": "/exercises/one-arm-dumbbell-row.png",
  "Dumbbell Floor Press": "/exercises/dumbbell-floor-press.png",
  "Dumbbell Shoulder Press": "/exercises/dumbbell-shoulder-press.png",
  "Bicep Curl": "/exercises/bicep-curl.png",
  "Overhead Tricep Extension": "/exercises/overhead-tricep-extension.png",
  "Farmer's Carry": "/exercises/farmers-carry.png",
  Plank: "/exercises/plank.png",
};

export function getExerciseImageSrc(name: string): string | undefined {
  return EXERCISE_IMAGES[name];
}
