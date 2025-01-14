import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore([]);

test("renders TaskManager inside App", () => {
  const store = mockStore({ tasks: [] });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Check if TaskManager is rendered
  expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
});
