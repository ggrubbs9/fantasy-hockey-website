import { Container } from '@mui/material';
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
import FormDialog from '../components/formDialog';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';

function TeamSetupComponent(props) {
  console.log('hit 1');
  const [forwards, setForwards] = useState([]);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {

    console.log('hit', auth);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // console.log('user:', user);
      getDB(user);
      // ...
    } else {
      // console.log('no user');
      // User is signed out
      // ...
    }
  });

  const getDB = async (user) => {
    console.log('hit');
    const db = getFirestore();
    const q = query(
      collection(db, 'users'),
      where('email', '==', `${user.email}`)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      // const data = doc.data()
      // console.log(data)
      // setForwards(data.forwards);
    });
  };

  const team = [
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

  // useEffect(() => {
  //   console.log(forwards);
  // }, [forwards]);

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
