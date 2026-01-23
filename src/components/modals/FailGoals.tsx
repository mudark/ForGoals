import { useState, type MouseEvent } from 'react';
import { useGoalStore } from '../../stores/goals';
import { useModalStore } from '../../stores/modal';
import SaveDate from '../SaveDate';
import { format } from 'date-fns';

export default function FailGoals() {
  const { goals, setGoals } = useGoalStore();
  const { setModal } = useModalStore();
  const [fail_goals, setFailGoals] = useState(
    goals.filter((_goal) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const expired_day = new Date(_goal.expired_day).getTime();
      return expired_day < today;
    }),
  );
  function deleteGoal(e: MouseEvent, _goal: Goal) {
    e.preventDefault();
    setGoals(goals.filter((goal) => goal.name !== _goal.name));
    const updated_fail_goals = fail_goals.filter(
      (goal) => goal.name !== _goal.name,
    );
    setFailGoals(updated_fail_goals);
    if (updated_fail_goals.length === 0) setModal(null);
  }
  function updateGoal(_goal: Goal) {
    setGoals([...goals.filter((goal) => goal.name !== _goal.name), _goal]);
    const updated_fail_goals = fail_goals.filter(
      (goal) => goal.name !== _goal.name,
    );
    setFailGoals(updated_fail_goals);
    if (updated_fail_goals.length === 0) setModal(null);
  }
  return (
    <div
      className={`h-[90%] [&_button]:bg-blue-600 [&_button]:text-white
            [&_button]:p-[4px] [&_button]:rounded-[4px]`}
    >
      <h3 className={`text-center`}>실패한 목표</h3>
      <div className={`flex-1 overflow-y-auto whitespace-nowrap`}>
        {fail_goals.map((_goal, index) => (
          <div key={index}>
            <span>{_goal.name}</span>
            <button onClick={(e) => deleteGoal(e, _goal)}>삭제</button>
            <br />
            <span>변경할 만료일</span>
            <SaveDate
              selected_day={``}
              className={`!w-[50%]`}
              onChange={(date) => {
                if (!date) return;
                updateGoal({
                  name: _goal.name,
                  content: _goal.content,
                  expired_day: format(date, 'yyyy-MM-dd'),
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
