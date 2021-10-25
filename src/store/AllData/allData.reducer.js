import { SET_WEEK, SET_DATA } from './allData.types';

const INITIAL_STATE = {
  seasonSchedule: [],
  currentWeek: 1,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA:
      console.log(action);
      return { ...state, seasonSchedule: action.payload };

    case SET_WEEK:
      return {
        ...state,
        currentWeek: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
