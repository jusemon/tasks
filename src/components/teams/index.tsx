import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import TeamsScreen from "./Teams";
import { theme } from "../../shared/theme";
import { ProfileButton } from "../auth/Profile";

export const TeamsStack = createStackNavigator({
  Home: TeamsScreen
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      title: 'Register',
      headerLeft: () => <ProfileButton navigation={navigation}/>
    }
  }
});

TeamsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default TeamsStack;
