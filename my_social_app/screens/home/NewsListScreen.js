import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen } from "../mainScreen/MapScreen";
import { PostsScreen } from "../mainScreen/PostsScreen";

const RootMain = createStackNavigator();

export const NewsListScree = () => (
  <RootMain.Navigator>
    <RootMain.Screen
      options={{
        headerShown: false,
      }}
      name="Posts"
      component={PostsScreen}
    />
    <RootMain.Screen
      options={{ headerShown: false }}
      name="Map"
      component={MapScreen}
    />
  </RootMain.Navigator>
);
