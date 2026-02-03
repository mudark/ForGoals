import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from 'react';
import { Spin } from '../components/Spin';

interface ModalLoadingProps {
  message: string;
}
function ModalLoading({ message }: ModalLoadingProps) {
  if (message === '') return null;
  return (
    <div
      className={`absolute z-[200] top-[-4px] left-[-4px] bg-black/50
      w-full h-full flex justify-center items-center rounded-[20px]`}
    >
      <div
        className={`shadow-md text-white text-[1.3em]
        flex flex-col items-center justify-center bg-black/50
        rounded-[20px] p-[10px] [&>*]:p-[5px]`}
      >
        <Spin>{message}</Spin>
      </div>
    </div>
  );
}
interface ModalLoading {
  modal_loading: ReactElement | null;
  setMsg: Dispatch<SetStateAction<string>>;
}
export default function useModalLoading(): ModalLoading {
  const [message, setMsg] = useState('');
  const modal_loading = <ModalLoading message={message} />;
  return { modal_loading, setMsg };
}
