// ============================================================
// EXERCISE CARD — Workout exercise with checkbox
// ============================================================
import './ExerciseCard.css';

export default function ExerciseCard({ exercise, checked, onToggle }) {
  return (
    <div className={`exercise-card ${checked ? 'exercise-card--done' : ''}`} onClick={onToggle}>
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={checked} readOnly />
        <div className="checkbox-visual">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div className="exercise-info">
        <div className="exercise-name">{exercise.name}</div>
        <div className="exercise-detail">
          {exercise.sets} sets × {exercise.reps} reps
        </div>
      </div>

      {checked && <span className="exercise-done-badge">✓</span>}
    </div>
  );
}
