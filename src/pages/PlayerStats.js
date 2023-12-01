import React, { useEffect, useState } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './pages.scss';
import { connect } from 'react-redux';
import {
  fetchPlayerStats,
  setCurrentWeek,
} from '../store/AllData/allData.actions';

import { child, get, getDatabase, ref } from 'firebase/database';

const mapStateToProps = (state) => {
  return {
    initLoading: state.initLoading,
    playerStatsLoading: state.playerStatsLoading,
    players: state.players,
    playerStats: state.playerStats,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentWeek: (x) => dispatch(setCurrentWeek(x)),
    getPlayerStats: (x) => dispatch(fetchPlayerStats(x)),
  };
};

function PlayerStatsComponent(props) {
  const [rows, setRows] = useState([]);
  const [defenseRows, setDefenseRows] = useState([]);
  const [games, setGames] = useState(1);

  const createData = (name, games, goals, assists, plusMinus, points) => {
    return { name, games, goals, assists, plusMinus, points };
  };

  // useEffect(() => {
  //   //*  if initial loading is done AND players stats array is empty
  //   //* then dispatch action to grab player stats

  //   //* this checks to see if loading from init load is done, players array has players in it,
  //   //* and check if we need to load player stats since it will be cached on first load

  //   console.log(props);
  //   if (
  //     props.initLoading === false &&
  //     props.playerStatsLoading === false &&
  //     props.playerStats.length === 0
  //   ) {
  //     props.getPlayerStats(props.players);
  //   }
  // }, [props.players, props.playerStatsLoading, props.loading]);

  //* fetch players from realtime database instead
  const db = getDatabase();
  const getData = ref(db);

  useEffect(() => {
    const fetchData = () => {
      get(child(getData, '/fantasyTeams/Soft Dump In The Corner')).then(
        (snapshot) => {
          const fetched = snapshot.val();
          console.log(fetched);
          props.getPlayerStats(fetched.players);
        }
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (props.playerStatsLoading === false && props.playerStats.length > 0) {
      populateStatTable(games);
      console.log(games);
      if (games === 1) {
        //* get stats for all games
      }
      // if (games === 1) {
      //   getPlayerStats();
      //   getDefensePlayerStats();
      //   // setTableStats(1);
      // } else if (games === 4) {
      //   getSelectedPlayerStats(4);
      //   getSelectedDefensePlayerStats(4);
      // } else if (games === 5) {
      //   getSelectedPlayerStats(5);
      //   getSelectedDefensePlayerStats(5);
      // }
    }
  }, [games, props.playerStatsLoading]);

  const populateStatTable = (games) => {
    if (games === 1) {
      props.playerStats.map((player) => {
        let seasonStats = player.seasonStats.regularSeason.subSeason;
        if (player.player.pos === 'F') {
          setRows((rows) => [
            ...rows,
            createData(
              player.player.name,
              seasonStats.gamesPlayed,
              seasonStats.goals,
              seasonStats.assists,
              seasonStats.plusMinus,
              seasonStats.points
            ),
          ]);
        } else {
          setDefenseRows((defenseRows) => [
            ...defenseRows,
            createData(
              player.player.name,
              seasonStats.gamesPlayed,
              seasonStats.goals,
              seasonStats.assists,
              seasonStats.plusMinus,
              seasonStats.points
            ),
          ]);
        }
      });
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    setGames(value);
  };

  return (
    <Container>
      {props.playerStatsLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className="header">
            <h1>player stats</h1>
            <FormControl className="form-control">
              <InputLabel id="demo-simple-select-label">
                Games Selected
              </InputLabel>
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

          <div className="margin-bottom">
            <h2>Offense Players</h2>
            <TableContainer component={Paper}>
              <Table className="table" aria-label="simple table">
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
              <Table className="table" aria-label="simple table">
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
        </div>
      )}
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerStatsComponent);
