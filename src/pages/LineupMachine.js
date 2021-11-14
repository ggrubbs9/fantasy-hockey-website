import { useState } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setCurrentWeek } from '../store/AllData/allData.actions';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ScheduleGridComponent from '../components/lineupMachineTable.js';

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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

function LineupMachineComponent(props) {
  const [currentWeek] = useState(3);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

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

  const playerList = [
    { name: 'Alex Ovechkin', id: '8471214', pos: 'F' },
    { name: 'Mika Zibanejad', id: '8476459', pos: 'F' },
    { name: 'Jonathan Huberdeau', id: '8476456', pos: 'F' },
    { name: 'Jake Guentzel', id: '8477404', pos: 'F' },
    { name: 'Ryan Nugent-Hopkins', id: '8476454', pos: 'F' },
    { name: 'J.T. Miller', id: '8476468', pos: 'F' },
    { name: 'Filip Forsberg', id: '8476887', pos: 'F' },
    { name: 'Brady Tkachuk', id: '8480801', pos: 'F' },
    { name: 'Max Domi', id: '8477503', pos: 'F' },
    { name: 'Chris Kreider', id: '8475184', pos: 'F' },

    { name: 'Brent Burns', id: '8470613', pos: 'D' },
    { name: 'Ryan Pulock', id: '8477506', pos: 'D' },
    { name: 'Mark Giordano', id: '8470966', pos: 'D' },
    { name: 'Quinn Hughes', id: '8480800', pos: 'D' },
    { name: 'Adam Fox', id: '8479323', pos: 'D' },
    { name: 'Rasmus Ristolainen', id: '8477499', pos: 'D' },
  ];

  // const [players] = useState([
  //   { name: 'Alex Ovechkin', id: '8471214' },
  //   { name: 'Mika Zibanejad', id: '8476459' },
  //   { name: 'Jonathan Huberdeau', id: '8476456' },
  //   { name: 'Jake Guentzel', id: '8477404' },
  //   { name: 'Ryan Nugent-Hopkins', id: '8476454' },
  //   { name: 'J.T. Miller', id: '8476468' },
  //   { name: 'Filip Forsberg', id: '8476887' },
  //   { name: 'Brady Tkachuk', id: '8480801' },
  //   { name: 'Max Domi', id: '8477503' },
  //   { name: 'Chris Kreider', id: '8475184' },
  // ]);
  // const [defensePlayers] = useState([
  //   { name: 'Brent Burns', id: '8470613' },
  //   { name: 'Ryan Pulock', id: '8477506' },
  //   { name: 'Mark Giordano', id: '8470966' },
  //   { name: 'Quinn Hughes', id: '8480800' },
  //   { name: 'Adam Fox', id: '8479323' },
  //   { name: 'Rasmus Ristolainen', id: '8477499' },
  // ]);
  const fantasyWeekList = [
    {
      id: 1,
      name: 'Week 1',
      startDate: '10/17/21',
      endDate: '10/23/21',
    },
    {
      id: 2,
      name: 'Week 2',
      startDate: '10/24/21',
      endDate: '10/30/21',
    },
    {
      id: 3,
      name: 'Week 3',
      startDate: '10/31/21',
      endDate: '11/6/21',
    },
    {
      id: 4,
      name: 'Week 4',
      startDate: '11/7/21',
      endDate: '11/13/21',
    },
    {
      id: 5,
      name: 'Week 5',
      startDate: '11/14/21',
      endDate: '11/20/21',
    },
    {
      id: 6,
      name: 'Week 6',
      startDate: '11/21/21',
      endDate: '11/27/21',
    },
    {
      id: 7,
      name: 'Week 7',
      startDate: '11/28/21',
      endDate: '12/4/21',
    },
    {
      id: 8,
      name: 'Week 8',
      startDate: '12/5/21',
      endDate: '12/11/21',
    },
    {
      id: 9,
      name: 'Week 9',
      startDate: '12/12/21',
      endDate: '12/18/21',
    },
    {
      id: 10,
      name: 'Week 10',
      startDate: '12/19/12',
      endDate: '12/23/21',
    },
    {
      id: 11,
      name: 'Week 11',
      startDate: '12/27/21',
      endDate: '1/1/22',
    },
    {
      id: 12,
      name: 'Week 12',
      startDate: '1/2/22',
      endDate: '1/8/22',
    },
    {
      id: 13,
      name: 'Week 13',
      startDate: '1/9/22',
      endDate: '1/15/22',
    },
    {
      id: 14,
      name: 'Week 14',
      startDate: '1/16/22',
      endDate: '1/22/22',
    },
    {
      id: 15,
      name: 'Week 15',
      startDate: '1/23/22',
      endDate: '1/29/22',
    },
    {
      id: 16,
      name: 'Week 16',
      startDate: '1/30/22',
      endDate: '2/26/22',
    },
    {
      id: 17,
      name: 'Week 17',
      startDate: '2/27/22',
      endDate: '3/5/22',
    },
    {
      id: 18,
      name: 'Week 18',
      startDate: '3/6/22',
      endDate: '3/12/22',
    },
    {
      id: 19,
      name: 'Week 19',
      startDate: '3/13/22',
      endDate: '3/19/22',
    },
    {
      id: 20,
      name: 'Week 20',
      startDate: '3/20/22',
      endDate: '3/26/22',
    },
    {
      id: 21,
      name: 'Week 21',
      startDate: '3/27/22',
      endDate: '4/2/22',
    },
    {
      id: 22,
      name: 'Week 22',
      startDate: '4/3/22',
      endDate: '4/9/22',
    },
    {
      id: 23,
      name: 'Week 23',
      startDate: '4/10/22',
      endDate: '4/16/22',
    },
    {
      id: 24,
      name: 'Week 24',
      startDate: '4/17/22',
      endDate: '4/18/22',
    },
  ];

  const getDaysArray = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  useEffect(() => {
    const createDaylist = () => {
      let weekObject = fantasyWeekList.find((x) => x.id === currentWeek);
      var daylist = getDaysArray(
        new Date(weekObject.startDate),
        new Date(weekObject.endDate)
      );
      daylist.map((v) => v.toISOString().slice(0, 10)).join('');
      createColumnData(daylist);
    };
    createDaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createColumnData = (daylist) => {
    // eslint-disable-next-line array-callback-return
    daylist.map((week, i) => {
      setColumns((columns) => [
        ...columns,
        {
          Header: week.toLocaleDateString('en-US'),
          accessor: `day${i + 1}`,
        },
      ]);
    });
  };

  const checkIfPlaying = (player, column) => {
    // get player team
    // check if team plays on given date on NHL schedule
    // return away/home as @ or '' and show opponent
    let x = '@CHI';
    return x;
  };

  const createRowData = () => {
    //for each column
    let array = [];
    playerList.map((player) => {
      //for each player
      let object = {};
      columns.map((cl) => {
        let check = checkIfPlaying(player, cl);
        object = { ...object, [cl.accessor]: check };
      });
      array.push(object);
    });
    setRows(array);
  };

  useEffect(() => {
    if (columns.length) {
      createRowData();
    }
  }, [columns]);
  const headers = useMemo(() => columns, [columns]);

  const data = useMemo(() => rows, [rows]);

  return (
    <Container maxWidth="xl">
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

      <Styles>
        <ScheduleGridComponent columns={headers} data={data} />
      </Styles>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineupMachineComponent);
