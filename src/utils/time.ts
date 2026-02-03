import { format } from "date-fns";

export function formatDay(date:Date) {
  return format(date, 'yyyy-MM-dd');
}
export function formatTimestamp(timestamp: string) {
  return formatDay(new Date(parseInt(timestamp) * 1000));
}