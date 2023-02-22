import React, { createContext, useReducer } from "react";
import _ from "lodash";

import { AuthContextProps, AuthReducerState, UserInfo } from "./interfaces";
import { AuthAction, Role } from "./enums";

import { USER_INFO_KEY } from "@/config";
import storage from "@/utils/storage";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const setAuthInfo = (
  userInfo: UserInfo,
  state: AuthReducerState
): AuthReducerState => {
  _.assign(state, { ...userInfo, isAuthenticated: true });
  storage.setObject(USER_INFO_KEY, state);

  return {
    ...state
  };
};

const clearAuthInfo = (state: AuthReducerState): AuthReducerState => {
  _.defaults(state);
  storage.clearObject(USER_INFO_KEY);

  return {
    ...state,
    isAuthenticated: false
  };
};

const authReducer = (
  state: AuthReducerState,
  action: { userInfo?: UserInfo; type: AuthAction }
): AuthReducerState => {
  switch (action.type) {
    case AuthAction.SetAuth:
      if (action.userInfo) {
        return setAuthInfo(action.userInfo, state);
      } else {
        return state;
      }

    case AuthAction.ClearAuth:
      return clearAuthInfo(state);

    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: AuthReducerState = {
    isAuthenticated: false,
    userInfo: {
      id: "",
      userName: "",
      role: Role.User,
      token: ""
    }
  };

  const token: string = storage.getToken() as string;
  const userInfo: UserInfo = storage.getObject(USER_INFO_KEY) as UserInfo;

  if (token && userInfo) {
    _.assign(initialState, { ...userInfo, isAuthenticated: true });
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuthInfo = (userInfo: UserInfo) => {
    dispatch({ userInfo, type: AuthAction.SetAuth });
  };

  const clearAuthInfo = () => {
    dispatch({ type: AuthAction.ClearAuth });
  };

  return (
    <AuthContext.Provider value={{ ...state, setAuthInfo, clearAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
