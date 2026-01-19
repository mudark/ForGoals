import { useGoalStore } from "../../stores/goals";
import { useModalStore } from "../../stores/modal";
import SaveGoal from "./SaveGoal";
import ExitModal from "./ExitModal";

export default function GoalDetail() {
  const { goals, setGoals, goal } = useGoalStore();
  const { setModal } = useModalStore();
  function updateGoal() {
    setModal(<SaveGoal />);
  }
  function deleteGoal() {
    setGoals([...goals.filter((_goal) => _goal.name !== goal?.name)]);
    setModal(null);
  }
  function doGoal() {
    deleteGoal();
  }
  return (
    <div
      className={`relative [&>button]:bg-zinc-300 
        [&>*]:p-[5px] [&>button]:rounded-[10px]`}
    >
      <ExitModal />
      <h3 className={`text-center text-[1.3em] font-[600]`}>{goal?.name}</h3>
      <p>{goal?.content}</p>
      <p className={`border-y-[2px] border-blue-500`}>
        만료 기한 : {goal?.expired_day}
      </p>
      <button onClick={doGoal}>완료</button>
      <button onClick={updateGoal}>수정</button>
      <button onClick={deleteGoal}>삭제</button>
    </div>
  );
}
