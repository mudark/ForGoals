import type { ReactNode } from 'react';

export function Spin({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* 버튼 내부 스피너 */}
      <div
        className="w-[80px] h-[80px] border border-[10px] 
        border-zinc-300 border-t-blue-600 rounded-full animate-spin"
      />
      <div className="font-[600]">{children}</div>
    </div>
  );
}
