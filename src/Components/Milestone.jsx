import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Task from './task';

const Container = styled.div`
  margin: 8px auto;
  width: 60vw;
  border: 1px solid lightgrey;
  background-color: #ccc;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;
const MileTitle = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.5em;
  .subtext {
    font-size: 0.8em;
  }
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props =>
    props.isDraggingOver ? 'forestgreen' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;

const AddTask = styled.div`
  padding: 0px 0px 1vw 0px;
  display: flex;
  justify-content: center;
`;

const clickAlert = () => {
  alert(`You want a new task!`);
};

const Milestone = props => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <MileTitle>
            <div {...provided.dragHandleProps}>{props.column.title}</div>
            <div className="subtext">
              {/* Total Days: {arrSum(props.tasks.map(task => task.estDays))} */}
              Total Days: {props.mstoneDays}
            </div>
            <div className="subtext">Start Date: NN/NN/NN</div>
            <div className="subtext">End Date: NN/NN/NN</div>
          </MileTitle>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddTask onClick={clickAlert}>
            <FontAwesomeIcon icon={'plus-circle'} transform="grow-10" />
          </AddTask>
        </Container>
      )}
    </Draggable>
  );
};

export default Milestone;
