import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../stores/user';
import { getFromNotion } from '../apis/notionApi';
import { useEffect } from 'react';
// 목표 초기값 불러오는 훅
export default function useBaseQuery<T>(
  type: string,
  init: (data: T)=>void // 가져온 데이터를 초기화하는 함수
) {
  const { id } = useUserStore();
  const query = useQuery({
    queryKey: ['get_data', type, id],
    queryFn: async () => {
      const data = await getFromNotion<T>(`${id}_${type}`); 
      // console.log("get data : ",data);
      return data;
    },
    enabled: id!=='', // id 없으면 실행 안 함
    staleTime: 1000*60*0, // 1분 신선함
    gcTime: 1000*60*2 // 2분 캐시 저장
  });
  useEffect(()=>{
    if (!!query.data && !!id) {
      init(query.data);
    }
  },[id, query.data]);
  return query;
}
