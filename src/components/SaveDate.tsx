import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

interface SaveDateProps {
  selected_day: string;
  onChange: (date: Date | null) => void;
  className?: string;
}
export default function SaveDate({
  selected_day, // 날짜를 수정하는 경우의 날짜 기본 값, 필수는 아님
  onChange, // 날짜 변경시 호출될 함수
  className, // 스타일
}: SaveDateProps) {
  // 날짜를 선택하는 컴포넌트
  return (
    <DatePicker
      selected={selected_day ? new Date(selected_day) : null}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      locale={ko}
      placeholderText="날짜를 선택하세요"
      wrapperClassName={`w-[90%] ${className ?? ''}`}
      className={`w-full border border-gray-600
      p-[2px] rounded-[5px] `}
    />
  );
}
