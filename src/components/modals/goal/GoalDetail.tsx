import { useUserStore } from '../../../stores/user';
import { useModalStore } from '../../../stores/modal';
import SaveGoal from './SaveGoal';
import { useMutation } from '@tanstack/react-query';

type GoalDetailProps = CommonModalProps & { goal: Goal };
export default function GoalDetail({ setWarn, setMsg, goal }: GoalDetailProps) {
  const { deleteGoal, addSuccess } = useUserStore();
  const { setModal } = useModalStore();
  const { mutate: removeGoal } = useMutation({
    // 목표 삭제
    mutationFn: async () => await deleteGoal(goal),
    onMutate: () => setMsg('목표 삭제 중...'),
    onSuccess: () => setModal(null, null),
    onError: () => setWarn('목표 삭제를 실패했습니다.'),
    onSettled: () => setMsg(''),
  });
  const { mutateAsync: doGoal } = useMutation({
    // 목표 완료
    mutationFn: async () => {
      const [res1, res2] = await Promise.all([addSuccess(), deleteGoal(goal)]);
      if (!res1 || !res2) throw new Error();
      return true;
    },
    onMutate: () => setMsg('처리 중...'),
    onSuccess: () => setModal(null, null),
    onError: () => setWarn('목표 완료를 실패했습니다.'),
    onSettled: () => setMsg(''),
  });
  return (
    <div className={`[&>button]:bg-zinc-400 [&>button]:w-[30%]`}>
      <h1>{goal?.name}</h1>
      <p>{goal?.content}</p>
      <p className={`border-y-[2px] border-blue-500`}>
        만료 기한 : {goal?.expired_day}
      </p>
      <button type="button" onClick={async () => doGoal()}>
        완료
      </button>
      <button type="button" onClick={() => setModal(SaveGoal, { goal: goal })}>
        수정
      </button>
      <button type="button" onClick={() => removeGoal()}>
        삭제
      </button>
    </div>
  );
}
