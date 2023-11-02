import { combineReducers } from 'redux';
import NHLDataReducer from './AllData/allData.reducer';

const rootReducer = combineReducers({
  ndr: NHLDataReducer,
});

export default rootReducer;
