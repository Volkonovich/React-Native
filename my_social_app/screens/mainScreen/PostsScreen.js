import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../firebase/config";
import { ListDrawing } from "../../component/ListDrawing";

export const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const { userId, userPosts } = useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    dispatch({
      type: "USER_CURRENT",
      payload: {
        userName: currentUser.displayName,
        userId: currentUser.uid,
      },
    });
    await firestore.collection("posts").onSnapshot((data) =>
      setAllPosts(
        data.docs.map((doc) => {
          console.log(doc.id);
          return { ...doc.data(), id: doc.id };
        })
      )
    );
  };

  console.log("allPosts", allPosts);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <ListDrawing nav={navigation} data={allPosts} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e4cc",
    alignItems: "center",

    justifyContent: "center",
  },
});
