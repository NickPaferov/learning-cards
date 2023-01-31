import { AppRootStateType } from "../bll/store";
import { PackType } from "../api/packs-api";
import { CardType } from "../api/cards-api";

//authSelectors
export const selectRegisterStatus = (state: AppRootStateType): boolean => state.auth.isRegistered;
export const selectLoginStatus = (state: AppRootStateType): boolean => state.auth.isLoggedIn;
export const selectUserId = (state: AppRootStateType): string | undefined => state.auth.user?._id;
export const selectUserName = (state: AppRootStateType): string | undefined =>
  state.auth.user?.name;
export const selectUserEmail = (state: AppRootStateType): string | undefined =>
  state.auth.user?.email;
export const selectUserAvatar = (state: AppRootStateType): string | undefined =>
  state.auth.user?.avatar;
export const selectInstructionSendStatus = (state: AppRootStateType): boolean =>
  state.auth.isInstructionsSent;
export const selectPasswordChangeStatus = (state: AppRootStateType): boolean =>
  state.auth.isPasswordChanged;

//appSelectors
export const selectAppInitStatus = (state: AppRootStateType): boolean => state.app.isInitialized;
export const selectRequestProcessingStatus = (state: AppRootStateType): boolean =>
  state.app.isRequestProcessing;
export const selectAppError = (state: AppRootStateType): string | null => state.app.error;

//packsSelectors
export const selectPacksPageSize = (state: AppRootStateType): number => state.packs.pageCount;
export const selectPacksTotalCount = (state: AppRootStateType): number =>
  state.packs.cardPacksTotalCount;
export const selectCurrentPacksPage = (state: AppRootStateType): number => state.packs.page;
export const selectPackName = (state: AppRootStateType): string => state.packs.packName;
export const selectAreMyPacksStatus = (state: AppRootStateType): boolean => state.packs.areMyPacks;
export const selectPacks = (state: AppRootStateType): PackType[] => state.packs.cardPacks; // for Search
export const selectMinCardsSearchParam = (state: AppRootStateType): number => state.packs.min;
export const selectMaxCardsSearchParam = (state: AppRootStateType): number => state.packs.max;
export const selectMinCardsCount = (state: AppRootStateType): number => state.packs.minCardsCount;
export const selectMaxCardsCount = (state: AppRootStateType): number => state.packs.maxCardsCount;
export const selectSortPacksParam = (state: AppRootStateType): string => state.packs.sortPacks;
export const selectPacksCountPerPage = (state: AppRootStateType): number => state.packs.pageCount;

//cardsSelectors
export const selectCardsPageSize = (state: AppRootStateType): number => state.cards.pageCount;
export const selectCardsTotalCount = (state: AppRootStateType): number =>
  state.cards.cardsTotalCount;
export const selectCurrentCardsPage = (state: AppRootStateType): number => state.cards.page;
export const selectCards = (state: AppRootStateType): CardType[] => state.cards.cards;
export const selectCardsListName = (state: AppRootStateType): string => state.cards.packName;
export const selectCardQuestion = (state: AppRootStateType): string => state.cards.cardQuestion; // for Search
export const selectPackUserId = (state: AppRootStateType): string => state.cards.packUserId;
export const selectSortCardsParam = (state: AppRootStateType): string => state.cards.sortCards;
export const selectCardsCountPerPage = (state: AppRootStateType): number => state.cards.pageCount;
export const selectAreCardsFetchedStatus = (state: AppRootStateType): boolean =>
  state.cards.areCardsFetched;
