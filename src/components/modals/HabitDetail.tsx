import { type MouseEvent } from "react";
import { useModalStore } from "../../stores/modal";
import { useHabitStore } from "../../stores/habits";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "../../styles/reactCalendar.css";
import SaveHabit from "./SaveHabit";
import ExitModal from "./ExitModal";
import SaveDate from "../SaveDate";

export default function HabitDetail() {
  const setModal = useModalStore((state) => state.setModal);
  const { habits, setHabits, habit, setHabit } = useHabitStore();
  function doHabit(e: MouseEvent) {
    e.preventDefault();
    if (!habit) return;
    const today = format(new Date(), "yyyy-MM-dd");
    if (habit.date.includes(today)) return;
    const updated_habit = { ...habit, date: [...habit.date, today] };
    setHabit(updated_habit);
    setHabits([
      ...habits.filter((_habit) => _habit.name !== habit.name),
      updated_habit,
    ]);
  }
  function updateHabit(e: MouseEvent) {
    e.preventDefault();
    setModal(<SaveHabit />);
  }
  function deleteHabit(e: MouseEvent) {
    e.preventDefault();
    setHabits([...habits.filter((_habit) => _habit.name !== habit?.name)]);
    setModal(null);
    setHabit(null);
  }
  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view == "month") {
      const date_string = format(date, "yyyy-MM-dd");
      return habit?.date.includes(date_string) ? "completed-day" : "";
    }
    return "";
  };
  const addDate = (date: Date | null) => {
    if (!date || !habit) return;
    const date_string = format(date, "yyyy-MM-dd");
    if (habit.date.includes(date_string)) return;
    const updated_habit = { ...habit, date: [...habit?.date, date_string] };
    setHabit(updated_habit);
    setHabits([
      ...habits.filter((_habit) => _habit.name !== habit?.name),
      updated_habit,
    ]);
  };
  return (
    <div
      className={`relative [&>button]:bg-zinc-300 
        [&>*]:p-[5px] [&>button]:rounded-[10px]`}
    >
      <ExitModal />
      <h3 className={`text-center text-[1.3em] font-[600]`}>{habit?.name}</h3>
      <p className={`border-y-[2px] border-blue-500`}>
        시작일 : {habit?.start_day}
      </p>
      <button type="button" onClick={doHabit}>
        완료
      </button>
      <button type="button" onClick={updateHabit}>
        수정
      </button>
      <button type="button" onClick={deleteHabit}>
        삭제
      </button>
      <div className={`flex justify-center items-center`}>
        <Calendar
          locale="ko-KR"
          value={new Date()}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          tileClassName={getTileClassName}
        />
      </div>
      <label>완료 날짜 저장 (테스트)</label>
      <br />
      <SaveDate selected_day="" onChange={addDate} />
      {habit?.date.map((day) => (
        <p key={day}>{day}</p>
      ))}
    </div>
  );
}
