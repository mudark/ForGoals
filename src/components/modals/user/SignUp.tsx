import { useUserStore } from '../../../stores/user';
import { useInput } from '../../../hooks/useInput';
import { useModalStore } from '../../../stores/modal';
import { useMutation } from '@tanstack/react-query';

export default function SingUp({ setWarn, setMsg }: CommonModalProps) {
  const { signUp } = useUserStore();
  const { setModal } = useModalStore();
  const [id, changeId] = useInput('');
  const [pw, changePw] = useInput('');
  const [name, changeName] = useInput('');
  const { mutate } = useMutation({
    mutationFn: async (user: User) => signUp(user),
    onMutate: () => setMsg('회원 가입 중...'),
    onSuccess: () => setModal(null, null),
    onError: () => setWarn('회원 가입에 실패했습니다.'),
    onSettled: () => setMsg(''),
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ id, name, pw });
      }}
    >
      <h1>회원 가입</h1>
      <label htmlFor="signup_id">아이디</label>
      <input id="signup_id" type="text" onChange={changeId} />
      <br />
      <label htmlFor="signup_pw">비밀번호</label>
      <input id="signup_pw" type="password" onChange={changePw} />
      <br />
      <label htmlFor="signup_name">이름</label>
      <input id="signup_name" type="text" onChange={changeName} />
      <br />
      <button className="gradient-btn">가입하기</button>
    </form>
  );
}
