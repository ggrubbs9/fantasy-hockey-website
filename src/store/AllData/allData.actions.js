import { SET_DATA, SET_WEEK } from './allData.types';

export const setSeasonSchedule = (data) => {
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
    type: SET_WEEK,
    payload: data,
  };
};
