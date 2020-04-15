import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export const UserPostScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>UserPostScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
