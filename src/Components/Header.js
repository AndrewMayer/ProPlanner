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
          Start Date: <DateBox type="text" name="date" />
        </div>
        <div className="filler" />
        <div>
          End Date: <DateBox type="text" name="date" />
        </div>
        <div className="bigFiller" />
        <div>Total Days: {sum}</div>
      </Title>
    </MainHeader>
  );
};

export default Header;
