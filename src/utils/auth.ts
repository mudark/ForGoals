import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "user_token"
export const token_storage = {
  save: (token:string|null) => !token
    ?localStorage.removeItem(TOKEN_KEY)
    :localStorage.setItem(TOKEN_KEY, token),
  get: () => localStorage.getItem(TOKEN_KEY),
  remove: () => localStorage.removeItem(TOKEN_KEY),
}
export const parseJwt = <T>(token: string|null): T|null => {
  return token ? jwtDecode<T>(token) : null;
}
