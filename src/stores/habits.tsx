import { create } from "zustand";

interface HabitStore {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  habit: Habit | null;
  setHabit: (habit: Habit | null) => void;
}
export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],
  setHabits: (habits) => set({ habits }),
  habit: null,
  setHabit: (habit) => set({ habit }),
}));
