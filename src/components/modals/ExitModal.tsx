import { useModalStore } from '../../stores/modal';
export default function ExitModal() {
  const { setModal } = useModalStore();
  // X 버튼 클릭 시 모달 꺼짐
  return (
    <button
      type="button"
      onClick={() => setModal(null, null)}
      className="absolute top-[5px] right-[5px] 
        w-[30px] h-[30px] !bg-blue-600 !rounded-[50%] 
        text-white hover:scale-[1.2] duration-200
        flex justify-center items-center"
    >
      X
    </button>
  );
}
