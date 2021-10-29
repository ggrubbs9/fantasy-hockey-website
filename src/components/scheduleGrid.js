import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import MaterialTable from 'material-table';
import './scheduleGrid.scss'

function ScheduleGridComponent() {
  const [players] = useState([
    { name: 'Alex Ovechkin', id: '8471214' },
    { name: 'Mika Zibanejad', id: '8476459' },
    { name: 'Jonathan Huberdeau', id: '8476456' },
    { name: 'Jake Guentzel', id: '8477404' },
    { name: 'Ryan Nugent-Hopkins', id: '8476454' },
    { name: 'J.T. Miller', id: '8476468' },
    { name: 'Filip Forsberg', id: '8476887' },
    { name: 'Brady Tkachuk', id: '8480801' },
    { name: 'Max Domi', id: '8477503' },
    { name: 'Chris Kreider', id: '8475184' },
  ]);
  const [defensePlayers] = useState([
    { name: 'Brent Burns', id: '8470613' },
    { name: 'Ryan Pulock', id: '8477506' },
    { name: 'Mark Giordano', id: '8470966' },
    { name: 'Quinn Hughes', id: '8480800' },
    { name: 'Adam Fox', id: '8479323' },
    { name: 'Rasmus Ristolainen', id: '8477499' },
  ]);
  const [dates] = useState([
    { day: '10/24/21', type: '' },
    { day: '10/25/21', type: '' },
    { day: '10/26/21', type: '' },
    { day: '10/27/21', type: '' },
    { day: '10/28/21', type: '' },
    { day: '10/29/21', type: '' },
    { day: '10/30/21', type: '' },
  ]);
  return (
    <div className="tableContainer">
      <div className={"row"+' '+"columnNames"}>
        {dates.map((date, i) => (
          <div key={i} className={"col-xs"+" "+"columnName"}>
            <div className="box">{date.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleGridComponent;
