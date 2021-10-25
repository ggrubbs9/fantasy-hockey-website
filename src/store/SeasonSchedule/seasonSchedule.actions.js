import { SET_DATA } from './seasonSchedule.types';
import axios from 'axios';

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

export const setSeasonSchedule = (data) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};
