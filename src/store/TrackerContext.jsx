// ============================================================
// TRACKER CONTEXT — Global state for the fitness tracker
// ============================================================
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getDayData, saveDayData, calculateMacros } from '../utils/storage';
import { getToday } from '../utils/dateUtils';
import { vegMealPlan, nonVegMealPlan, quickAddFoods } from '../data/mealConfig';
import { getTargets } from '../data/targets';

const TrackerContext = createContext(null);

export function TrackerProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [dayData, setDayData] = useState(() => getDayData(getToday()));
  const [dietMode, setDietMode] = useState(() => {
    return localStorage.getItem('fittrack_dietMode') || 'nonveg';
  });
  const [targets, setTargets] = useState(getTargets);

  const currentPlan = dietMode === 'veg' ? vegMealPlan : nonVegMealPlan;

  // When selected date changes, load that day's data
  useEffect(() => {
    const data = getDayData(selectedDate);
    setDayData(data);
  }, [selectedDate]);

  // Auto-save whenever dayData changes
  useEffect(() => {
    saveDayData(selectedDate, dayData);
  }, [dayData, selectedDate]);

  // Save diet mode preference
  useEffect(() => {
    localStorage.setItem('fittrack_dietMode', dietMode);
  }, [dietMode]);

  // Refresh targets from storage
  const refreshTargets = useCallback(() => {
    setTargets(getTargets());
  }, []);

  // Toggle a meal item checked/unchecked
  const toggleMeal = useCallback((itemId) => {
    setDayData((prev) => ({
      ...prev,
      meals: { ...prev.meals, [itemId]: !prev.meals[itemId] },
    }));
  }, []);

  // Toggle a quick-add item
  const toggleQuickAdd = useCallback((itemId) => {
    setDayData((prev) => ({
      ...prev,
      quickAdds: { ...(prev.quickAdds || {}), [itemId]: !(prev.quickAdds || {})[itemId] },
    }));
  }, []);

  // Toggle an exercise checked
  const toggleExercise = useCallback((exerciseId) => {
    setDayData((prev) => ({
      ...prev,
      workout: { ...prev.workout, [exerciseId]: !prev.workout[exerciseId] },
    }));
  }, []);

  // Update a scalar field
  const updateField = useCallback((field, value) => {
    setDayData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Update water increment/decrement
  const updateWater = useCallback((delta) => {
    setDayData((prev) => ({
      ...prev,
      water: Math.max(0, (prev.water || 0) + delta),
    }));
  }, []);

  // Calculate current macros
  const macros = calculateMacros(dayData, currentPlan, quickAddFoods);

  // Navigate to a specific date
  const goToDate = useCallback((dateStr) => {
    setSelectedDate(dateStr);
  }, []);

  // Mark day as complete
  const toggleDayComplete = useCallback(() => {
    setDayData((prev) => ({ ...prev, completed: !prev.completed }));
  }, []);

  const value = {
    selectedDate,
    setSelectedDate: goToDate,
    dayData,
    setDayData,
    dietMode,
    setDietMode,
    currentPlan,
    targets,
    refreshTargets,
    toggleMeal,
    toggleQuickAdd,
    toggleExercise,
    updateField,
    updateWater,
    macros,
    toggleDayComplete,
  };

  return (
    <TrackerContext.Provider value={value}>
      {children}
    </TrackerContext.Provider>
  );
}

export const useTracker = () => {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error('useTracker must be used within TrackerProvider');
  return ctx;
};

export default TrackerContext;
