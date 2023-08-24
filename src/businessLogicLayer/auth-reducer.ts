import {
  authAPI,
  ForgotPasswordParamsType,
  LoginParamsType,
  RegisterParamsType,
  SetNewPasswordParamsType,
  UpdateMeParamsType,
  UserDataResponseType,
} from "../api/auth-api";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";
import { AppThunkType } from "./store";

const initialState = {
  user: null as UserDataType,
  isRegistered: false,
  isLoggedIn: false,
  isInstructionsSent: false,
  isPasswordChanged: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-USER":
      return { ...state, user: action.user };
    case "AUTH/SET-IS-REGISTERED":
      return { ...state, isRegistered: action.isRegistered };
    case "AUTH/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    case "AUTH/SET-IS-INSTRUCTIONS-SENT":
      return { ...state, isInstructionsSent: action.isInstructionsSent };
    case "AUTH/SET-PASSWORD-CHANGED":
      return { ...state, isPasswordChanged: action.isPasswordChanged };
    default:
      return state;
  }
};

export const setAuthUserAC = (user: UserDataType) =>
  ({ type: "AUTH/SET-USER", user } as const);

export const setAuthIsRegisteredAC = (isRegistered: boolean) =>
  ({ type: "AUTH/SET-IS-REGISTERED", isRegistered } as const);

export const setAuthIsLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: "AUTH/SET-IS-LOGGED-IN", isLoggedIn } as const);

export const setAuthIsInstructionsSentAC = (isInstructionsSent: boolean) =>
  ({ type: "AUTH/SET-IS-INSTRUCTIONS-SENT", isInstructionsSent } as const);

export const setAuthIsPasswordChangedAC = (isPasswordChanged: boolean) =>
  ({ type: "AUTH/SET-PASSWORD-CHANGED", isPasswordChanged } as const);

export const loginTC =
  (params: LoginParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      const res = await authAPI.login(params);
      dispatch(setAuthUserAC(res.data));
      dispatch(setAuthIsLoggedInAC(true));
      dispatch(setAuthIsRegisteredAC(true));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const registerTC =
  (params: RegisterParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      const res = await authAPI.register(params);
      dispatch(setAuthUserAC(res.data.addedUser));
      dispatch(setAuthIsRegisteredAC(true));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const updateMeTC =
  (params: UpdateMeParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      const res = await authAPI.updateMe(params);
      dispatch(setAuthUserAC(res.data.updatedUser));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const logoutTC = (): AppThunkType => async (dispatch) => {
  dispatch(setAppIsRequestProcessingAC(true));
  try {
    await authAPI.logout();
    dispatch(setAuthUserAC(null));
    dispatch(setAuthIsLoggedInAC(false));
    dispatch(setAuthIsRegisteredAC(false));
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setAppIsRequestProcessingAC(false));
  }
};

export const forgotPasswordTC =
  (params: ForgotPasswordParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await authAPI.forgotPassword(params);
      dispatch(setAuthIsInstructionsSentAC(true));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
      dispatch(setAuthIsPasswordChangedAC(false));
    }
  };

export const setNewPasswordTC =
  (params: SetNewPasswordParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await authAPI.setNewPassword(params);
      dispatch(setAuthIsPasswordChangedAC(true));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
      dispatch(setAuthIsInstructionsSentAC(false));
    }
  };

type UserDataType = null | UserDataResponseType;

type InitialStateType = typeof initialState;

type SetAuthUserType = ReturnType<typeof setAuthUserAC>;
type SetAuthIsRegisteredType = ReturnType<typeof setAuthIsRegisteredAC>;
type SetAuthIsLoggedInType = ReturnType<typeof setAuthIsLoggedInAC>;
type SetAuthIsInstructionsSentType = ReturnType<
  typeof setAuthIsInstructionsSentAC
>;
type SetAuthIsPasswordChangedType = ReturnType<
  typeof setAuthIsPasswordChangedAC
>;

export type AuthActionsType =
  | SetAuthUserType
  | SetAuthIsRegisteredType
  | SetAuthIsLoggedInType
  | SetAuthIsInstructionsSentType
  | SetAuthIsPasswordChangedType;
