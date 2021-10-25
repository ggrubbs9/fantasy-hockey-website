import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PeopleIcon from '@material-ui/icons/People';
import CachedIcon from '@material-ui/icons/Cached';
import LineupMachineComponent from './pages/LineupMachine';
import PlayerStatsComponent from './pages/PlayerStats';
import PlayerPickupComponent from './pages/PlayerPickup';
import TeamSetupComponent from './pages/TeamSetup';
import { useGetPokemonByNameQuery } from './helpers/pokemon';
import { connect } from 'react-redux';

import { setSeasonSchedule } from './store/SeasonSchedule/seasonSchedule.actions';

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'lightgrey',
  },
});

const mapStateToProps = (state) => {
  return {
    count: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSeasonSchedule: (x) => dispatch(setSeasonSchedule(x)),
  };
};

function App(props) {
  const { data, error, isLoading } = useGetPokemonByNameQuery('team.stats');
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  function Dashboard() {
    return <h2>Users</h2>;
  }

  useEffect(() => {
    if (!isLoading) {
      console.log(data, error);
      console.log(props);
      props.setSeasonSchedule(data);
    }
  }, [isLoading]);

  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <LineupMachineComponent />
          </Route>
          <Route path="/player-stats">
            <PlayerStatsComponent />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/player-pickup">
            <PlayerPickupComponent />
          </Route>
          <Route path="/team-setup">
            <TeamSetupComponent />
          </Route>
        </Switch>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.stickToBottom}
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
        </BottomNavigation>
      </div>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
