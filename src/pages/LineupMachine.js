import { useState } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setCurrentWeek } from '../store/AllData/allData.actions';

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentWeek: (x) => dispatch(setCurrentWeek(x)),
  };
};

function LineupMachineComponent(props) {
  const [week, setWeek] = useState('');

  const handleChange = (event) => {
    setWeek(event.target.value);
    props.setCurrentWeek(event.target.value);
  };

  const getWeeks = () => {
    let content = [];
    for (let i = 1; i < 25; i++) {
      content.push(
        <MenuItem key={i} value={i}>
          Week {i}
        </MenuItem>
      );
    }
    return content;
  };

  return (
    <Container maxWidth="sm">
      <h1>hi</h1>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Week</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={week}
            label="Week"
            onChange={handleChange}
          >
            {getWeeks()}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineupMachineComponent);
