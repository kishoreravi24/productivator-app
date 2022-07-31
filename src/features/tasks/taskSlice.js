import { createSelector, createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasksList: [],
  },
  reducers: {
    updateTaskList: (state, action) => {
      state.tasksList = action.payload;
    },
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload,
        description: "",
        done: false,
        timeStamp: Date.now(),
      };
      const { tasksList } = state;
      state.tasksList = [newTask, ...tasksList];
    },
    updateTask: (state, action) => {
      const updateTask = action.payload;
      const newTasks = state.tasksList.map((taskItem) => {
        if (taskItem.id !== updateTask.id) return taskItem;

        return updateTask;
      });

      const newTodoTasks = newTasks
        .filter(({ done }) => !done)
        .sort(
          (comparingTask, comparedTask) =>
            comparedTask.timeStamp - comparingTask.timeStamp
        );
      const newDoneTasks = newTasks
        .filter(({ done }) => done)
        .sort(
          (comparingTask, comparedTask) =>
            comparedTask.timeStamp - comparingTask.timeStamp
        );

      state.tasksList = [...newTodoTasks, ...newDoneTasks];
    },
    deleteTask: (state, action) => {
      const deleteId = action.payload;
      state.tasksList = state.tasksList.filter(({ id }) => id !== deleteId);
    },
  },
});

export const selectTasksList = (state) => state.tasks.tasksList;

export const selectTaskById = createSelector(
  [, (state, taskId) => taskId],
  (tasks, taskId) => tasks.find(({ id }) => taskId === id)
);

export const { addTask, toggleDone, deleteTask, updateTaskList, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
