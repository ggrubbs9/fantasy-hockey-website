import { Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  Paper,
  TableHead,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormDialog from '../components/formDialog';
import { connect } from 'react-redux';
import {
  useGetPokemonByNameQuery,
  getSeasonSchedule,
} from '../helpers/pokemon';

function TeamSetupComponent(props) {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('team.stats');
  // const { scheduleData, scheduleError, scheduleIsLoading } =
  //   getSeasonSchedule();
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  const count = [
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

    { name: 'Brent Burns', id: '8470613' },
    { name: 'Ryan Pulock', id: '8477506' },
    { name: 'Mark Giordano', id: '8470966' },
    { name: 'Quinn Hughes', id: '8480800' },
    { name: 'Adam Fox', id: '8479323' },
    { name: 'Rasmus Ristolainen', id: '8477499' },
  ];

  const [playerID, setPlayerID] = useState([]);

  const searchPlayerID = async (player) => {
    const promises = [];

    const getData = () => {
      const res = axios.get(
        `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`
      );
      return res;
    };

    promises.push(getData());

    await Promise.all(promises).then((results) => {
      const teams = results[0].data.teams;

      teams.forEach((team) => {
        const roster = team.roster.roster;
        roster.forEach((rosterPlayer) => {
          if (rosterPlayer.person.fullName === player) {
            console.log(rosterPlayer);
            setPlayerID(rosterPlayer.person.id);
          }
        });
      });
    });
  };

  // useEffect(() => {
  //   if (!scheduleIsLoading) {
  //     console.log(scheduleData);
  //   }
  // }, [scheduleData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    searchPlayerID('Patrick Kane');
  }, []);

  useEffect(() => {
    console.log(playerID);
  }, [playerID]);

  const handleClick = (e) => {
    console.log(e);
  };

  const dialogCallback = (childData) => {
    console.log(childData);
  };

  return (
    <Container>
      <FormDialog
        parentCallback={dialogCallback}
        handleClickOpen={handleClick}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Position</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {count.map((row, i) => (
              <TableRow key={i}>
                <TableCell onClick={() => handleClick(row)} align="left">
                  <EditIcon />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TeamSetupComponent;
