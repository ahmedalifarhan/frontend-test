import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./src/redux/store";
import UserList from "./src/components/UserList";
import { loadCachedUsers } from "./src/redux/usersSlice";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUsersFromStorage = async () => {
      const cachedUsers = await AsyncStorage.getItem("users");
      if (cachedUsers) {
        dispatch(loadCachedUsers(JSON.parse(cachedUsers)));
      }
    };

    loadUsersFromStorage();
  }, [dispatch]);

  return <UserList />;
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
