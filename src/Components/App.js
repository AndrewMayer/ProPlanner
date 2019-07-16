import React from 'react';
// import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { arrSum, addDays } from '../dateFuncs.js';
import {
  faBars,
  faPlusCircle,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import initialData from '../initial-data';
import Milestone from './Milestone';
import Header from './Header';

library.add(faBars, faPlusCircle, faEdit);

const Container = styled.div`
  margin: 2%;
  // display: flex;
`;

const Title = styled.h1`
  text-align: center;
`;

class App extends React.Component {
  state = initialData;

  clickAlert = () => {
    alert(`You want a new milestone!`);
  };

  calcMstoneDays = columnId => {
    const newDays = arrSum(
      this.state.columns[columnId].taskIds.map(
        task => this.state.tasks[task].estDays
      )
    );
    return newDays;
  };

  //Update milestone date values based on modified start date.
  mStoneRestart = newState => {
    let allDays = [];
    newState.columnOrder.forEach(columnId => {
      let newDays = arrSum(
        newState.columns[columnId].taskIds.map(
          task => this.state.tasks[task].estDays
        )
      );

      newState.columns[columnId].totalDays = newDays;
      newState.columns[columnId].startDate = addDays(
        newState.startDate,
        arrSum(allDays)
      );
      newState.columns[columnId].endDate = addDays(
        newState.columns[columnId].startDate,
        newDays
      );
      allDays.push(newDays + 1);
    });
    return newState;
  };

  //Update date change from Header date picker.

  handleNewDate = date => {
    // this.setState({ startDate: new Date(date) });
    let newState = { ...this.state, startDate: new Date(date) };
    newState = this.mStoneRestart(newState);
    this.setState(newState);
    return;
  };

  //Beautiful Dnd Updating

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      //TODO: Use the newColumnOrder array to determine the new values for start and completion dates for all milestones.
      //Map through newColumnOrder and add days then calculate start dates.

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };
      this.setState(newState);
      return;
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      //TODO: Go through the tasks and recalculate total days.
      //TODO: Map across the new newTaskIds and write new days to totalDays in newState

      const newColumn = {
        ...home,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    //Moving from one Milestone to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds
    };

    let newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign
      }
    };

    newState = this.mStoneRestart(newState);

    this.setState(newState);
    return;
  };

  render() {
    return (
      <div>
        <Title>ProPlanner V0.1</Title>
        <Header
          tasks={this.state.tasks}
          date={new Date(this.state.startDate)}
          setDate={this.handleNewDate}
        />
        <div onClick={this.clickAlert} style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={'plus-circle'} transform="grow-12" />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-columns" type="column">
            {provided => (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.columnOrder.map((columnId, index) => {
                  const column = this.state.columns[columnId];
                  const tasks = column.taskIds.map(
                    taskId => this.state.tasks[taskId]
                  );

                  return (
                    <Milestone
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                      mstoneDays={this.calcMstoneDays(columnId)}
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default App;
