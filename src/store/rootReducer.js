import { combineReducers } from 'redux';
import seasonScheduleReducer from './SeasonSchedule/seasonSchedule.reducer';

const rootReducer = combineReducers({
  seasonScheduleReducer: seasonScheduleReducer,
});

export default rootReducer;
