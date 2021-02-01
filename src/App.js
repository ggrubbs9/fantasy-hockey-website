import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const gitHubUrl =
  "https://statsapi.web.nhl.com/api/v1/people/8478402/stats?stats=yearByYear";

function App() {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(gitHubUrl);
    console.log(response.data);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
