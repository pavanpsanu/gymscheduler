// ============================================================
// STREAK BADGE — Flame icon with streak count
// ============================================================
import './StreakBadge.css';

export default function StreakBadge({ count }) {
  if (count <= 0) return null;

  const tier = count >= 30 ? 'legendary' : count >= 14 ? 'gold' : count >= 7 ? 'silver' : 'bronze';

  return (
    <div className={`streak-badge streak-badge--${tier}`}>
      <span className="streak-flame">🔥</span>
      <span className="streak-count">{count}</span>
      <span className="streak-label">day streak</span>
    </div>
  );
}
