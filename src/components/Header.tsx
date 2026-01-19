import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

interface StyledLinkProps {
  to: string;
  children: ReactNode;
}
function StyledLink({ to, children }: StyledLinkProps) {
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
export default function Header() {
  return (
    <header
      className={`fixed top-0 left-0 w-full min-h-[30px] 
        z-50 bg-white/50 border-b-[2px] border-gray-300 `}
    >
      <Link to="/">
        <img></img>
      </Link>
      <nav className={`m-auto flex justify-center items-center gap-[10px]`}>
        <StyledLink to="/">습관</StyledLink>
        <StyledLink to="/goal">목표</StyledLink>
        <StyledLink to="/chart">차트</StyledLink>
      </nav>
    </header>
  );
}
