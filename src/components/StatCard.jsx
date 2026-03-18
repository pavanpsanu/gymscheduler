// ============================================================
// STAT CARD — Gradient stat display for dashboard
// ============================================================
import './StatCard.css';

export default function StatCard({ icon, label, value, unit, color = 'green', subtext, onClick }) {
  return (
    <div className={`stat-card stat-card--${color}`} onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-body">
        <div className="stat-card-value">
          {value}
          {unit && <span className="stat-card-unit">{unit}</span>}
        </div>
        <div className="stat-card-label">{label}</div>
        {subtext && <div className="stat-card-sub">{subtext}</div>}
      </div>
    </div>
  );
}
