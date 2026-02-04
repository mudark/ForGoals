import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useUserStore } from '../stores/user';
import useBaseQuery from '../hooks/useBaseQuery';
// 습관 성공률 차트
export default function HabitsSuccessRate() {
  const { habits, initHabits } = useUserStore();
  // 습관 불러오기
  const { isLoading, isError } = useBaseQuery<Habit[]>('habits', initHabits);
  if (isError) {
    // 에러
    return (
      <div className="w-full h-[300px] text-center">
        습관 성공률을 못 불러왔습니다.
      </div>
    );
  } else if (habits.length === 0 && !isLoading) {
    // 데이터 없음
    return <div className="w-full h-[300px] text-center">습관이 없습니다.</div>;
  }
  const loading_data = [
    // 로딩할 때 보여줄 데이터
    { name: '. . .', rate: 60 },
    { name: '. . .', rate: 80 },
    { name: '. . .', rate: 40 },
  ];
  // 습관 달성 차트에 쓸 데이터
  const habit_success_data = isLoading
    ? loading_data // 로딩 중이면 로딩용 데이터
    : habits.map((_habit) => {
        const start_day = new Date(_habit.start_day).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        const diff_time = today - start_day;
        // console.log(_habit.name, 'diftime : ', diff_time);
        // 테스트에서 시작 날짜가 미래인 경우엔 시간 차가 0으로 설정됨
        const total_days =
          diff_time >= 0 ? diff_time / (1000 * 60 * 60 * 24) + 1 : 0;
        const success_days = _habit.date.length;
        const success_rate =
          total_days > 0 ? (success_days / total_days) * 100 : 0;
        // console.log(_habit.name, 'rate : ', success_rate);
        return {
          name: _habit.name,
          rate: Math.round(success_rate), // 달성률 반올림
        };
      });
  // console.log('습관 성공 데이터 : ', habit_success_data);
  return (
    <div
      className="w-full"
      style={{ height: isLoading ? '200px' : `${habits.length * 60}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={habit_success_data}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip formatter={(v) => [!v ? `0%` : `${v}%`, '달성률']} />
          <Bar
            dataKey="rate"
            fill={isLoading ? '#ff9900' : '#3333ff'}
            barSize={16}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="rate"
              position="right"
              formatter={(v) => (!v ? `0%` : `${v}%`)}
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {isLoading ? (
        <p className="text-[1.3em] font-bold">
          습관 성공률을 불러오는 중입니다.
        </p>
      ) : null}
    </div>
  );
}
