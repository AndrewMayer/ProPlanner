import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
`;

const clickAlert = () => {
  alert(`You want to edit a task!`);
};

const Task = props => {
  const [isTextEdit, setIsTextEdit] = useState(false);
  const [newEstDays, setNewEstDays] = useState(props.task.estDays);

  const switchEstimatedEdit = () => {
    setIsTextEdit(!isTextEdit);
  };

  const renderEstimated = () => {
    return (
      <div>
        Estimated Days: <b>{props.task.estDays}</b>
      </div>
    );
  };

  const upDateEstimatedValue = inputValue => {
    setIsTextEdit(false);
    props.upDateEstimatedDays(props.key, inputValue);
  };

  const editEstimated = () => {
    return (
      <div>
        Estimated Days:{' '}
        <input type="number" defaultValue={newEstDays} onChange="inputValue" />
        <button onclick={switchEstimatedEdit}>X</button>
        {/* <button onclick={upDateEstimatedValue(inputValue)}>OK</button> */}
      </div>
    );
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div onDoubleClick={switchEstimatedEdit}>
            {isTextEdit ? editEstimated() : renderEstimated()}
          </div>
          <div>{props.task.description}</div>

          <div onClick={clickAlert} style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={'edit'} transform="grow-8" />
          </div>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
