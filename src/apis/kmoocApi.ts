import axios from 'axios';

const kmooc_key = import.meta.env.VITE_KMOOC_KEY??'';

const kmooc_api = axios.create({
  baseURL:'https://apis.data.go.kr/B552881/kmooc_v2_0',
  headers: {'Content-Type':'application/json'},
  params: {
    ServiceKey: kmooc_key,
  },
});
// KMOOC 강의 목록 api
export const getKmooc = async ({pageParam=1}:{pageParam: number}) => {
  const res = await kmooc_api.get('/courseList_v2_0',{params: {Page: pageParam}});
  const data:KmoocResponse = res?.data;
  if (!data) throw new Error("Kmooc list error");
  return data;
}
// KMOOC 강의 세부 내용 api
export const getKmoocDetail = async ({id}: Course) => {
  const res = await kmooc_api.get('/courseDetail_v2_0',{params: {CourseId: id}});
  const data:CourseDetail = res?.data.results;
  if (!data) throw new Error("Kmooc detail error");
  return data;
}
