import { useState } from 'react';
import { useModalStore } from '../../../stores/modal';
import { useUserStore } from '../../../stores/user';
import { format } from 'date-fns';
import SaveDate from '../../SaveDate';
import { useInput } from '../../../hooks/useInput';
import { useMutation } from '@tanstack/react-query';

type SaveHabitProps = CommonModalProps & { habit: Habit | null };
export default function SaveHabit({ setMsg, setWarn, habit }: SaveHabitProps) {
  const { habits, insertHabit, modifyHabit } = useUserStore();
  const show_add = !habit ? `생성` : `수정`;
  const [name, changeName] = useInput(habit?.name ?? '');
  // 오늘은 원래 상수지만, 변경 가능함 (테스트용)
  const [today, setToay] = useState(
    habit?.start_day ?? format(new Date(), 'yyyy-MM-dd'),
  );
  const { setModal } = useModalStore();
  const { mutate } = useMutation({
    mutationFn: async (new_habit: Habit) => {
      if (!habit) return insertHabit(new_habit);
      else return modifyHabit(habit, new_habit);
    },
    onMutate: () => setMsg(`습관 ${show_add} 중...`),
    onSuccess: () => setModal(null, null),
    onError: () => setWarn(`습관 ${show_add}을 실패했습니다.`),
    onSettled: () => setMsg(''),
  });
  function updateHabit() {
    // 데이터가 있으면 수정하고 없으면 생성함
    if (name === '') {
      setWarn?.('습관 이름을 입력해주세요.');
      return;
    } else if (
      habit?.name !== name &&
      habits.some((_habit) => _habit.name === name)
    ) {
      setWarn?.('존재하는 습관 이름입니다.');
      return;
    }
    const new_habit: Habit = {
      name: name,
      start_day: today,
      date: habit?.date ?? [],
    };
    mutate(new_habit);
  }
  const changeToday = (date: Date | null) => {
    // 시작 날 수정 (테스트용)
    if (!date) return;
    setToay(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div>
      <h1 className={`text-center text-[1.3em] font-[600]`}>습관 {show_add}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateHabit();
        }}
      >
        <label htmlFor="new_habit_name">이름</label>
        <input
          id="new_habit_name"
          type="text"
          value={name}
          onChange={changeName}
        />
        <button type="submit" className={`gradient-btn`}>
          {show_add}
        </button>
        <p>시작 날짜 임의 설정 (테스트)</p>
        <SaveDate selected_day={today} onChange={changeToday} />
      </form>
    </div>
  );
}
