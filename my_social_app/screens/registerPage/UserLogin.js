import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Keyboard,
  latform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { auth } from "../../firebase/config";

const initialState = {
  email: "",
  password: "",
};

export const UserLogin = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  const login = async () => {
    const { email, password } = state;
    console.log("email", email);
    console.log("password", password);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email..."
            value={state.email}
            onChangeText={(value) => setState({ ...state, email: value })}
          />
          <TextInput
            style={styles.input}
            type="password"
            secureTextEntry={true}
            placeholder="Password..."
            onChangeText={(value) => setState({ ...state, password: value })}
            value={state.password}
          />
          <TouchableOpacity
            onPress={login}
            activeOpacity={0.5}
            style={styles.button}
          >
            <Text style={styles.buttonTitle}>Ok</Text>
          </TouchableOpacity>

          <Button
            title="Go to Register->"
            onPress={() => navigation.navigate("Register")}
            color={"#3b6978"}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    margin: 20,
    borderRadius: 10,
    borderColor: "#84a9ac",
    height: 40,
    width: 300,
    marginHorizontal: 20,
    color: "#204051",
    fontSize: 15,
    paddingLeft: 25,
  },
  title: {
    color: "#3b6978",
    fontSize: 30,
    fontWeight: "400",
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    borderColor: "#3b6978",
    height: 35,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  buttonTitle: {
    paddingTop: 3,
    textAlign: "center",
    fontSize: 20,
    color: "#204051",
  },
});
