// ============================================================
// PROGRESS PAGE — Trends, charts, heatmap, streaks
// ============================================================
import { useProgress } from '../hooks/useProgress';
import { useTracker } from '../store/TrackerContext';
import { formatDisplay, START_DATE } from '../utils/dateUtils';
import ProgressRing from '../components/ProgressRing';
import StreakBadge from '../components/StreakBadge';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import './Progress.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        <p className="chart-tooltip-val">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function MiniChart({ data, dataKey, color, title }) {
  if (!data || data.length < 2) {
    return (
      <div className="card progress-chart-card">
        <div className="progress-chart-title">{title}</div>
        <div className="text-xs text-muted text-center" style={{ padding: '20px 0' }}>
          Not enough data yet. Keep tracking!
        </div>
      </div>
    );
  }

  const chartData = data.slice(-30).map((d) => ({
    name: d.date.slice(5),
    value: d[dataKey],
  }));

  return (
    <div className="card progress-chart-card">
      <div className="progress-chart-title">{title}</div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke={color} fill={`url(#grad-${dataKey})`} strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Progress() {
  const {
    currentStreak, bestStreak, completedDaysCount, totalDays,
    adherence, weightData, calorieData, proteinData, waterData,
    heatmapData, weeklySummaries, bestWeek,
  } = useProgress();
  const { targets } = useTracker();

  return (
    <div className="page" id="progress-page">
      <h1 className="page-title">Progress</h1>

      {/* Streak */}
      <div className="flex justify-center mb-lg">
        <StreakBadge count={currentStreak} />
      </div>

      {/* Overview Stats */}
      <div className="grid-2 mb-lg">
        <div className="card progress-stat-mini">
          <div className="psm-val">{currentStreak}</div>
          <div className="psm-label">Current Streak</div>
        </div>
        <div className="card progress-stat-mini">
          <div className="psm-val">{bestStreak}</div>
          <div className="psm-label">Best Streak</div>
        </div>
        <div className="card progress-stat-mini">
          <div className="psm-val">{completedDaysCount}<span className="psm-sub">/{totalDays}</span></div>
          <div className="psm-label">Days Completed</div>
        </div>
        <div className="card progress-stat-mini">
          <div className="psm-val">{adherence}%</div>
          <div className="psm-label">Adherence</div>
        </div>
      </div>

      {/* Adherence Ring */}
      <div className="flex justify-center mb-lg">
        <ProgressRing value={adherence} max={100} size={100} strokeWidth={8} color="var(--accent-green)" showPercent />
      </div>

      {/* Charts */}
      <div className="section-title">Trends (Last 30 Days)</div>
      <MiniChart data={weightData} dataKey="weight" color="#a855f7" title="📈 Weight Trend" />
      <MiniChart data={calorieData} dataKey="calories" color="#f59e0b" title="🔥 Calorie Trend" />
      <MiniChart data={proteinData} dataKey="protein" color="#22c55e" title="💚 Protein Trend" />
      <MiniChart data={waterData} dataKey="water" color="#06b6d4" title="💧 Hydration Trend" />

      {/* Heatmap */}
      <div className="section-title">Activity Heatmap</div>
      <div className="card heatmap-card">
        <div className="heatmap-grid">
          {Object.entries(heatmapData).slice(-42).map(([date, status]) => (
            <div
              key={date}
              className={`heatmap-cell heatmap-cell--${status}`}
              title={`${formatDisplay(date)} — ${status}`}
            />
          ))}
        </div>
        <div className="heatmap-legend">
          <span><span className="heatmap-cell heatmap-cell--empty" /> Empty</span>
          <span><span className="heatmap-cell heatmap-cell--partial" /> Partial</span>
          <span><span className="heatmap-cell heatmap-cell--completed" /> Complete</span>
        </div>
      </div>

      {/* Weekly Summaries */}
      <div className="section-title">Weekly Summary</div>
      <div className="weekly-list">
        {weeklySummaries.slice(-8).reverse().map((w) => (
          <div key={w.weekNum} className="card weekly-item">
            <div className="weekly-header">
              <span className="weekly-num">Week {w.weekNum}</span>
              <span className={`pill ${w.adherence >= 70 ? 'pill-green' : w.adherence >= 40 ? 'pill-orange' : 'pill-red'}`}>
                {w.adherence}%
              </span>
            </div>
            <div className="weekly-bar">
              <div className="weekly-bar-fill" style={{ width: `${w.adherence}%` }} />
            </div>
            <div className="text-xs text-muted">
              {w.completedDays}/{w.totalDays} days completed
            </div>
          </div>
        ))}
      </div>

      {bestWeek && (
        <div className="best-week-badge animate-scale-in">
          🏆 Best Week: Week {bestWeek.weekNum} ({bestWeek.adherence}% adherence)
        </div>
      )}
    </div>
  );
}
