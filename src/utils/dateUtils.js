// ============================================================
// DATE UTILITIES — date navigation, formatting, range logic
// ============================================================
import { format, addDays, subDays, parseISO, isWithinInterval, eachDayOfInterval, startOfWeek, endOfWeek, differenceInDays } from 'date-fns';

export const START_DATE = '2026-03-01';
export const END_DATE = '2026-08-31';

// Format a Date object to YYYY-MM-DD string
export const toDateStr = (date) => format(date, 'yyyy-MM-dd');

// Parse a YYYY-MM-DD string to Date object
export const fromDateStr = (dateStr) => parseISO(dateStr);

// Format date for display: "Sat, Mar 21"
export const formatDisplay = (dateStr) => format(parseISO(dateStr), 'EEE, MMM d');

// Format date for display with year: "Mar 21, 2026"
export const formatFull = (dateStr) => format(parseISO(dateStr), 'MMM d, yyyy');

// Get weekday name: "Monday", "Tuesday", etc.
export const getWeekday = (dateStr) => format(parseISO(dateStr), 'EEEE');

// Get day of week number (0=Sun, 1=Mon, ... 6=Sat)
export const getDayOfWeek = (dateStr) => parseISO(dateStr).getDay();

// Navigate to next/prev day within bounds
export const getNextDate = (dateStr) => {
  const next = addDays(parseISO(dateStr), 1);
  const end = parseISO(END_DATE);
  return next <= end ? toDateStr(next) : dateStr;
};

export const getPrevDate = (dateStr) => {
  const prev = subDays(parseISO(dateStr), 1);
  const start = parseISO(START_DATE);
  return prev >= start ? toDateStr(prev) : dateStr;
};

// Check if a date string is within allowed range
export const isInRange = (dateStr) => {
  const date = parseISO(dateStr);
  return isWithinInterval(date, { start: parseISO(START_DATE), end: parseISO(END_DATE) });
};

// Get today's date string (clamped to range)
export const getToday = () => {
  const today = new Date();
  const todayStr = toDateStr(today);
  if (todayStr < START_DATE) return START_DATE;
  if (todayStr > END_DATE) return END_DATE;
  return todayStr;
};

// Get an array of date strings for a given week (Sun-Sat) around a date
export const getWeekDates = (dateStr) => {
  const date = parseISO(dateStr);
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday start
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end }).map(toDateStr);
};

// Get all dates in the range
export const getAllDatesInRange = () => {
  return eachDayOfInterval({
    start: parseISO(START_DATE),
    end: parseISO(END_DATE),
  }).map(toDateStr);
};

// Get days since start
export const getDayNumber = (dateStr) => {
  return differenceInDays(parseISO(dateStr), parseISO(START_DATE)) + 1;
};

// Get month name from date string
export const getMonthName = (dateStr) => format(parseISO(dateStr), 'MMMM yyyy');

// Get dates in a given month
export const getDatesInMonth = (year, month) => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return eachDayOfInterval({ start, end }).map(toDateStr);
};
