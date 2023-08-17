import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppActionsType, appReducer } from "./app-reducer";
import { AuthActionsType, authReducer } from "./auth-reducer";
import { PacksActionsType, packsReducer } from "./packs-reducer";
import { CardsActionsType, cardsReducer } from "./cards-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  cards: cardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

type AppRootActionsType =
  | AppActionsType
  | AuthActionsType
  | PacksActionsType
  | CardsActionsType;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppRootActionsType
>;

type DispatchType = ThunkDispatch<
  AppRootStateType,
  unknown,
  AppRootActionsType
>;

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

//@ts-ignore
window.store = store;
