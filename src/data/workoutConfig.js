// ============================================================
// WORKOUT CONFIG — Weekly split and exercise data
// ============================================================

export const workoutSplits = {
  1: { name: 'Chest + Abs', icon: '🏋️', color: '#ef4444' },
  2: { name: 'Back', icon: '💪', color: '#8b5cf6' },
  3: { name: 'Legs', icon: '🦵', color: '#06b6d4' },
  4: { name: 'Shoulders', icon: '🔥', color: '#f59e0b' },
  5: { name: 'Arms', icon: '💥', color: '#ec4899' },
  6: { name: 'Core + Full Body', icon: '⚡', color: '#10b981' },
  0: { name: 'Swimming / Recovery', icon: '🏊', color: '#3b82f6' },
};

export const exercises = {
  'Chest + Abs': [
    { id: 'chest-1', name: 'Bench Press', sets: 4, reps: '8-12', notes: '' },
    { id: 'chest-2', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', notes: '' },
    { id: 'chest-3', name: 'Pushups', sets: 3, reps: '15-20', notes: '' },
    { id: 'chest-4', name: 'Cable Fly', sets: 3, reps: '12-15', notes: '' },
    { id: 'chest-5', name: 'Crunches', sets: 3, reps: '20', notes: '' },
    { id: 'chest-6', name: 'Leg Raises', sets: 3, reps: '15', notes: '' },
    { id: 'chest-7', name: 'Plank', sets: 3, reps: '45-60s', notes: '' },
  ],
  Back: [
    { id: 'back-1', name: 'Lat Pulldown', sets: 4, reps: '10-12', notes: '' },
    { id: 'back-2', name: 'Seated Row', sets: 4, reps: '10-12', notes: '' },
    { id: 'back-3', name: 'Dumbbell Row', sets: 3, reps: '10-12', notes: '' },
    { id: 'back-4', name: 'Face Pull', sets: 3, reps: '15', notes: '' },
    { id: 'back-5', name: 'Hyperextension', sets: 3, reps: '12-15', notes: '' },
  ],
  Legs: [
    { id: 'legs-1', name: 'Squats', sets: 4, reps: '8-12', notes: '' },
    { id: 'legs-2', name: 'Leg Press', sets: 4, reps: '10-12', notes: '' },
    { id: 'legs-3', name: 'Romanian Deadlift', sets: 3, reps: '10-12', notes: '' },
    { id: 'legs-4', name: 'Leg Curl', sets: 3, reps: '12-15', notes: '' },
    { id: 'legs-5', name: 'Calf Raises', sets: 4, reps: '15-20', notes: '' },
  ],
  Shoulders: [
    { id: 'shldr-1', name: 'Overhead Press', sets: 4, reps: '8-12', notes: '' },
    { id: 'shldr-2', name: 'Lateral Raise', sets: 4, reps: '12-15', notes: '' },
    { id: 'shldr-3', name: 'Rear Delt Fly', sets: 3, reps: '12-15', notes: '' },
    { id: 'shldr-4', name: 'Front Raise', sets: 3, reps: '12', notes: '' },
    { id: 'shldr-5', name: 'Shrugs', sets: 3, reps: '15', notes: '' },
  ],
  Arms: [
    { id: 'arms-1', name: 'Barbell Curl', sets: 4, reps: '10-12', notes: '' },
    { id: 'arms-2', name: 'Hammer Curl', sets: 3, reps: '10-12', notes: '' },
    { id: 'arms-3', name: 'Tricep Pushdown', sets: 4, reps: '10-12', notes: '' },
    { id: 'arms-4', name: 'Skull Crushers', sets: 3, reps: '10-12', notes: '' },
    { id: 'arms-5', name: 'Dips', sets: 3, reps: '12-15', notes: '' },
  ],
  'Core + Full Body': [
    { id: 'core-1', name: 'Kettlebell Swing', sets: 3, reps: '15', notes: '' },
    { id: 'core-2', name: 'Mountain Climbers', sets: 3, reps: '30s', notes: '' },
    { id: 'core-3', name: 'Burpees', sets: 3, reps: '10', notes: '' },
    { id: 'core-4', name: 'Russian Twist', sets: 3, reps: '20', notes: '' },
    { id: 'core-5', name: 'Plank', sets: 3, reps: '60s', notes: '' },
    { id: 'core-6', name: 'Bodyweight Squats', sets: 3, reps: '20', notes: '' },
  ],
  'Swimming / Recovery': [
    { id: 'swim-1', name: 'Swimming', sets: 1, reps: '30 min', notes: '' },
    { id: 'swim-2', name: 'Stretching', sets: 1, reps: '15 min', notes: '' },
    { id: 'swim-3', name: 'Light Walk', sets: 1, reps: '20 min', notes: '' },
    { id: 'swim-4', name: 'Mobility', sets: 1, reps: '10 min', notes: '' },
  ],
};

// Daily cardio / steps target
export const dailyCardio = {
  inclineWalk: '20 min',
  stepTarget: '8000-10000',
};

// Get workout for a specific date based on day of week (0=Sun,1=Mon,...6=Sat)
export const getWorkoutForDate = (dayOfWeek) => {
  const split = workoutSplits[dayOfWeek];
  const exerciseList = exercises[split.name] || [];
  return { split, exercises: exerciseList };
};
