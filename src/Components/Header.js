import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formattedDate, addDays } from '../dateFuncs.js';
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

const Header = props => {
  const [dateState, setDateState] = useState({ startDate: new Date() });

  const handleChange = date => {
    setDateState({ startDate: new Date(date) });
  };

  let sum = 0;
  // TODO: Calculate this from milestone values rather than all tasks?
  for (let key in props.tasks) {
    sum += props.tasks[key].estDays;
  }

  const generateEndDate = () => {
    const newDate = formattedDate(addDays(dateState.startDate, sum));
    return `${newDate}`;
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
          <DatePicker selected={dateState.startDate} onChange={handleChange} />
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
