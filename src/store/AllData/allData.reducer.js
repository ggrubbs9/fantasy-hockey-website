import {
  SET_DATA,
  SET_WEEK,
  SET_NHL_SCHEDULE,
  LOADING_PLAYERS,
  LOADING_PLAYER_STATS,
  PLAYERS_LOADED,
  PLAYER_STATS_LOADED,
} from './allData.types';

const INITIAL_STATE = {
  initLoading: false,
  playerStatsLoading: false,
  teamData: [],
  seasonSchedule: [],
  currentWeek: 1,
  players: [],
  playerStats: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_PLAYERS:
      return {
        ...state,
        initLoading: true,
      };

    case PLAYERS_LOADED:
      return {
        ...state,
        initLoading: false,
        players: action.payload.players,
      };

    case LOADING_PLAYER_STATS:
      return {
        ...state,
        playerStatsLoading: true,
      };

    case PLAYER_STATS_LOADED:
      return {
        ...state,
        playerStatsLoading: false,
        playerStats: action.payload.stats,
      };

    case SET_DATA:
      return { ...state, teamData: action.payload };

    case SET_WEEK:
      return {
        ...state,
        currentWeek: action.payload,
      };

    case SET_NHL_SCHEDULE:
      return {
        ...state,
        seasonSchedule: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
