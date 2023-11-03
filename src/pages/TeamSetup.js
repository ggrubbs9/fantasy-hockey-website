import { Container, Box, TextField } from '@mui/material';
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';

function TeamSetupComponent() {
  const [forwards, setForwards] = useState([]);

  // const team = [
  //   { name: 'Alex Ovechkin', id: '8471214' },
  //   { name: 'Mika Zibanejad', id: '8476459' },
  //   { name: 'Jonathan Huberdeau', id: '8476456' },
  //   { name: 'Jake Guentzel', id: '8477404' },
  //   { name: 'Ryan Nugent-Hopkins', id: '8476454' },
  //   { name: 'J.T. Miller', id: '8476468' },
  //   { name: 'Filip Forsberg', id: '8476887' },
  //   { name: 'Brady Tkachuk', id: '8480801' },
  //   { name: 'Max Domi', id: '8477503' },
  //   { name: 'Chris Kreider', id: '8475184' },

  //   { name: 'Brent Burns', id: '8470613' },
  //   { name: 'Ryan Pulock', id: '8477506' },
  //   { name: 'Mark Giordano', id: '8470966' },
  //   { name: 'Quinn Hughes', id: '8480800' },
  //   { name: 'Adam Fox', id: '8479323' },
  //   { name: 'Rasmus Ristolainen', id: '8477499' },
  // ];

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDB(user);
      }
    });

    const getDB = async (user) => {
      const db = getFirestore();
      const q = query(
        collection(db, 'users'),
        where('email', '==', `${user.email}`)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        const data = doc.data();
        setForwards(data.players.forwards);
      });
    };
  }, []);

  const handleClick = (e) => {
    console.log(e);
  };

  // const dialogCallback = (childData) => {
  //   console.log(childData);
  // };

  const PlayerSearch = () => {
    const ariaLabel = { 'aria-label': 'description' };
    const [name, setName] = useState('');
    const [results, setResults] = useState([]);

    const filterResults = (name) => {
      console.log('start filter with: ', name);
      if (name === 'Graham') {
        setResults([{ name: 'yo test' }]);
      }
    };

    const handleChange = (event) => {
      setName(event.target.value);
    };

    const handleSubmit = () => {
      filterResults(name);
    };

    const keyPress = (event) => {
      if (event.keyCode === 13) {
        setName('');
        handleSubmit();
      }
    };

    const handleSearchClick = (e) => {
      console.log(e);
      setForwards([...forwards, { name: e.name, id: e.id, position: e.pos }]);
    };

    return (
      <div>
        {' '}
        <Box
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Search Here"
            value={name}
            onChange={handleChange}
            inputProps={ariaLabel}
            onKeyDown={keyPress}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Add</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {results.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    onClick={() => handleSearchClick(row)}
                    align="left"
                  >
                    <EditIcon />
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return (
    <Container>
      {/* <FormDialog
        parentCallback={dialogCallback}
        handleClickOpen={handleClick}
      /> */}
      <PlayerSearch />
      <br />
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
            {(forwards ? forwards : []).map((row, i) => (
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
