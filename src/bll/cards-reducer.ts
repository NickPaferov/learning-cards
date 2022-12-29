import {
  cardsAPI,
  CardType,
  CreateCardParamsType,
  GetCardsParamsType,
  UpdateCardParamsType,
} from "../api/cards-api";
import { AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";

const initialState = {
  cards: [] as CardType[],
  packUserId: "",
  packName: "",
  packPrivate: false,
  packCreated: "",
  packUpdated: "",
  page: 1,
  pageCount: 5,
  cardsTotalCount: 100,
  minGrade: 0,
  maxGrade: 5,
  token: "",
  tokenDeathTime: 0,
  searchParams: {
    cardAnswer: "",
    cardQuestion: "",
    cardsPack_id: "63a9a657e55132182084ce35",
    min: 0,
    max: 5,
    sortCards: "",
    page: 1,
    pageCount: 5,
  } as GetCardsParamsType,
};

type InitialStateType = typeof initialState;

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case "CARDS/SET-CARDS": {
      return { ...state, cards: action.cards };
    }
    case "CARDS/SET-CARDS-SEARCH-PARAMS": {
      return { ...state, searchParams: action.searchParams };
    }
    default: {
      return state;
    }
  }
};

const setCardsAC = (cards: CardType[]) => ({ type: "CARDS/SET-CARDS", cards } as const);
const setCardsSearchParamsAC = (searchParams: GetCardsParamsType) =>
  ({
    type: "CARDS/SET-CARDS-SEARCH-PARAMS",
    searchParams,
  } as const);

export const fetchCardsTC = (): AppThunkType => async (dispatch, getState) => {
  const { searchParams } = getState().cards;
  dispatch(setAppIsRequestProcessingAC(true));
  try {
    const res = await cardsAPI.getCards(searchParams);
    dispatch(setCardsAC(res.data.cards));
  } catch (e) {
    handleError(e, dispatch);
  } finally {
    dispatch(setAppIsRequestProcessingAC(false));
  }
};

export const addCardTC =
  (params: CreateCardParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.createCard(params);
      dispatch(fetchCardsTC());
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

const deleteCardTC =
  (id: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.deleteCard(id);
      dispatch(fetchCardsTC());
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

const updateCardTC =
  (params: UpdateCardParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.updateCard(params);
      dispatch(fetchCardsTC());
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export type CardsActionsType = SetCardsType | SetCardsSearchParamsType;
type SetCardsType = ReturnType<typeof setCardsAC>;
type SetCardsSearchParamsType = ReturnType<typeof setCardsSearchParamsAC>;
