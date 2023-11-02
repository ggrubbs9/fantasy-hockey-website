import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import NHLDataReducer from './AllData/allData.reducer';

const store = configureStore({
    reducer: NHLDataReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
