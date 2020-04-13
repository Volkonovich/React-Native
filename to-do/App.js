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
    if (value.length) {
      setState({
        ...state,
        notes: [{ value, color, id: shortId() }, ...state.notes],
      });
      setValue("");
    }
  };

  const alertSearch = () => {
    Keyboard.dismiss();
    if (value.length) {
      Alert.alert(
        "Priority",
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
    }
  };

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
      <View>
        <Text style={styles.Title}>My todo list</Text>
      </View>

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

      <List notes={state.notes} deleteTodo={deleteTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  Title: {
    marginTop: 80,
    width: "100%",
    color: "#698474",
    fontSize: 40,
    fontWeight: "700",
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
