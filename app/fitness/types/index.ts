export type UserLevel = "débutant" | "intermédiaire" | "avancé";

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  level: UserLevel;
}

export interface Session {
  id: string;
  userId: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

export interface Goal {
  id: string;
  userId: string;
  goal: string;
  currentProgress: number;
  target: number;
  unit: string;
}

export interface Exercise {
  name: string;
  reps?: number;
  duration?: number;
}

export interface Routine {
  id: string;
  level: UserLevel;
  name: string;
  exercises: Exercise[];
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  price: number;
  availableSlots: string[];
}

export interface Booking {
  id: string;
  userId: string;
  coachId: string;
  coachName: string;
  slot: string;
  durationMinutes?: number;
  amount: number;
  paid: boolean;
}

export interface CoachCartItem {
  id: string;
  coachId: string;
  coachName: string;
  specialty: string;
  slot: string;
  durationMinutes: number;
  pricePerHour: number;
  totalPrice: number;
}
