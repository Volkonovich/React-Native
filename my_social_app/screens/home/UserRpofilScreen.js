import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../firebase/config";
import { NewsListScreen } from "./NewsListScreen";

export const UserRpofilScreen = () => {
  const dispatch = useDispatch();
  const { userId, userPosts } = useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    getCollection();
  }, []);

  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    // setname(currentUser.displayName);
    dispatch({
      type: "USER_CURRENT",
      payload: {
        userName: currentUser.displayName,
        userId: currentUser.uid,
      },
    });
  };

  const logOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_EXIT" });
  };
  const getCollection = async () => {
    await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => setAllPosts(data.docs.map((doc) => doc.data())));
  };
  console.log("allPosts", allPosts);

  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        title="LogOut"
        onPress={logOut}
        color={"#204051"}
        backgroundColor={"#0779e4"}
      />
      <Text>Hello welcome back!!! </Text>

      <FlatList
        data={allPosts}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => {
          console.log("post", item);
          return (
            <Image
              style={{
                marginTop: 30,
                width: 150,
                height: 100,
                marginBottom: 30,
              }}
              source={{ uri: item.image }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 70,
    justifyContent: "center",
  },
  btnOut: {},
  btn: {
    borderColor: "red",
  },
});
