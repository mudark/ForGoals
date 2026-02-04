import { useReducer, type ChangeEvent, type FormEvent } from 'react';
import { useUserStore } from '../../../stores/user';
import { useModalStore } from '../../../stores/modal';
import { format } from 'date-fns';
import SaveDate from '../../SaveDate';
import { useMutation } from '@tanstack/react-query';

type SaveGoalProps = CommonModalProps & { goal: Goal | null };
export default function SaveGoal({
  setWarn,
  setMsg,
  goal: _goal,
}: SaveGoalProps) {
  const { goals, insertGoal, modifyGoal } = useUserStore();
  const setModal = useModalStore((state) => state.setModal);
  const show_add = !_goal ? '생성' : '수정';
  const { mutate } = useMutation({
    // 목표 생성 또는 수정
    mutationFn: async () => {
      if (!_goal) return await insertGoal(goal);
      else return await modifyGoal(_goal, goal);
    },
    onMutate: () => setMsg(`목표 ${show_add} 중 ...`),
    onSuccess: () => setModal(null, null),
    onError: () => setWarn(`목표 ${show_add}을 실패했습니다.`),
    onSettled: () => setMsg(''),
  });
  type GoalFormAction =
    | { type: 'NAME' | 'CONTENT'; event: ChangeEvent<HTMLInputElement> }
    | { type: 'EXPIRED'; date: Date | null };
  function formReducer(state: Goal, action: GoalFormAction) {
    // 입력란 값 변경
    switch (action.type) {
      case 'NAME': // 입력란 이름 변경
        return { ...state, name: action.event.target.value };
      case 'CONTENT': // 입력란 내용 변경
        return { ...state, content: action.event.target.value };
      case 'EXPIRED': // 입력란 날짜 변경
        const date_string = action.date
          ? format(action.date, 'yyyy-MM-dd')
          : '';
        return { ...state, expired_day: date_string };
    }
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 목표 제출 가능 여부 확인
    if (goal.name === '') {
      setWarn?.('목표 이름을 입력해주세요.');
      return;
    } else if (
      _goal?.name !== goal.name &&
      goals.some((g) => g.name === goal.name)
    ) {
      setWarn?.('존재하는 목표 이름입니다.');
      return;
    } else if (goal.content === '') {
      setWarn?.('목표 내용을 입력해주세요.');
      return;
    } else if (goal.expired_day === '') {
      setWarn?.('목표 만료 기한을 설정해주세요.');
      return;
    }
    mutate(); // 목표 제출
  }
  // 입력란 초기화, 수정 시 기존의 목표를 입력란에 복사
  const [goal, dispatch] = useReducer(
    formReducer,
    _goal ?? {
      name: '',
      content: '',
      expired_day: '',
    },
  );
  return (
    <div>
      <h1>목표 {show_add}</h1>
      <form onSubmit={submit}>
        <label htmlFor="new_goal_name">이름</label>
        <input
          id="new_goal_name"
          type="text"
          value={goal.name ?? ''}
          onChange={(e) => dispatch({ type: 'NAME', event: e })}
        />
        <label htmlFor="new_goal_content">내용</label>
        <input
          id="new_goal_content"
          type="text"
          value={goal.content ?? ''}
          onChange={(e) => dispatch({ type: 'CONTENT', event: e })}
        />
        <label>만료 기한</label>
        <SaveDate
          className="!w-[60%]"
          selected_day={goal.expired_day ?? ''}
          onChange={(date: Date | null) => dispatch({ type: 'EXPIRED', date })}
        />
        <button type="submit" className="gradient-btn">
          {show_add}
        </button>
      </form>
    </div>
  );
}
