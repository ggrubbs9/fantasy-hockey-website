import { DECREMENT, SET_DATA } from './seasonSchedule.types';

const INITIAL_STATE = {
  seasonSchedule: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA:
      console.log(action);
      return { ...state, seasonSchedule: action.payload };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};

export default reducer;
