import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useUserStore } from '../stores/user';
import useBaseQuery from '../hooks/useBaseQuery';
import { Spin } from './Spin';
// 목표 성공률 차트
export default function GoalSuccessRate() {
  const { initSuccess, initFailure } = useUserStore();
  const {
    data: _success,
    isLoading: successLoading,
    isError: successError,
  } = useBaseQuery<number>('goal_success', initSuccess);
  const success = _success ?? 0;
  const {
    data: _failure,
    isLoading: failureLoading,
    isError: failureError,
  } = useBaseQuery<number>('goal_failure', initFailure);
  const failure = _failure ?? 0;
  if (successLoading || failureLoading) {
    return (
      <div className="w-full h-[150px] text-center">
        <Spin>목표 성공률을 불러오는 중입니다.</Spin>
      </div>
    );
  }
  if (successError || failureError) {
    return (
      <div className="w-full h-[150px] text-center">
        목표 성공률을 못 불러왔습니다.
      </div>
    );
  }
  if (!failure && !success) {
    // 데이터 없음
    return (
      <div className="w-full h-[150px] text-center">
        실패하거나 성공한 목표가 없습니다.
      </div>
    );
  }
  // 목표 달성 차트에 쓸 데이터
  const goal_success_data = [
    { name: 'Success', value: success, fill: '#00ff00' },
    { name: 'Failure', value: failure, fill: '#ff0000' },
  ];
  const rate = ((100 * success) / (failure + success)).toFixed(2) ?? 0;
  return (
    <div className="w-full h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={goal_success_data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={60}
            isAnimationActive={false}
          >
            {goal_success_data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
            <Label
              value={`${rate}%`}
              position="center"
              fill="#333"
              style={{ fontSize: '20px', fontWeight: 'bold' }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
