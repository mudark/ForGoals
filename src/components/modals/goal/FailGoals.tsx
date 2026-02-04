import { useUserStore } from '../../../stores/user';
import { useMutation } from '@tanstack/react-query';
import SaveDate from '../../SaveDate';
import { format } from 'date-fns';
import { useModalStore } from '../../../stores/modal';

type FailGoalsProps = CommonModalProps & { failed_goals: Goal[] };
export default function FailGoals({
  setWarn,
  setMsg,
  failed_goals,
}: FailGoalsProps) {
  const { deleteGoal, modifyGoal, addFailure } = useUserStore();
  const { setModal } = useModalStore();
  interface UpdateDateProps {
    date: Date;
    goal: Goal;
  }
  const { mutate: updateDate } = useMutation({
    mutationFn: async ({ date, goal }: UpdateDateProps) =>
      modifyGoal(goal, { ...goal, expired_day: format(date, 'yyyy-MM-dd') }),
    onMutate: () => setMsg('날짜 변경 중...'),
    onError: () => setWarn('날짜 변경을 실패했습니다.'),
    onSettled: async () => {
      setMsg('');
      setModal(null, null);
      addFailure();
    },
  });
  const { mutate: removeGoal } = useMutation({
    mutationFn: async (goal: Goal) => deleteGoal(goal),
    onMutate: () => setMsg('목표 삭제 중...'),
    onError: () => setWarn('목표 삭제를 실패했습니다.'),
    onSettled: async () => {
      setMsg('');
      setModal(null, null);
      addFailure();
    },
  });
  return (
    <div className="h-[90%] relative">
      <div
        className="absolute top-[-10px] right-[-10px] 
        w-[32px] h-[32px] bg-white"
      />
      <h1>실패한 목표</h1>
      <div className={`flex-1 overflow-y-auto whitespace-nowrap`}>
        {failed_goals.map((goal) => (
          <div key={goal.name} className="p-[5px] bg-zinc-200 rounded-[10px]">
            <span>{goal.name}</span>
            <button onClick={() => removeGoal(goal)}>삭제</button>
            <br />
            <span>변경할 만료일</span>
            <SaveDate
              selected_day={``}
              className={`!w-[50%]`}
              onChange={(date) => {
                if (!date) return;
                updateDate({ date, goal });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
