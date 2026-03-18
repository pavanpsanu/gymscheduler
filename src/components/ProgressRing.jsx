// ============================================================
// PROGRESS RING — Animated SVG circular progress
// ============================================================
import './ProgressRing.css';

export default function ProgressRing({
  value = 0,
  max = 100,
  size = 80,
  strokeWidth = 6,
  color = 'var(--accent-green)',
  bgColor = 'var(--glass-border)',
  label = '',
  sublabel = '',
  showPercent = false,
  children,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1);
  const dashOffset = circumference * (1 - percent);

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="progress-ring-svg">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="progress-ring-circle"
          style={{
            '--circumference': circumference,
            '--dash-offset': dashOffset,
          }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring-content">
        {children || (
          <>
            {showPercent ? (
              <span className="progress-ring-value">{Math.round(percent * 100)}%</span>
            ) : (
              <span className="progress-ring-value" style={{ color }}>{Math.round(value)}</span>
            )}
            {label && <span className="progress-ring-label">{label}</span>}
            {sublabel && <span className="progress-ring-sublabel">{sublabel}</span>}
          </>
        )}
      </div>
    </div>
  );
}
