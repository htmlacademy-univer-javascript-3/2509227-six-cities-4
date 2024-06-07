import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchOffers,
  setCity,
  setOffers,
  setSortType,
  highlightOffer,
  login,
  checkAuthStatus,
  fetchOffer,
  fetchNearbyOffers,
  fetchComments,
  postComment,
  logout,
  fetchFavorites,
  toggleFavorite,
} from './action';
import { IRentalState, IOffer, IComment, IFullOffer, IUserInfo } from '../types';

const initialState: IRentalState = {
  city: 'Paris',
  offers: [],
  cities: [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf',
  ],
  sortType: 'Popular',
  highlightedOffer: null,
  loading: false,
  error: null,
  authorizationStatus: 'NO_AUTH',
  userInfo: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  favorites: [],
  authChecking: false,
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
      .addCase(
        fetchOffers.fulfilled,
        (state, action: PayloadAction<IOffer[]>) => {
          state.loading = false;
          state.offers = action.payload;
        }
      )
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed';
      })
      .addCase(setCity.fulfilled, (state, action: PayloadAction<string>) => {
        state.city = action.payload;
      })
      .addCase(
        setOffers.fulfilled,
        (state, action: PayloadAction<IOffer[]>) => {
          state.offers = action.payload;
        }
      )
      .addCase(
        setSortType.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.sortType = action.payload;
        }
      )
      .addCase(
        highlightOffer.fulfilled,
        (state, action: PayloadAction<number | null>) => {
          state.highlightedOffer = action.payload;
        }
      )
      .addCase(login.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
        state.authorizationStatus = 'AUTH';
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = 'NO_AUTH';
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = 'NO_AUTH';
        state.userInfo = null;
        state.favorites = [];
        state.offers = state.offers.map((offer) => ({
          ...offer,
          isFavorite: false,
        }));
        if (state.currentOffer) {
          state.currentOffer.isFavorite = false;
        }
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.authChecking = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
        state.authorizationStatus = 'AUTH';
        state.userInfo = action.payload;
        state.authChecking = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = 'NO_AUTH';
        state.authChecking = false;
      })
      .addCase(
        fetchOffer.fulfilled,
        (state, action: PayloadAction<IFullOffer>) => {
          state.loading = false;
          state.currentOffer = action.payload;
          if (state.favorites.some((fav) => fav.id === action.payload.id)) {
            state.currentOffer.isFavorite = true;
          }
        }
      )
      .addCase(
        fetchNearbyOffers.fulfilled,
        (state, action: PayloadAction<IOffer[]>) => {
          state.nearbyOffers = action.payload;
        }
      )
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.comments = action.payload;
        }
      )
      .addCase(postComment.fulfilled, () => {})
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<IOffer[]>) => {
          state.favorites = action.payload;
          state.offers = state.offers.map((offer) => ({
            ...offer,
            isFavorite: action.payload.some((fav) => fav.id === offer.id),
          }));
        }
      )
      .addCase(
        toggleFavorite.fulfilled,
        (state, action: PayloadAction<IFullOffer>) => {
          const updatedOffer = action.payload;
          state.offers = state.offers.map((offer) =>
            offer.id === updatedOffer.id ? updatedOffer : offer
          );
          if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
            state.currentOffer = updatedOffer;
          }
          if (updatedOffer.isFavorite) {
            state.favorites.push(updatedOffer);
          } else {
            state.favorites = state.favorites.filter(
              (offer) => offer.id !== updatedOffer.id
            );
          }
        }
      );
  },
});

export default rentalSlice.reducer;
