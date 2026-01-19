import { useModalStore } from "../../stores/modal";

export default function Modal() {
  const modal = useModalStore((state) => state.modal);
  return (
    <div
      className={
        !modal
          ? `hidden`
          : `fixed w-full h-full z-100 top-0 bg-black/50 
            flex items-center justify-center 
            [&>*]:w-[96%] [&>*]:max-w-[400px] [&>*]:bg-white 
            [&>*]:rounded-[20px] [&>*]:p-[10px] [&>*]:relative
            [&_*]:m-[2px]`
      }
    >
      {modal}
    </div>
  );
}
