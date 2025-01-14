import React from "react";
import TaskManager from "./components/TaskManager";
import "./App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="app">
      <TaskManager />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
