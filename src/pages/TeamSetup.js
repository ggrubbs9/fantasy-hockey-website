import { Container } from '@material-ui/core';
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormDialog from '../components/formDialog';

function TeamSetupComponent(props) {
  const count = [
    { name: 'Auston Matthews', pos: 'F', id: '8479318' },
    { name: 'Artemi Panarin', pos: 'F', id: '8478550' },
    { name: 'Aleksander Barkov', pos: 'F', id: '8477493' },
    { name: 'Jake Guentzel', pos: 'F', id: '8477404' },
    { name: 'Anze Kopitar', pos: 'F', id: '8471685' },
    { name: `Ryan O'Reilly`, pos: 'F', id: '8475158' },
    { name: 'Johnny Gaudreau', pos: 'F', id: '8476346' },
    { name: 'Teuvo Teravainen', pos: 'F', id: '8476882' },
    { name: 'Ryan Strome', pos: 'F', id: '8476458' },
    { name: 'Ryan Nugent-Hopkins', pos: 'F', id: '8476454' },
    { name: 'Jordan Eberle', pos: 'F', id: '8474586' },
    { name: 'Conor Garland', pos: 'F', id: '8478856' },

    { name: 'Tyson Barrie', pos: 'D', id: '8475197' },
    { name: 'Kris Letang', pos: 'D', id: '8471724' },
    { name: 'Torey Krug', pos: 'D', id: '8476792' },
    { name: 'Adam Fox', pos: 'D', id: '8479323' },
    { name: 'Thomas Chabot', pos: 'D', id: '8478469' },
    { name: 'Erik Karlsson', pos: 'D', id: '8474578' },
    { name: 'Adam Boqvist', pos: 'D', id: '8480871' },
  ];

  const [setPlayerID] = useState([]);

  useEffect(() => {
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
              setPlayerID(rosterPlayer.person.id);
            }
          });
        });
      });
    };
    searchPlayerID('Patrick Kane');
  }, [setPlayerID]);

  const handleClick = (e) => {
    // console.log(e);
  };

  const dialogCallback = (childData) => {
    //console.log(childData);
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
