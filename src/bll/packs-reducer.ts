import { CreatePackParamsType, packsAPI, PackType, UpdatePackParamsType } from "../api/packs-api";
import { AppRootStateType, AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";

const initialState = {
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 50,
  areMyPacks: false,
  min: 0,
  max: 100,
  packName: "",
};

type InitialStateType = typeof initialState;

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsType
): InitialStateType => {
  switch (action.type) {
    case "PACKS/SET-PACKS":
      return { ...state, cardPacks: action.cardPacks };
    case "PACKS/SET-PACKS-CURRENT-PAGE":
      return { ...state, page: action.page };
    case "PACKS/SET-PACKS-TOTAL-COUNT":
      return { ...state, cardPacksTotalCount: action.packsTotalCount };
    case "PACKS/SET-ARE-MY-PACKS":
      return { ...state, areMyPacks: action.areMyPacks };
    case "PACKS/SET-MIN-MAX-CARDS-COUNT":
      return { ...state, min: action.min, max: action.max };
    case "PACKS/SET-PACK-NAME-SEARCH":
      return { ...state, packName: action.packName };
    default:
      return state;
  }
};

const setPacksAC = (cardPacks: PackType[]) => ({ type: "PACKS/SET-PACKS", cardPacks } as const);

export const setPacksCurrentPageAC = (page: number) =>
  ({ type: "PACKS/SET-PACKS-CURRENT-PAGE", page } as const);

export const setPacksTotalCountAC = (packsTotalCount: number) =>
  ({ type: "PACKS/SET-PACKS-TOTAL-COUNT", packsTotalCount } as const);

export const setAreMyPacksAC = (areMyPacks: boolean) =>
  ({ type: "PACKS/SET-ARE-MY-PACKS", areMyPacks } as const);

export const setMinMaxCardsCountAC = (min: number, max: number) =>
  ({ type: "PACKS/SET-MIN-MAX-CARDS-COUNT", min, max } as const);

export const setPackNameSearchAC = (packName: string) =>
  ({ type: "PACKS/SET-PACK-NAME-SEARCH", packName } as const);

export const fetchPacksTC =
  (): AppThunkType => async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppIsRequestProcessingAC(true));

    const { min, max, page, pageCount, areMyPacks, packName } = getState().packs;
    let user_id = getState().auth.user?._id;
    user_id = areMyPacks ? user_id : "";

    try {
      const res = await packsAPI.getPacks({ min, max, page, pageCount, user_id, packName });
      dispatch(setPacksAC(res.data.cardPacks));
      dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount));
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

export const deletePackTC =
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

export const updatePackTC =
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

export type PacksActionsType =
  | SetPacksType
  | SetPacksCurrentPageType
  | SetPacksTotalCountType
  | SetAreMyPacksType
  | SetMinMaxCardsCountType
  | SetPackNameSearchType;

type SetPacksType = ReturnType<typeof setPacksAC>;
type SetPacksCurrentPageType = ReturnType<typeof setPacksCurrentPageAC>;
type SetPacksTotalCountType = ReturnType<typeof setPacksTotalCountAC>;
type SetAreMyPacksType = ReturnType<typeof setAreMyPacksAC>;
type SetMinMaxCardsCountType = ReturnType<typeof setMinMaxCardsCountAC>;
type SetPackNameSearchType = ReturnType<typeof setPackNameSearchAC>;
