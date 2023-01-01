import { authAPI } from "../api/auth-api";
import { setAuthIsLoggedInAC, setAuthIsRegisteredAC, setAuthUserAC } from "./auth-reducer";
import { AppThunkType } from "./store";

const initialState = {
  isInitialized: false,
  isRequestProcessing: false,
  error: null as null | string,
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    case "APP/SET-IS-REQUEST-PROCESSING":
      return { ...state, isRequestProcessing: action.isRequestProcessing };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setAppIsInitializedAC = (isInitialized: boolean) =>
  ({ type: "APP/SET-IS-INITIALIZED", isInitialized } as const);

export const setAppIsRequestProcessingAC = (isRequestProcessing: boolean) =>
  ({ type: "APP/SET-IS-REQUEST-PROCESSING", isRequestProcessing } as const);

export const setAppErrorAC = (error: null | string) => ({ type: "APP/SET-ERROR", error } as const);

export const initializeAppTC = (): AppThunkType => async (dispatch) => {
  try {
    const res = await authAPI.me();
    dispatch(setAuthUserAC(res.data));
    dispatch(setAuthIsRegisteredAC(true));
    dispatch(setAuthIsLoggedInAC(true));
  } catch (e) {
  } finally {
    dispatch(setAppIsInitializedAC(true));
  }
};

type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>;
type SetAppIsRequestProcessingType = ReturnType<typeof setAppIsRequestProcessingAC>;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;

export type AppActionsType =
  | SetAppIsInitializedType
  | SetAppIsRequestProcessingType
  | SetAppErrorType;
