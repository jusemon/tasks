import { createStackNavigator } from "react-navigation-stack";

import { theme } from "../../shared/theme";
import ProjectsScreen from "./Projects";
import ProfileScreen from "../profile";
import ProjectForm from "./ProjectForm";

export const ProjectsStack = createStackNavigator({
  Home: ProjectsScreen,
  ProjectForm: ProjectForm,
  Profile: ProfileScreen
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
