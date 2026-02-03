import { create } from 'zustand';
import { createGoalSlice } from './user/goalsSlice';
import { createHabitSlice } from './user/habitsSlice';
import { createUserSlice } from './user/userSlice';
// 사용자 정보 저장소 
export const useUserStore = create<UserStore>((...a) => ({
  ...createUserSlice(...a),
  ...createGoalSlice(...a),
  ...createHabitSlice(...a),
}));
