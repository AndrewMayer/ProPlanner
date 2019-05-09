import React, { Component } from 'react';
import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Container } from 'semantic-ui-react';

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableGroup = sortableElement(({ value, tasks }) => {
  return (
    <div>
      <li>{value.name}</li>
      <Container text>
        {tasks.map((value, index) => (
          <SortableItem
            key={`project-${index}`}
            index={index}
            value={value}
            variant="primary"
          />
        ))}
      </Container>
    </div>
  );
});

const SortableContainer = sortableContainer(({ children }) => {
  return <ol>{children}</ol>;
});

class App extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    projects: [
      {
        name: 'Name Project',
        tasks: ['Bob', 'Bill', 'Sarah', 'Doug', 'Kenny']
      },
      { name: 'Pet Project', tasks: ['Cat', 'Bird', 'Mouse', 'Goat', 'Dog'] },
      {
        name: 'Tool Project',
        tasks: ['Hammer', 'Screwdriver', 'Wrench', 'Drill', 'Saw']
      }
    ]
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  };

  onSectionSortEnd = (sectionIndex, { oldIndex, newIndex }) => {
    let copiedSections = Object.assign([], this.state.sections);
    let section = copiedSections[sectionIndex];
    section.items = arrayMove(section.items, oldIndex, newIndex);

    this.setState({
      sections: copiedSections
    });
  };

  render() {
    const { projects } = this.state;

    return (
      <div>
        <SortableContainer onSortEnd={this.onSortEnd}>
          <Container>
            {projects.map((value, index) => (
              <SortableGroup
                key={`project-`}
                index={index}
                value={value}
                variant="primary"
                tasks={value.tasks}
                lockAxis="y"
                onSortEnd={this.onSectionSortEnd.bind(this, index)}
                lockToContainerEdges
              />
            ))}
          </Container>
        </SortableContainer>
      </div>
    );
  }
}

export default App;
