import { type StateCreator } from 'zustand';
import { loginToNotion, signUpToNotion } from '../../apis/notionApi';
import { token_storage } from '../../utils/auth';

export const createUserSlice: StateCreator<UserStore, [], [], UserSlice> = (set, get) => ({
  id: '',
  name: '',
  setId: (id) => set({id}),
  setName: (name) => set({name}),
  logIn: async ({id,name,pw}) => {
    if (!pw) return false;
    const user = await loginToNotion(id, pw);
    console.log("login user : ",user);
    if (!user) return false;
    set({ id, name: user.name });
    return true;
  },
  logOut: () => {
    token_storage.remove();
    set({ id: '', name: '' });
    get().initGoals([]);
    get().initHabits([]);
    get().initSuccess(0);
    get().initFailure(0);
  },
  signUp: async (user) => {
    console.log("회윈가입 시도");
    if (!(await signUpToNotion(user))) return false;
    set({ id: user.id, name: user.name });
    console.log("회원가입 성공 : ", get().id);
    return true;
  },
});
