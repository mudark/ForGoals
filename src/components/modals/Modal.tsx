import { useModalStore } from '../../stores/modal';
import useModalLoading from '../../hooks/useModalLoading';
import useModalWarn from '../../hooks/useModalWarn';
import ExitModal from './ExitModal';

export default function Modal() {
  const { modal: ModalContent, payload } = useModalStore();
  const { modal_warn, setWarn } = useModalWarn();
  const { modal_loading, setMsg } = useModalLoading();
  if (!ModalContent) return null;
  return (
    <div
      className="fixed w-full h-full z-[100] top-0 bg-black/50 
        flex items-center justify-center modal"
    >
      <div
        className="w-[96%] max-w-[400px] 
        bg-white rounded-[20px] p-[10px] relative"
      >
        <ExitModal />
        <ModalContent {...payload} setMsg={setMsg} setWarn={setWarn} />
        {modal_warn}
        {modal_loading}
      </div>
    </div>
  );
}
