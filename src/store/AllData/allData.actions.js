import {
  SET_DATA,
  SET_WEEK,
  SET_NHL_SCHEDULE,
  LOADING_PLAYERS,
  LOADING_PLAYER_STATS,
  PLAYERS_LOADED,
  PLAYER_STATS_LOADED,
} from './allData.types';
import axios from 'axios';

const playerArr = [
  '8477956',
  '8478010',
  '8471675',
  '8477409',
  '8477933',
  '8477960',
  '8477500',
  '8478439',
  '8480015',
  '8475754',
  '8476905',
  '8476454',
  '8480849',
  '8479325',
  '8471724',
  '8478460',
  '8479323',
  '8475197',
  '8479976',
];

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

export const loadingPlayerStats = () => ({
  type: LOADING_PLAYER_STATS,
});

export const playerStatsLoaded = (stats) => ({
  type: PLAYER_STATS_LOADED,
  payload: {
    stats,
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
      const promises = [];
      const getData = async (x) => {
        const res = await axios.get(
          `https://api-web.nhle.com/v1/player/${x}/landing`
        );
        return res.data.people[0];
      };
      playerArr.forEach((player) => {
        promises.push(getData(player));
      });
      await Promise.all(promises).then((results) => {
        dispatch(teamPlayersLoaded(results));
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchPlayerStats = (players) => {
  return async (dispatch) => {
    try {
      dispatch(loadingPlayerStats()); // for the loading state
      const promises = [];
      const getData = async (player) => {
        const res = await axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=gameLog`
        );
        return { splits: res.data.stats[0].splits, player: player };
      };
      players.forEach((player) => {
        promises.push(getData(player));
      });
      await Promise.all(promises).then((results) => {
        dispatch(playerStatsLoaded(results));
      });
    } catch (e) {
      console.log(e);
    }
  };
};
