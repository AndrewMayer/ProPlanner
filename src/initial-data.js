const initialData = {
  startDate: '2019,05,12',
  tasks: {
    'item-1': {
      id: 'item-1',
      name: 'Document Outline',
      description: 'Create an outline for the document',
      estDays: 5
    },
    'item-2': {
      id: 'item-2',
      name: 'Write Document',
      description: 'Write the document',
      estDays: 6
    },
    'item-3': {
      id: 'item-3',
      name: 'Create Wireframes',
      description: 'Create wireframes',
      estDays: 9
    },
    'item-4': {
      id: 'item-4',
      name: 'Code Initial Concept',
      description: 'Wire up initial concept',
      estDays: 6
    },
    'item-5': {
      id: 'item-5',
      name: 'Code beta',
      description: 'Wire up initial full version with styling',
      estDays: 1
    },
    'item-6': {
      id: 'item-6',
      name: 'Code final',
      description: `Create and outline for the document`,
      estDays: 3
    }
  },

  columns: {
    mStoneA: {
      id: 'mStoneA',
      title: 'Version 01',
      taskIds: ['item-1', 'item-2', 'item-3'],
      totalDays: 0,
      startDate: Date()
    },
    mStoneB: {
      id: 'mStoneB',
      title: 'Version 02',
      taskIds: ['item-4', 'item-5'],
      totalDays: 0,
      startDate: Date()
    },
    mStoneC: {
      id: 'mStoneC',
      title: 'Final',
      taskIds: ['item-6'],
      totalDays: 0,
      startDate: Date()
    }
  },
  columnOrder: ['mStoneA', 'mStoneB', 'mStoneC']
};

export default initialData;
