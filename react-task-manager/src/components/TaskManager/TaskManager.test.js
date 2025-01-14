import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskManager from "../TaskManager";

const mockStore = configureStore([]);
// Create a mock Redux store
let store;

beforeEach(() => {
  store = mockStore({
    tasks: [
      { id: 1, title: "Test Task 1", priority: "High", completed: false },
      { id: 2, title: "Test Task 2", priority: "Medium", completed: true },
    ],
  });
});
// Set up the mock store with initial state before each test

describe("TaskManager Component", () => {
  // Define a test suite for the TaskManager component

  it("renders tasks correctly", () => {
    // Test if tasks are rendered properly
    render(
      <Provider store={store}>
        <TaskManager />
      </Provider>
    );
    // Render TaskManager component wrapped with the mock Redux store

    expect(screen.getByText(/Test Task 1/i)).toBeInTheDocument();
    // Assert that "Test Task 1" is displayed in the document
    expect(screen.getByText(/Test Task 2/i)).toBeInTheDocument();
    // Assert that "Test Task 2" is displayed in the document
  });

  it("toggles task completion", () => {
    // Test if toggling task completion works
    render(
      <Provider store={store}>
        <TaskManager />
      </Provider>
    );
    // Render TaskManager component wrapped with the mock Redux store

    const task1 = screen.getByText(/Test Task 1/i);
    // Get the element for "Test Task 1" from the document
    fireEvent.click(task1);
    // Simulate a click event on "Test Task 1"

    expect(store.getActions()).toEqual([{ type: "TOGGLE_TASK", payload: 1 }]);
    // Assert that the correct action is dispatched with the task ID
  });
});
