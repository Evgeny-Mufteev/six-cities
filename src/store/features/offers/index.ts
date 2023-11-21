import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOffersByCity } from '../../../utils/offers';
import { sorting } from '../../../utils/sorting';

import { SortingType } from '../../../types/sorting';
import { OfferType } from '../../../types/offer-preview';

import { fetchOffers } from './thunks';
import { CityName } from '../../../const/routes';

export interface OffersState {
  currentCity: CityName;
  offers: OfferType[];
  allOffers: OfferType[];
  currentSorting: SortingType;
  cities: string[];
  loading: boolean;
}

const initialState: OffersState = {
  currentCity: CityName.Paris,
  offers: [],
  allOffers: [],
  currentSorting: 'Popular',
  cities: [],
  loading: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<CityName>) {
      state.currentCity = action.payload;
    },
    updateOffers(state, action: PayloadAction<string>) {
      const filteredOffers = getOffersByCity(state, action.payload);
      state.offers = sorting[state.currentSorting](filteredOffers);
    },
    changeSorting(state, action: PayloadAction<SortingType>) {
      state.currentSorting = action.payload;
      state.offers = sorting[action.payload](state.offers);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.allOffers = action.payload;
        state.offers = getOffersByCity(state, state.currentCity);
        state.loading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { changeCity, updateOffers, changeSorting } = offersSlice.actions;
export default offersSlice.reducer;
