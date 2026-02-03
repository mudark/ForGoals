import axios from 'axios';
import { parseJwt, token_storage} from '../utils/auth';

const notion_api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {"Content-type": "application/json"}
});
// 데이터 저장
export const saveToNotion = async <T>(name: string, data: T) : Promise<boolean> => {
  const payload = {
  "name": {title: [{text:{content: name}}]},
  "data": {rich_text: [{text: {content: JSON.stringify(data)}}]}
  };
  console.log("save payload", payload)
  const res = await notion_api.post("/notion/data",{properties: payload});
  console.log("save res", res)
  return res!==null;
}
// 데이터 받기
export const getFromNotion = async <T>(name: string) : Promise<T|null> => {
  const res = await notion_api.get("/notion/data",{ params: { name } });
  //console.log("get response : ", res);
  const data = res?.data[0]?.properties?.data?.rich_text[0]?.plain_text
  //console.log("data : ",data);
  return !data ? null : JSON.parse(data);
}
// 로그인
export const loginToNotion = async (id: string, pw: string): Promise<User | null> => {
  //console.log("login to notion");
  const res = await notion_api.post("/notion/login",{id, pw});
  //console.log("login response : ",res);
  const token = res?.data?.token; // 로그인 성공 시 토큰 받음
  //console.log("login token : ",token);
  token_storage.save(token); // 로그인 성공하면 토큰 받고 저장
  return parseJwt(token); // 토큰에서 유저 정보 추출
}
// 회원가입
export const signUpToNotion = async (user: User): Promise<boolean> => {
  const res = await notion_api.post("/notion/signup",{user, pw : user.pw});
  const token = res?.data?.token;
  token_storage.save(token); // 가입 성공하면 토큰 받고 저장
  return !!parseJwt<User>(token); // 가입 성공 여부 반환
}
// 토큰 인증, 메인 페이지 초기화할 때 호출됨
export const authJwtToNotion = async (): Promise<User> => {
  const token = token_storage.get();
  if (!token) throw new Error('토큰이 없습니다.')
  const res = await notion_api.post("/notion/jwt",{token});
  const new_token = res?.data?.token; // 서버에서 토큰을 변경하는 경우가 있으니 새 토큰 받음
  //console.log("token : ",token);
  const user : User | null = parseJwt(new_token);
  if (!user) {
    // 새 토큰이 무효하지 않으면 토큰 삭제
    token_storage.remove();
    throw new Error('잘못된 토큰을 받았습니다.');
  }
  token_storage.save(new_token);
  return user;
}
// 유저 정보 변경
export const modifyUser = async (user: User) : Promise<boolean> => {
  const res = await notion_api.put("/notion/name",{user});
  // 유저 정보 변경이 성공하면 토큰도 변경해야 함
  const new_token = res?.data?.token; 
  if (new_token) {
    token_storage.save(new_token);
  }
  return res!==null;
}
