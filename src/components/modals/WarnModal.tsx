import { useModalStore } from '../../stores/modal';

export default function WarnModal() {
  const { warn, setWarn } = useModalStore();
  if (warn === '') return null;
  return (
    <div
      className={`absolute z-200 top-[10%] left-[10%] w-[80%] shadow-md
      border border-zinc-300 flex flex-col items-center justify-center
      bg-white rounded-[20px] p-[10px] [&>*]:p-[5px]`}
    >
      <p>{warn}</p>
      <button
        onClick={() => setWarn('')}
        className={`p-[5px] bg-blue-500 rounded-[10px] text-white`}
      >
        확인
      </button>
    </div>
  );
}
