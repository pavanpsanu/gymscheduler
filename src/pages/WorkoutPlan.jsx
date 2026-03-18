// ============================================================
// WORKOUT PLAN PAGE — Date-mapped workout split with exercises
// ============================================================
import { useTracker } from '../store/TrackerContext';
import { getWorkoutForDate, dailyCardio } from '../data/workoutConfig';
import { getDayOfWeek, formatDisplay, getWeekday } from '../utils/dateUtils';
import DateNavigator from '../components/DateNavigator';
import ExerciseCard from '../components/ExerciseCard';
import ProgressRing from '../components/ProgressRing';
import './WorkoutPlan.css';

export default function WorkoutPlan() {
  const { selectedDate, dayData, toggleExercise, updateField } = useTracker();

  const dayOfWeek = getDayOfWeek(selectedDate);
  const { split, exercises } = getWorkoutForDate(dayOfWeek);

  const totalExercises = exercises.length;
  const doneExercises = exercises.filter((ex) => dayData.workout?.[ex.id]).length;
  const completionPct = totalExercises > 0 ? Math.round((doneExercises / totalExercises) * 100) : 0;

  return (
    <div className="page" id="workout-page">
      <h1 className="page-title">Workout Plan</h1>
      <DateNavigator />

      {/* Workout Header Card */}
      <div className="workout-hero card">
        <div className="workout-hero-left">
          <span className="workout-hero-icon">{split.icon}</span>
          <div>
            <div className="workout-hero-day">{getWeekday(selectedDate)}</div>
            <div className="workout-hero-name" style={{ color: split.color }}>{split.name}</div>
          </div>
        </div>
        <ProgressRing
          value={doneExercises}
          max={totalExercises}
          size={72}
          strokeWidth={5}
          color={split.color}
          showPercent
        />
      </div>

      {/* Exercises */}
      <div className="section-title">Exercises ({doneExercises}/{totalExercises})</div>
      {exercises.map((ex) => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          checked={!!dayData.workout?.[ex.id]}
          onToggle={() => toggleExercise(ex.id)}
        />
      ))}

      {/* Cardio Section */}
      <div className="section-title">Daily Cardio</div>
      <div className="card workout-cardio">
        <div className="workout-cardio-item">
          <span>🚶</span>
          <div>
            <div className="text-sm font-semibold">Incline Walk</div>
            <div className="text-xs text-muted">{dailyCardio.inclineWalk}</div>
          </div>
        </div>
        <div className="workout-cardio-item">
          <span>👟</span>
          <div>
            <div className="text-sm font-semibold">Steps Target</div>
            <div className="text-xs text-muted">{dailyCardio.stepTarget} steps</div>
          </div>
          <input
            type="number"
            className="input-field workout-steps-input"
            placeholder="Steps"
            value={dayData.steps || ''}
            onChange={(e) => updateField('steps', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Completion Summary */}
      {completionPct === 100 && (
        <div className="workout-complete-banner animate-scale-in">
          <span>🏆</span>
          <span>Workout Complete! Great job!</span>
        </div>
      )}
    </div>
  );
}
