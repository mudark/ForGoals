import { useEffect, type MouseEvent } from 'react';
import { useUserStore } from '../stores/user';
import { useModalStore } from '../stores/modal';
import SaveGoal from '../components/modals/goal/SaveGoal';
import GoalDetail from '../components/modals/goal/GoalDetail';
import FailGoals from '../components/modals/goal/FailGoals';
import useBaseQuery from '../hooks/useBaseQuery';
import BasePage from './BasePage';

export default function GoalPage() {
  const { goals, initGoals, initSuccess, initFailure } = useUserStore();
  useBaseQuery<number>('goal_failure', initFailure);
  useBaseQuery<number>('goal_success', initSuccess);
  const { modal, setModal } = useModalStore();
  const { isLoading, isError } = useBaseQuery('goals', initGoals);
  useEffect(() => {
    // 만료 기한 지난 목표가 있다면 자동으로 실패 목표 모달 호출
    if (!!modal || goals.length === 0) return;
    const filtered_goals = goals.filter((_goal) => {
      // 실패한 목표 필터링
      const today = new Date().setHours(0, 0, 0, 0);
      const expired_day = new Date(_goal.expired_day).getTime();
      //console.log('expired_day : ', expired_day);
      return expired_day < today;
    });
    if (filtered_goals.length > 0) {
      // 모달 호출
      setModal(FailGoals, { failed_goals: filtered_goals });
    }
  }, [goals, modal]);
  const blue_active_style = 'gradient-btn';
  const title = <h1>당신의 목표</h1>;
  if (isLoading) {
    return (
      <BasePage>
        {title}
        <div className={blue_active_style}>목표를 가져오고 있습니다.</div>
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="!my-[10px] p-[5px] border border-zinc-300 font-[1000] 
              rounded-[5px] shadow-sm text-zinc-500 text-left bg-zinc-200"
          >
            . . .
          </div>
        ))}
      </BasePage>
    );
  } else if (isError) {
    return (
      <BasePage>
        {title}
        <div className={blue_active_style}>목표를 못 가져왔습니다.</div>
      </BasePage>
    );
  }
  function addGoal(e: MouseEvent) {
    e.preventDefault();
    setModal(SaveGoal, { goal: null });
  }
  function showGoalDetail(e: MouseEvent, goal: Goal) {
    e.preventDefault();
    setModal(GoalDetail, { goal: goal });
  }
  return (
    <BasePage>
      {title}
      <button onClick={addGoal} className={blue_active_style}>
        목표 생성
      </button>
      {goals.length !== 0 ? null : (
        <>
          <h1>목표가 없습니다.</h1>
          <p>당신의 목표를 추가하여 더 나은 삶에 한 걸음 가까워지세요.</p>
        </>
      )}
      {goals.map((goal) => (
        <div
          key={goal.name}
          className="my-[10px] p-[5px] bg-white 
            rounded-[5px] shadow-sm border border-zinc-300
            grid grid-cols-[1fr_100px_80px] items-center"
        >
          <span className="truncate min-w-0">{goal.name}</span>
          <span>{goal.expired_day}</span>
          <button
            onClick={(e) => showGoalDetail(e, goal)}
            className="p-[4px] font-bold text-blue-600 bg-blue-100 rounded-[4px]"
          >
            세부 사항
          </button>
        </div>
      ))}
    </BasePage>
  );
}
