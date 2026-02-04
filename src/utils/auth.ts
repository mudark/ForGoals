import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "user_token"
// JWT를 로컬 스토리지에 CRUD
export const token_storage = {
  save: (token:string|null) => !token
    ?localStorage.removeItem(TOKEN_KEY)
    :localStorage.setItem(TOKEN_KEY, token),
  get: () => localStorage.getItem(TOKEN_KEY),
  remove: () => localStorage.removeItem(TOKEN_KEY),
}
// JWT에서 데이터 추출
export const parseJwt = <T>(token: string|null): T|null => {
  return token ? jwtDecode<T>(token) : null;
}
