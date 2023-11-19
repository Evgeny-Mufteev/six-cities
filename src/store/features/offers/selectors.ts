import { RootState } from '../../configure-store';

export const selectCurrentCity = (state: RootState) => state.offers.currentCity;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectCurrentSorting = (state: RootState) => state.offers.currentSorting;