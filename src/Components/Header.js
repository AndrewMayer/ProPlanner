import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return String(date);
};

const formattedDate = d => {
  const date = new Date(d);
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(n => (n < 10 ? `0${n}` : `${n}`))
    .join('/');
};

const Header = props => {
  let sum = 0;
  // TODO: Come back some day and calculate this from milestone values?
  for (let key in props.tasks) {
    sum += props.tasks[key].estDays;
  }

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
          <DateBox
            type="text"
            defaultValue={formattedDate(props.date)}
            name="date"
          />
        </div>
        <div className="filler" />
        <div>
          <div>End Date: {formattedDate(addDays(props.date, sum))}</div>
        </div>
        <div className="bigFiller" />
        <div>Total Days: {sum}</div>
      </Title>
    </MainHeader>
  );
};

export default Header;
