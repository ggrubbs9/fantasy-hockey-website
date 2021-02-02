import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';

function PlayerStatsComponent() {
  const [playerData, setPlayerData] = useState([]);
  const [players, setPlayers] = useState([
    { name: 'Alex Ovechkin', id: '8471214' },
    { name: 'Mika Zibanejad', id: '8476459' },
    { name: 'Jonathan Huberdeau', id: '8476456' },
    { name: 'Jake Guentzel', id: '8477404' },
    { name: 'Ryan Nugent-Hopkins', id: '8476454' },
    { name: 'J.T. Miller', id: '8476468' },
    { name: 'Filip Forsberg', id: '8476887' },
    { name: 'Brady Tkachuk', id: '8480801' },
    { name: 'Max Domi', id: '8477503' },
    { name: 'Chris Kreider', id: '8475184' },
  ]);

  useEffect(() => {
    const getPlayerStats = async () => {
      const promises = [];

      const getData = async (x) => {
        const res = axios.get(
          `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=statsSingleSeason&season=20202021`
        );
        return res;
      };

      players.forEach((element) => {
        promises.push(getData(element.id));
      });

      await Promise.all(promises).then((results) => {
        console.log('done', results);
        results.forEach((item) => {
          //console.log(item.data.stats[0].splits[0].stat.goals);
          setPlayerData((playerData) => [
            ...playerData,
            item.data.stats[0].splits[0].stat.goals,
          ]);
        });
      });
    };
    getPlayerStats();
  }, [players]);

  return (
    <Container maxWidth="sm">
      <h1>player stats</h1>
      <div>
        {playerData.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </div>
    </Container>
  );
}

export default PlayerStatsComponent;
