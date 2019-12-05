import { createStackNavigator } from "react-navigation-stack";

import { theme } from "../../shared/theme";
import TasksScreen from "./Tasks";
import ProfileScreen from "../profile";
import TaskForm from "./TaskForm";

export const TasksStack = createStackNavigator({
  Home: TasksScreen,
  TaskForm: TaskForm,
  Profile: ProfileScreen
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
    tabBarVisible
  };
};

export default TasksStack;
