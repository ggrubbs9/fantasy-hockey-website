import { combineReducers } from 'redux';
import seasonScheduleReducer from './AllData/allData.reducer';

const rootReducer = combineReducers({
  seasonScheduleReducer: seasonScheduleReducer,
});

export default rootReducer;
