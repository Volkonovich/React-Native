import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [textValue, setTextValue] = useState("");
  return (
    <View style={styles.container}>
      <TextInput placeholder=".....dsdvfsdv" onChangeText={setTextValue} />
      <Text>Home___Worc</Text>
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate("Profile", { nickName: textValue })}
      />
    </View>
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.nickName}</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitle: "My screen",
            headerStyle: {
              backgroundColor: Platform.OS === "ios" ? "red" : "white",
            },
            headerTintColor: Platform.OS === "ios" ? "white" : "black",
            headerLeft: () => (
              <Ionicons
                name="ios-basketball"
                size={32}
                color="green"
                onPress={() => Alert.alert("basket")}
              />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
