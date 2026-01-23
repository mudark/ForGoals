import {
  Bar,
  BarChart,
  Cell,
  Label,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGoalStore } from '../stores/goals';
import { useHabitStore } from '../stores/habits';

export default function ChartPage() {
  const { success, failure } = useGoalStore();
  const { habits } = useHabitStore();
  const goal_success_data = [
    { name: 'Success', value: success, fill: '#00ff00' },
    { name: 'Failure', value: failure, fill: '#ff0000' },
  ];
  const habit_success_data = habits.map((_habit) => {
    const start_day = new Date(_habit.start_day).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    const diff_time = today - start_day;
    const total_days =
      diff_time > 0 ? Math.floor(diff_time / (1000 * 60 * 60 * 24)) + 1 : 0;
    const success_days = _habit.date.length;
    const success_rate = total_days > 0 ? (success_days / total_days) * 100 : 0;
    return {
      name: _habit.name,
      rate: Math.round(success_rate),
    };
  });
  return (
    <div className={`mt-[30px] m-auto max-w-[800px] w-[96%] p-[10px]`}>
      <h1>목표 성공률</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={goal_success_data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
          >
            {goal_success_data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <Label
              value={`${((100 * success) / (failure + success)).toFixed(2)}%`}
              position="center"
              fill="#333"
              style={{ fontSize: '24px', fontWeight: 'bold' }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <h1>습관 성공률</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={habit_success_data}
          layout="vertical"
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="rate" fill="#3333ff" barSize={20}>
            <LabelList
              dataKey="rate"
              position="right"
              formatter={(v) => `${v}%`}
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
