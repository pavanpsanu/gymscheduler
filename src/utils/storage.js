// ============================================================
// STORAGE UTILITIES — localStorage date-keyed persistence
// ============================================================

const STORAGE_KEY = 'fittrack_data';

// Create a blank day entry
export const createDayEntry = () => ({
  meals: {},
  workout: {},
  water: 0,
  weight: '',
  notes: '',
  mood: '',
  energy: '',
  steps: 0,
  caloriesTotal: 0,
  proteinTotal: 0,
  carbsTotal: 0,
  fatsTotal: 0,
  completed: false,
  quickAdds: {},
});

// Get all tracker data from localStorage
export const getAllData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

// Get data for a specific date
export const getDayData = (dateStr) => {
  const all = getAllData();
  return all[dateStr] || createDayEntry();
};

// Save data for a specific date
export const saveDayData = (dateStr, data) => {
  const all = getAllData();
  all[dateStr] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

// Export all data as JSON string
export const exportData = () => {
  return JSON.stringify({
    trackerData: getAllData(),
    targets: localStorage.getItem('fittrack_targets'),
    exportedAt: new Date().toISOString(),
  }, null, 2);
};

// Import data from JSON string
export const importData = (jsonStr) => {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.trackerData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.trackerData));
    }
    if (parsed.targets) {
      localStorage.setItem('fittrack_targets', parsed.targets);
    }
    return true;
  } catch {
    return false;
  }
};

// Reset all data
export const resetAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('fittrack_targets');
};

// Calculate macros from checked meals
export const calculateMacros = (dayData, mealPlan, quickAddFoods) => {
  let calories = 0, protein = 0, carbs = 0, fats = 0;

  // Sum from meal plan checked items
  if (dayData.meals) {
    Object.entries(dayData.meals).forEach(([id, checked]) => {
      if (checked) {
        const item = mealPlan.find((m) => m.id === id);
        if (item) {
          const qty = dayData.mealQuantities?.[id] || 1;
          calories += item.calories * qty;
          protein += item.protein * qty;
          carbs += item.carbs * qty;
          fats += item.fats * qty;
        }
      }
    });
  }

  // Sum from quick-add items
  if (dayData.quickAdds) {
    Object.entries(dayData.quickAdds).forEach(([id, checked]) => {
      if (checked) {
        const item = quickAddFoods.find((f) => f.id === id);
        if (item) {
          calories += item.calories;
          protein += item.protein;
          carbs += item.carbs;
          fats += item.fats;
        }
      }
    });
  }

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
  };
};
