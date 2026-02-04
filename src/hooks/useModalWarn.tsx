import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from 'react';

interface ModalWarnProps {
  warn: string;
  setWarn: (warn: string) => void;
}
function ModalWarn({ warn, setWarn }: ModalWarnProps) {
  // 모달 경고 창, 경고 문구 없으면 경고 창도 없음
  if (warn === '') return null;
  return (
    <div
      className={`absolute z-[200] top-[-4px] left-[-4px] bg-black/50
      w-full h-full flex justify-center items-center rounded-[20px]`}
    >
      <div
        className={`shadow-md border border-zinc-300 
        flex flex-col items-center justify-center
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
    </div>
  );
}
interface ModalWarn {
  modal_warn: ReactElement | null;
  setWarn: Dispatch<SetStateAction<string>>;
}
export default function useModalWarn(): ModalWarn {
  // 모달 경고 창 훅
  const [warn, setWarn] = useState('');
  const modal_warn = <ModalWarn warn={warn} setWarn={setWarn} />;
  return { modal_warn, setWarn }; // 경고 문구는 경고 창에 포함되니 반환할 필요가 없음
}
