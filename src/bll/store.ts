import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { AppActionType, appReducer } from "./app-reducer";
import { AuthActionType, authReducer } from "./auth-reducer";

const rootReducer = combineReducers({ app: appReducer, auth: authReducer });

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof store.getState>;

type AppActionsType = AppActionType | AuthActionType;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

//@ts-ignore
window.store = store;
