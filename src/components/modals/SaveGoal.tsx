import { useReducer, type ChangeEvent } from "react";
import { useGoalStore } from "../../stores/goals";
import { useModalStore } from "../../stores/modal";
import { format } from "date-fns";
import SaveDate from "../SaveDate";
import ExitModal from "./ExitModal";

export default function SaveGoal() {
  type GoalFormAction =
    | { type: "SUBMIT" }
    | {
        type: "NAME" | "CONTENT";
        event: ChangeEvent<HTMLInputElement>;
      }
    | { type: "EXPIRED"; date: Date | null };

  function formReducer(state: Goal, action: GoalFormAction) {
    switch (action.type) {
      case "NAME":
        return { ...state, name: action.event.target.value };
      case "CONTENT":
        return { ...state, content: action.event.target.value };
      case "EXPIRED":
        const date_string = action.date
          ? format(action.date, "yyyy-MM-dd")
          : "";
        return { ...state, expired_day: date_string };
    }
    return state;
  }
  const { goals, setGoals, goal } = useGoalStore();
  const setModal = useModalStore((state) => state.setModal);
  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    content: "",
    expired_day: "",
  });
  const show_add = !goal ? `생성` : `수정`;
  function onSubmit() {
    setGoals([...goals.filter((_goal) => _goal.name !== goal?.name), state]);
    setModal(null);
  }
  return (
    <div>
      <ExitModal />
      <h3 className={`text-center text-[1.3em] font-[600]`}>목표 {show_add}</h3>
      <form
        onSubmit={onSubmit}
        className={`grid grid-cols-[80px_1fr] gap-[5px] items-center
          [&>input]:border [&>input]:border-gray-600 [&>input]:p-[2px] 
          [&>input]:rounded-[4px] [&>input]:whitespace-nowrap`}
      >
        <label>이름</label>
        <input
          type="text"
          onChange={(e) => dispatch({ type: "NAME", event: e })}
        />
        <label>내용</label>
        <input
          type="text"
          onChange={(e) => dispatch({ type: "CONTENT", event: e })}
        />
        <label>만료 기한</label>
        <SaveDate
          selected_day={state.expired_day}
          onChange={(date: Date | null) => dispatch({ type: "EXPIRED", date })}
        />
        <button
          type="submit"
          className={`p-[5px] bg-blue-600 rounded-[10px] text-white 
            hover:scale-[1.1] col-span-2 justify-self-center `}
        >
          {show_add}
        </button>
      </form>
    </div>
  );
}
