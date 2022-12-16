import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { setUserAC } from "./auth-reducer";

const initialState = {
  isInitialized: false,
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};

export const setAppIsInitializedAC = (isInitialized: boolean) =>
  ({ type: "APP/SET-IS-INITIALIZED", isInitialized } as const);

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me();
    dispatch(setUserAC(res.data));
  } catch (e) {
  } finally {
    dispatch(setAppIsInitializedAC(true));
  }
};

type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>;

type AppActionsType = SetAppIsInitializedType;
