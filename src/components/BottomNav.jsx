// ============================================================
// BOTTOM NAVIGATION — Mobile-first 6-tab navigation
// ============================================================
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const tabs = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/tracker', icon: '📋', label: 'Tracker' },
  { to: '/diet', icon: '🥗', label: 'Diet' },
  { to: '/workout', icon: '💪', label: 'Workout' },
  { to: '/progress', icon: '📊', label: 'Progress' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" id="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
