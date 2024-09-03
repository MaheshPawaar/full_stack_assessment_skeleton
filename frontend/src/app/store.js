import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import selectedHomeReducer from '../features/selectedHome/selectedHomeSlice';
import homesReducer from '../features/homes/homesSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    selectedHome: selectedHomeReducer,
    homes: homesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
