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
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import initialData from '../initial-data';
import Milestone from './Milestone';
import Header from './Header';

library.add(faBars, faPlusCircle, faEdit, faTrash);

const Container = styled.div`
  margin: 0vw 20vw;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
`;

class App extends React.Component {
  state = initialData;

  newMilestone = () => {
    const newState = {
      ...this.state
    };
    const newId = 'mStone' + newState.nextMstone;
    newState.nextMstone++;

    newState.columns[newId] = {
      id: [newId],
      title: '',
      taskIds: [],
      totalDays: 0,
      startDate: new Date(),
      endDate: new Date()
    };
    newState.columnOrder.push(newId);

    this.setState(newState);
    return;
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

  //CALLBACKS

  //Propagate date change from Header date picker update.
  handleNewDate = date => {
    let newState = { ...this.state, startDate: new Date(date) };
    newState = this.mStoneRestart(newState);
    this.setState(newState);
    return;
  };

  //Update estimated days change from task component.
  updateEstimatedDays = (changedId, newEstDays, columnId) => {
    let newState = {
      ...this.state
    };
    newState.tasks[changedId].estDays = newEstDays;
    let totalDays = this.calcMstoneDays(columnId);
    newState.columns[columnId].totalDays = totalDays;
    newState.columns[columnId].endDate = addDays(
      newState.columns[columnId].startDate,
      newEstDays
    );
    newState = this.mStoneRestart(newState);
    this.setState(newState);
    return;
  };

  //Propagate estimated days change from task.
  updateDescription = (changedId, newDesc) => {
    const newState = {
      ...this.state
    };
    newState.tasks[changedId].description = newDesc;
    this.setState(newState);
    return;
  };

  createNewTask = columnId => {
    const newState = {
      ...this.state
    };
    const newId = 'item-' + newState.nextItem;
    newState.nextItem++;

    newState.tasks[newId] = {
      id: newId,
      name: '',
      description: 'New Task',
      estDays: 0
    };
    newState.columns[columnId].taskIds.push(newId);

    this.setState(newState);
    // console.log(newState.tasks);
    return;
  };

  deleteTask = taskId => {
    let newState = {
      ...this.state
    };

    for (var key in newState.columns) {
      if (newState.columns.hasOwnProperty(key)) {
        const cleanArray = newState.columns[key].taskIds.filter(
          singleId => singleId !== taskId
        );
        newState.columns[key].taskIds = cleanArray;
      }
    }

    delete newState.tasks[taskId];

    newState = this.mStoneRestart(newState);
    this.setState(newState);
    return;
  };

  deleteMilestone = mstoneId => {
    const newState = {
      ...this.state
    };
    const cleanArray = newState.columnOrder.filter(id => mstoneId !== id);
    newState.columnOrder = cleanArray;

    delete newState.columns[mstoneId];

    this.setState(newState);
  };

  //Beautiful Dnd UPDATES

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

      let newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };
      newState = this.mStoneRestart(newState);
      this.setState(newState);
      return;
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    //Reorder tasks in same milestone
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

    //Moving task from one Milestone to another
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
                      updateEstimatedDays={this.updateEstimatedDays}
                      updateDescription={this.updateDescription}
                      deleteMilestone={this.deleteMilestone}
                      createNewTask={this.createNewTask}
                      deleteTask={this.deleteTask}
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
        <div onClick={this.newMilestone} style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={'plus-circle'} transform="grow-12" />
        </div>
      </div>
    );
  }
}

export default App;
