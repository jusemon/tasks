import { createStackNavigator } from "react-navigation-stack";
import TeamsScreen from "./Teams";
import { theme } from "../../shared/theme";

export const TeamsStack = createStackNavigator({
  Home: TeamsScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff',
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
