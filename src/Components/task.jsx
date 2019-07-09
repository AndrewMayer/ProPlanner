import React from 'react';
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

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.description}
            <div>
              Estimated Days: <b>{this.props.task.estDays}</b>
            </div>
            <div onClick={clickAlert} style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={'edit'} transform="grow-8" />
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}
