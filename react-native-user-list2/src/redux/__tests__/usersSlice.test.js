import reducer, { fetchUsers } from "../usersSlice";

describe("usersSlice", () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };

  it("should handle initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should set loading to true when fetchUsers is pending", () => {
    const action = { type: fetchUsers.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it("should set users when fetchUsers is fulfilled", () => {
    const users = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main St",
      },
    ];
    const action = { type: fetchUsers.fulfilled.type, payload: users };
    const state = reducer(initialState, action);
    expect(state.users).toEqual(users);
    expect(state.loading).toBe(false);
  });

  it("should set error when fetchUsers is rejected", () => {
    const action = {
      type: fetchUsers.rejected.type,
      error: { message: "Error fetching users" },
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe("Error fetching users");
    expect(state.loading).toBe(false);
  });
});
