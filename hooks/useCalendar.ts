
import { useMemo } from 'react';
import type { CalendarDay } from '../types';
import { MONTH_NAMES } from '../constants';

export const useCalendar = (currentDate: Date) => {
  return useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = MONTH_NAMES[month];
    const yearName = year.toString();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDateOfMonth = lastDayOfMonth.getDate();

    const calendarDays: CalendarDay[] = [];

    // Days from previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthLastDate = prevMonthLastDay.getDate();

    for (let i = firstDayOfWeek; i > 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDate - i + 1);
      calendarDays.push({ date, isCurrentMonth: false, isToday: false });
    }

    // Days of current month
    const today = new Date();
    const todayDateString = today.toDateString();

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === todayDateString;
      calendarDays.push({ date, isCurrentMonth: true, isToday });
    }

    // Days from next month
    const remainingCells = 42 - calendarDays.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      calendarDays.push({ date, isCurrentMonth: false, isToday: false });
    }

    return { calendarDays, monthName, yearName };
  }, [currentDate]);
};
