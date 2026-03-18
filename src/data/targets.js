// ============================================================
// DEFAULT TARGETS — User-editable via Settings page
// ============================================================

export const defaultTargets = {
  calories: 1750,
  protein: 90,
  carbs: 190,
  fats: 48,
  fiber: 28,
  water: 8,      // glasses
  steps: 9000,
  coffee: 1,
};

export const getTargets = () => {
  try {
    const saved = localStorage.getItem('fittrack_targets');
    return saved ? { ...defaultTargets, ...JSON.parse(saved) } : { ...defaultTargets };
  } catch {
    return { ...defaultTargets };
  }
};

export const saveTargets = (targets) => {
  localStorage.setItem('fittrack_targets', JSON.stringify(targets));
};
