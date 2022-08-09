import { RootState } from '../store';

// _Init
export const getTokenType = (state: RootState) => state._init.tokenType;
export const getInitStateToken = (state: RootState) => state._init.initStateToken;
export const getAccessToken = (state: RootState) => state._init.initStateToken.access_token;
export const getInitStateUniqueID = (state: RootState) => state._init.initStateUniqueID;
// Shop
// Account
// export const getCheckUserHasShop = (state: RootState) => state.account.profil.has_shop;

// Offers
export const getMyOffersNextPage = (state: RootState) => state.offer.userOffersList.next;
export const getOfferVuesNextPage = (state: RootState) => state.offer.offerVuesList.next;

// Chat
export const getMyConversationsResults = (state: RootState) => state.chat.conversationsList.results;
export const getMyConversationsNextPage = (state: RootState) => state.chat.conversationsList.next;

// Order
export const getMyBuyingsListNextPage = (state: RootState) => state.order.buyingsList.next;
export const getMySellingsListNextPage = (state: RootState) => state.order.sellingsList.next;