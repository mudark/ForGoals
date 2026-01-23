import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

interface SaveDateProps {
  selected_day: string;
  onChange: (date: Date | null) => void;
  className?: string;
}
export default function SaveDate({
  selected_day,
  onChange,
  className,
}: SaveDateProps) {
  return (
    <DatePicker
      selected={selected_day ? new Date(selected_day) : null}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      locale={ko}
      placeholderText="날짜를 선택하세요"
      wrapperClassName={`w-full ${className ?? ''}`}
      className={`w-[calc(100%-4px)] border border-gray-600
      p-[2px] rounded-[4px] `}
    />
  );
}
