import { configureStore } from '@reduxjs/toolkit';
import rentalReducer from './reducer';
import { createAPI } from '../api';

const api = createAPI();

export const store = configureStore({
  reducer: {
    rental: rentalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
