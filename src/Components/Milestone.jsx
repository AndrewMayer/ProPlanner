import React from 'react';
import styled from 'styled-components';
import { formattedDate } from '../dateFuncs.js';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Task from './Task.jsx';

const Container = styled.div`
  margin: 8px auto;
  width: 60vw;
  border: 1px solid lightgrey;
  background-color: #ccc;
  border-radius: 6px;
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

const TrashCorner = styled.div`
  padding: 0px 10px 10px 0px;
`;

// const mstoneEmpty = this.props.tasks === [] ? true : false;

const Milestone = props => {
  const newTask = () => {
    props.createNewTask(props.column.id);
  };

  const deleteMilestone = () => {
    props.deleteMilestone(props.column.id);
  };

  const mstoneEmpty = props.tasks === undefined || props.tasks.length === 0;

  //if the tasklist is empty render the delete icon
  const TrashIcon = ({ isMstoneEmpty, column }) => {
    if (isMstoneEmpty) {
      return (
        <TrashCorner onClick={deleteMilestone} style={{ textAlign: 'right' }}>
          <FontAwesomeIcon icon={'trash'} transform="grow-10" />
        </TrashCorner>
      );
    } else {
      return <div />;
    }
  };

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <MileTitle>
            <div {...provided.dragHandleProps}>{props.column.title}</div>
            <div className="subtext">
              Start Date: {formattedDate(props.column.startDate)}
            </div>
            <div className="subtext">
              End Date: {formattedDate(props.column.endDate)}
            </div>
            <div className="subtext">Total Days: {props.column.totalDays}</div>
          </MileTitle>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    updateEstimatedDays={props.updateEstimatedDays}
                    updateDescription={props.updateDescription}
                    deleteTask={props.deleteTask}
                    columnId={props.column.id}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddTask onClick={newTask}>
            <FontAwesomeIcon icon={'plus-circle'} transform="grow-10" />
          </AddTask>
          <div>
            <TrashIcon isMstoneEmpty={mstoneEmpty} column={props.column} />
          </div>
        </Container>
      )}
    </Draggable>
  );
};

export default Milestone;
