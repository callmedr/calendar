
import React from 'react';
import { DAYS_OF_WEEK_KO } from '../constants';
import type { CalendarDay, CalendarEvent } from '../types';

interface CalendarGridProps {
  days: CalendarDay[];
  onDayClick: (date: Date) => void;
  events: Record<string, CalendarEvent[]>;
}

const DayCell: React.FC<{
  day: CalendarDay;
  onDayClick: (date: Date) => void;
  dayEvents: CalendarEvent[];
}> = ({ day, onDayClick, dayEvents }) => {
  const { date, isCurrentMonth, isToday } = day;
  const dateString = date.toISOString().split('T')[0];

  const cellClasses = [
    'relative flex flex-col h-24 sm:h-32 p-2 rounded-lg transition-all duration-200 ease-in-out border border-transparent',
    isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50',
    isCurrentMonth ? 'hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer' : 'cursor-default',
    isToday ? 'border-2 border-indigo-500 dark:border-indigo-400' : '',
  ].join(' ');

  const dateTextClasses = [
    'font-medium',
    isCurrentMonth ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500',
    isToday ? 'text-white bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center' : 'w-8 h-8 flex items-center justify-center',
  ].join(' ');

  const isSunday = date.getDay() === 0;
  const isSaturday = date.getDay() === 6;

  const dayOfWeekClasses = isSunday ? 'text-red-500' : isSaturday ? 'text-blue-500' : '';

  return (
    <div className={cellClasses} onClick={() => isCurrentMonth && onDayClick(date)}>
      <div className={`flex justify-end text-sm ${dayOfWeekClasses}`}>
         <span className={dateTextClasses}>{date.getDate()}</span>
      </div>
      {isCurrentMonth && (
        <div className="mt-1 flex-grow overflow-y-auto text-xs">
          {dayEvents.slice(0, 2).map(event => (
            <div key={event.id} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded px-1 py-0.5 mb-1 truncate">
              {event.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-gray-500 dark:text-gray-400 mt-1">+{dayEvents.length - 2} more</div>
          )}
        </div>
      )}
    </div>
  );
};

export const CalendarGrid: React.FC<CalendarGridProps> = ({ days, onDayClick, events }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900/50 p-2 rounded-lg">
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">
        {DAYS_OF_WEEK_KO.map((day, index) => (
          <div key={day} className={`py-2 ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <DayCell
            key={day.date.toISOString()}
            day={day}
            onDayClick={onDayClick}
            dayEvents={events[day.date.toISOString().split('T')[0]] || []}
          />
        ))}
      </div>
    </div>
  );
};
