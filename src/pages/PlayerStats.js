import { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
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
});

function PlayerStatsComponent() {
  const classes = useStyles();
  const [players] = useState([
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
  const [rows, setRows] = useState([]);

  function createData(name, games, goals, assists, plusMinus, points) {
    return { name, games, goals, assists, plusMinus, points };
  }

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
    getPlayerStats();
  }, [players]);

  return (
    <Container>
      <h1>player stats</h1>
      <div>
        {/* {playerData.map((item, i) => (
          <li key={i}>{item}</li>
        ))} */}
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
      </div>
    </Container>
  );
}

export default PlayerStatsComponent;
