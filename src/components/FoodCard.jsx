// ============================================================
// FOOD CARD — Tappable meal item with checkbox and macros
// ============================================================
import { useState } from 'react';
import './FoodCard.css';

export default function FoodCard({ item, checked, onToggle, showAlternatives = true }) {
  const [showAlt, setShowAlt] = useState(false);

  return (
    <div className={`food-card ${checked ? 'food-card--checked' : ''}`}>
      <div className="food-card-main" onClick={onToggle}>
        <div className="checkbox-wrapper">
          <input type="checkbox" checked={checked} readOnly />
          <div className="checkbox-visual">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div className="food-card-info">
          <div className="food-card-name">{item.name}</div>
          <div className="food-card-qty">{item.quantity || item.serving}</div>
        </div>

        <div className="food-card-macros">
          <span className="food-macro food-macro--cal">{item.calories}</span>
          <span className="food-macro food-macro--pro">{item.protein}p</span>
        </div>
      </div>

      {showAlternatives && item.alternatives && item.alternatives.length > 0 && (
        <div className="food-card-alt-section">
          <button className="food-alt-toggle" onClick={(e) => { e.stopPropagation(); setShowAlt(!showAlt); }}>
            {showAlt ? 'Hide' : 'Alt'} ↕
          </button>
          {showAlt && (
            <div className="food-alt-list">
              {item.alternatives.map((alt, i) => (
                <span key={i} className="food-alt-chip">{alt}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
