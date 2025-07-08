
import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CalendarHeaderProps {
  monthName: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthName, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex items-center justify-between mb-4 px-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{monthName}</h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};
