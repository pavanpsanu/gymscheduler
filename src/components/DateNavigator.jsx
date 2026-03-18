// ============================================================
// DATE NAVIGATOR — Prev/Next arrows + calendar picker
// ============================================================
import { useState, useRef } from 'react';
import { useTracker } from '../store/TrackerContext';
import { formatDisplay, getWeekday, getNextDate, getPrevDate, getDayNumber, START_DATE, END_DATE } from '../utils/dateUtils';
import './DateNavigator.css';

export default function DateNavigator() {
  const { selectedDate, setSelectedDate } = useTracker();
  const inputRef = useRef(null);
  const [showInput, setShowInput] = useState(false);

  const handlePrev = () => setSelectedDate(getPrevDate(selectedDate));
  const handleNext = () => setSelectedDate(getNextDate(selectedDate));

  const handleDateSelect = (e) => {
    const val = e.target.value;
    if (val >= START_DATE && val <= END_DATE) {
      setSelectedDate(val);
    }
    setShowInput(false);
  };

  const handleCalendarClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      setShowInput(true);
    }
  };

  return (
    <div className="date-navigator" id="date-navigator">
      <button className="date-nav-btn" onClick={handlePrev} aria-label="Previous day">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <button className="date-display" onClick={handleCalendarClick}>
        <span className="date-weekday">{getWeekday(selectedDate)}</span>
        <span className="date-formatted">{formatDisplay(selectedDate)}</span>
        <span className="date-day-num">Day {getDayNumber(selectedDate)}</span>
      </button>

      <button className="date-nav-btn" onClick={handleNext} aria-label="Next day">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <input
        ref={inputRef}
        type="date"
        className="date-input-hidden"
        value={selectedDate}
        min={START_DATE}
        max={END_DATE}
        onChange={handleDateSelect}
        tabIndex={-1}
      />
    </div>
  );
}
