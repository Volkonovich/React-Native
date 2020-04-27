import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { ListDrawing } from "../../component/ListDrawing";
import { useSelector } from "react-redux";
import { auth, firestore } from "../../firebase/config";

export const UserRpofilScreen = ({ navigation }) => {
  const [curetUserPost, setcuretUserPost] = useState([]);

  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    getCurrentUserPost();
  }, [userId]);

  const getCurrentUserPost = async () => {
    await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setcuretUserPost(data.docs.map((doc) => doc.data()))
      );
  };
  const logOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_EXIT" });
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity
        style={{
          marginTop: 100,
          borderColor: "red",
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={logOut}
      >
        <Text>SignOut</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 200 }}>
        <ListDrawing nav={navigation} data={curetUserPost} />
      </View>
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
