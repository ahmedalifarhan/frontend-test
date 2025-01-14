import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/usersSlice";
import UserCard from "./UserCard";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  // States for search and pagination
  const [searchText, setSearchText] = useState("");
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle search functionality
  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setVisibleUsers(filteredUsers.slice(0, currentPage * usersPerPage));
  }, [searchText, users, currentPage]);

  // Load more users on button click
  const loadMoreUsers = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return <Text style={styles.center}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.center}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* User List */}
      <FlatList
        data={visibleUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            name={item.name}
            email={item.email}
            address={item.address}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          visibleUsers.length <
          users.filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
          ).length ? (
            <TouchableOpacity
              onPress={loadMoreUsers}
              style={styles.loadMoreButton}
            >
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  loadMoreButton: {
    padding: 10,
    // backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  loadMoreText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});

export default UserList;
