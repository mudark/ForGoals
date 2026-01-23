import { useEffect, type MouseEvent } from 'react';
import { useGoalStore } from '../stores/goals';
import { useModalStore } from '../stores/modal';
import SaveGoal from '../components/modals/SaveGoal';
import GoalDetail from '../components/modals/GoalDetail';
import FailGoals from '../components/modals/FailGoals';

export default function GoalPage() {
  const { goals, setGoal, failure, setFailure } = useGoalStore();
  const { modal, setModal } = useModalStore();
  function addGoal(e: MouseEvent) {
    e.preventDefault();
    setGoal(null);
    setModal(<SaveGoal />);
  }
  function showGoalDetail(e: MouseEvent, goal: Goal) {
    e.preventDefault();
    setGoal(goal);
    setModal(<GoalDetail />);
  }
  useEffect(() => {
    if (modal || goals.length === 0) return;
    const filtered_goals = goals.filter((_goal) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const expired_day = new Date(_goal.expired_day).getTime();
      return expired_day < today;
    });
    if (filtered_goals.length > 0) {
      setModal(<FailGoals />);
      setFailure(failure + filtered_goals.length);
    }
  }, [goals, modal, setModal, failure, setFailure]);
  return (
    <div className={`mt-[30px] m-auto max-w-[800px] w-[96%] p-[10px]`}>
      <button
        onClick={addGoal}
        className={`w-full p-[4px] text-white font-bold rounded-[4px] 
          bg-gradient-to-r from-blue-700 to-blue-400 
          shadow-[0_8px_20px_-6px_rgba(37,99,235,0.8)] 
          hover:scale-[1.1] active:scale-[0.9] duration-200 ease-in-out`}
      >
        목표 생성
      </button>
      {goals.map((goal, index) => (
        <div
          key={index}
          className={`my-[10px] p-[5px] bg-white border border-zinc-300 
            rounded-[5px]  shadow-sm active:scale-[0.9] duration-200 
            grid grid-cols-[1fr_100px_80px] items-center overflow-hidden`}
        >
          <span className={`truncate`}>{goal.name}</span>
          <span>{goal.expired_day}</span>
          <button
            onClick={(e) => showGoalDetail(e, goal)}
            className={`p-[4px] font-bold text-blue-600 bg-blue-100 rounded-[4px]`}
          >
            세부 사항
          </button>
        </div>
      ))}
    </div>
  );
}
