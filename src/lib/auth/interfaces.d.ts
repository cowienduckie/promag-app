import { Role } from "./enums";

export interface UserInfo {
  id: string;
  userName: string;
  role: Role;
  token: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  userInfo: UserInfo;
  setAuthInfo: (userInfo: UserInfo) => void;
  clearAuthInfo: () => void;
}

export interface AuthReducerState {
  isAuthenticated: boolean;
  userInfo: UserInfo;
}
