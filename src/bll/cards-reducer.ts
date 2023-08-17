import {
  cardsAPI,
  CardType,
  CreateCardParamsType,
  GetCardsResponseType,
  UpdateCardGradeParamsType,
  UpdateCardParamsType,
} from "../api/cards-api";
import { AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/constants";

const initialState = {
  cards: [] as CardType[],
  page: DEFAULT_PAGE,
  pageCount: DEFAULT_PAGE_SIZE,
  cardsTotalCount: 0,
  packName: "",
  cardQuestion: "",
  packUserId: "",
  sortCards: "0updated",
  areCardsFetched: false,
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
    case "CARDS/SET-SORT-CARDS-PARAM":
      return { ...state, sortCards: action.sortCardsParam };
    case "CARDS/SET-CARDS-COUNT-PER-PAGE":
      return { ...state, pageCount: action.pageCount };
    case "CARDS/SET-ARE-CARDS-FETCHED":
      return { ...state, areCardsFetched: action.areCardsFetched };
    default: {
      return state;
    }
  }
};

const setCardsAC = (data: GetCardsResponseType) =>
  ({ type: "CARDS/SET-CARDS", data } as const);

export const setCardsCurrentPageAC = (page: number) =>
  ({
    type: "CARDS/SET-CARDS-CURRENT-PAGE",
    page,
  } as const);

export const setCardsTotalCountAC = (cardsTotalCount: number) =>
  ({ type: "CARDS/SET-CARDS-TOTAL-COUNT", cardsTotalCount } as const);

export const setCardQuestionAC = (cardQuestion: string) =>
  ({ type: "CARDS/SET-CARD-QUESTION", cardQuestion } as const);

export const setSortCardsParamAC = (sortCardsParam: string) =>
  ({ type: "CARDS/SET-SORT-CARDS-PARAM", sortCardsParam } as const);

export const setCardsCountPerPageAC = (pageCount: number) =>
  ({ type: "CARDS/SET-CARDS-COUNT-PER-PAGE", pageCount } as const);

export const setAreCardsFetchedAC = (areCardsFetched: boolean) =>
  ({ type: "CARDS/SET-ARE-CARDS-FETCHED", areCardsFetched } as const);

export const fetchCardsTC =
  (cardsPack_id: string): AppThunkType =>
  async (dispatch, getState) => {
    const { page, pageCount, cardQuestion, sortCards } = getState().cards;
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      const res = await cardsAPI.getCards({
        cardsPack_id,
        page,
        pageCount,
        cardQuestion,
        sortCards,
      });
      dispatch(setCardsAC(res.data));
      dispatch(setAreCardsFetchedAC(true));
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
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const deleteCardTC =
  (cardsPack_id: string, id: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.deleteCard(id);
      dispatch(fetchCardsTC(cardsPack_id));
    } catch (e) {
      handleError(e, dispatch);
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const updateCardTC =
  (cardsPack_id: string, params: UpdateCardParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.updateCard(params);
      dispatch(fetchCardsTC(cardsPack_id));
    } catch (e) {
      handleError(e, dispatch);
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const updateCardGradeTC =
  (cardsPack_id: string, params: UpdateCardGradeParamsType): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppIsRequestProcessingAC(true));
    try {
      await cardsAPI.updateCardGrade(params);
      dispatch(fetchCardsTC(cardsPack_id));
    } catch (e) {
      handleError(e, dispatch);
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export type CardsActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setCardsCurrentPageAC>
  | ReturnType<typeof setCardsTotalCountAC>
  | ReturnType<typeof setCardQuestionAC>
  | ReturnType<typeof setSortCardsParamAC>
  | ReturnType<typeof setCardsCountPerPageAC>
  | ReturnType<typeof setAreCardsFetchedAC>;
