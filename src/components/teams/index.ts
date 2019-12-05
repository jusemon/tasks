import { createStackNavigator } from "react-navigation-stack";

import { theme } from "../../shared/theme";
import TeamsScreen from "./Teams";
import ProfileScreen from "../profile";

export const TeamsStack = createStackNavigator({
  Home: TeamsScreen,
  Profile: ProfileScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff'
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
