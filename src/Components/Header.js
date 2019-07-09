import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const MainHeader = styled.div`
  border-radius: 2px;
  margin: 3vh auto 3vh;
  padding: 1vh 1vw;
  width: 70vw;
  display: flex;
  border: 2px solid lightgrey;
  background-color: #ddd;
`;

const Title = styled.div`
  padding: 0.5vw;
  font-size: 1.2em;
  display: flex;
  justify-content: center;

  .filler {
    padding: 0 1vw;
  }
  .bigFiller {
    padding: 0 2vw;
  }
`;

const DateBox = styled.input`
  width: 6vw;
`;

const addDays = function(d, days) {
  console.log('addDays fired');
  console.log('d is ' + d.valueOf());
  const date = new Date(d.valueOf());
  console.log('date is ' + date);
  date.setDate(days);
  return date;
};

const formattedDate = d => {
  const date = new Date(d);
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(n => (n < 10 ? `0${n}` : `${n}`))
    .join('/');
};

const Header = props => {
  const [startDate, doDate] = useState(Date());

  const handleChange = date => {
    console.log('handleChange fired');
    doDate(Date(date));
    console.log(`StartDate is ${startDate}`);
    // debugger;
  };

  let sum = 0;
  // TODO: Calculate this from milestone values rather than all tasks?
  for (let key in props.tasks) {
    sum += props.tasks[key].estDays;
  }

  const generateEndDate = () => {
    const newDate = formattedDate(addDays(startDate, sum));
    return newDate;
  };

  return (
    <MainHeader>
      <Title>
        <div>
          <FontAwesomeIcon icon={'bars'} />
          &nbsp; Project Title
        </div>
        <div className="filler" />
        <div>
          Start Date:{' '}
          {/* <DateBox
            type="text"
            defaultValue={formattedDate(props.date)}
            name="date"
          /> */}
          {console.log(startDate)}
          <DatePicker selected={startDate.getUTCDate} onChange={handleChange} />
        </div>
        <div className="filler" />
        <div>
          <div>End Date: {generateEndDate()}</div>
        </div>
        <div className="bigFiller" />
        <div>Total Days: {sum}</div>
      </Title>
    </MainHeader>
  );
};

export default Header;
