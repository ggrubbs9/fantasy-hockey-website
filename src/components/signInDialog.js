import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore"; 



const provider = new GoogleAuthProvider();

export default function SignInDialog({ parentCallback, handleClickOpen }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('Cat in the Hat');

  handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    parentCallback(name);
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const getDB = async (email) => {
    const db = getFirestore();
    const q = query(collection(db, 'users'), where('email', '==', `${email}`));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty){
     // email does not exist
     const usersRef = collection(db, 'users');
     await setDoc(doc(usersRef, `${uuidv4()}`), {
      id: `${uuidv4()}`,
      email: `${email}`});
    } else {
     // email does exist
     console.log('does exist')
    }
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  };

  const googleSignIn = () => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)

        getDB(user.email);

        //TODO: store token in local storage? Not sure about this one.

        // TODO: On sign in check database to see if the person exists. If not, direct them to fill out a roster (optional) and other details
        // If person exists, pull database data to state
        console.log(token);
        console.log(result);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential)
        // ...
      });
  };

  const googleSignUp = () => {};

  return (
    <div style={{ margin: 'auto' }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleChange}
          />
          <Button onClick={googleSignIn}>Sign In With Google</Button>
          <Button onClick={googleSignUp}>Sign Up</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}