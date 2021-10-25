import { FETCH_DATA, DECREMENT } from './seasonSchedule.types';
import axios from 'axios';

const getRepoDetailsStarted = () => ({
  type: 'repoDetails/fetchStarted',
});
const getRepoDetailsSuccess = (repoDetails) => ({
  type: 'repoDetails/fetchSucceeded',
  payload: repoDetails,
});
const getRepoDetailsFailed = (error) => ({
  type: 'repoDetails/fetchFailed',
  error,
});

export const getSeasonSchedule = async (dispatch) => {
  return (dispatch) =>
    axios
      .get('https://statsapi.web.nhl.com/api/v1/teams/?expand=team.stats')
      .then((res) => {
        dispatch({ type: ' FETCH_DATA', payload: res });
      })
      .catch((err) => {
        dispatch({ type: ' FETCH_DATA', payload: err });
      });
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
  };
};
