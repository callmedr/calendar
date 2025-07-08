
export interface CalendarEvent {
  id: string;
  title: string;
}

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
}
