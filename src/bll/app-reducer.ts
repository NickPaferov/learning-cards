import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { setUserAC } from "./auth-reducer";

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

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me();
    dispatch(setUserAC(res.data));
  } catch (e) {
  } finally {
    dispatch(setAppIsInitializedAC(true));
  }
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>;
type SetAppIsRequestProcessingType = ReturnType<typeof setAppIsRequestProcessingAC>;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;

type AppActionsType = SetAppIsInitializedType | SetAppIsRequestProcessingType | SetAppErrorType;
