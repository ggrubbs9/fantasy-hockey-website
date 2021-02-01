import React, { useEffect } from "react";
import axios from "axios";

import { Container } from "@material-ui/core";

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
    <div>
      <Container maxWidth='sm'>
        <h1>hi</h1>
      </Container>
    </div>
  );
}

export default App;
