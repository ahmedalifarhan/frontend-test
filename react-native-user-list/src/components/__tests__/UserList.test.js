import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserList from "../UserList";

const mockStore = configureStore([]);

describe("UserList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        users: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            address: "123 Main St",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            address: "456 Maple Ave",
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  it("should render users correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("Jane Smith")).toBeTruthy();
  });

  it("should filter users based on search input", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const searchInput = getByPlaceholderText("Search by name...");
    fireEvent.changeText(searchInput, "John");

    expect(getByText("John Doe")).toBeTruthy();
    expect(queryByText("Jane Smith")).toBeNull();
  });

  it('should load more users when "Load More" is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const loadMoreButton = getByText("Load More");
    fireEvent.press(loadMoreButton);

    expect(store.getActions()).toContainEqual({ type: "users/loadMore" });
  });
});
  