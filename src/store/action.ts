import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOffer } from '../types';
import { AxiosInstance } from 'axios';

export const fetchOffers = createAsyncThunk<IOffer[], void, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_, { extra: api }) => {
    const response = await api.get('/offers');
    return response.data;
  }
);

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
