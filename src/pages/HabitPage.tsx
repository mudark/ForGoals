import { useModalStore } from '../stores/modal';
import { useUserStore } from '../stores/user';
import SaveHabit from '../components/modals/habit/SaveHabit';
import HabitDetail from '../components/modals/habit/HabitDetail';
import useBaseQuery from '../hooks/useBaseQuery';
import BasePage from './BasePage';

export default function HabitPage() {
  const { habits, initHabits } = useUserStore();
  const { setModal } = useModalStore();
  // 습관 불러오기
  const { isLoading, isError } = useBaseQuery<Habit[]>('habits', initHabits);
  const blue_active_style = `gradient-btn`;
  const title = <h1>당신의 습관</h1>;
  if (isLoading) {
    // 로딩
    return (
      <BasePage>
        {title}
        <div className={blue_active_style}>습관을 가져오고 있습니다.</div>
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="my-[10px] p-[5px] bg-zinc-200 border border-zinc-300 
              rounded-[5px] shadow-sm text-gray-500 text-left font-[1000]"
          >
            . . .
          </div>
        ))}
      </BasePage>
    );
  } else if (isError) {
    // 에러
    return (
      <BasePage>
        {title}
        <div className={blue_active_style}>습관을 못 가져왔습니다.</div>
      </BasePage>
    );
  }
  const not_habit =
    habits.length !== 0 ? null : (
      <>
        <h1>습관이 없습니다.</h1>
        <p>당신의 습관을 추가하여 더 나은 삶에 한 걸음 가까워지세요.</p>
      </>
    );
  function addHabit() {
    // 습관 생성 모달 호출
    setModal(SaveHabit, { habit: null });
  }
  function showHabitDetail(habit: Habit) {
    // 습관 세부 내용 모달 호출
    setModal(HabitDetail, { habit: habit });
  }
  return (
    <BasePage>
      {title}
      <button type="button" onClick={addHabit} className="gradient-btn">
        습관 생성
      </button>
      {not_habit}
      {habits.map((_habit, index) => (
        <div
          key={index}
          className="my-[10px] p-[5px] rounded-[5px] 
            border border-gray-300 shadow-sm
            grid grid-cols-[1fr_80px] items-center"
        >
          <p className="truncate min-w-0">{_habit.name}</p>
          <button
            type="button"
            onClick={() => showHabitDetail(_habit)}
            className="p-[4px] font-bold text-blue-600 bg-blue-100 rounded-[4px]"
          >
            상세 보기
          </button>
        </div>
      ))}
    </BasePage>
  );
}
