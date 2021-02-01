import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeComponent from "./pages/Home";

const gitHubUrl =
  "https://statsapi.web.nhl.com/api/v1/people/8478402/stats?stats=yearByYear";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function App() {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(gitHubUrl);
    console.log(response.data);
  };

  function About() {
    return <h2>About</h2>;
  }

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
          <Route exact path='/'>
            <HomeComponent />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
        </Switch>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            to='/'
            label='Recents'
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/about'
            label='Favorites'
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/dashboard'
            label='Nearby'
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </div>
    </Router>
  );
}

export default App;
