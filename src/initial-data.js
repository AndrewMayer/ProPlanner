import { addDays } from './dateFuncs.js';

let date = new Date('2019,05,01');

const initialData = {
  startDate: date,
  nextItem: 7,
  nestMstone: 4,
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
    Mstone1: {
      id: 'Mstone1',
      title: 'Version 01',
      taskIds: ['item-1', 'item-2', 'item-3'],
      totalDays: 10,
      startDate: new Date('2019,05,01'),
      endDate: addDays(Date(), 10)
    },
    mStone2: {
      id: 'mStone2',
      title: 'Version 02',
      taskIds: ['item-4', 'item-5'],
      totalDays: 7,
      startDate: new Date('2019,05,22'),
      endDate: addDays(Date(), 7)
    },
    mStone3: {
      id: 'mStone3',
      title: 'Final',
      taskIds: ['item-6'],
      totalDays: 3,
      startDate: new Date('2019,05,30'),
      endDate: addDays(Date(), 3)
    }
  },
  columnOrder: ['Mstone1', 'mStone2', 'mStone3']
};

export default initialData;
