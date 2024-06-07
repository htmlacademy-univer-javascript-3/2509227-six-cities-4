import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOffer, IComment, IFullOffer } from '../types';
import { AxiosInstance } from 'axios';
import { RootState } from '../store';

export const fetchOffers = createAsyncThunk<
  IOffer[],
  void,
  { extra: AxiosInstance }
>('offers/fetchOffers', async (_, { extra: api }) => {
  const response = await api.get('/offers');
  return response.data;
});

export const setCity = createAsyncThunk<string, string>(
  'city/setCity',
  async (city) => city
);

export const setOffers = createAsyncThunk<IOffer[], IOffer[]>(
  'offers/setOffers',
  async (offers) => offers
);

export const setSortType = createAsyncThunk<string, string>(
  'sortType/setSortType',
  async (sortType) => sortType
);

export const highlightOffer = createAsyncThunk<number | null, number | null>(
  'offer/highlightOffer',
  async (offerId) => offerId
);

export const checkAuthStatus = createAsyncThunk<
  any,
  void,
  { extra: AxiosInstance }
>('user/checkAuthStatus', async (_, { extra: api }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await api.get('/login', {
    headers: {
      'X-Token': token,
    },
  });

  const userInfo = response.data;
  localStorage.setItem('userInfo', JSON.stringify(userInfo));

  return userInfo;
});

export const login = createAsyncThunk<
  any,
  { email: string; password: string },
  { extra: AxiosInstance }
>('user/login', async ({ email, password }, { extra: api }) => {
  const response = await api.post('/login', { email, password });
  const userInfo = response.data;

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  localStorage.setItem('token', userInfo.token);

  return userInfo;
});

export const fetchOffer = createAsyncThunk<
  IFullOffer,
  string,
  { extra: AxiosInstance }
>('offer/fetchOffer', async (offerId, { extra: api }) => {
  const response = await api.get(`/offers/${offerId}`);
  return response.data;
});

export const fetchNearbyOffers = createAsyncThunk<
  IOffer[],
  string,
  { extra: AxiosInstance }
>('offer/fetchNearbyOffers', async (offerId, { extra: api }) => {
  const response = await api.get(`/offers/${offerId}/nearby`);
  return response.data;
});

export const fetchComments = createAsyncThunk<
  IComment[],
  string,
  { extra: AxiosInstance }
>('offer/fetchComments', async (offerId, { extra: api }) => {
  const response = await api.get(`/comments/${offerId}`);
  return response.data;
});

export const postComment = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance; state: RootState }
>(
  'offer/postComment',
  async ({ offerId, comment, rating }, { extra: api, getState, dispatch }) => {
    const state = getState();
    const token = state.rental.userInfo?.token;

    if (!token) {
      throw new Error('No authentication token found');
    }

    await api.post(
      `/comments/${offerId}`,
      { comment, rating },
      {
        headers: {
          'X-Token': token,
        },
      }
    );

    dispatch(fetchComments(offerId));
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { extra: AxiosInstance; state: RootState }
>('user/logout', async (_, { extra: api, getState }) => {
  const state = getState();
  const token = state.rental.userInfo?.token;
  if (token) {
    await api.delete('/logout', {
      headers: {
        'X-Token': token,
      },
    });
  }
});

export const fetchFavorites = createAsyncThunk<
  IOffer[],
  void,
  { extra: AxiosInstance; state: RootState }
>('favorites/fetchFavorites', async (_, { extra: api, getState }) => {
  const state = getState();
  const token = state.rental.userInfo?.token;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await api.get('/favorite', {
    headers: {
      'X-Token': token,
    },
  });

  return response.data;
});

export const toggleFavorite = createAsyncThunk<
  IFullOffer,
  { offerId: string; status: number },
  { extra: AxiosInstance; state: RootState }
>(
  'favorites/toggleFavorite',
  async ({ offerId, status }, { extra: api, getState }) => {
    const state = getState();
    const token = state.rental.userInfo?.token;

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await api.post(
      `/favorite/${offerId}/${status}`,
      {},
      {
        headers: {
          'X-Token': token,
        },
      }
    );

    return response.data;
  }
);
