import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { EventModal } from './components/EventModal';
import { useCalendar } from './hooks/useCalendar';
import type { CalendarEvent } from './types';
import { MONTH_NAMES } from './constants';

const CALENDAR_EVENTS_KEY = 'calendarEvents';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [events, setEvents] = useState<Record<string, CalendarEvent[]>>(() => {
    try {
      const savedEvents = localStorage.getItem(CALENDAR_EVENTS_KEY);
      if (savedEvents) {
        return JSON.parse(savedEvents);
      }
    } catch (error) {
      console.error("Failed to parse events from localStorage", error);
    }
    return {
      [new Date().toISOString().split('T')[0]]: [
        { id: crypto.randomUUID(), title: '오늘의 할일 예시' }
      ]
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(CALENDAR_EVENTS_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage", error);
    }
  }, [events]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { calendarDays, monthName, yearName } = useCalendar(currentDate);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate(new Date(year, month - 1, 1));
  }, [year, month]);

  const handleNextMonth = useCallback(() => {
    setCurrentDate(new Date(year, month + 1, 1));
  }, [year, month]);

  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDate(null);
  }, []);

  const addEvent = useCallback((date: Date, title: string) => {
    const dateString = date.toISOString().split('T')[0];
    const newEvent: CalendarEvent = { id: crypto.randomUUID(), title };
    setEvents(prevEvents => {
      const dayEvents = prevEvents[dateString] ? [...prevEvents[dateString], newEvent] : [newEvent];
      return { ...prevEvents, [dateString]: dayEvents };
    });
  }, []);
  
  const deleteEvent = useCallback((date: Date, eventId: string) => {
    const dateString = date.toISOString().split('T')[0];
    setEvents(prevEvents => {
      const dayEvents = prevEvents[dateString] || [];
      const updatedDayEvents = dayEvents.filter(event => event.id !== eventId);
      
      const newEvents = { ...prevEvents };
      if (updatedDayEvents.length > 0) {
        newEvents[dateString] = updatedDayEvents;
      } else {
        delete newEvents[dateString];
      }
      
      return newEvents;
    });
  }, []);

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    const dateString = selectedDate.toISOString().split('T')[0];
    return events[dateString] || [];
  }, [selectedDate, events]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <CalendarHeader
          monthName={`${year}년 ${MONTH_NAMES[month]}`}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <CalendarGrid
          days={calendarDays}
          onDayClick={handleDayClick}
          events={events}
        />
      </div>

      {isModalOpen && selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedDate={selectedDate}
          events={selectedDayEvents}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
        />
      )}
       <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>Simple Calendar - Daily Planning Made Simple</p>
      </footer>
    </div>
  );
};

export default App;