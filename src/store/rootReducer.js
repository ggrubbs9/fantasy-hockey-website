import { combineReducers } from 'redux';
import counterReducer from './Counter/counter.reducer';
import seasonScheduleReducer from './SeasonSchedule/seasonSchedule.reducer';

const rootReducer = combineReducers({
  seasonScheduleReducer: seasonScheduleReducer,
});

export default rootReducer;
