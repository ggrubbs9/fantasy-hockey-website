import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import NHLDataReducer from './store/AllData/allData.reducer';

export const store = configureStore({
  reducer: NHLDataReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
