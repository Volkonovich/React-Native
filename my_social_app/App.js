import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import { NewsListScreen } from "./screens/home/NewsListScreen";
import { UserRpofilScreen } from "./screens/home/UserRpofilScreen";
import { UserPostScreen } from "./screens/home/UserPostScreen";
import { UserLogin } from "./screens/registerPage/UserLogin";
import { UserRegistration } from "./screens/registerPage/UserRegistration";
import { store } from "./redux/store";
import { auth } from "./firebase/config";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

let content = (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
    }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="ios-person"
            size={focused ? 40 : 35}
            color={"#204051"}
          />
        ),
      }}
      name="UserRpofil"
      component={UserRpofilScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="md-list-box"
            size={focused ? 40 : 35}
            color={"#204051"}
          />
        ),
      }}
      name="NewsList"
      component={NewsListScreen}
    />

    <Tab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="ios-paper-plane"
            size={focused ? 40 : 35}
            color={"#204051"}
          />
        ),
      }}
      name="UserPost"
      component={UserPostScreen}
    />
  </Tab.Navigator>
);

const useRoute = (isAuth) => {
  if (isAuth) {
    return content;
  }
  return (form = (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={UserLogin}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={UserRegistration}
      />
    </Stack.Navigator>
  ));
};

export default function App() {
  const [isAuth, setIsAuth] = useState(null);
  console.log("isAuth-->>>", isAuth);
  auth.onAuthStateChanged((user) => {
    setIsAuth(user);
  });
  const routing = useRoute(isAuth);
  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
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
