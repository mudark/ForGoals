import { useModalStore } from "../stores/modal";
import { useHabitStore } from "../stores/habits";
import SaveHabit from "../components/modals/SaveHabit";
import HabitDetail from "../components/modals/HabitDetail";

export default function MainPage() {
  const { habits, setHabit } = useHabitStore();
  const { setModal } = useModalStore();
  function addHabit() {
    setHabit(null);
    setModal(<SaveHabit />);
  }
  function showHabitDetail(_habit: Habit) {
    setHabit(_habit);
    setModal(<HabitDetail />);
  }
  return (
    <div className={`mt-[30px] m-auto max-w-[800px] w-[96%] p-[10px]`}>
      <button
        onClick={addHabit}
        className={`w-full p-[4px] text-white font-bold rounded-[4px] 
          bg-gradient-to-r from-blue-700 to-blue-400 
          shadow-[0_8px_20px_-6px_rgba(37,99,235,0.8)] 
          hover:scale-[1.1] active:scale-[0.9] duration-200 ease-in-out`}
      >
        습관 생성
      </button>
      {habits.map((_habit, index) => (
        <div
          key={index}
          className={`my-[10px] p-[5px] bg-white rounded-[5px] 
            border border-gray-300 shadow-sm active:scale-[0.9]
            duration-200 flex justify-between items-center`}
        >
          <span>{_habit.name}</span>
          <button
            type="button"
            onClick={() => showHabitDetail(_habit)}
            className={`p-[4px] font-bold text-blue-600 bg-blue-100 rounded-[4px]`}
          >
            상세 보기
          </button>
        </div>
      ))}
    </div>
  );
}
