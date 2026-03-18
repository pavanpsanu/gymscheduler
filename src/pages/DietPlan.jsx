// ============================================================
// DIET PLAN PAGE — Browse Veg/Non-Veg/Quick-Add diet plans
// ============================================================
import { useState } from 'react';
import { useTracker } from '../store/TrackerContext';
import { vegMealPlan, nonVegMealPlan, quickAddFoods, getMealsByType } from '../data/mealConfig';
import './DietPlan.css';

const mealIcons = {
  'Breakfast': '🌅', 'Snack': '🥜', 'Lunch': '🍽️',
  'Pre Workout': '⚡', 'Post Workout': '💪', 'Dinner': '🌙',
};

export default function DietPlan() {
  const { toggleMeal, toggleQuickAdd, dayData, selectedDate } = useTracker();
  const [activeTab, setActiveTab] = useState('nonveg');

  const plans = {
    veg: getMealsByType(vegMealPlan),
    nonveg: getMealsByType(nonVegMealPlan),
  };

  const currentItems = activeTab === 'quick' ? quickAddFoods : null;
  const currentGrouped = activeTab !== 'quick' ? plans[activeTab] : null;

  return (
    <div className="page" id="diet-plan-page">
      <h1 className="page-title">Diet Plan</h1>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'nonveg' ? 'active' : ''}`} onClick={() => setActiveTab('nonveg')}>Non-Veg</button>
        <button className={`tab ${activeTab === 'veg' ? 'active' : ''}`} onClick={() => setActiveTab('veg')}>Veg</button>
        <button className={`tab ${activeTab === 'quick' ? 'active' : ''}`} onClick={() => setActiveTab('quick')}>Quick Add</button>
      </div>

      <p className="text-xs text-muted mb-md">Tap items to add to your tracker for the selected date.</p>

      {/* Grouped Meals */}
      {currentGrouped && Object.entries(currentGrouped).map(([mealType, items]) => (
        <div key={mealType} className="diet-section">
          <div className="diet-section-header">
            <span>{mealIcons[mealType] || '🍴'} {mealType}</span>
          </div>
          {items.map((item) => {
            const isChecked = !!dayData.meals?.[item.id];
            return (
              <div
                key={item.id}
                className={`diet-item ${isChecked ? 'diet-item--added' : ''}`}
                onClick={() => toggleMeal(item.id)}
              >
                <div className="diet-item-left">
                  <div className="diet-item-name">{item.name}</div>
                  <div className="diet-item-qty">{item.quantity}</div>
                  {item.alternatives?.length > 0 && (
                    <div className="diet-item-alts">
                      {item.alternatives.map((a, i) => (
                        <span key={i} className="diet-alt-chip">{a}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="diet-item-macros">
                  <div className="diet-macro-row">
                    <span className="pill pill-orange">{item.calories} cal</span>
                    <span className="pill pill-green">{item.protein}g pro</span>
                  </div>
                  <div className="diet-macro-row mt-sm">
                    <span className="pill pill-blue">{item.carbs}g carb</span>
                    <span className="pill pill-purple">{item.fats}g fat</span>
                  </div>
                </div>
                <div className={`diet-add-btn ${isChecked ? 'added' : ''}`}>
                  {isChecked ? '✓' : '+'}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Quick Add Items */}
      {currentItems && (
        <div className="diet-quick-list">
          {currentItems.map((item) => {
            const isChecked = !!dayData.quickAdds?.[item.id];
            return (
              <div
                key={item.id}
                className={`diet-item ${isChecked ? 'diet-item--added' : ''}`}
                onClick={() => toggleQuickAdd(item.id)}
              >
                <div className="diet-item-left">
                  <div className="diet-item-name">{item.name}</div>
                  <div className="diet-item-qty">{item.serving}</div>
                </div>
                <div className="diet-item-macros">
                  <span className="pill pill-orange">{item.calories}</span>
                  <span className="pill pill-green">{item.protein}p</span>
                </div>
                <div className={`diet-add-btn ${isChecked ? 'added' : ''}`}>
                  {isChecked ? '✓' : '+'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
