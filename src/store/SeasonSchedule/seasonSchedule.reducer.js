import { DECREMENT, FETCH_DATA } from './seasonSchedule.types';

const INITIAL_STATE = {
  seasonSchedule: [],
  count: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_DATA:
      console.log(action.payload.data);
      return [action.payload.data, ...state];

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
