import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";

import shortId from "shortid";

import List from "./components/List";

const initialState = {
  notes: [],
  color: [],
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [value, setValue] = useState("");

  const addTask = (color) => {
    setState({
      ...state,
      notes: [...state.notes, { value, color, id: shortId() }],
    });
    setValue("");
  };

  const alertSearch = () => {
    Keyboard.dismiss();
    Alert.alert(
      "Search",
      value,
      [
        {
          text: "Low",
          onPress: () => addTask((state.color = "#116979")),
          style: "cancel",
        },
        { text: "Hight", onPress: () => addTask((state.color = "#2b580c")) },
      ],
      { cancelable: false }
    );
  };
  console.log("id--->", id);

  const deleteTodo = (id) => {
    setState((prev) => {
      return {
        notes: prev.notes.filter((notes) => notes.id !== id),
      };
    });
  };

  console.log("state.notes", state.notes);
  return (
    <View style={styles.container}>
      <View style={styles.hed}>
        <TextInput style={styles.input} onChangeText={setValue} value={value} />
        <TouchableOpacity
          onPress={() => alertSearch()}
          activeOpacity={0.5}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>Send</Text>
        </TouchableOpacity>
      </View>

      <List notes={state.notes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  hed: {
    marginTop: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#698474",
    height: 30,
    width: "60%",
    marginHorizontal: 20,
    color: "#363636",
    fontSize: 25,
  },
  button: {
    borderRadius: 10,
    width: "20%",
    backgroundColor: "#698474",
    height: 30,
    marginHorizontal: 20,
  },
  buttonTitle: {
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
});
