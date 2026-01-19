import { useModalStore } from "../../stores/modal";

export default function ExitModal() {
  const { setModal } = useModalStore();
  return (
    <button
      type="button"
      onClick={() => setModal(null)}
      className={`absolute top-[5px] right-[5px] 
        w-[30px] h-[30px] !bg-blue-600 !rounded-[50%] 
        text-white hover:scale-[1.3] duration-200`}
    >
      X
    </button>
  );
}
