import { useState, type ChangeEvent, type FormEvent } from "react";
import { useModalStore } from "../../stores/modal";
import { useHabitStore } from "../../stores/habits";
import { format } from "date-fns";
import ExitModal from "./ExitModal";
import SaveDate from "../SaveDate";

export default function SaveHabit() {
  const { habits, setHabits, habit } = useHabitStore();
  const show_add = !habit ? `생성` : `수정`;
  const [name, setName] = useState("");
  const [today, setToay] = useState(format(new Date(), "yyyy-MM-dd"));
  const setModal = useModalStore((state) => state.setModal);
  function inputName(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.target.value);
  }
  function updateHabit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newHabit: Habit = {
      name: name,
      start_day: habit?.start_day || today,
      date: habit?.date || [],
    };
    setHabits([
      ...habits.filter((_habit) => _habit.name !== habit?.name),
      newHabit,
    ]);
    setModal(null);
  }
  const changeToday = (date: Date | null) => {
    if (!date) return;
    setToay(format(date, "yyyy-MM-dd"));
  };
  return (
    <div>
      <ExitModal />
      <h3 className={`text-center text-[1.3em] font-[600]`}>습관 {show_add}</h3>
      <form
        onSubmit={updateHabit}
        className={`flex justify-between items-center gap-[5px] flex-wrap`}
      >
        <label>이름</label>
        <input
          type="text"
          onChange={inputName}
          className={`border border-gray-600 p-[2px]
            rounded-[4px] whitespace-nowrap flex-1`}
        />
        <button
          type="submit"
          className={`p-[5px] bg-blue-600 rounded-[10px] 
            text-white hover:scale-[1.1]`}
        >
          {show_add}
        </button>
        <label>시작 날짜 임의 설정 (테스트)</label>
        <SaveDate selected_day="" onChange={changeToday} />
      </form>
    </div>
  );
}
