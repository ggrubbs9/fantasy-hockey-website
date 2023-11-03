import { LOADING_PLAYERS, PLAYERS_LOADED } from './allData.actions';
import { SET_WEEK, SET_DATA, SET_NHL_SCHEDULE } from './allData.types';

const INITIAL_STATE = {
  loading: false,
  teamData: [],
  seasonSchedule: [],
  currentWeek: 1,
  players: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_PLAYERS:
      return {
        ...state,
        loading: true,
      };
    case PLAYERS_LOADED:
      return {
        ...state,
        loading: false,
        players: action.payload.players,
      };

    case SET_DATA:
      return { ...state, teamData: action.payload };

    case SET_WEEK:
      return {
        ...state,
        currentWeek: action.payload,
      };

    case SET_NHL_SCHEDULE:
      // console.log(action);
      return {
        ...state,
        seasonSchedule: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
