import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
  marginBottom: {
    marginBottom: '100px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    minWidth: 180,
    marginLeft: '24px',
  },
});

// to get player ID -> GET https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster

function PlayerStatsComponent() {
  const classes = useStyles();
  const [players] = useState([
    { name: 'Auston Matthews', id: '8479318' },
    { name: 'Artemi Panarin', id: '8478550' },
    { name: 'Aleksander Barkov', id: '8477493' },
    { name: 'Jake Guentzel', id: '8477404' },
    { name: 'Anze Kopitar', id: '8471685' },
    { name: `Ryan O'Reilly`, id: '8475158' },
    { name: 'Johnny Gaudreau', id: '8476346' },
    { name: 'Teuvo Teravainen', id: '8476882' },
    { name: 'Ryan Strome', id: '8476458' },
    { name: 'Ryan Nugent-Hopkins', id: '8476454' },
    { name: 'Jordan Eberle', id: '8474586' },
    { name: 'Conor Garland', id: '8478856' },
  ]);
  const [defensePlayers] = useState([
    { name: 'Tyson Barrie', id: '8475197' },
    { name: 'Kris Letang', id: '8471724' },
    { name: 'Torey Krug', id: '8476792' },
    { name: 'Adam Fox', id: '8479323' },
    { name: 'Thomas Chabot', id: '8478469' },
    { name: 'Erik Karlsson', id: '8474578' },
    { name: 'Adam Boqvist', id: '8480871' },
  ]);
  const [rows, setRows] = useState([]);
  const [defenseRows, setDefenseRows] = useState([]);
  const [games, setGames] = useState(1);

  function createData(name, games, goals, assists, plusMinus, points) {
    return { name, games, goals, assists, plusMinus, points };
  }

  useEffect(() => {
    if (games === 1) {
      getPlayerStats();
      getDefensePlayerStats();
    } else if (games === 4) {
      getSelectedPlayerStats(4);
      getSelectedDefensePlayerStats(4);
    } else if (games === 5) {
      getSelectedPlayerStats(5);
      getSelectedDefensePlayerStats(5);
    }
    // eslint-disable-next-line
  }, [games]);

  const getSelectedPlayerStats = async (games) => {
    setRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=gameLog`
      );
      return res;
    };

    players.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        const stats = {
          games: games,
          goals: 0,
          assists: 0,
          plusMinus: 0,
          points: 0,
        };

        let selectedGames = item.data.stats[0].splits.splice(0, games);
        selectedGames.forEach((game) => {
          stats.goals += game.stat.goals;
          stats.assists += game.stat.assists;
          stats.plusMinus += game.stat.plusMinus;
          stats.points += game.stat.points;
        });

        setRows((rows) => [
          ...rows,
          {
            name: players[i].name,
            games: stats.games,
            goals: stats.goals,
            assists: stats.assists,
            plusMinus: stats.plusMinus,
            points: stats.points,
          },
        ]);
        return null;
      });
    });
  };

  const getSelectedDefensePlayerStats = async (games) => {
    setDefenseRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=gameLog`
      );
      return res;
    };

    defensePlayers.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        const stats = {
          games: games,
          goals: 0,
          assists: 0,
          plusMinus: 0,
          points: 0,
        };

        let selectedGames = item.data.stats[0].splits.splice(0, games);
        selectedGames.forEach((game) => {
          stats.goals += game.stat.goals;
          stats.assists += game.stat.assists;
          stats.plusMinus += game.stat.plusMinus;
          stats.points += game.stat.points;
        });

        setDefenseRows((rows) => [
          ...rows,
          {
            name: defensePlayers[i].name,
            games: stats.games,
            goals: stats.goals,
            assists: stats.assists,
            plusMinus: stats.plusMinus,
            points: stats.points,
          },
        ]);
        return null;
      });
    });
  };

  const getPlayerStats = async () => {
    setRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=statsSingleSeason&season=20212022`
      );
      return res;
    };

    players.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        setRows((rows) => [
          ...rows,
          createData(
            players[i].name,
            item.data.stats[0].splits[0].stat.games,
            item.data.stats[0].splits[0].stat.goals,
            item.data.stats[0].splits[0].stat.assists,
            item.data.stats[0].splits[0].stat.plusMinus,
            item.data.stats[0].splits[0].stat.points
          ),
        ]);
        return null;
      });
    });
  };

  const getDefensePlayerStats = async () => {
    setDefenseRows([]);
    const promises = [];

    const getData = async (x) => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${x}/stats?stats=statsSingleSeason&season=20212022`
      );
      return res;
    };

    defensePlayers.forEach((element) => {
      promises.push(getData(element.id));
    });

    await Promise.all(promises).then((results) => {
      results.map((item, i) => {
        setDefenseRows((rows) => [
          ...rows,
          createData(
            defensePlayers[i].name,
            item.data.stats[0].splits[0].stat.games,
            item.data.stats[0].splits[0].stat.goals,
            item.data.stats[0].splits[0].stat.assists,
            item.data.stats[0].splits[0].stat.plusMinus,
            item.data.stats[0].splits[0].stat.points
          ),
        ]);
        return null;
      });
    });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    setGames(value);
  };

  return (
    <Container>
      <div className={classes.header}>
        <h1>player stats</h1>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Games Selected</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={games}
            onChange={handleChange}
          >
            <MenuItem value={1}>All</MenuItem>
            <MenuItem value={4}>Past Four</MenuItem>
            <MenuItem value={5}>Past Five</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={classes.marginBottom}>
        <h2>Offense Players</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Games Played</TableCell>
                <TableCell align="left">Goals</TableCell>
                <TableCell align="left">Assists</TableCell>
                <TableCell align="left">Plus Minus</TableCell>

                <TableCell align="left">Points</TableCell>
                <TableCell align="left">Fantasy Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort(function (a, b) {
                  return (
                    b.goals * 2 +
                    b.assists +
                    b.plusMinus * 0.5 -
                    (a.goals * 2 + a.assists + a.plusMinus * 0.5)
                  );
                })
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{row.games}</TableCell>
                    <TableCell align="center">{row.goals}</TableCell>
                    <TableCell align="center">{row.assists}</TableCell>
                    <TableCell align="center">{row.plusMinus}</TableCell>
                    <TableCell align="center">{row.points}</TableCell>
                    <TableCell align="center">
                      {row.goals * 2 + row.assists + row.plusMinus * 0.5}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <h2>Defense Players</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Games Played</TableCell>
                <TableCell align="left">Goals</TableCell>
                <TableCell align="left">Assists</TableCell>
                <TableCell align="left">Plus Minus</TableCell>

                <TableCell align="left">Points</TableCell>
                <TableCell align="left">Fantasy Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {defenseRows
                .sort(function (a, b) {
                  return (
                    b.goals * 2 +
                    b.assists +
                    b.plusMinus * 0.5 -
                    (a.goals * 2 + a.assists + a.plusMinus * 0.5)
                  );
                })
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{row.games}</TableCell>
                    <TableCell align="center">{row.goals}</TableCell>
                    <TableCell align="center">{row.assists}</TableCell>
                    <TableCell align="center">{row.plusMinus}</TableCell>
                    <TableCell align="center">{row.points}</TableCell>
                    <TableCell align="center">
                      {row.goals * 2 + row.assists + row.plusMinus * 0.5}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default PlayerStatsComponent;
