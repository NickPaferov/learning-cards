import { cardsAPI, CardType, CreateCardParamsType, UpdateCardParamsType } from "../api/cards-api";
import { AppThunkType } from "./store";
import { setAppIsRequestProcessingAC } from "./app-reducer";
import { handleError } from "../utils/error-utils";

const initialState = {
  cards: [] as CardType[],
  cardsPack_id: "63a9a657e55132182084ce35",
  page: 1,
  pageCount: 3,
  cardsTotalCount: 15,
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
    case "CARDS/SET-CARDS-CURRENT-PAGE": {
      return { ...state, page: action.page };
    }
    case "CARDS/SET-CARDS-TOTAL-COUNT":
      return { ...state, cardsTotalCount: action.cardsTotalCount };
    default: {
      return state;
    }
  }
};

const setCardsAC = (cards: CardType[]) => ({ type: "CARDS/SET-CARDS", cards } as const);

export const setCardsCurrentPageAC = (page: number) =>
  ({
    type: "CARDS/SET-CARDS-CURRENT-PAGE",
    page,
  } as const);

export const setCardsTotalCountAC = (cardsTotalCount: number) =>
  ({ type: "CARDS/SET-CARDS-TOTAL-COUNT", cardsTotalCount } as const);

export const fetchCardsTC = (): AppThunkType => async (dispatch, getState) => {
  const { cardsPack_id, page, pageCount } = getState().cards;
  dispatch(setAppIsRequestProcessingAC(true));
  try {
    const res = await cardsAPI.getCards({ cardsPack_id, page, pageCount });
    dispatch(setCardsAC(res.data.cards));
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
      dispatch(fetchCardsTC());
    } catch (e) {
      handleError(e, dispatch);
    } finally {
      dispatch(setAppIsRequestProcessingAC(false));
    }
  };

export const deleteCardTC =
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

export const updateCardTC =
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

export type CardsActionsType = SetCardsType | SetCardsCurrentPageType | SetCardsTotalCountType;

type SetCardsType = ReturnType<typeof setCardsAC>;
type SetCardsCurrentPageType = ReturnType<typeof setCardsCurrentPageAC>;
type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>;
