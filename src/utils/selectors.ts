import { AppRootStateType } from "../bll/store";

//authSelectors
export const selectRegisterStatus = (state: AppRootStateType) => state.auth.isRegistered;
export const selectLoginStatus = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectUserId = (state: AppRootStateType) => state.auth.user?._id;
export const selectUserName = (state: AppRootStateType) => state.auth.user?.name;
export const selectUserEmail = (state: AppRootStateType) => state.auth.user?.email;
export const selectInstructionSendStatus = (state: AppRootStateType) =>
  state.auth.isInstructionsSent;
export const selectPasswordChangeStatus = (state: AppRootStateType) => state.auth.isPasswordChanged;

//appSelectors
export const selectAppInitStatus = (state: AppRootStateType) => state.app.isInitialized;
export const selectRequestProcessingStatus = (state: AppRootStateType) =>
  state.app.isRequestProcessing;
export const selectAppError = (state: AppRootStateType) => state.app.error;

//packsSelectors
export const selectPacksPageSize = (state: AppRootStateType) => state.packs.pageCount;
export const selectPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount;
export const selectCurrentPacksPage = (state: AppRootStateType) => state.packs.page;
export const selectPackName = (state: AppRootStateType) => state.packs.packName;
export const selectAreMyPacksStatus = (state: AppRootStateType) => state.packs.areMyPacks;
export const selectPacks = (state: AppRootStateType) => state.packs.cardPacks; // for Search
export const selectMinCardsSearchParam = (state: AppRootStateType) => state.packs.min;
export const selectMaxCardsSearchParam = (state: AppRootStateType) => state.packs.max;
export const selectMinCardsCount = (state: AppRootStateType) => state.packs.minCardsCount;
export const selectMaxCardsCount = (state: AppRootStateType) => state.packs.maxCardsCount;
export const selectSortPacksParam = (state: AppRootStateType) => state.packs.sortPacks;
export const selectPacksCountPerPage = (state: AppRootStateType) => state.packs.pageCount;

//cardsSelectors
export const selectCardsPageSize = (state: AppRootStateType) => state.cards.pageCount;
export const selectCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount;
export const selectCurrentCardsPage = (state: AppRootStateType) => state.cards.page;
export const selectCards = (state: AppRootStateType) => state.cards.cards;
export const selectCardsListName = (state: AppRootStateType) => state.cards.packName;
export const selectCardQuestion = (state: AppRootStateType) => state.cards.cardQuestion; // for Search
export const selectPackUserId = (state: AppRootStateType) => state.cards.packUserId;
export const selectSortCardsParam = (state: AppRootStateType) => state.cards.sortCards;
export const selectCardsCountPerPage = (state: AppRootStateType) => state.cards.pageCount;
