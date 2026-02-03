import { useMutation } from '@tanstack/react-query';
import { modifyUser } from '../../../apis/notionApi';
import { useInput } from '../../../hooks/useInput';
import { useUserStore } from '../../../stores/user';

export default function UserInfo({ setWarn, setMsg }: CommonModalProps) {
  const { id, name, setName } = useUserStore();
  const [changed_name, changeName] = useInput(name);
  const { mutate } = useMutation({
    mutationFn: async () => modifyUser({ id, name: changed_name }),
    onMutate: () => setMsg('이름 수정 중...'),
    onSuccess: () => setName(changed_name),
    onError: () => setWarn('이름 수정을 실패했습니다.'),
    onSettled: () => setMsg(''),
  });
  return (
    <div>
      <h1>내 정보</h1>
      <div>
        <span className="inline-block text-center w-[20%]">아이디</span>
        <span> : {id}</span>
      </div>
      <div>
        <span className="inline-block text-center w-[20%]">이름</span>
        <span> : {name}</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <label>변경할 이름 : </label>
        <input type="text" value={changed_name} onChange={changeName} />
        <button className="gradient-btn">유저 정보 변경</button>
      </form>
    </div>
  );
}
