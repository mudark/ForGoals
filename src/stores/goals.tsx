import { create } from "zustand";

interface GoalStore {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  goal: Goal | null;
  setGoal: (goal: Goal | null) => void;
}
export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),
  goal: null,
  setGoal: (goal) => set({ goal }),
}));
