import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LineupMachineComponent from './pages/LineupMachine';
import PlayerStatsComponent from './pages/PlayerStats';

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'lightgrey',
  },
});

function App() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  function Dashboard() {
    return <h2>Users</h2>;
  }

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
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/player-stats"
            label="Player Stats"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/dashboard"
            label="Player Stats"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/dashboard"
            label="Team Stats"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </div>
    </Router>
  );
}

export default App;
