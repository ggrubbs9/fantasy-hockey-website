import axios from 'axios';

export const getPlayerStats = async (players) => {
  const promises = [];

  const getData = async (x) => {
    const res = axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=yearByYear`
    );
    return res;
  };

  players.forEach((element) => {
    promises.push(getData(element.id));
  });

  await Promise.all(promises).then((results) => {
    console.log('done', results);
    return results;
  });
};
