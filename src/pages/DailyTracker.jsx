// ============================================================
// DAILY TRACKER PAGE — Main food & metric tracking interface
// ============================================================
import { useState, useEffect } from 'react';
import { useTracker } from '../store/TrackerContext';
import { getMealsByType, mealCategories, quickAddFoods } from '../data/mealConfig';
import DateNavigator from '../components/DateNavigator';
import FoodCard from '../components/FoodCard';
import StickyPanel from '../components/StickyPanel';
import Celebration from '../components/Celebration';
import './DailyTracker.css';

const mealIcons = {
  'Breakfast': '🌅',
  'Snack': '🥜',
  'Lunch': '🍽️',
  'Pre Workout': '⚡',
  'Post Workout': '💪',
  'Dinner': '🌙',
  'Supplements': '💊',
};

export default function DailyTracker() {
  const {
    dayData, currentPlan, toggleMeal, toggleQuickAdd,
    updateField, updateWater, macros, targets,
  } = useTracker();

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [proteinGoalHit, setProteinGoalHit] = useState(false);
  const [calGoalHit, setCalGoalHit] = useState(false);

  const mealsByType = getMealsByType(currentPlan);

  // Celebration triggers
  useEffect(() => {
    if (macros.protein >= targets.protein && !proteinGoalHit) {
      setProteinGoalHit(true);
      setTimeout(() => setProteinGoalHit(false), 3000);
    }
  }, [macros.protein, targets.protein]);

  useEffect(() => {
    if (macros.calories >= targets.calories * 0.9 && macros.calories <= targets.calories * 1.1 && macros.calories > 0 && !calGoalHit) {
      setCalGoalHit(true);
      setTimeout(() => setCalGoalHit(false), 3000);
    }
  }, [macros.calories, targets.calories]);

  return (
    <div className="page tracker-page" id="tracker-page">
      <Celebration show={proteinGoalHit} message="Protein Goal Hit! 💚" />
      <Celebration show={calGoalHit} message="Calorie Target Met! 🎯" />

      <h1 className="page-title">Daily Tracker</h1>
      <DateNavigator />

      {/* Macro Summary Bar */}
      <div className="tracker-macro-bar">
        <div className="tracker-macro-item">
          <span className="tracker-macro-num" style={{ color: 'var(--accent-orange)' }}>{macros.calories}</span>
          <span className="tracker-macro-lbl">/{targets.calories} cal</span>
        </div>
        <div className="tracker-macro-item">
          <span className="tracker-macro-num" style={{ color: 'var(--accent-green)' }}>{macros.protein}g</span>
          <span className="tracker-macro-lbl">/{targets.protein}g pro</span>
        </div>
        <div className="tracker-macro-item">
          <span className="tracker-macro-num" style={{ color: 'var(--accent-blue)' }}>{macros.carbs}g</span>
          <span className="tracker-macro-lbl">carbs</span>
        </div>
        <div className="tracker-macro-item">
          <span className="tracker-macro-num" style={{ color: 'var(--accent-purple)' }}>{macros.fats}g</span>
          <span className="tracker-macro-lbl">fats</span>
        </div>
      </div>

      {/* Meal Sections */}
      {mealCategories.map((cat) => {
        const items = mealsByType[cat];
        if (!items || items.length === 0) return null;
        return (
          <div key={cat} className="tracker-section">
            <div className="tracker-section-header">
              <span>{mealIcons[cat] || '🍴'} {cat}</span>
              <span className="tracker-section-count">
                {items.filter((item) => dayData.meals?.[item.id]).length}/{items.length}
              </span>
            </div>
            {items.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                checked={!!dayData.meals?.[item.id]}
                onToggle={() => toggleMeal(item.id)}
              />
            ))}
          </div>
        );
      })}

      {/* Quick Add Section */}
      <div className="tracker-section">
        <button
          className="tracker-section-header tracker-quick-toggle"
          onClick={() => setShowQuickAdd(!showQuickAdd)}
        >
          <span>⚡ Quick Add Foods</span>
          <span className="tracker-toggle-arrow">{showQuickAdd ? '▲' : '▼'}</span>
        </button>
        {showQuickAdd && (
          <div className="tracker-quick-grid animate-slide-up">
            {quickAddFoods.map((item) => (
              <div
                key={item.id}
                className={`tracker-quick-chip ${dayData.quickAdds?.[item.id] ? 'active' : ''}`}
                onClick={() => toggleQuickAdd(item.id)}
              >
                <span className="quick-chip-name">{item.name}</span>
                <span className="quick-chip-cal">{item.calories} cal · {item.protein}p</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daily Metrics */}
      <div className="tracker-section">
        <div className="tracker-section-header">
          <span>📊 Daily Metrics</span>
        </div>

        {/* Water Tracker */}
        <div className="metric-card">
          <div className="metric-header">
            <span>💧 Water Intake</span>
            <span className="pill pill-cyan">{dayData.water || 0}/{targets.water} glasses</span>
          </div>
          <div className="stepper">
            <button className="stepper-btn" onClick={() => updateWater(-1)}>−</button>
            <span className="stepper-value" style={{ color: 'var(--accent-cyan)' }}>{dayData.water || 0}</span>
            <button className="stepper-btn" onClick={() => updateWater(1)}>+</button>
          </div>
          <div className="metric-bar">
            <div
              className="metric-bar-fill metric-bar-fill--cyan"
              style={{ width: `${Math.min(((dayData.water || 0) / targets.water) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Weight */}
        <div className="metric-card">
          <div className="metric-header">
            <span>⚖️ Body Weight</span>
          </div>
          <input
            type="number"
            className="input-field"
            placeholder="Enter weight in kg"
            value={dayData.weight || ''}
            onChange={(e) => updateField('weight', e.target.value)}
            step="0.1"
            id="weight-input"
          />
        </div>

        {/* Steps */}
        <div className="metric-card">
          <div className="metric-header">
            <span>👟 Steps</span>
            <span className="pill pill-green">{dayData.steps || 0}</span>
          </div>
          <input
            type="number"
            className="input-field"
            placeholder="Enter step count"
            value={dayData.steps || ''}
            onChange={(e) => updateField('steps', parseInt(e.target.value) || 0)}
            id="steps-input"
          />
        </div>

        {/* Mood & Energy Tags */}
        <div className="metric-card">
          <div className="metric-header"><span>😊 Mood & Energy</span></div>
          <div className="mood-tags">
            {['😴', '😐', '🙂', '😊', '🔥'].map((mood) => (
              <button
                key={mood}
                className={`mood-tag ${dayData.mood === mood ? 'active' : ''}`}
                onClick={() => updateField('mood', dayData.mood === mood ? '' : mood)}
              >
                {mood}
              </button>
            ))}
          </div>
          <div className="mood-tags mt-sm">
            {['Low', 'Medium', 'High', 'Peak'].map((energy) => (
              <button
                key={energy}
                className={`energy-tag ${dayData.energy === energy ? 'active' : ''}`}
                onClick={() => updateField('energy', dayData.energy === energy ? '' : energy)}
              >
                {energy}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="metric-card">
          <div className="metric-header"><span>📝 Notes</span></div>
          <textarea
            className="input-field"
            placeholder="Any notes for today..."
            value={dayData.notes || ''}
            onChange={(e) => updateField('notes', e.target.value)}
            rows={2}
            id="notes-input"
          />
        </div>
      </div>

      <div style={{ height: '80px' }} />
      <StickyPanel />
    </div>
  );
}
