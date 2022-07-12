import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getShortRandomID } from "../../utils/randomId";
import { Task } from "./types/Task";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    updateTaskList: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      const newTask: Task = {
        id: getShortRandomID(),
        title: action.payload,
        description: "",
        done: false,
        timeStamp: new Date(),
        modifiedTimeStamp: new Date()
      };
      const { tasks } = state;
      (state.tasks as Task[]) = [newTask, ...tasks];
    },
    updateTask: (state, action) => {
      const updateTask = action.payload;
      const newTasks: Task[] = state.tasks.map((taskItem: Task) => {
        if (taskItem.id !== updateTask.id) return taskItem;

        return updateTask;
      });

      const newTodoTasks = newTasks
        .filter(({ done }) => !done)
        .sort(
          (comparingTask, comparedTask) =>
            comparedTask.timeStamp.getTime() - comparingTask.timeStamp.getTime()
        );
      const newDoneTasks = newTasks
        .filter(({ done }) => done)
        .sort(
          (comparingTask, comparedTask) =>
            comparedTask.timeStamp.getTime() - comparingTask.timeStamp.getTime()
        );

      (state.tasks as Task[]) = [...newTodoTasks, ...newDoneTasks];
    },
    deleteTask: (state, action) => {
      const deleteId = action.payload;
      state.tasks = state.tasks.filter(({ id }) => id !== deleteId);
    },
  },
});

export const selectTasksList = (state) => state.tasks.tasks;

const selectTaskId = (state, taskId) => taskId;
export const selectTaskById = createSelector(
  [selectTasksList, selectTaskId],
  (tasks, taskId) => tasks.find(({ id }) => taskId === id)
);

export const { addTask, deleteTask, updateTaskList, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
