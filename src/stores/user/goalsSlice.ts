import { type StateCreator } from 'zustand';
import { saveToNotion } from '../../apis/notionApi';

export const createGoalSlice: StateCreator<UserStore, [], [], GoalSlice> = (set,get)=>({
  goals: [],
  initGoals: (goals) => set({ goals }),
  setGoals: async (goals) => {
    const is_success = await saveToNotion(get().id + '_goals', goals);
    if (!is_success) {
      //console.log("서버 저장 실패!");
      return false; 
    }
    //console.log("서버 저장 성공!");
    set({ goals });
    //console.log("목표 : ", goals);
    return true;
  },
  insertGoal: async (goal) => {
    const updated_goals = [...get().goals, goal];
    return await get().setGoals(updated_goals);
  },
  modifyGoal: async (_goal, goal) => {
    const updated_goals = get().goals.map((g) =>
      g.name === _goal.name ? goal : g,
    );
    return await get().setGoals(updated_goals);
  },
  deleteGoal: async (goal) => {
    const updated_goals = get().goals.filter((g) => g.name !== goal.name);
    //console.log("삭제 전 개수:", get().goals.length);
    //console.log("삭제 후 예상 개수:", updated_goals.length);
    return await get().setGoals(updated_goals);
  },
  success: 0,
  initSuccess: (success) => set({ success }),
  setSuccess: async (success) => {
    const is_success = await saveToNotion(get().id + '_goal_success', success);
    if (!is_success) return false;
    set({ success });
    return true;
  },
  addSuccess: async () => {
    return get().setSuccess(get().success + 1);
  },
  failure: 0,
  initFailure: (failure) => set({ failure }),
  setFailure: async (failure) => {
    const is_success = await saveToNotion(get().id + '_goal_failure', failure);
    if (!is_success) return false;
    set({ failure });
    return true;
  },
  addFailure: async () => {
    return get().setFailure(get().failure + 1);
  },
});
