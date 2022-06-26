import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';
import {loadState} from '../services/StorageService.ts';

export const store = configureStore({
  reducer: {
    tasks: taskReducer
  },
  preloadedState: loadState()
});
