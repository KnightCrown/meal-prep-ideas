import type { ExerciseDetail } from "@/data/gymPlan";

function medianFromRange(min: number, max: number): number {
  return Math.round((min + max) / 2);
}

function parseSetsCount(setsLabel: string): number {
  const match = setsLabel.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 3;
}

export function getExerciseCardSummary(exercise: ExerciseDetail): string {
  const count = parseSetsCount(exercise.setsLabel);
  const isRounds = exercise.setsLabel.toLowerCase().includes("round");
  const reps = exercise.repsLabel;

  const repRange = reps.match(/(\d+)\s*-\s*(\d+)\s*reps/i);
  if (repRange) {
    const median = medianFromRange(parseInt(repRange[1], 10), parseInt(repRange[2], 10));
    return `${count} × ${median} reps`;
  }

  const durationRange = reps.match(/(\d+)\s*-\s*(\d+)\s*sec/i);
  if (durationRange) {
    const median = medianFromRange(
      parseInt(durationRange[1], 10),
      parseInt(durationRange[2], 10)
    );
    return isRounds ? `${count} × ${median} sec` : `${count} × ${median} sec`;
  }

  return exercise.setsLabel;
}
