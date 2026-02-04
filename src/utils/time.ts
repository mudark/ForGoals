import { format } from "date-fns";
// 날짜 포맷
export function formatDay(date:Date) {
  return format(date, 'yyyy-MM-dd');
}
// 타임스탬프 포멧
export function formatTimestamp(timestamp: string) {
  return formatDay(new Date(parseInt(timestamp) * 1000));
}