import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../../firebase/config";

const initialState = {
  email: "",
  password: "",
  nicName: "",
};

export const UserRegistration = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [message, setmessage] = useState(null);

  const currentState = () => {
    console.log("state", state);
    Alert.alert(JSON.stringify(state));
    setState(initialState);
  };
  useEffect(() => {
    currentUser();
  }, []);
  const currentUser = async () => {
    const currentUser = await db.auth().currentUser;
    console.log("currentUser", currentUser);
  };
  const addIfo = async () => {
    const updateUser = await auth.currentUser.updateProfile({
      displayName: "Denis",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png",
    });
    console.log("updateUser", updateUser);
  };

  const addUser = async () => {
    const { email, password, nicName } = state;
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("user", user);
      await user.user.updateProfile({
        displayName: nicName,
      });
    } catch (error) {
      console.log(error);
      setmessage(error.message);
    }
  };

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Registered new User</Text>

          <TextInput
            style={styles.input}
            type="text"
            placeholder="NicName.."
            value={state.nicName}
            onChangeText={(value) => setState({ ...state, nicName: value })}
          />
          <TextInput
            style={styles.input}
            type="text"
            placeholder="Email..."
            value={state.email}
            onChangeText={(value) => setState({ ...state, email: value })}
          />
          <TextInput
            style={styles.input}
            type="password"
            secureTextEntry={true}
            placeholder="Password..."
            value={state.password}
            onChangeText={(value) => setState({ ...state, password: value })}
          />
          {message && <Text style={styles.messageAlert}>{message}</Text>}
          <TouchableOpacity
            onPress={addUser}
            activeOpacity={0.5}
            style={styles.button}
          >
            <Text style={styles.buttonTitle}>Go</Text>
          </TouchableOpacity>
          <Button
            title="<-Go to Login"
            onPress={() => navigation.navigate("Login")}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    margin: 20,
    borderRadius: 10,
    borderColor: "#84a9ac",
    height: 40,
    width: "70%",
    marginHorizontal: 20,
    color: "#204051",
    fontSize: 15,
    paddingLeft: 25,
  },
  title: {
    width: "100%",
    color: "#3b6978",
    fontSize: 30,
    fontWeight: "400",
    textAlign: "center",
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    width: "15%",
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
  messageAlert: {
    color: "red",
    paddingBottom: 10,
  },
});
