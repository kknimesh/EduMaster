import React, { useState, useMemo } from 'react';
import { Icons } from '../../assets/icons';
import Button from './Button';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  description?: string;
  type?: 'assignment' | 'exam' | 'class' | 'meeting' | 'deadline' | 'event';
  color?: string;
  course?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date, events: CalendarEvent[]) => void;
  variant?: 'month' | 'week' | 'agenda';
  showWeekends?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  selectedDate,
  onDateSelect,
  onEventClick,
  onDateClick,
  variant = 'month',
  showWeekends = true,
  minDate,
  maxDate,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = showWeekends 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-500 text-white';
      case 'exam':
        return 'bg-red-500 text-white';
      case 'class':
        return 'bg-green-500 text-white';
      case 'meeting':
        return 'bg-purple-500 text-white';
      case 'deadline':
        return 'bg-orange-500 text-white';
      case 'event':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date): boolean => {
    return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    setCurrentDate(date);
    onDateSelect?.(date);
    
    const dateEvents = getEventsForDate(date);
    onDateClick?.(date, dateEvents);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setViewDate(newDate);
  };

  const navigateToToday = () => {
    const today = new Date();
    setViewDate(today);
    setCurrentDate(today);
    onDateSelect?.(today);
  };

  // Generate calendar days for month view
  const generateMonthCalendar = useMemo(() => {
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const lastDay = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
    const firstDayWeekday = showWeekends ? firstDay.getDay() : (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];

    // Add empty cells for previous month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
    }

    return days;
  }, [viewDate, showWeekends]);

  if (variant === 'agenda') {
    const sortedEvents = [...events]
      .filter(event => event.date >= new Date(Date.now() - 24 * 60 * 60 * 1000)) // Show from yesterday onwards
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 10); // Show next 10 events

    return (
      <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="p-4">
          {sortedEvents.length === 0 ? (
            <div className="text-center py-8">
              <Icons.Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming events</h3>
              <p className="mt-1 text-sm text-gray-500">Your schedule is clear for now.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onEventClick?.(event)}
                >
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${event.color || getEventColor(event.type || 'event')}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </h4>
                      <div className="text-xs text-gray-500">
                        {event.startTime && event.endTime && `${event.startTime} - ${event.endTime}`}
                      </div>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Icons.Calendar className="h-3 w-3 mr-1" />
                      {event.date.toLocaleDateString()}
                      {event.course && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{event.course}</span>
                        </>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <Icons.ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToToday}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <Icons.ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className={`grid ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'} gap-px mb-2`}>
          {dayNames.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className={`grid ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'} gap-px bg-gray-200 rounded-lg overflow-hidden`}>
          {generateMonthCalendar.map((date, index) => {
            if (!date) {
              return <div key={index} className="bg-gray-50 h-24" />;
            }

            const dateEvents = getEventsForDate(date);
            const disabled = isDateDisabled(date);
            const today = isToday(date);
            const selected = isSelected(date);

            return (
              <div
                key={date.toISOString()}
                className={`
                  bg-white h-24 p-1 cursor-pointer transition-colors duration-200
                  ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}
                  ${today ? 'ring-2 ring-blue-500 ring-inset' : ''}
                  ${selected ? 'bg-blue-100' : ''}
                `}
                onClick={() => !disabled && handleDateClick(date)}
              >
                <div className="h-full flex flex-col">
                  <div className={`
                    text-sm font-medium text-center mb-1
                    ${today ? 'text-blue-600' : 'text-gray-900'}
                  `}>
                    {date.getDate()}
                  </div>
                  
                  <div className="flex-1 space-y-1 overflow-hidden">
                    {dateEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`
                          text-xs px-1 py-0.5 rounded truncate cursor-pointer
                          ${event.color || getEventColor(event.type || 'event')}
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dateEvents.length > 2 && (
                      <div className="text-xs text-gray-500 px-1">
                        +{dateEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      {events.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            {['assignment', 'exam', 'class', 'meeting', 'deadline'].map((type) => {
              const hasType = events.some(event => event.type === type);
              if (!hasType) return null;
              
              return (
                <div key={type} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getEventColor(type)}`} />
                  <span className="text-sm text-gray-600 capitalize">{type}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;