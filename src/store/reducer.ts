import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffers, setCity, setOffers, setSortType, highlightOffer } from './action';
import { IRentalState, IOffer } from '../types';

const initialState: IRentalState = {
  city: 'Paris',
  offers: [],
  cities: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
  sortType: 'Popular',
  highlightedOffer: null,
  loading: false,
  error: null,
};

const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<IOffer[]>) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed';
      })
      .addCase(setCity.fulfilled, (state, action: PayloadAction<string>) => {
        state.city = action.payload;
      })
      .addCase(setOffers.fulfilled, (state, action: PayloadAction<IOffer[]>) => {
        state.offers = action.payload;
      })
      .addCase(setSortType.fulfilled, (state, action: PayloadAction<string>) => {
        state.sortType = action.payload;
      })
      .addCase(highlightOffer.fulfilled, (state, action: PayloadAction<number | null>) => {
        state.highlightedOffer = action.payload;
      });
  },
});

export default rentalSlice.reducer;
