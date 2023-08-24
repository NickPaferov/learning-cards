import {
  CreatePackParamsType,
  GetPacksResponseType,
  packsAPI,
  PackType,
  UpdatePackParamsType,
} from "../api/packs-api";
import { AppRootStateType, AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/constants";

const initialState = {
  cardPacks: [] as PackType[],
  page: DEFAULT_PAGE,
  pageCount: DEFAULT_PAGE_SIZE,
  cardPacksTotalCount: 0,
  areMyPacks: false,
  min: null as number | null,
  max: null as number | null,
  minCardsCount: 0,
  maxCardsCount: 0,
  packName: "",
  sortPacks: "0updated",
};

type InitialStateType = typeof initialState;

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsType
): InitialStateType => {
  switch (action.type) {
    case "PACKS/SET-PACKS":
      return { ...state, ...action.data };
    case "PACKS/SET-PACKS-CURRENT-PAGE":
      return { ...state, page: action.page };
    case "PACKS/SET-ARE-MY-PACKS":
      return { ...state, areMyPacks: action.areMyPacks };
    case "PACKS/SET-MIN-MAX-CARDS-COUNT":
      return { ...state, min: action.min, max: action.max };
    case "PACKS/SET-PACK-NAME-SEARCH":
      return { ...state, packName: action.packName };
    case "PACKS/SET-SORT-PACKS-PARAM":
      return { ...state, sortPacks: action.sortPacksParam };
    case "PACKS/SET-PACKS-COUNT-PER-PAGE":
      return { ...state, pageCount: action.pageCount };
    case "PACKS/RESET-ALL-PACKS-FILTERS":
      return {
        ...state,
        page: DEFAULT_PAGE,
        pageCount: DEFAULT_PAGE_SIZE,
        areMyPacks: false,
        min: null,
        max: null,
        packName: "",
        sortPacks: "0updated",
      };
    default:
      return state;
  }
};

const setPacksAC = (data: GetPacksResponseType) =>
  ({ type: "PACKS/SET-PACKS", data } as const);

export const setPacksCurrentPageAC = (page: number) =>
  ({ type: "PACKS/SET-PACKS-CURRENT-PAGE", page } as const);

export const setAreMyPacksAC = (areMyPacks: boolean) =>
  ({ type: "PACKS/SET-ARE-MY-PACKS", areMyPacks } as const);

export const setMinMaxCardsCountAC = (min: number | null, max: number | null) =>
  ({ type: "PACKS/SET-MIN-MAX-CARDS-COUNT", min, max } as const);

export const setPackNameSearchAC = (packName: string) =>
  ({ type: "PACKS/SET-PACK-NAME-SEARCH", packName } as const);

export const setSortPacksParamAC = (sortPacksParam: string) =>
  ({ type: "PACKS/SET-SORT-PACKS-PARAM", sortPacksParam } as const);

export const setPacksCountPrePageAC = (pageCount: number) =>
  ({ type: "PACKS/SET-PACKS-COUNT-PER-PAGE", pageCount } as const);

export const setResetAllPacksFiltersAC = () =>
  ({ type: "PACKS/RESET-ALL-PACKS-FILTERS" } as const);

export const fetchPacksTC =
  (): AppThunkType => async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppIsRequestProcessingAC(true));

    const { min, max, page, pageCount, areMyPacks, packName, sortPacks } =
      getState().packs;
    let user_id = getState().auth.user?._id;
    user_id = areMyPacks ? user_id : "";

    try {
      const res = await packsAPI.getPacks({
        min,
        max,
        page,
        pageCount,
        user_id,
        packName,
        sortPacks,
      });
      dispatch(setPacksAC(res.data));
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
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export type PacksActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setPacksCurrentPageAC>
  | ReturnType<typeof setAreMyPacksAC>
  | ReturnType<typeof setMinMaxCardsCountAC>
  | ReturnType<typeof setPackNameSearchAC>
  | ReturnType<typeof setSortPacksParamAC>
  | ReturnType<typeof setResetAllPacksFiltersAC>
  | ReturnType<typeof setPacksCountPrePageAC>;
