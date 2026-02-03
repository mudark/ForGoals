interface Habit {
  name: string;
  start_day: string;
  date: string[];
}
interface Goal {
  name: string;
  content: string;
  expired_day: string;
}
interface User {
  id: string;
  name: string;
  pw?: string,
}
interface CommonModalProps {
  setWarn: (warn: string) => void;
  setMsg: (msg: string) => void;
}
interface UserSlice {
  id: string;
  name: string;
  setId: (id: string) => void;
  setName: (name: string) => void;
  logIn: (user: User) => Promise<boolean>;
  logOut: () => void;
  signUp: (user: User) => Promise<boolean>;
}
interface GoalSlice {
  goals: Goal[];
  initGoals: (goals: Goal[]) => void;
  setGoals: (goals: Goal[]) => Promise<boolean>;
  insertGoal: (goal: Goal) => Promise<boolean>;
  modifyGoal: (_goal: Goal, goal: Goal) => Promise<boolean>;
  deleteGoal: (goal: Goal) => Promise<boolean>;
  success: number;
  initSuccess: (success: number) => void;
  setSuccess: (success: number) => Promise<boolean>;
  addSuccess: () => Promise<boolean>;
  failure: number;
  initFailure: (success: number) => void;
  setFailure: (failure: number) => Promise<boolean>;
  addFailure: () => Promise<boolean>;
}
interface HabitSlice {
  habits: Habit[];
  initHabits: (habits: Habit[]) => void;
  setHabits: (habits: Habit[]) => Promise<boolean>;
  insertHabit: (habit: Habit) => Promise<boolean>;
  modifyHabit: (_habit: Habit, habit: Habit) => Promise<boolean>;
  deleteHabit: (habit: Habit) => Promise<boolean>;
}
type UserStore = UserSlice & GoalSlice & HabitSlice;

interface Course {
  public_yn: string,
  id: string,
  shortname: string,
  name: string,
  url: string,
  course_image: string,
  org: string,
  org_name: string,
  enrollment_start: string,
  enrollment_end: string,
  study_start: string,
  study_end: string,
  professor: string
}
interface KmoocResponse {
  header: {
    page: number,
    size: number,
    totalCount: number
  },
  resultCode: string,
  resultMsg: string,
  totalCount: string,
  items: Course[],
}
interface CourseDetail {
  vod_playtime: string,
  certificate_yn: string,
  id: string,
  shortname: string,
  name: string,
  url: string,
  course_image: string,
  org: string,
  org_name: string,
  enrollment_start: string,
  enrollment_end: string,
  study_start: string,
  study_end: string,
  professor: string,
  public_yn: string,
  summary: string,
  classfy_name: string,
  middle_classfy_name: string,
  week: string,
  course_playtime: string
}
interface KmoocDetailResponse {
  totalCount: string,
  resultCode: string,
  resultMsg: string,
  results: CourseDetail
}
