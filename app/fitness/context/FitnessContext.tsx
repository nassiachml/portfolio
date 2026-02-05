"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import type { User, Session, Goal, Routine, Coach, Booking, CoachCartItem } from "../types";
import { defaultFitnessData } from "../data/demoData";

interface FitnessContextType {
  user: User | null;
  users: User[];
  sessions: Session[];
  goals: Goal[];
  routines: Routine[];
  coaches: Coach[];
  bookings: Booking[];
  coachCart: CoachCartItem[];
  login: (email: string, password: string) => boolean;
  loginWithUser: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<Omit<User, "id" | "email">>) => void;
  addSession: (session: Omit<Session, "id" | "userId">) => void;
  addGoal: (goal: Omit<Goal, "id" | "userId">) => void;
  updateGoalProgress: (goalId: string, currentProgress: number) => void;
  addToCoachCart: (coachId: string, slot: string, durationMinutes: number) => boolean;
  removeFromCoachCart: (itemId: string) => void;
  clearCoachCart: () => void;
  checkoutCoachCart: () => string[];
  confirmPayment: (bookingId: string) => void;
  getSessionsForUser: (userId: string) => Session[];
  getGoalsForUser: (userId: string) => Goal[];
  getRoutinesByLevel: (level: string) => Routine[];
  getBookingsForUser: (userId: string) => Booking[];
  getCoachCartTotal: () => number;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

const DURATION_OPTIONS = [30, 60, 90];

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(defaultFitnessData.users);
  const [sessions, setSessions] = useState<Session[]>(defaultFitnessData.sessions);
  const [goals, setGoals] = useState<Goal[]>(defaultFitnessData.goals);
  const [routines, setRoutines] = useState<Routine[]>(defaultFitnessData.routines);
  const [coaches, setCoaches] = useState<Coach[]>(defaultFitnessData.coaches);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [coachCart, setCoachCart] = useState<CoachCartItem[]>([]);

  useEffect(() => {
    try {
      fetch("/fitness-data.json")
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (data?.users?.length) setUsers(data.users);
          if (data?.sessions?.length) setSessions(data.sessions);
          if (data?.goals?.length) setGoals(data.goals);
          if (data?.routines?.length) setRoutines(data.routines);
          if (data?.coaches?.length) setCoaches(data.coaches);
        })
        .catch(() => {});
    } catch {
      // use default data
    }
  }, []);

  const login = useCallback((email: string, _password: string): boolean => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  }, [users]);

  const loginWithUser = useCallback((u: User) => {
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCoachCart([]);
  }, []);

  const updateUser = useCallback((data: Partial<Omit<User, "id" | "email">>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
  }, [user]);

  const addSession = useCallback((session: Omit<Session, "id" | "userId">) => {
    if (!user) return;
    const newSession: Session = {
      ...session,
      id: `s${Date.now()}`,
      userId: user.id,
    };
    setSessions((prev) => [newSession, ...prev]);
  }, [user]);

  const addGoal = useCallback((goal: Omit<Goal, "id" | "userId">) => {
    if (!user) return;
    const newGoal: Goal = {
      ...goal,
      id: `o${Date.now()}`,
      userId: user.id,
    };
    setGoals((prev) => [newGoal, ...prev]);
  }, [user]);

  const updateGoalProgress = useCallback((goalId: string, currentProgress: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, currentProgress } : g))
    );
  }, []);

  const addToCoachCart = useCallback((coachId: string, slot: string, durationMinutes: number): boolean => {
    const coach = coaches.find((c) => c.id === coachId);
    if (!coach || !DURATION_OPTIONS.includes(durationMinutes)) return false;
    const totalPrice = Math.round((coach.price * durationMinutes) / 60);
    const item: CoachCartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      coachId,
      coachName: coach.name,
      specialty: coach.specialty,
      slot,
      durationMinutes,
      pricePerHour: coach.price,
      totalPrice,
    };
    setCoachCart((prev) => [...prev, item]);
    return true;
  }, [coaches]);

  const removeFromCoachCart = useCallback((itemId: string) => {
    setCoachCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCoachCart = useCallback(() => {
    setCoachCart([]);
  }, []);

  const checkoutCoachCart = useCallback((): string[] => {
    if (!user) return [];
    const newBookingIds: string[] = [];
    const newBookings: Booking[] = [];
    const slotsToRemove: Record<string, string[]> = {};
    coachCart.forEach((item) => {
      const newBooking: Booking = {
        id: `b${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        userId: user.id,
        coachId: item.coachId,
        coachName: item.coachName,
        slot: item.slot,
        durationMinutes: item.durationMinutes,
        amount: item.totalPrice,
        paid: false,
      };
      newBookingIds.push(newBooking.id);
      newBookings.push(newBooking);
      if (!slotsToRemove[item.coachId]) slotsToRemove[item.coachId] = [];
      slotsToRemove[item.coachId].push(item.slot);
    });
    setBookings((prev) => [...newBookings, ...prev]);
    setCoaches((prev) =>
      prev.map((c) => {
        const toRemove = slotsToRemove[c.id];
        if (!toRemove?.length) return c;
        return { ...c, availableSlots: c.availableSlots.filter((s) => !toRemove.includes(s)) };
      })
    );
    setCoachCart([]);
    return newBookingIds;
  }, [user, coachCart]);

  const confirmPayment = useCallback((bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, paid: true } : b))
    );
  }, []);

  const getSessionsForUser = useCallback((userId: string) => {
    return sessions.filter((s) => s.userId === userId).sort((a, b) => (b.date > a.date ? 1 : -1));
  }, [sessions]);

  const getGoalsForUser = useCallback((userId: string) => {
    return goals.filter((g) => g.userId === userId);
  }, [goals]);

  const getRoutinesByLevel = useCallback((level: string) => {
    return routines.filter((r) => r.level === level);
  }, [routines]);

  const getBookingsForUser = useCallback((userId: string) => {
    return bookings.filter((b) => b.userId === userId);
  }, [bookings]);

  const getCoachCartTotal = useCallback(() => {
    return coachCart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [coachCart]);

  const value: FitnessContextType = {
    user,
    users,
    sessions,
    goals,
    routines,
    coaches,
    bookings,
    coachCart,
    login,
    loginWithUser,
    logout,
    updateUser,
    addSession,
    addGoal,
    updateGoalProgress,
    addToCoachCart,
    removeFromCoachCart,
    clearCoachCart,
    checkoutCoachCart,
    confirmPayment,
    getSessionsForUser,
    getGoalsForUser,
    getRoutinesByLevel,
    getBookingsForUser,
    getCoachCartTotal,
  };

  return (
    <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>
  );
}

export function useFitness() {
  const ctx = useContext(FitnessContext);
  if (ctx === undefined) {
    throw new Error("useFitness must be used within FitnessProvider");
  }
  return ctx;
}
