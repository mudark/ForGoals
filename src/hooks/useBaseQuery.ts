import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../stores/user';
import { getFromNotion } from '../apis/notionApi';
// 목표 초기값 불러오는 훅
export default function useBaseQuery<T>(
  type: string, 
  init: (data: T)=>void
) {
  const { id } = useUserStore();
  const query = useQuery({
    queryKey: ['get_data', type, id],
    queryFn: async () => {
      const data = await getFromNotion<T>(`${id}_${type}`); 
      // console.log("get data : ",data);
      if (!!data) {
        init(data);
      }
      return data;
    },
    enabled: id!=='', // id 없으면 실행 안 함
    staleTime: 1000*60*0, // 0분 신선함
    gcTime: 1000*60*5 // 1분 캐시 저장
  });
  return query;
}
