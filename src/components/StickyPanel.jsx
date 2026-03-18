// ============================================================
// STICKY PANEL — Glassmorphic bottom summary bar
// ============================================================
import { useTracker } from '../store/TrackerContext';
import './StickyPanel.css';

export default function StickyPanel() {
  const { macros, targets } = useTracker();
  const remaining = targets.calories - macros.calories;

  return (
    <div className="sticky-panel" id="sticky-summary">
      <div className="sticky-panel-inner">
        <div className="sticky-macro">
          <span className="sticky-macro-val sticky-macro-val--cal">{macros.calories}</span>
          <span className="sticky-macro-label">cal</span>
        </div>
        <div className="sticky-divider" />
        <div className="sticky-macro">
          <span className="sticky-macro-val sticky-macro-val--pro">{macros.protein}g</span>
          <span className="sticky-macro-label">protein</span>
        </div>
        <div className="sticky-divider" />
        <div className="sticky-macro">
          <span className="sticky-macro-val sticky-macro-val--carb">{macros.carbs}g</span>
          <span className="sticky-macro-label">carbs</span>
        </div>
        <div className="sticky-divider" />
        <div className="sticky-macro">
          <span className="sticky-macro-val sticky-macro-val--fat">{macros.fats}g</span>
          <span className="sticky-macro-label">fats</span>
        </div>
        <div className="sticky-divider" />
        <div className="sticky-macro">
          <span className={`sticky-macro-val ${remaining >= 0 ? 'sticky-macro-val--remaining' : 'sticky-macro-val--over'}`}>
            {remaining >= 0 ? remaining : `+${Math.abs(remaining)}`}
          </span>
          <span className="sticky-macro-label">{remaining >= 0 ? 'left' : 'over'}</span>
        </div>
      </div>
    </div>
  );
}
