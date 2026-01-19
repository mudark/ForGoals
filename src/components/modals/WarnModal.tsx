import ExitModal from "./ExitModal";

interface warnModalProps {
  title: string;
  content: string;
  setTitle: (_title: string) => void;
}
export default function WarnModal({
  title,
  content,
  setTitle,
}: warnModalProps) {
  return (
    <div
      className={
        title === "" ? `hidden` : `absolute top-0 left-0 w-full [&>*]:p-[5px]`
      }
    >
      <ExitModal />
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={() => setTitle("")} className={`m-auto`}>
        확인
      </button>
    </div>
  );
}
