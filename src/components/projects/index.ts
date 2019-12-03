import ProjectsScreen from "./Projects";
import { createStackNavigator } from "react-navigation-stack";
import { theme } from "../../shared/theme";

export const ProjectsStack = createStackNavigator({
  Home: ProjectsScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff',
  }
});

ProjectsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default ProjectsStack;
