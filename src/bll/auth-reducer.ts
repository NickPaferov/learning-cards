import {
  authAPI,
  ForgotPasswordParamsType,
  LoginParamsType,
  RegisterParamsType,
  SetNewPasswordParamsType,
  UpdateMeParamsType,
  UserDataResponseType,
} from "../api/auth-api";
import { Dispatch } from "redux";
import { setAppErrorAC, setAppIsRequestProcessingAC } from "./app-reducer";
import axios, { AxiosError } from "axios";
import { handleError } from "../utils/error-utils";

const initialState: AuthStateType = {
  user: null,
};

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case "AUTH/SET-USER":
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

export const setUserAC = (user: UserDataType) =>
  ({ type: "AUTH/SET-USER", payload: { user } } as const);

export const loginTC = (params: LoginParamsType) => async (dispatch: Dispatch) => {
  dispatch(setAppIsRequestProcessingAC(true));
  try {
    const res = await authAPI.login(params);
    dispatch(setUserAC(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message;
      dispatch(setAppErrorAC(error));
    } else {
      dispatch(setAppErrorAC("some error has occurred"));
    }
  } finally {
    dispatch(setAppIsRequestProcessingAC(false));
  }
};

export const registerTC = (params: RegisterParamsType) => async (dispatch: Dispatch) => {
  dispatch(setAppIsRequestProcessingAC(true));
  try {
    const res = await authAPI.register(params);
    dispatch(setUserAC(res.data.addedUser));
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setAppIsRequestProcessingAC(false));
  }
};

export const updateMeTC = (params: UpdateMeParamsType) => async (dispatch: Dispatch) => {
  dispatch(setAppIsRequestProcessingAC(true));
  try {
    const res = await authAPI.updateMe(params);
    dispatch(setUserAC(res.data.updatedUser));
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setAppIsRequestProcessingAC(false));
  }
};

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppIsRequestProcessingAC(true));
  try {
    await authAPI.logout();
    dispatch(setUserAC(null));
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setAppIsRequestProcessingAC(false));
  }
};

export const forgotPasswordTC =
  (params: ForgotPasswordParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await authAPI.forgotPassword(params);
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const setNewPasswordTC =
  (params: SetNewPasswordParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await authAPI.setNewPassword(params);
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

type UserDataType = null | UserDataResponseType;

type AuthStateType = { user: UserDataType };

type SetUserType = ReturnType<typeof setUserAC>;

type AuthActionsType = SetUserType;
