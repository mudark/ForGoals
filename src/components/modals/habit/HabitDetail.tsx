import { useModalStore } from '../../../stores/modal';
import { useUserStore } from '../../../stores/user';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/reactCalendar.css';
import SaveHabit from './SaveHabit';
import SaveDate from '../../SaveDate';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { formatDay } from '../../../utils/time';

type HabitDetailProps = CommonModalProps & { habit: Habit };
export default function HabitDetail({
  setWarn,
  setMsg,
  habit: _habit,
}: HabitDetailProps) {
  const setModal = useModalStore((state) => state.setModal);
  const { modifyHabit, deleteHabit } = useUserStore();
  // 날짜가 기록되어 수정되면 즉시 반영해야 함
  const [habit, setHabit] = useState(_habit);
  const { mutate: saveDate } = useMutation({
    // 습관 날짜 저장
    mutationFn: async (date_str: string) => {
      const updated_habit = { ...habit, date: [...habit.date, date_str] };
      await modifyHabit(habit, updated_habit);
      setHabit(updated_habit);
    },
    onMutate: () => setMsg('저장 중...'),
    onError: () => setWarn('날짜 저장을 실패했습니다.'),
    onSettled: () => setMsg(''),
  });
  const { mutate: removeHabit } = useMutation({
    // 습관 삭제
    mutationFn: async () => await deleteHabit(habit),
    onMutate: () => setMsg('습관 삭제 중...'),
    onSuccess: () => setModal(null, null),
    onError: () => setWarn('습관 삭제를 실패했습니다.'),
    onSettled: () => setMsg(''),
  });
  const addDate = (date: Date | null) => {
    // 임의의 날을 기록함 (테스트용)
    if (!date || !habit) return;
    const date_str = formatDay(date);
    // 이미 기록되면 아무것도 안 함
    if (habit.date.includes(date_str)) return;
    saveDate(date_str);
  };
  function doHabit() {
    // 오늘 습관을 하면 기록함
    addDate(new Date());
  }
  function updateHabit() {
    // 습관 수정 모달로 이동
    setModal(SaveHabit, { habit: habit });
  }
  const getTileClassName = ({
    date: tile_date,
    view,
  }: {
    date: Date;
    view: string;
  }) => {
    // 캘린더에 습관을 한 날을 표시함
    if (view == 'month') {
      const date_string = formatDay(tile_date);
      if (habit.date.includes(date_string)) {
        return 'completed-day'; // 표시된 날 스타일
      }
    }
    return '';
  };
  return (
    <div className={`[&>button]:bg-zinc-400 [&>button]:w-[30%]`}>
      <h1 className={`text-center text-[1.3em] font-[600]`}>{habit?.name}</h1>
      <p className={`border-y-[2px] border-blue-500`}>
        시작일 : {habit?.start_day}
      </p>
      <button type="button" onClick={doHabit}>
        완료
      </button>
      <button type="button" onClick={updateHabit}>
        수정
      </button>
      <button type="button" onClick={() => removeHabit()}>
        삭제
      </button>
      <div className="flex justify-center items-center reset-calendar-styles">
        <Calendar
          locale="ko-KR"
          value={new Date()}
          key={habit.date.length}
          calendarType="gregory"
          formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })}
          tileClassName={getTileClassName}
        />
      </div>
      <label className="!w-full">임의의 완료 날짜 저장 (테스트)</label>
      <br />
      <SaveDate selected_day="" onChange={addDate} />
    </div>
  );
}
