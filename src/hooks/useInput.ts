import { useState, type ChangeEvent } from "react";

export function useInput(_value: string) : [
  string,
  (e:ChangeEvent<HTMLInputElement>)=>void
] {
  const [value, setValue] = useState(_value);
  function onChange(e:ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return [value, onChange];
}
