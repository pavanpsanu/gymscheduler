// ============================================================
// DASHBOARD PAGE — Overview with stats, progress, and streaks
// ============================================================
import { useTracker } from '../store/TrackerContext';
import { useProgress } from '../hooks/useProgress';
import { getWorkoutForDate } from '../data/workoutConfig';
import { getQuoteForDate } from '../data/quotes';
import { getDayOfWeek, formatDisplay } from '../utils/dateUtils';
import DateNavigator from '../components/DateNavigator';
import ProgressRing from '../components/ProgressRing';
import StatCard from '../components/StatCard';
import StreakBadge from '../components/StreakBadge';
import Celebration from '../components/Celebration';
import { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const { selectedDate, dayData, macros, targets, toggleDayComplete } = useTracker();
  const { currentStreak, bestStreak, completedDaysCount, totalDays, adherence } = useProgress();
  const [showCelebration, setShowCelebration] = useState(false);

  const dayOfWeek = getDayOfWeek(selectedDate);
  const { split, exercises } = getWorkoutForDate(dayOfWeek);
  const workoutDone = exercises.length > 0
    ? Object.values(dayData.workout || {}).filter(Boolean).length
    : 0;
  const workoutTotal = exercises.length;
  const workoutPct = workoutTotal > 0 ? Math.round((workoutDone / workoutTotal) * 100) : 0;

  const calPct = targets.calories > 0 ? Math.min((macros.calories / targets.calories) * 100, 100) : 0;
  const proPct = targets.protein > 0 ? Math.min((macros.protein / targets.protein) * 100, 100) : 0;
  const waterPct = targets.water > 0 ? Math.min(((dayData.water || 0) / targets.water) * 100, 100) : 0;

  const quote = getQuoteForDate(selectedDate);

  // Daily score (0-100)
  const dailyScore = Math.round((calPct * 0.3 + proPct * 0.3 + workoutPct * 0.25 + waterPct * 0.15));

  useEffect(() => {
    if (dayData.completed && !showCelebration) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [dayData.completed]);

  return (
    <div className="page" id="dashboard-page">
      <Celebration show={showCelebration} message="Day Complete! 🏆" />

      <div className="dash-header">
        <div>
          <h1 className="dash-title">FitTrack</h1>
          <p className="text-sm text-muted">{formatDisplay(selectedDate)}</p>
        </div>
        <StreakBadge count={currentStreak} />
      </div>

      <DateNavigator />

      {/* Daily Score */}
      <div className="dash-score-card card">
        <div className="dash-score-left">
          <ProgressRing value={dailyScore} max={100} size={90} strokeWidth={7} color="var(--accent-green)" showPercent>
          </ProgressRing>
        </div>
        <div className="dash-score-right">
          <div className="dash-score-title">Daily Score</div>
          <div className="dash-score-subtitle">{dailyScore >= 80 ? 'Crushing it! 💪' : dailyScore >= 50 ? 'Good progress!' : 'Keep going!'}</div>
          <button
            className={`btn btn-sm ${dayData.completed ? 'btn-primary' : 'btn-outline'}`}
            onClick={toggleDayComplete}
            id="mark-complete-btn"
          >
            {dayData.completed ? '✓ Day Complete' : 'Mark Complete'}
          </button>
        </div>
      </div>

      {/* Quote */}
      <div className="dash-quote">
        <span className="dash-quote-icon">💡</span>
        <p>{quote}</p>
      </div>

      {/* Macro Rings */}
      <div className="section-title">Nutrition Progress</div>
      <div className="dash-rings">
        <ProgressRing value={macros.calories} max={targets.calories} size={76} strokeWidth={5} color="var(--accent-orange)" label="cal" sublabel={`/${targets.calories}`} />
        <ProgressRing value={macros.protein} max={targets.protein} size={76} strokeWidth={5} color="var(--accent-green)" label="protein" sublabel={`/${targets.protein}g`} />
        <ProgressRing value={macros.carbs} max={targets.carbs} size={76} strokeWidth={5} color="var(--accent-blue)" label="carbs" sublabel={`/${targets.carbs}g`} />
        <ProgressRing value={macros.fats} max={targets.fats} size={76} strokeWidth={5} color="var(--accent-purple)" label="fats" sublabel={`/${targets.fats}g`} />
      </div>

      {/* Quick Stats */}
      <div className="section-title">Today's Summary</div>
      <div className="grid-2">
        <StatCard icon="🏋️" label="Workout" value={`${workoutDone}/${workoutTotal}`} color="blue" subtext={split.name} />
        <StatCard icon="💧" label="Water" value={`${dayData.water || 0}/${targets.water}`} unit="gl" color="cyan" />
        <StatCard icon="⚖️" label="Weight" value={dayData.weight || '—'} unit={dayData.weight ? 'kg' : ''} color="purple" />
        <StatCard icon="🔥" label="Calories Left" value={Math.max(0, targets.calories - macros.calories)} unit="cal" color="orange" />
      </div>

      {/* Workout Preview */}
      <div className="section-title">Today's Workout</div>
      <div className="card dash-workout-preview">
        <div className="dash-workout-header">
          <span className="dash-workout-icon">{split.icon}</span>
          <span className="dash-workout-name">{split.name}</span>
          <span className="pill pill-green">{workoutPct}%</span>
        </div>
        <div className="dash-workout-exercises">
          {exercises.slice(0, 4).map((ex) => (
            <span key={ex.id} className={`dash-exercise-chip ${dayData.workout?.[ex.id] ? 'done' : ''}`}>
              {dayData.workout?.[ex.id] ? '✓' : '○'} {ex.name}
            </span>
          ))}
          {exercises.length > 4 && <span className="dash-exercise-more">+{exercises.length - 4} more</span>}
        </div>
      </div>

      {/* Streak & Progress Cards */}
      <div className="section-title">Your Journey</div>
      <div className="grid-2">
        <StatCard icon="🔥" label="Current Streak" value={currentStreak} unit="days" color="orange" />
        <StatCard icon="🏆" label="Best Streak" value={bestStreak} unit="days" color="green" />
        <StatCard icon="📅" label="Days Tracked" value={completedDaysCount} unit={`/${totalDays}`} color="blue" />
        <StatCard icon="📈" label="Adherence" value={adherence} unit="%" color="purple" />
      </div>
    </div>
  );
}
