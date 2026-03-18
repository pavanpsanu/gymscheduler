// ============================================================
// CELEBRATION — Confetti / badge pop animation on goals
// ============================================================
import { useEffect, useState } from 'react';
import './Celebration.css';

export default function Celebration({ show, message = 'Goal Hit! 🎉' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="celebration-overlay">
      <div className="celebration-content">
        <div className="celebration-particles">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                '--angle': `${i * 30}deg`,
                '--delay': `${i * 0.05}s`,
                '--color': ['#22c55e', '#f59e0b', '#6366f1', '#ec4899', '#06b6d4', '#a855f7'][i % 6],
              }}
            />
          ))}
        </div>
        <div className="celebration-badge">{message}</div>
      </div>
    </div>
  );
}
