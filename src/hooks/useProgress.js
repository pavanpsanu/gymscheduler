// ============================================================
// useProgress Hook — compute streaks, trends, summaries
// ============================================================
import { useMemo } from 'react';
import { getAllData } from '../utils/storage';
import { getAllDatesInRange, getToday } from '../utils/dateUtils';

export const useProgress = () => {
  return useMemo(() => {
    const allData = getAllData();
    const allDates = getAllDatesInRange();
    const today = getToday();

    // Filter only dates up to today
    const pastDates = allDates.filter((d) => d <= today);

    // Completed days
    const completedDays = pastDates.filter((d) => allData[d]?.completed);

    // Current streak (consecutive completed days ending at today or most recent)
    let currentStreak = 0;
    for (let i = pastDates.length - 1; i >= 0; i--) {
      if (allData[pastDates[i]]?.completed) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Best streak
    let bestStreak = 0;
    let tempStreak = 0;
    pastDates.forEach((d) => {
      if (allData[d]?.completed) {
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    // Weight trend (dates with weight entries)
    const weightData = pastDates
      .filter((d) => allData[d]?.weight && !isNaN(parseFloat(allData[d].weight)))
      .map((d) => ({
        date: d,
        weight: parseFloat(allData[d].weight),
      }));

    // Calorie trend
    const calorieData = pastDates
      .filter((d) => allData[d]?.caloriesTotal > 0 || allData[d]?.meals && Object.values(allData[d].meals).some(Boolean))
      .map((d) => ({
        date: d,
        calories: allData[d]?.caloriesTotal || 0,
      }));

    // Protein trend
    const proteinData = pastDates
      .filter((d) => allData[d]?.proteinTotal > 0 || allData[d]?.meals && Object.values(allData[d].meals).some(Boolean))
      .map((d) => ({
        date: d,
        protein: allData[d]?.proteinTotal || 0,
      }));

    // Water trend
    const waterData = pastDates
      .filter((d) => allData[d]?.water > 0)
      .map((d) => ({
        date: d,
        water: allData[d].water,
      }));

    // Workout completion data (percentage per day)
    const workoutData = pastDates
      .filter((d) => allData[d]?.workout && Object.keys(allData[d].workout).length > 0)
      .map((d) => {
        const w = allData[d].workout;
        const total = Object.keys(w).length;
        const done = Object.values(w).filter(Boolean).length;
        return { date: d, percentage: total > 0 ? Math.round((done / total) * 100) : 0 };
      });

    // Heatmap data: completion status by date
    const heatmapData = {};
    pastDates.forEach((d) => {
      if (allData[d]?.completed) {
        heatmapData[d] = 'completed';
      } else if (allData[d] && (Object.values(allData[d].meals || {}).some(Boolean) || allData[d].water > 0)) {
        heatmapData[d] = 'partial';
      } else {
        heatmapData[d] = 'empty';
      }
    });

    // Weekly summaries
    const weeklySummaries = [];
    for (let i = 0; i < pastDates.length; i += 7) {
      const weekDates = pastDates.slice(i, i + 7);
      const completedInWeek = weekDates.filter((d) => allData[d]?.completed).length;
      weeklySummaries.push({
        weekNum: Math.floor(i / 7) + 1,
        startDate: weekDates[0],
        endDate: weekDates[weekDates.length - 1],
        completedDays: completedInWeek,
        totalDays: weekDates.length,
        adherence: Math.round((completedInWeek / weekDates.length) * 100),
      });
    }

    // Overall adherence
    const adherence = pastDates.length > 0
      ? Math.round((completedDays.length / pastDates.length) * 100)
      : 0;

    // Best week
    const bestWeek = weeklySummaries.reduce((best, w) =>
      w.adherence > (best?.adherence || 0) ? w : best, null
    );

    return {
      currentStreak,
      bestStreak,
      completedDaysCount: completedDays.length,
      totalDays: pastDates.length,
      adherence,
      weightData,
      calorieData,
      proteinData,
      waterData,
      workoutData,
      heatmapData,
      weeklySummaries,
      bestWeek,
    };
  }, []);
};
