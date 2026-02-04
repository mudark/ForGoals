import { useState, type ChangeEvent } from "react";
// 입력란 훅
export function useInput(_value: string) : [
  string,
  (e:ChangeEvent<HTMLInputElement>)=>void
] {
  const [value, setValue] = useState(_value);
  // 입력 함수
  function onChange(e:ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  // 입력 함수가 자동으로 값을 변경하니 설정 함수 반환할 필요 없음
  return [value, onChange]; 
}
