import {
  cardsAPI,
  CardType,
  CreateCardParamsType,
  GetCardsResponseType,
  UpdateCardParamsType,
} from "../api/cards-api";
import { AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";

const initialState = {
  cards: [] as CardType[],
  page: 1,
  pageCount: 3,
  cardsTotalCount: 15,
  packName: "",
  cardQuestion: "",
};

type InitialStateType = typeof initialState;

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case "CARDS/SET-CARDS": {
      return { ...state, ...action.data };
    }
    case "CARDS/SET-CARDS-CURRENT-PAGE": {
      return { ...state, page: action.page };
    }
    case "CARDS/SET-CARDS-TOTAL-COUNT":
      return { ...state, cardsTotalCount: action.cardsTotalCount };
    case "CARDS/SET-CARD-QUESTION":
      return { ...state, cardQuestion: action.cardQuestion };
    default: {
      return state;
    }
  }
};

const setCardsAC = (data: GetCardsResponseType) => ({ type: "CARDS/SET-CARDS", data } as const);

export const setCardsCurrentPageAC = (page: number) =>
  ({
    type: "CARDS/SET-CARDS-CURRENT-PAGE",
    page,
  } as const);

export const setCardsTotalCountAC = (cardsTotalCount: number) =>
  ({ type: "CARDS/SET-CARDS-TOTAL-COUNT", cardsTotalCount } as const);

export const setCardQuestionAC = (cardQuestion: string) =>
  ({ type: "CARDS/SET-CARD-QUESTION", cardQuestion } as const);

export const fetchCardsTC =
  (cardsPack_id: string | undefined): AppThunkType =>
  async (dispatch, getState) => {
    const { page, pageCount, cardQuestion } = getState().cards;
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      const res = await cardsAPI.getCards({ cardsPack_id, page, pageCount, cardQuestion });
      dispatch(setCardsAC(res.data));
      dispatch(setCardsTotalCountAC(res.data.cardsTotalCount));
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
      dispatch(fetchCardsTC(params.cardsPack_id));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const deleteCardTC =
  (cardsPack_id: string | undefined, id: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.deleteCard(id);
      dispatch(fetchCardsTC(cardsPack_id));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const updateCardTC =
  (cardsPack_id: string | undefined, params: UpdateCardParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.updateCard(params);
      dispatch(fetchCardsTC(cardsPack_id));
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export type CardsActionsType =
  | SetCardsType
  | SetCardsCurrentPageType
  | SetCardsTotalCountType
  | SetCardQuestionType;

type SetCardsType = ReturnType<typeof setCardsAC>;
type SetCardsCurrentPageType = ReturnType<typeof setCardsCurrentPageAC>;
type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>;
type SetCardQuestionType = ReturnType<typeof setCardQuestionAC>;
