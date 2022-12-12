import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof store.getState>;

type AppActionsType = any;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

//@ts-ignore
window.store = store;
