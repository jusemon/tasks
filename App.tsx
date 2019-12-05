import React from 'react';
import { createAppContainer, createSwitchNavigator, NavigationContainerComponent, NavigationActions } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

import './src/shared/firebase/timeout';
import { theme } from './src/shared/theme';
import TeamsStack from './src/components/teams';
import ProjectsStack from './src/components/projects';
import TasksStack from './src/components/tasks';
import AuthStack from './src/components/auth';
import AuthLoadingScreen from './src/components/auth/AuthLoading';
import firebaseApp from './src/shared/firebase';
import { getActiveRouteName } from './src/shared/navigation';

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
            return <FontAwesome5 name='people-carry' size={20} color={tintColor} />
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

export default class App extends React.Component {
  navigator: NavigationContainerComponent;
  currentRouteName: string;
  unsubscribe: firebase.Unsubscribe;
  componentWillMount() {
    this.unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user == null) {
        this.navigator.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
      } else {
        if (this.currentRouteName.indexOf('Auth/') > -1) {
          this.navigator.dispatch(NavigationActions.navigate({ routeName: 'Teams' }));
        }
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer
          onNavigationStateChange={(prevState, currentState, action) => {
            this.currentRouteName = getActiveRouteName(currentState);
          }}
          ref={nav => {
            this.navigator = nav;
          }} />
      </PaperProvider>
    );
  }
}
