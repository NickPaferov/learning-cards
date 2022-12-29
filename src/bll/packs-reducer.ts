import {
  CreatePackParamsType,
  GetPacksParamsType,
  packsAPI,
  PackType,
  UpdatePackParamsType,
} from "../api/packs-api";
import { AppRootStateType, AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";

const initialState = {
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 50,
  minCardsCount: 0,
  maxCardsCount: 100,
  token: "",
  tokenDeathTime: 0,
  searchParams: {
    packName: "",
    min: 0,
    max: 100,
    sortPacks: "",
    page: 1,
    pageCount: 5,
    user_id: "",
    block: false,
  } as GetPacksParamsType,
};

type InitialStateType = typeof initialState;

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsType
): InitialStateType => {
  switch (action.type) {
    case "PACKS/SET-PACKS":
      return { ...state, cardPacks: action.cardPacks };
    case "PACKS/SET-PACKS-SEARCH-PARAMS":
      return { ...state, searchParams: action.searchParams };
    default:
      return state;
  }
};

const setPacksAC = (cardPacks: PackType[]) => ({ type: "PACKS/SET-PACKS", cardPacks } as const);

const setPacksSearchParamsAC = (searchParams: GetPacksParamsType) =>
  ({ type: "PACKS/SET-PACKS-SEARCH-PARAMS", searchParams } as const);

export const fetchPacksTC =
  (): AppThunkType => async (dispatch, getState: () => AppRootStateType) => {
    const { searchParams } = getState().packs;
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      const res = await packsAPI.getPacks(searchParams);
      dispatch(setPacksAC(res.data.cardPacks));
      dispatch(setPacksSearchParamsAC(searchParams));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const addPackTC =
  (params: CreatePackParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await packsAPI.createPack(params);
      dispatch(fetchPacksTC());
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

const deletePackTC =
  (id: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await packsAPI.deletePack(id);
      dispatch(fetchPacksTC());
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

const updatePackTC =
  (params: UpdatePackParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await packsAPI.updatePack(params);
      dispatch(fetchPacksTC());
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export type PacksActionsType = SetPacksType | SetPacksSearchParamsType;

type SetPacksType = ReturnType<typeof setPacksAC>;
type SetPacksSearchParamsType = ReturnType<typeof setPacksSearchParamsAC>;
