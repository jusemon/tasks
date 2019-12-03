import { createStackNavigator } from "react-navigation-stack";
import TasksScreen from "./Tasks";
import { theme } from "../../shared/theme";

export const TasksStack = createStackNavigator({
  Home: TasksScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff',
  }
});

TasksStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default TasksStack;
