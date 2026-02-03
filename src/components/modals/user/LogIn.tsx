import { useUserStore } from '../../../stores/user';
import { useInput } from '../../../hooks/useInput';
import { useModalStore } from '../../../stores/modal';
import SingUp from './../../modals/user/SignUp';
import { useMutation } from '@tanstack/react-query';

export default function LogIn({ setWarn, setMsg }: CommonModalProps) {
  // 로그아웃이면 헤더에 보이는 로그인 폼
  //const { setWarn, setMsg } = useModalContext();
  const { logIn } = useUserStore();
  const { setModal } = useModalStore();
  const [id, changeId] = useInput('');
  const [pw, changePw] = useInput('');
  const { mutate } = useMutation({
    mutationFn: async (user: User) => logIn(user),
    onMutate: () => setMsg?.('로그인 중...'),
    onSuccess: () => setModal(null, null),
    onError: () => setWarn?.('로그인을 실패했습니다.'),
    onSettled: () => setMsg?.(''),
  });
  return (
    <form className="[&_*]:mx-[5px]">
      <h1>로그인</h1>
      <label>아이디</label>
      <input type="text" onChange={changeId} />
      <br />
      <label>비밀번호</label>
      <input type="password" onChange={changePw} />
      <br />
      <button
        className="w-[40%]"
        onClick={async (e) => {
          e.preventDefault();
          mutate({ id, name: '', pw });
        }}
      >
        로그인
      </button>
      <button
        type="button"
        className="w-[40%]"
        onClick={() => setModal(SingUp, null)}
      >
        회원 가입
      </button>
    </form>
  );
}
