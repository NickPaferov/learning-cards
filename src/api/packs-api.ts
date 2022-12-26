import { instance } from "./api-instance";

export const packsAPI = {
  getPacks(params: GetPacksParamsType) {
    return instance.get<GetPacksResponseType>("/cards/pack", { params });
  },
  createPack(params: CreatePackParamsType) {
    return instance.post<CreatePackResponseType>("/cards/pack", { params });
  },
  deletePack(id: string) {
    return instance.delete<DeletePackResponseType>(`/cards/pack?${id}`);
  },
  updatePack(params: UpdatePackParamsType) {
    return instance.put<UpdatePackResponseType>("/cards/pack", { params });
  },
};

export type GetPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};

export type CreatePackParamsType = {
  cardsPack: {
    name?: string;
    deckCover?: string;
    private?: boolean;
  };
};

export type UpdatePackParamsType = {
  cardsPack: {
    _id: string;
    name?: string;
  };
};

export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};

export type GetPacksResponseType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export type CreatePackResponseType = {
  newCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type DeletePackResponseType = {
  deletedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type UpdatePackResponseType = {
  updatedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};
