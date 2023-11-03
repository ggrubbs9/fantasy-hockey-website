import { SET_DATA, SET_WEEK, SET_NHL_SCHEDULE } from './allData.types';
import axios from 'axios';
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
  },
});

// export const fetchFantasyTeamPlayers = () => return async dispatch => {
//   dispatch(loadingTeamPlayers()); // for the loading state
//   return fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => dispatch(teamPlayersLoaded(response.json())))};

/*
  asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
  https://medium.com/mad-semicolon/fetch-initial-data-on-page-load-in-react-redux-application-16f4d8228543
*/

export const fetchFantasyTeamPlayers = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingTeamPlayers()); // for the loading state
      let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch(teamPlayersLoaded(posts.data.splice(0, 5))); //store first five posts
    } catch (e) {
      console.log(e);
    }
  };
};
