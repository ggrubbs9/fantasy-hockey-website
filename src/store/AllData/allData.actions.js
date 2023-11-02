import { SET_DATA, SET_WEEK, SET_NHL_SCHEDULE } from './allData.types';
export const LOADING_PLAYERS = '[User] loading players';
export const PLAYERS_LOADED = '[User] players loaded';

export const setTeamStats = (data) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

export const setCurrentWeek = (data) => {
  return {
    type: SET_WEEK,
    payload: data,
  };
};

export const setNHLSchedule = (data) => {
  return {
    type: SET_NHL_SCHEDULE,
    payload: data,
  };
};

export const loadingTeamPlayers = () => ({
  type: LOADING_PLAYERS,
});

export const teamPlayersLoaded = (players) => ({
  type: PLAYERS_LOADED,
  payload: {
    players,
  }
});

export const fetchFantasyTeamPlayers = () => (dispatch) => {
  dispatch(loadingTeamPlayers()); // for the loading state
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => dispatch(teamPlayersLoaded(response.json())))};