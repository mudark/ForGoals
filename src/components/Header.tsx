import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserStore } from '../stores/user';
import { useModalStore } from '../stores/modal';
import SingUp from './modals/user/SignUp';
import LogIn from './modals/user/LogIn';

interface StyledLinkProps {
  to: string;
  children: ReactNode;
}
function StyledLink({ to, children }: StyledLinkProps) {
  // 링크가 가진 url이 현재 주소면 다른 스타일 적용
  const showActive = `text-blue-700 text-[16px] font-[600] border-b-[3px] border-blue-700`;
  const showUnactive = ``;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? showActive : showUnactive)}
    >
      {children}
    </NavLink>
  );
}
function Links() {
  // 로그인 후 보이는 헤더의 링크 집합
  const { logOut } = useUserStore();
  return (
    <div className="flex space-between">
      <nav className={`m-auto flex justify-center items-center gap-[10px]`}>
        <StyledLink to="/goal">목표</StyledLink>
        <StyledLink to="/habit">습관</StyledLink>
        <StyledLink to="/kmooc">강좌</StyledLink>
        <StyledLink to="/">내 정보</StyledLink>
      </nav>
      <div
        className="p-[5px] [&>button]:bg-blue-100 [&>button]:font-bold
        [&>button]:text-blue-600 [&>button]:px-[10px] 
        [&>button]:rounded-[10px] [&>button]:hover:scale-[1.03]"
      >
        <button type="button" onClick={() => logOut()}>
          로그 아웃
        </button>
      </div>
    </div>
  );
}
function LogOutHeader() {
  const { setModal } = useModalStore();
  return (
    <div
      className="text-right [&>*]:m-[5px] [&>button]:bg-blue-100 
      [&>button]:text-blue-600 [&>button]:font-bold [&>button]:px-[10px] 
      [&>button]:rounded-[10px] [&>button]:hover:scale-[1.03]"
    >
      <button type="button" onClick={() => setModal(LogIn, null)}>
        로그인
      </button>
      <button type="button" onClick={() => setModal(SingUp, null)}>
        회원 가입
      </button>
    </div>
  );
}
export default function Header() {
  const { id } = useUserStore();
  // 로그아웃이면 로그인 폼이, 로그인이면 링크 집합이 호출됨
  return (
    <header
      className={`fixed top-0 left-0 w-full min-h-[30px] 
        z-50 bg-white/80 border-b-[2px] border-gray-300 `}
    >
      {id === '' ? <LogOutHeader /> : <Links />}
    </header>
  );
}
