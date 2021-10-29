import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// import firebase from './utils/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
// import { getFirestore } from "firebase/firestore"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';



const firebaseConfig = {
  apiKey: 'AIzaSyCQBbv-LFA0Fy2HLP82FAClcQf6JTXSnbM',
  authDomain: 'fantasy-hockey-website.firebaseapp.com',
  projectId: 'fantasy-hockey-website',
  storageBucket: 'fantasy-hockey-website.appspot.com',
  messagingSenderId: '428055655900',
  appId: '1:428055655900:web:e24a4dcdf722e54dedcb19',
  measurementId: 'G-ECYL5VLDRS',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCities(db) {
  const citiesCol = collection(db, 'users');
  console.log(citiesCol)
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());

  console.log(cityList)
  return cityList;
}

getCities(db)

function test() {
  console.log(db)
//   //Test connnection (https://firebase.google.com/docs/database/web/offline-capabilities#section-connection-state)
//   const connectedRef = firebase.database().ref('.info/connected');
//   connectedRef.on('value', (snap) => {
//     if (snap.val() === true) {
//       console.log('connected');
//     } else {
//       console.error('not connected');
//     }
//   });

//   //Test retrieve data.
//   const ref = firebase.database().ref('/');
//   ref.once('value', snapshot => {
//     const data = snapshot.val();
//     console.log(data);
//   }).catch(error => {
//     console.error(error);
//   })
}

test()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
