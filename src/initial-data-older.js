const initialData = {
  tasks: {
    item1: { id: 'item1', description: 'Take out the garbage' },
    'item-2': { id: 'item-2', description: 'Call the Doctor' },
    'item-3': { id: 'item-3', description: 'Write a blog post' },
    'item-4': { id: 'item-4', description: 'Cook dinner' }
  },
  columns: {
    columnA: {
      id: 'columnA',
      title: 'To Do',
      taskIds: ['item1', 'item-2', 'item-3', 'item-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['columnA', 'column-2']
};

export default initialData;
