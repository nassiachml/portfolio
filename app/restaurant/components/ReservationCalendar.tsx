"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

interface ReservationCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  existingReservations?: Array<{ date: string; time: string; guests: number }>;
  maxGuests?: number;
}

export function ReservationCalendar({
  selectedDate,
  onDateSelect,
  onTimeSelect,
  existingReservations = [],
  maxGuests = 50,
}: ReservationCalendarProps) {
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const getAvailableSlots = (date: string) => {
    const reservationsForDate = existingReservations.filter(
      (r) => r.date === date
    );
    const bookedGuests = reservationsForDate.reduce((sum, r) => sum + r.guests, 0);
    const availableGuests = maxGuests - bookedGuests;
    
    return timeSlots.map((time) => {
      const reservationsAtTime = reservationsForDate.filter((r) => r.time === time);
      const guestsAtTime = reservationsAtTime.reduce((sum, r) => sum + r.guests, 0);
      const isAvailable = guestsAtTime < maxGuests;
      const remainingCapacity = maxGuests - guestsAtTime;
      
      return {
        time,
        isAvailable,
        remainingCapacity,
        isFull: remainingCapacity <= 0,
      };
    });
  };

  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const handleTimeClick = (time: string, isAvailable: boolean) => {
    if (isAvailable) {
      setSelectedTime(time);
      onTimeSelect(time);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-red-900 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            onDateSelect(e.target.value);
            setSelectedTime("");
          }}
          min={minDate}
          max={maxDate}
          className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-800 text-gray-900"
          required
        />
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-bold text-red-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Heure
          </label>
          <div className="grid grid-cols-4 gap-2">
            {getAvailableSlots(selectedDate).map((slot) => (
              <button
                key={slot.time}
                type="button"
                onClick={() => handleTimeClick(slot.time, slot.isAvailable)}
                disabled={!slot.isAvailable}
                className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedTime === slot.time
                    ? "bg-red-800 text-white"
                    : slot.isAvailable
                    ? "bg-white text-red-800 border-2 border-red-800 hover:bg-red-50"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {slot.time}
                {slot.isAvailable && slot.remainingCapacity < 10 && (
                  <span className="block text-xs text-yellow-600">
                    {slot.remainingCapacity} places
                  </span>
                )}
              </button>
            ))}
          </div>
          {selectedDate && getAvailableSlots(selectedDate).every(s => !s.isAvailable) && (
            <p className="text-sm text-red-600 mt-2">
              Cette date est complète. Veuillez choisir une autre date.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

