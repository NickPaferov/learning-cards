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
  try {
    const res = await authAPI.login(params);
    dispatch(setUserAC(res.data));
  } catch (e) {
  } finally {
  }
};

export const registerTC = (params: RegisterParamsType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.register(params);
    dispatch(setUserAC(res.data.addedUser));
  } catch (e) {
  } finally {
  }
};

export const updateMeTC = (params: UpdateMeParamsType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.updateMe(params);
    dispatch(setUserAC(res.data.updatedUser));
  } catch (e) {
  } finally {
  }
};

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    await authAPI.logout();
    dispatch(setUserAC(null));
  } catch (e) {
  } finally {
  }
};

export const forgotPasswordTC =
  (params: ForgotPasswordParamsType) => async (dispatch: Dispatch) => {
    try {
      await authAPI.forgotPassword(params);
    } catch (e) {
    } finally {
    }
  };

export const setNewPasswordTC =
  (params: SetNewPasswordParamsType) => async (dispatch: Dispatch) => {
    try {
      await authAPI.setNewPassword(params);
    } catch (e) {
    } finally {
    }
  };

type UserDataType = null | UserDataResponseType;

type AuthStateType = { user: UserDataType };

type SetUserType = ReturnType<typeof setUserAC>;

type AuthActionsType = SetUserType;
