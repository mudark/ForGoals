import GoalSuccessRate from '../components/GoalSuccessRate';
import HabitsSuccessRate from '../components/HabitsSuccessRate';
import UserInfo from '../components/modals/user/UserInfo';
import { useModalStore } from '../stores/modal';
import BasePage from './BasePage';

export default function MainPage() {
  const { setModal } = useModalStore();
  return (
    <BasePage>
      <button
        className="gradient-btn"
        type="button"
        onClick={() => setModal(UserInfo, null)}
      >
        내 정보 자세히 보기
      </button>
      <h1>목표 성공률</h1>

      <GoalSuccessRate />
      <h1>습관 성공률</h1>
      <HabitsSuccessRate />
    </BasePage>
  );
}
