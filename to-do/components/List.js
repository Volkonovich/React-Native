import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { deleteTodo } from "../App";

const list = ({ notes }) => {
  console.log("notes---LIST->>>", notes);

  return (
    <View style={styles.wrapperList}>
      <SafeAreaView>
        <FlatList
          keyExtractor={(item) => item.value}
          data={notes}
          renderItem={({ item }) => (
            <View style={styles.ListCover}>
              <Text
                style={{ ...styles.priority, backgroundColor: item.color }}
              ></Text>
              <Text style={{ ...styles.textList }}>{item.value}</Text>
              <TouchableOpacity
                onPress={() => deleteTodo()}
                activeOpacity={0.5}
                style={styles.BtnDell}
              >
                <Text style={styles.DellTitle}>Dell</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  textList: {
    borderWidth: 1,

    marginBottom: 10,
    width: 100,
    color: "black",
  },

  BtnDell: {
    borderRadius: 10,
    width: "20%",
    backgroundColor: "#698474",
    height: 30,
  },
  DellTitle: {
    ...Platform.select({
      ios: {
        textAlign: "center",
        color: "#f4f4f4",
        fontSize: 20,
      },
      android: {
        color: "grey",
        fontSize: 20,
      },
      default: {
        backgroundColor: "white",
      },
    }),
  },
  wrapperList: {
    height: "80%",
    paddingTop: 50,
    paddingBottom: 50,
  },
  ListCover: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  textList: {
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#698474",
    height: 30,
    width: "60%",
    marginHorizontal: 20,
    marginBottom: 30,
    fontSize: 25,
  },
  priority: {
    borderRadius: 5,
    backgroundColor: "#698474",
    height: 20,
    width: 20,
    // marginHorizontal: 10,
  },
});

export default list;
