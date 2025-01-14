import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fetch users from API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  // Transform data: Combine address fields into a single string
  const transformedData = data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`, // Combine address fields
  }));

  // Save fetched users to AsyncStorage for offline support
  await AsyncStorage.setItem("users", JSON.stringify(transformedData));

  return transformedData;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    loadCachedUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loadCachedUsers } = usersSlice.actions;
export default usersSlice.reducer;
