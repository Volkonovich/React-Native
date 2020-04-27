import React from "react";
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { firestore } from "../firebase/config";

export const ListDrawing = ({ data, nav }) => {
  const getCurrentUserPost = async (id) => {
    const data = await firestore.collection("posts").doc(id).get();
    console.log("data.data", data.data().likes);
    await firestore
      .collection("posts")
      .doc(id)
      .update({
        likes: Number(data.data().likes) + 1,
      });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, indx) => indx.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onLongPress={() => nav.navigate("Map", { info: item })}
            style={styles.wrapper}
          >
            <View style={styles.infoWrapper}>
              <Image style={styles.avatar} source={{ uri: item.avatar }} />
              <Text style={styles.userName}>{item.userName}</Text>
            </View>
            <View>
              <Image style={styles.postImg} source={{ uri: item.image }} />
              <TouchableOpacity onPress={() => getCurrentUserPost(item.id)}>
                <ImageBackground
                  source={{
                    uri:
                      "http://s1.iconbird.com/ico/1112/Onebit/w48h481351854539onebit43.png",
                  }}
                  style={styles.likes}
                >
                  <Text style={styles.TextLike}>{item.likes}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  wrapper: {
    // borderWidth: 2,
    width: 380,
    borderRadius: 10,
    height: 300,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  infoWrapper: {
    justifyContent: "space-between",
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  avatar: {
    borderWidth: 2,
    width: 35,
    height: 35,
    borderColor: "#698474",
    borderRadius: 20,
  },
  postImg: {
    marginHorizontal: 10,
    // borderWidth: 2,
    width: 350,
    height: 200,
    borderRadius: 10,
  },
  likes: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  TextLike: {
    marginTop: 10,
    marginLeft: 40,
    width: 35,
    height: 35,
    fontSize: 15,
  },
  userName: {
    marginTop: 10,
    marginLeft: 10,
    width: 50,
    height: 20,
    fontSize: 20,
  },
});
