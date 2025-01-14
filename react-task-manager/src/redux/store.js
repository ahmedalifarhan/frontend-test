import { createStore } from "redux";
import taskReducer from "./reducer";

const store = createStore(taskReducer);

// Sync tasks with localStorage
store.subscribe(() => {
  localStorage.setItem("tasks", JSON.stringify(store.getState().tasks));
});

export default store;
