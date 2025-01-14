import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

const UserCard = ({ name, email, address }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
};

export default memo(UserCard);

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#777",
  },
});
