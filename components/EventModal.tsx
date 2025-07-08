import React, { useState, FormEvent } from 'react';
import type { CalendarEvent } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { MONTH_NAMES, DAYS_OF_WEEK_KO } from '../constants';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  events: CalendarEvent[];
  addEvent: (date: Date, title: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, selectedDate, events, addEvent }) => {
  const [newEventTitle, setNewEventTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newEventTitle.trim()) {
      addEvent(selectedDate, newEventTitle.trim());
      setNewEventTitle('');
    }
  };

  const formattedDate = `${selectedDate.getFullYear()}년 ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}일 (${DAYS_OF_WEEK_KO[selectedDate.getDay()]})`;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{formattedDate}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">일정 관리</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="새로운 일정 추가..."
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
              >
                추가하기
              </button>
            </form>
            
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></span>
                    <p className="text-gray-800 dark:text-gray-200 flex-grow">{event.title}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">등록된 일정이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
