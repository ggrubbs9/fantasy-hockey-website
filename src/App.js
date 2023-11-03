import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import CachedIcon from '@mui/icons-material/Cached';
import LineupMachineComponent from './pages/LineupMachine';
import PlayerStatsComponent from './pages/PlayerStats';
import PlayerPickupComponent from './pages/PlayerPickup';
import TeamSetupComponent from './pages/TeamSetup';
// import { useQuery, gql } from '@apollo/client';
import "./App.css"

// import { useGetNHLStatsQuery } from './helpers/NHLApi';
import { connect } from 'react-redux';

import { setTeamStats, setNHLSchedule } from './store/AllData/allData.actions';

import SignInDialog from './components/signInDialog';
// import firebase from "firebase";


const mapStateToProps = (state) => {
  return {
    teamLineup: state.teamData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTeamStats: (x) => dispatch(setTeamStats(x)),
    setNHLSchedule: (x) => dispatch(setNHLSchedule(x)),
  };
};

function App(props, state) {

  useEffect(() => {
    console.log(props)
  }, [props])
  //   const HELLO_WORLD = gql`
  //     {
  //       hello
  //     }
  //   `;
  // const { loading, error, data } = useQuery(HELLO_WORLD);

  // const { isLoading } = useGetNHLStatsQuery([
  //   'schedule',
  //   'expand',
  //   '20212022',
  // ]);
  // const { scheduleData, scheduleError, scheduleIsLoading } =
  //   useGetNHLStatsQuery(['schedule', 'expand', '20212022']);
  const [value, setValue] = React.useState(0);

  function Dashboard() {
    return <h2>Users</h2>;
  }

  // useEffect(() => {
  //   if (!isLoading) {
  //     // console.log(data);
  //     // console.log(props);
  //     // props.setTeamStats(data);
  //     props.setNHLSchedule();
  //   }
  // }, [isLoading,props]);

  const handleClick = (e) => {
    // console.log(e);
  };

  const dialogCallback = (childData) => {
    // console.log(childData);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LineupMachineComponent />} />
          <Route path="/player-stats" element={<PlayerStatsComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player-pickup" element={<PlayerPickupComponent />} />
          <Route path="/team-setup" element={<TeamSetupComponent />} />
        </Routes>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className="bottom-nav"
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Lineup Machine"
            icon={<BuildIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/player-stats"
            label="Player Stats"
            icon={<TrendingUpIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/dashboard"
            label="Team Stats"
            icon={<PeopleIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/player-pickup"
            label="Player Pickup"
            icon={<CachedIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/team-setup"
            label="Team Setup"
            icon={<CachedIcon />}
          />
          <SignInDialog
            parentCallback={dialogCallback}
            handleClickOpen={handleClick}
          />
        </BottomNavigation>
      </div>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
