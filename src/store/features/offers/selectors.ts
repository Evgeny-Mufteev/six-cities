import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../configure-store';
import { sorting } from '../../../utils/sorting';
import { OfferType } from '../../../types/offer-preview';

export const selectCurrentCity = (state: RootState) => state.offers.currentCity;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectCurrentSorting = (state: RootState) => state.offers.currentSorting;

export const selectFavoriteOffers = createSelector(
  [selectOffers],
  (offers): OfferType[] => offers.filter((offer) => offer.isFavorite)
);

export const selectSortedOffers = createSelector(
  [selectOffers, selectCurrentSorting],
  (offers, currentSorting): OfferType[] => sorting[currentSorting](offers)
);

export const selectFilteredOffers = createSelector(
  [selectSortedOffers, selectCurrentCity],
  (sortedOffers, currentCity): OfferType[] => sortedOffers.filter((offer) => offer.city.name === currentCity)
);


// selectCurrentCity возвращает текущий выбранный город.
// selectOffers возвращает текущий список предложений.
// selectCurrentSorting возвращает текущий тип сортировки.
// selectFavoriteOffers создает селектор для выбора избранных предложений.
// selectSortedOffers создает селектор для сортировки предложений в соответствии с выбранным типом сортировки.
// selectFilteredOffers создает селектор для фильтрации предложений по текущему городу.
