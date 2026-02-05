import type { User, Session, Goal, Routine, Coach } from "../types";

export const defaultUsers: User[] = [
  { id: "u1", name: "User1 Test", email: "user1@mail.com", age: 43, weight: 74, height: 187, level: "débutant" },
  { id: "u2", name: "User2 Test", email: "user2@mail.com", age: 19, weight: 50, height: 186, level: "débutant" },
  { id: "u3", name: "User3 Test", email: "user3@mail.com", age: 33, weight: 99, height: 179, level: "avancé" },
  { id: "u4", name: "User4 Test", email: "user4@mail.com", age: 19, weight: 89, height: 164, level: "débutant" },
  { id: "u5", name: "User5 Test", email: "user5@mail.com", age: 30, weight: 97, height: 190, level: "intermédiaire" },
];

export const defaultSessions: Session[] = [
  { id: "s1", userId: "u1", type: "Musculation", duration: 71, caloriesBurned: 248, date: "2026-01-09" },
  { id: "s2", userId: "u1", type: "Yoga", duration: 48, caloriesBurned: 334, date: "2026-01-25" },
  { id: "s3", userId: "u1", type: "Cardio", duration: 45, caloriesBurned: 320, date: "2026-01-15" },
  { id: "s4", userId: "u2", type: "Pilates", duration: 21, caloriesBurned: 511, date: "2025-12-11" },
  { id: "s5", userId: "u2", type: "Musculation", duration: 77, caloriesBurned: 271, date: "2025-12-16" },
  { id: "s6", userId: "u2", type: "HIIT", duration: 64, caloriesBurned: 604, date: "2026-01-18" },
  { id: "s7", userId: "u3", type: "Cardio", duration: 65, caloriesBurned: 658, date: "2025-12-06" },
  { id: "s8", userId: "u3", type: "Yoga", duration: 64, caloriesBurned: 163, date: "2025-12-13" },
  { id: "s9", userId: "u3", type: "Musculation", duration: 62, caloriesBurned: 176, date: "2025-12-15" },
  { id: "s10", userId: "u3", type: "Pilates", duration: 51, caloriesBurned: 543, date: "2026-01-17" },
  { id: "s11", userId: "u4", type: "Musculation", duration: 47, caloriesBurned: 632, date: "2026-01-27" },
  { id: "s12", userId: "u4", type: "Cardio", duration: 88, caloriesBurned: 565, date: "2026-01-13" },
  { id: "s13", userId: "u5", type: "HIIT", duration: 67, caloriesBurned: 499, date: "2025-12-04" },
  { id: "s14", userId: "u5", type: "Yoga", duration: 72, caloriesBurned: 479, date: "2025-12-23" },
  { id: "s15", userId: "u5", type: "HIIT", duration: 35, caloriesBurned: 322, date: "2026-01-18" },
];

export const defaultGoals: Goal[] = [
  { id: "o1", userId: "u1", goal: "Faire X séances par semaine", currentProgress: 2, target: 3, unit: "séances" },
  { id: "o2", userId: "u1", goal: "Faire X séances par semaine", currentProgress: 2, target: 8, unit: "kg" },
  { id: "o3", userId: "u2", goal: "Prendre du muscle", currentProgress: 1, target: 4, unit: "km" },
  { id: "o4", userId: "u3", goal: "Prendre du muscle", currentProgress: 8, target: 17, unit: "séances" },
  { id: "o5", userId: "u4", goal: "Perdre du poids", currentProgress: 18, target: 18, unit: "kg" },
  { id: "o6", userId: "u5", goal: "Perdre du poids", currentProgress: 4, target: 8, unit: "séances" },
];

export const defaultRoutines: Routine[] = [
  { id: "r1", level: "intermédiaire", name: "Routine 1", exercises: [{ name: "Pompes", reps: 34 }, { name: "Corde à sauter", reps: 52 }, { name: "Crunchs", reps: 13 }] },
  { id: "r2", level: "avancé", name: "Routine 2", exercises: [{ name: "Corde à sauter", reps: 15 }, { name: "Planche", duration: 93 }, { name: "Burpees", duration: 168 }] },
  { id: "r9", level: "débutant", name: "Routine 9", exercises: [{ name: "Squats", reps: 47 }, { name: "Crunchs", duration: 162 }, { name: "Fentes", duration: 147 }] },
  { id: "r14", level: "débutant", name: "Routine 14", exercises: [{ name: "Crunchs", reps: 15 }, { name: "Pompes", reps: 43 }] },
  { id: "r15", level: "débutant", name: "Routine 15", exercises: [{ name: "Crunchs", duration: 122 }, { name: "Corde à sauter", duration: 89 }] },
];

export const defaultCoaches: Coach[] = [
  { id: "c1", name: "Lucas Test", specialty: "Pilates", price: 27, availableSlots: ["2026-02-11T21:54", "2026-02-04T21:54", "2026-02-16T19:54"] },
  { id: "c2", name: "Emma Test", specialty: "HIIT", price: 33, availableSlots: ["2026-02-08T19:54", "2026-02-11T23:54", "2026-02-16T04:54"] },
  { id: "c3", name: "Marc Test", specialty: "Yoga", price: 44, availableSlots: ["2026-02-08T23:54", "2026-02-05T20:54", "2026-02-12T20:54"] },
  { id: "c4", name: "Sophie Test", specialty: "Musculation", price: 46, availableSlots: ["2026-02-06T20:54", "2026-02-07T03:54", "2026-02-06T19:54"] },
  { id: "c5", name: "Alice Test", specialty: "Yoga", price: 30, availableSlots: ["2026-02-15T02:54", "2026-02-08T03:54", "2026-02-04T19:54"] },
  { id: "c6", name: "Nina Test", specialty: "Musculation", price: 45, availableSlots: ["2026-02-13T03:54", "2026-02-05T00:54", "2026-02-05T02:54"] },
  { id: "c7", name: "Julien Test", specialty: "Cardio", price: 40, availableSlots: ["2026-02-07T03:54", "2026-02-08T05:54", "2026-02-11T07:54"] },
  { id: "c8", name: "Laura Test", specialty: "Cardio", price: 47, availableSlots: ["2026-02-07T21:54", "2026-02-14T21:54", "2026-02-14T06:54"] },
  { id: "c9", name: "Thomas Test", specialty: "Cardio", price: 36, availableSlots: ["2026-02-10T07:54", "2026-02-15T07:54", "2026-02-07T06:54"] },
  { id: "c10", name: "Camille Test", specialty: "Pilates", price: 23, availableSlots: ["2026-02-14T19:54", "2026-02-09T06:54", "2026-02-09T20:54"] },
];

export interface FitnessData {
  users: User[];
  sessions: Session[];
  goals: Goal[];
  routines: Routine[];
  coaches: Coach[];
}

export const defaultFitnessData: FitnessData = {
  users: defaultUsers,
  sessions: defaultSessions,
  goals: defaultGoals,
  routines: defaultRoutines,
  coaches: defaultCoaches,
};
