import { create } from 'zustand';

interface GoalStore {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  goal: Goal | null;
  setGoal: (goal: Goal | null) => void;
  success: number;
  setSuccess: (success: number) => void;
  addSuccess: () => void;
  failure: number;
  setFailure: (failure: number) => void;
  addFailure: () => void;
}
export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),
  goal: null,
  setGoal: (goal) => set({ goal }),
  success: 0,
  setSuccess: (success) => set({ success }),
  addSuccess: () =>
    set((state) => ({
      success: state.success + 1,
    })),
  failure: 0,
  setFailure: (failure) => set({ failure }),
  addFailure: () =>
    set((state) => ({
      failure: state.failure + 1,
    })),
}));
