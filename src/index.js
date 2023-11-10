import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { fetchFantasyTeamPlayers } from './store/AllData/allData.actions';
import { getDatabase, set, ref } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';
import axios from 'axios';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const data = [
  {
    fantasyTeamName: 'T Time',
    players: [
      {
        position: 'F',
        name: 'TAGE THOMPSON',
      },
      {
        position: 'F',
        name: 'TIM STUTZLE',
      },
      {
        position: 'F',
        name: 'LEON DRAISAITL',
      },
      {
        position: 'F',
        name: 'MITCH MARNER',
      },
      {
        position: 'F',
        name: 'JESPER BRATT',
      },
      {
        position: 'F',
        name: 'J.T. MILLER',
      },
      {
        position: 'F',
        name: 'ALEX TUCH',
      },
      {
        position: 'F',
        name: 'TROY TERRY',
      },
      {
        position: 'F',
        name: 'JESPER KOTKANIEMI',
      },
      {
        position: 'F',
        name: 'EVAN RODRIGUES',
      },
      {
        position: 'F',
        name: 'SEAN COUTURIER',
      },
      {
        position: 'F',
        name: 'CAM ATKINSON',
      },
      {
        position: 'F',
        name: 'ZACH BENSON',
      },
      {
        position: 'D',
        name: 'DOUGGIE HAMILTON',
      },
      {
        position: 'D',
        name: 'RASMUS DAHLIN',
      },
      {
        position: 'D',
        name: 'MACKINZE WEEGAR',
      },
      {
        position: 'D',
        name: 'SHAYNE GOSTISBEHERE',
      },
      {
        position: 'D',
        name: 'MIKE MATHESON',
      },
      {
        position: 'D',
        name: 'MATVI MINTYUKOV',
      },
      {
        position: 'D',
        name: 'TRAVIS SANHEIM',
      },
      {
        position: 'PP',
        name: 'BUFFALO',
      },
      {
        position: 'PP',
        name: 'TORONTO',
      },
      {
        position: 'SH',
        name: 'COLORADO',
      },
      {
        position: 'SH',
        name: 'VANCOUVER',
      },
      {
        position: 'GL',
        name: 'WINNIPEG',
      },
      {
        position: 'GL',
        name: 'NASHVILLE',
      },
      {
        position: 'GL',
        name: 'COLUMBUS',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Matty Ice',
    players: [
      {
        position: 'F',
        name: 'MATTY BERNIERS',
      },
      {
        position: 'F',
        name: 'JORDAN KYROU',
      },
      {
        position: 'F',
        name: 'CONNOR BEDARD',
      },
      {
        position: 'F',
        name: 'ELIAS PETTERSSON',
      },
      {
        position: 'F',
        name: 'CLAYTON KELLER',
      },
      {
        position: 'F',
        name: 'JOHNNY GAUDREAU',
      },
      {
        position: 'F',
        name: 'SEBASTIAN AHO',
      },
      {
        position: 'F',
        name: 'ANDREI KUZMENKO',
      },
      {
        position: 'F',
        name: 'LOGAN COOLEY',
      },
      {
        position: 'F',
        name: 'LUCAS RAYMOND',
      },
      {
        position: 'F',
        name: 'ADAM FANTILLI',
      },
      {
        position: 'F',
        name: 'ROBERT THOMAS',
      },
      {
        position: 'F',
        name: 'NICK SCHMALTZ',
      },
      {
        position: 'D',
        name: 'EVAN BOUCHARD',
      },
      {
        position: 'D',
        name: 'IVAN PROVONOV',
      },
      {
        position: 'D',
        name: 'JAKE SANDERSON',
      },
      {
        position: 'D',
        name: "K'ANDRE MILLER",
      },
      {
        position: 'D',
        name: 'SEAN DURZI',
      },
      {
        position: 'D',
        name: 'JAMIE DRYSDALE',
      },
      {
        position: 'D',
        name: 'CALEN ADDISON',
      },
      {
        position: 'PP',
        name: 'EDMONTON',
      },
      {
        position: 'PP',
        name: 'NEW YORK R',
      },
      {
        position: 'SH',
        name: 'NEW YORK R',
      },
      {
        position: 'SH',
        name: 'PHILADELPHIA',
      },
      {
        position: 'GL',
        name: 'MINNESOTA',
      },
      {
        position: 'GL',
        name: 'OTTAWA',
      },
      {
        position: 'GL',
        name: 'SEATTLE',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Damm Nation',
    players: [
      {
        position: 'F',
        name: 'NICO HISCHIER',
      },
      {
        position: 'F',
        name: 'CONNOR McDAVID',
      },
      {
        position: 'F',
        name: 'JASON ROBERTSON',
      },
      {
        position: 'F',
        name: 'STEVEN STAMKOS',
      },
      {
        position: 'F',
        name: 'JACK EICHEL',
      },
      {
        position: 'F',
        name: 'JOE PAVELSKI',
      },
      {
        position: 'F',
        name: 'PATRICK KANE',
      },
      {
        position: 'F',
        name: 'JONATHAN MARCHESSAULT',
      },
      {
        position: 'F',
        name: 'LUKAS REICHEL',
      },
      {
        position: 'F',
        name: 'MATS ZUCCARELLO',
      },
      {
        position: 'F',
        name: 'PAVEL BUCHNEVICH',
      },
      {
        position: 'F',
        name: 'CONNOR BROWN',
      },
      {
        position: 'F',
        name: 'WYATT JOHNSTON',
      },
      {
        position: 'D',
        name: 'SHEA THEODORE',
      },
      {
        position: 'D',
        name: 'ALEX PIETRANGELO',
      },
      {
        position: 'D',
        name: 'MORGAN RIELLY',
      },
      {
        position: 'D',
        name: 'GUSTAV FORSLING',
      },
      {
        position: 'D',
        name: 'BOWEN BYRAM',
      },
      {
        position: 'D',
        name: 'JACOB SLAVIN',
      },
      {
        position: 'D',
        name: 'JARED SPURGEON',
      },
      {
        position: 'PP',
        name: 'TAMPA BAY',
      },
      {
        position: 'PP',
        name: 'VANCOUVER',
      },
      {
        position: 'SH',
        name: 'EDMONTON',
      },
      {
        position: 'SH',
        name: 'SAN JOSE',
      },
      {
        position: 'GL',
        name: 'NEW JERSEY',
      },
      {
        position: 'GL',
        name: 'TAMPA BAY',
      },
      {
        position: 'GL',
        name: 'PHILADELPHIA',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Curved Wood',
    players: [
      {
        position: 'F',
        name: 'ZACH HYMAN',
      },
      {
        position: 'F',
        name: 'NIKITA KUCHEROV',
      },
      {
        position: 'F',
        name: 'MIKA ZIBANEJAD',
      },
      {
        position: 'F',
        name: 'TIMO MEIER',
      },
      {
        position: 'F',
        name: 'DYLAN STROME',
      },
      {
        position: 'F',
        name: 'KEVIN FIALA',
      },
      {
        position: 'F',
        name: 'DYLAN COZENS',
      },
      {
        position: 'F',
        name: 'JOEL ERIKSSON-EK',
      },
      {
        position: 'F',
        name: 'TREVOR ZEGRAS',
      },
      {
        position: 'F',
        name: 'MATT BOLDY',
      },
      {
        position: 'F',
        name: 'VALERI NICHUSHKIN',
      },
      {
        position: 'F',
        name: 'TAYLOR HALL',
      },
      {
        position: 'F',
        name: 'MASON MacTAVISH',
      },
      {
        position: 'D',
        name: 'OWEN POWER',
      },
      {
        position: 'D',
        name: 'CALE MAKAR',
      },
      {
        position: 'D',
        name: 'MORITZ SEIDER',
      },
      {
        position: 'D',
        name: 'NOAH DOBSON',
      },
      {
        position: 'D',
        name: 'THOMAS CHABOT',
      },
      {
        position: 'D',
        name: 'FILIP HRONEK',
      },
      {
        position: 'D',
        name: 'CAM YORK',
      },
      {
        position: 'PP',
        name: 'DALLAS',
      },
      {
        position: 'PP',
        name: 'FLORIDA',
      },
      {
        position: 'SH',
        name: 'MINNESOTA',
      },
      {
        position: 'SH',
        name: 'TORONTO',
      },
      {
        position: 'GL',
        name: 'TORONTO',
      },
      {
        position: 'GL',
        name: 'NEW YORK I',
      },
      {
        position: 'GL',
        name: 'ARIZONA',
      },
      {
        position: 'INJ',
        name: 'PATRICK LAINE',
      },
    ],
  },
  {
    fantasyTeamName: 'Daft Puck',
    players: [
      {
        position: 'F',
        name: 'BRANDON HAGEL',
      },
      {
        position: 'F',
        name: 'WILLIAM NYLANDER',
      },
      {
        position: 'F',
        name: 'JOHN TAVARES',
      },
      {
        position: 'F',
        name: 'TYLER TOFFOLI',
      },
      {
        position: 'F',
        name: 'ANZE KOPITAR',
      },
      {
        position: 'F',
        name: 'MARTIN NECAS',
      },
      {
        position: 'F',
        name: 'JEFF SKINNER',
      },
      {
        position: 'F',
        name: 'CHRIS KREIDER',
      },
      {
        position: 'F',
        name: 'JAKE DeBRUSK',
      },
      {
        position: 'F',
        name: 'PAVEL ZACHA',
      },
      {
        position: 'F',
        name: 'TOMAS TATER',
      },
      {
        position: 'F',
        name: 'MICHAEL BUNTING',
      },
      {
        position: 'F',
        name: 'CHARLIE COYLE',
      },
      {
        position: 'D',
        name: 'BRANDON MONTOUR',
      },
      {
        position: 'D',
        name: 'JOSH MORRISSEY',
      },
      {
        position: 'D',
        name: 'BRENT BURNS',
      },
      {
        position: 'D',
        name: 'HAMPUS LINDHOLM',
      },
      {
        position: 'D',
        name: 'DARNELL NURSE',
      },
      {
        position: 'D',
        name: 'MATTIAS EKHOLM',
      },
      {
        position: 'D',
        name: 'DMITRI ORLOV',
      },
      {
        position: 'PP',
        name: 'LOS ANGELES',
      },
      {
        position: 'PP',
        name: 'CAROLINA',
      },
      {
        position: 'SH',
        name: 'BOSTON',
      },
      {
        position: 'SH',
        name: 'CALGARY',
      },
      {
        position: 'GL',
        name: 'CAROLINA',
      },
      {
        position: 'GL',
        name: 'BOSTON',
      },
      {
        position: 'GL',
        name: 'MONTREAL',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Hockey Balboa',
    players: [
      {
        position: 'F',
        name: 'NATHAN MacKINNON',
      },
      {
        position: 'F',
        name: 'KRILL KAPRIZOV',
      },
      {
        position: 'F',
        name: 'ARTEMI PANARIN',
      },
      {
        position: 'F',
        name: 'NICK SUZUKI',
      },
      {
        position: 'F',
        name: 'CLAUDE GIROUX',
      },
      {
        position: 'F',
        name: 'EVGENI MALIKN',
      },
      {
        position: 'F',
        name: 'ELIAS LINDHOLM',
      },
      {
        position: 'F',
        name: 'JAMIE BENN',
      },
      {
        position: 'F',
        name: 'DRAKE BATHERSON',
      },
      {
        position: 'F',
        name: 'WILLIAM KARLSSON',
      },
      {
        position: 'F',
        name: 'VLADIMIR TARAENKO',
      },
      {
        position: 'F',
        name: 'LEO CARLSSON',
      },
      {
        position: 'F',
        name: 'CONOR GARLAND',
      },
      {
        position: 'D',
        name: 'MIKHAIL SERGACHEV',
      },
      {
        position: 'D',
        name: 'SETH JONES',
      },
      {
        position: 'D',
        name: 'DREW DOUGHTY',
      },
      {
        position: 'D',
        name: 'RASMUS SANDIN',
      },
      {
        position: 'D',
        name: 'CAM FOWLER',
      },
      {
        position: 'D',
        name: 'SAM GIRARD',
      },
      {
        position: 'D',
        name: 'JUSTIN SCHULTZ',
      },
      {
        position: 'PP',
        name: 'VEGAS',
      },
      {
        position: 'PP',
        name: 'MONTREAL',
      },
      {
        position: 'SH',
        name: 'NEW YORK I',
      },
      {
        position: 'SH',
        name: 'VEGAS',
      },
      {
        position: 'GL',
        name: 'WASHINGTON',
      },
      {
        position: 'GL',
        name: 'COLORADO',
      },
      {
        position: 'GL',
        name: 'ANAHEIM',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Tkachuk Deez Nuts',
    players: [
      {
        position: 'F',
        name: 'MATHEW TKACHUK',
      },
      {
        position: 'F',
        name: 'BRADY TKACHUK',
      },
      {
        position: 'F',
        name: 'ROOPE HINTZ',
      },
      {
        position: 'F',
        name: 'ALEX OVECHKIN',
      },
      {
        position: 'F',
        name: 'DYLAN LARKIN',
      },
      {
        position: 'F',
        name: 'COLE CAUFIELD',
      },
      {
        position: 'F',
        name: 'ALESANDER BARKOV',
      },
      {
        position: 'F',
        name: 'JARED McCANN',
      },
      {
        position: 'F',
        name: 'VINCENT TROCHECK',
      },
      {
        position: 'F',
        name: 'NAZEM KADRI',
      },
      {
        position: 'F',
        name: 'BOONE JENNER',
      },
      {
        position: 'F',
        name: "RYAN O'REILLY",
      },
      {
        position: 'F',
        name: 'ALEX DeBRINCAT',
      },
      {
        position: 'D',
        name: 'VINCE DUNN',
      },
      {
        position: 'D',
        name: 'ROMAN JOSI',
      },
      {
        position: 'D',
        name: 'MIRO HEISKANEN',
      },
      {
        position: 'D',
        name: 'JOHN CARSON',
      },
      {
        position: 'D',
        name: 'JUSTIN FAULK',
      },
      {
        position: 'D',
        name: 'TOREY KRUG',
      },
      {
        position: 'D',
        name: 'JACOB TROUBA',
      },
      {
        position: 'PP',
        name: 'DETROIT',
      },
      {
        position: 'PP',
        name: 'NASHVILLE',
      },
      {
        position: 'SH',
        name: 'DETROIT',
      },
      {
        position: 'SH',
        name: 'NASHVILLE',
      },
      {
        position: 'GL',
        name: 'NEW YORK R',
      },
      {
        position: 'GL',
        name: 'CALGARY',
      },
      {
        position: 'GL',
        name: 'DETROIT',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Bruins',
    players: [
      {
        position: 'F',
        name: 'P.L. DUBOIS',
      },
      {
        position: 'F',
        name: 'AUSTON MATTHEWS',
      },
      {
        position: 'F',
        name: 'BRAD MARCHAND',
      },
      {
        position: 'F',
        name: 'JONATHAN HUBERDEAU',
      },
      {
        position: 'F',
        name: 'MATTHEW BARZAL',
      },
      {
        position: 'F',
        name: 'BROCK BOESER',
      },
      {
        position: 'F',
        name: 'MARK STONE',
      },
      {
        position: 'F',
        name: 'RYAN HARTMAN',
      },
      {
        position: 'F',
        name: 'ALEXEI LAFRENIERE',
      },
      {
        position: 'F',
        name: 'BRYAN RUST',
      },
      {
        position: 'F',
        name: 'ALEX NEWHOOK',
      },
      {
        position: 'F',
        name: 'KAAPO KAKKO',
      },
      {
        position: 'F',
        name: 'JOSH NORRIS',
      },
      {
        position: 'D',
        name: 'QUINN HUGHES',
      },
      {
        position: 'D',
        name: 'VICTOR HEDMAN',
      },
      {
        position: 'D',
        name: 'NOAH HANIFIN',
      },
      {
        position: 'D',
        name: 'ANTHONY DeANGELO',
      },
      {
        position: 'D',
        name: 'COLTON PARAYKO',
      },
      {
        position: 'D',
        name: 'JACOB CHYCRUN',
      },
      {
        position: 'D',
        name: 'KEVIN KORCHINSKI',
      },
      {
        position: 'PP',
        name: 'BOSTON',
      },
      {
        position: 'PP',
        name: 'PITTSBURGH',
      },
      {
        position: 'SH',
        name: 'DALLAS',
      },
      {
        position: 'SH',
        name: 'PITTSBURGH',
      },
      {
        position: 'GL',
        name: 'FLORIDA',
      },
      {
        position: 'GL',
        name: 'PITTSBURGH',
      },
      {
        position: 'GL',
        name: 'VANCOUVER',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Soft Dump In The Corner',
    players: [
      {
        position: 'F',
        name: 'RYAN NUGENT-HOPKINS',
      },
      {
        position: 'F',
        name: 'DAVID PASTRNAK',
      },
      {
        position: 'F',
        name: 'BRAYDEN POINT',
      },
      {
        position: 'F',
        name: 'SIDNEY CROSBY',
      },
      {
        position: 'F',
        name: 'CARTER VERHAUGUE',
      },
      {
        position: 'F',
        name: 'SAM REINHART',
      },
      {
        position: 'F',
        name: 'ADRIAN KEMPE',
      },
      {
        position: 'F',
        name: 'BO HORVAT',
      },
      {
        position: 'F',
        name: 'TRAVIS KONECNY',
      },
      {
        position: 'F',
        name: 'OWEN TIPPETT',
      },
      {
        position: 'F',
        name: 'BROCK NELSON',
      },
      {
        position: 'F',
        name: 'CHANDLER STEPHENSON',
      },
      {
        position: 'F',
        name: 'BARRETT HAYTON',
      },
      {
        position: 'D',
        name: 'ADAM FOX',
      },
      {
        position: 'D',
        name: 'CHARLIE McAVOY',
      },
      {
        position: 'D',
        name: 'KRIS LETANG',
      },
      {
        position: 'D',
        name: 'ZACH WERENSKI',
      },
      {
        position: 'D',
        name: 'TYSON BARRIE',
      },
      {
        position: 'D',
        name: 'JUSSO VALIMAKI',
      },
      {
        position: 'D',
        name: 'BRENT CLARKE',
      },
      {
        position: 'PP',
        name: 'OTTAWA',
      },
      {
        position: 'PP',
        name: 'MINNESOTA',
      },
      {
        position: 'SH',
        name: 'CAROLINA',
      },
      {
        position: 'SH',
        name: 'NASHVILLE',
      },
      {
        position: 'GL',
        name: 'EDMONTON',
      },
      {
        position: 'GL',
        name: 'LOS ANGELES',
      },
      {
        position: 'GL',
        name: 'CHICAGO',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
  {
    fantasyTeamName: 'Fear The Feathers',
    players: [
      {
        position: 'F',
        name: 'MIKKO RANTANEN',
      },
      {
        position: 'F',
        name: 'JACK HUGHES',
      },
      {
        position: 'F',
        name: 'KYLE CONNOR',
      },
      {
        position: 'F',
        name: 'MARK SCHIEFELE',
      },
      {
        position: 'F',
        name: 'JAKE GUENTZEL',
      },
      {
        position: 'F',
        name: 'FILIP FORSBERG',
      },
      {
        position: 'F',
        name: 'ANDREI SVECHNIKOV',
      },
      {
        position: 'F',
        name: 'ARTURI LEHKONEN',
      },
      {
        position: 'F',
        name: 'DAWSON MERCER',
      },
      {
        position: 'F',
        name: 'TREVOR MOORE',
      },
      {
        position: 'F',
        name: 'SETH JARVIS',
      },
      {
        position: 'F',
        name: 'MATT DUCHENE',
      },
      {
        position: 'F',
        name: 'NIK EHLERS',
      },
      {
        position: 'D',
        name: 'ERIK KARLSSON',
      },
      {
        position: 'D',
        name: 'DEVON TOEWS',
      },
      {
        position: 'D',
        name: 'RASMUS ANDERSSON',
      },
      {
        position: 'D',
        name: 'JOHN KLINGBERG',
      },
      {
        position: 'D',
        name: 'LUKE HUGHES',
      },
      {
        position: 'D',
        name: 'AARON EKBLAD',
      },
      {
        position: 'D',
        name: 'BRADY SKJEI',
      },
      {
        position: 'PP',
        name: 'COLORADO',
      },
      {
        position: 'PP',
        name: 'NEW JERSY',
      },
      {
        position: 'SH',
        name: 'TAMPA BAY',
      },
      {
        position: 'SH',
        name: 'NEW JERSY',
      },
      {
        position: 'GL',
        name: 'VEGAS',
      },
      {
        position: 'GL',
        name: 'DALLAS',
      },
      {
        position: 'GL',
        name: 'BUFFALO',
      },
      {
        position: 'INJ',
        name: '',
      },
    ],
  },
];

const someFunction = (team) => {
  return Promise.all(
    team.players.map((pl) => {
      if (
        pl.position === 'F' ||
        pl.position === 'D' ||
        (pl.position === 'INJ' && pl.name.length > 0)
      ) {
        return axios
          .get(
            `https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=1&q=${pl.name}&active=true`
          )
          .then((res) => {
            return {
              id: res.data[0].playerId,
              pos: pl.position,
              name: res.data[0].name,
            };
          })
          .catch((err) => {
            throw err;
          });
      } else if (pl.position === 'INJ' && pl.name.length === 0) {
        // slot for injured player, but no-one in it
        return { id: null, pos: pl.position, name: '' };
      } else if (
        pl.position === 'PP' ||
        pl.position === 'SH' ||
        pl.position === 'GL'
      ) {
        // compare team name with list, and return team id as wel as other things
        return { pos: pl.position, name: pl.name };
      }
    })
  );
};

const getIDsForTeam = () => {
  data.map((team) => {
    someFunction(team)
      .then((res) => {
        return { teamName: team.fantasyTeamName, players: res };
      })
      .then((res) => {
        console.log(res);
        set(ref(db, 'fantasyTeams/' + res.teamName), res)
          .then(() => {
            // Success.
            console.log(`team ${res.teamName} send to database`);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  });
};

// maybe use this eventually idk
// const getTeamIDs = async () => {
//   try {
//     await axios
//       .get(
//         'https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&start=0&limit=50&factCayenneExp=gamesPlayed%3E=0&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20232024%20and%20seasonId%3E=20232024'
//       )
//       .then((res) => {
//         console.log(res.data.data);
//         getIDsForTeam(res.data.data);
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };

const refreshData = false;
if (refreshData) {
  getIDsForTeam();
}

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ...
  });

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     console.log(user);
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

store.dispatch(fetchFantasyTeamPlayers());

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
