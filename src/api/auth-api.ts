import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:7542/2.0/"
      : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export const authAPI = {
  login(params: LoginParamsType) {
    return instance.post<LoginResponseType>("/auth/login", params);
  },
  register(params: RegisterParamsType) {
    return instance.post<RegisterResponseType>("/auth/register", params);
  },
  me() {
    return instance.post<MeResponseType>("/auth/me");
  },
  updateMe(params: UpdateMeParamsType) {
    return instance.put<UpdateMeResponseType>("/auth/me", params);
  },
  logout() {
    return instance.delete<LogoutResponseType>("/auth/me");
  },
  forgotPassword(params: ForgotPasswordParamsType) {
    return instance.post<ForgotPasswordResponseType>("/auth/forgot", params);
  },
  setNewPassword(params: SetNewPasswordParamsType) {
    return instance.post<SetNewPasswordResponseType>("/auth/set-new-password", params);
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterParamsType = {
  email: string;
  password: string;
};

export type UpdateMeParamsType = {
  name: string;
  avatar: string;
};

export type ForgotPasswordParamsType = {
  email: string;
  from: string;
  message: string;
};

export type SetNewPasswordParamsType = {
  password: string;
  resetPasswordToken: string;
};

export type LoginResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  avatar?: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  error?: string;
};

export type RegisterResponseType = {
  addedUser: NewUserType;
};

export type NewUserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  error?: string;
};

export type MeResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  avatar?: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  error?: string;
};

export type UpdateMeResponseType = {
  updatedUser: UpdatedUserType;
  token: string;
  tokenDeathTime: number;
};

export type UpdatedUserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  avatar?: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  error?: string;
};

export type LogoutResponseType = {
  info: string;
  error?: string;
};

export type ForgotPasswordResponseType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
  error?: string;
};

export type SetNewPasswordResponseType = {
  info: string;
  error?: string;
};
