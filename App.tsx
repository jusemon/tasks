import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from './src/shared/theme';
import TeamsStack from './src/components/teams';
import ProjectsStack from './src/components/projects';
import TasksStack from './src/components/tasks';
import AuthStack from './src/components/auth';
import AuthLoadingScreen from './src/components/auth/AuthLoading';

const AppBottomTab = createMaterialBottomTabNavigator(
  {
    Teams: TeamsStack,
    Projects: ProjectsStack,
    Tasks: TasksStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = MaterialIcons;
        switch (routeName) {
          case 'Teams':
            return <IconComponent name='people' size={25} color={tintColor} />
          case 'Projects':
            return <IconComponent name='assessment' size={25} color={tintColor} />
          case 'Tasks':
            return <IconComponent name='assignment' size={25} color={tintColor} />
          default:
            return <IconComponent name='error' size={25} color={tintColor} />
        }
      }
    })
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppBottomTab,
    Auth: AuthStack
  }, {
    initialRouteName: 'AuthLoading',
  })
);

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppContainer />
    </PaperProvider>
  );
}
