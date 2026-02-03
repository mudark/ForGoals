import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../stores/user';
import { authJwtToNotion } from '../apis/notionApi';
import { useEffect } from 'react';
// 유저 초기값 불러오는 훅
export default function useUserQuery() {
  const { id, setId, setName } = useUserStore();
  async function getUser() : Promise<User> {
    const user = await authJwtToNotion();
    return user;
  };
  const query = useQuery({
    queryKey: ['authUser'],
    queryFn: getUser,
    enabled: id ==='',
    staleTime: 1000*60*5,
    gcTime: 1000*60*10
  });;
  useEffect(()=>{
    if (!query.data) return;
    setId(query.data.id);
    setName(query.data.name);
  },[query.data])
  return query;
}
