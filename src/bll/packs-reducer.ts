import { CreatePackParamsType, packsAPI, PackType, UpdatePackParamsType } from "../api/packs-api";
import { AppRootStateType, AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";

const initialState = {
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 50,
};

type InitialStateType = typeof initialState;

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsType
): InitialStateType => {
  switch (action.type) {
    case "PACKS/SET-PACKS":
      return { ...state, cardPacks: action.cardPacks };
    case "PACKS/SET-CURRENT-PAGE":
      return { ...state, page: action.page };
    case "PACKS/SET-PACKS-TOTAL-COUNT":
      return { ...state, cardPacksTotalCount: action.packsTotalCount };
    default:
      return state;
  }
};

const setPacksAC = (cardPacks: PackType[]) => ({ type: "PACKS/SET-PACKS", cardPacks } as const);

export const setCurrentPageAC = (page: number) =>
  ({ type: "PACKS/SET-CURRENT-PAGE", page } as const);

export const setPacksTotalCountAC = (packsTotalCount: number) =>
  ({ type: "PACKS/SET-PACKS-TOTAL-COUNT", packsTotalCount } as const);

export const fetchPacksTC =
  (): AppThunkType => async (dispatch, getState: () => AppRootStateType) => {
    const { page, pageCount } = getState().packs;
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      const res = await packsAPI.getPacks({ page, pageCount });
      dispatch(setPacksAC(res.data.cardPacks));
      dispatch(setCurrentPageAC(page));
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

export type PacksActionsType = SetPacksType | SetCurrentPageType | SetPacksTotalCountType;

type SetPacksType = ReturnType<typeof setPacksAC>;
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>;
type SetPacksTotalCountType = ReturnType<typeof setPacksTotalCountAC>;
