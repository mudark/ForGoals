import { type StateCreator } from 'zustand';
import { saveToNotion } from '../../apis/notionApi';

export const createHabitSlice: StateCreator<UserStore, [], [], HabitSlice> = (set, get) => ({
  habits: [],
  initHabits: (habits) => set({ habits }),
  setHabits: async (habits) => {
    const is_success = await saveToNotion(get().id+'_habits', habits);
    if (!is_success) return false;
    set({ habits });
    return true;
  },
  insertHabit: async (habit) => {
    const updated_habits = [...get().habits, habit];
    return await get().setHabits(updated_habits);
  },
  modifyHabit: async (_habit, habit) => {
    const updated_habits = get().habits.map((h) =>
      h.name === _habit.name ? habit : h,
    );
    return await get().setHabits(updated_habits);
  },
  deleteHabit: async (habit) => {
    const updated_habits = get().habits.filter((h) => h.name !== habit.name);
    return await get().setHabits(updated_habits);
  },
});
