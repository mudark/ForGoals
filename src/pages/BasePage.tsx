import { type ReactNode } from 'react';
import { useUserStore } from '../stores/user';
import useUserQuery from '../hooks/useUserQuery';
import { Spin } from '../components/Spin';

export default function BasePage({ children }: { children: ReactNode }) {
  const { isFetching } = useUserQuery();
  const { id } = useUserStore();
  const base_page_style = `mt-[30px] m-auto max-w-[800px] w-[96%] p-[10px] text-center 
    [&>h1]:text-[2em] [&>h1]:font-[600] [&>*]:my-[5px]`;
  if (isFetching) {
    return (
      <div className={base_page_style}>
        <h1>자동 로그인 중입니다.</h1>
        <Spin>로그인한 후 로그아웃을 하지 않았다면 자동으로 로그인됩니다.</Spin>
      </div>
    );
  }
  if (id === '') {
    return (
      <div className={base_page_style}>
        <h1>안녕하세요.</h1>
        <p>당신의 목표를 관리할 페이지입니다.</p>
        <p>로그인하여 당신의 목표와 습관을 관리하세요.</p>
      </div>
    );
  }

  return <div className={base_page_style}>{children}</div>;
}
