import { instance } from "./api-instance";

export const cardsAPI = {
  getCards(params: GetCardsParamsType) {
    return instance.get<GetCardsResponseType>("/cards/card", { params });
  },
  createCard(params: CreateCardParamsType) {
    return instance.post("/cards/card", { card: params });
  },
  deleteCard(id: string) {
    return instance.delete<DeleteCardResponseType>(`/cards/card?id=${id}`);
  },
  updateCard(params: UpdateCardParamsType) {
    return instance.put<UpdateCardResponseType>("/cards/card", { card: params });
  },
};

export type GetCardsParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string | undefined;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type CreateCardParamsType = {
  cardsPack_id: string | undefined;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type UpdateCardParamsType = {
  _id: string;
  question?: string;
  answer?: string;
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  questionImg: string;
  answerImg: string;
  answerVideo: string;
  questionVideo: string;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};

export type GetCardsResponseType = {
  cards: CardType[];
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};

export type CreateCardResponseType = {
  newCard: CardType;
  token: string;
  tokenDeathTime: number;
};

export type DeleteCardResponseType = {
  deletedCard: CardType;
  token: string;
  tokenDeathTime: number;
};

export type UpdateCardResponseType = {
  updatedCard: CardType;
  token: string;
  tokenDeathTime: number;
};
