import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
`;

const Task = props => {
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isEstimatedEdit, setIsEstimatedEdit] = useState(false);
  const [newEstDays, setNewEstDays] = useState(props.task.estDays);
  const [newDesc, setNewDesc] = useState(props.task.description);

  const removeTask = () => {
    props.deleteTask(props.task.id);
  };

  const switchEstimatedEdit = () => {
    setIsEstimatedEdit(!isEstimatedEdit);
  };

  const switchDescEdit = () => {
    setIsDescEdit(!isDescEdit);
  };

  const renderEstimated = () => {
    return (
      <div>
        Estimated Days: <b>{props.task.estDays}</b>
      </div>
    );
  };

  const renderDesc = () => {
    return (
      <div>
        <b> {props.task.description}</b>
      </div>
    );
  };

  const upDateEstimatedValue = () => {
    setIsEstimatedEdit(false);
    props.updateEstimatedDays(props.task.id, newEstDays, props.columnId);
  };

  const upDateDescValue = () => {
    setIsDescEdit(false);

    props.updateDescription(props.task.id, newDesc);
  };

  const editEstimated = () => {
    return (
      <div>
        Estimated Days:{' '}
        <input
          type="text"
          size="3"
          defaultValue={newEstDays}
          onChange={e => setNewEstDays(e.target.value)}
        />
        {`  `}
        <button onClick={switchEstimatedEdit}>X</button>
        {`  `}
        <button onClick={upDateEstimatedValue}>OK</button>
      </div>
    );
  };

  const editDesc = () => {
    return (
      <div>
        Estimated Days:{' '}
        <input
          type="text"
          size="35"
          defaultValue={newDesc}
          onChange={e => setNewDesc(e.target.value)}
        />
        {`  `}
        <button onClick={switchDescEdit}>X</button>
        {`  `}
        <button onClick={upDateDescValue}>OK</button>
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
          <div
            style={{ width: '25%', textAlign: 'left' }}
            onDoubleClick={switchEstimatedEdit}
          >
            {isEstimatedEdit ? editEstimated() : renderEstimated()}
          </div>
          <div
            style={{ width: '73%', textAlign: 'left' }}
            onDoubleClick={switchDescEdit}
          >
            {isDescEdit ? editDesc() : renderDesc()}
          </div>
          <div style={{ textAlign: 'right' }} onDoubleClick={removeTask}>
            <FontAwesomeIcon icon={'trash'} transform="grow-4" />
          </div>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
