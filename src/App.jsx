// ============================================================
// APP — Root component with routing and layout
// ============================================================
import { HashRouter, Routes, Route } from 'react-router-dom';
import { TrackerProvider } from './store/TrackerContext';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import DailyTracker from './pages/DailyTracker';
import DietPlan from './pages/DietPlan';
import WorkoutPlan from './pages/WorkoutPlan';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

export default function App() {
  return (
    <HashRouter>
      <TrackerProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tracker" element={<DailyTracker />} />
          <Route path="/diet" element={<DietPlan />} />
          <Route path="/workout" element={<WorkoutPlan />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <BottomNav />
      </TrackerProvider>
    </HashRouter>
  );
}
