import React from 'react';
import { createAppContainer, createSwitchNavigator, NavigationContainerComponent } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

import './src/shared/firebase/timeout';
import { theme } from './src/shared/theme';
import TeamsStack from './src/components/teams';
import ProjectsStack from './src/components/projects';
import TasksStack from './src/components/tasks';
import AuthStack from './src/components/auth';
import AuthLoadingScreen from './src/components/auth/AuthLoading';
import firebaseApp from './src/shared/firebase';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { NavigationPropBase } from './src/shared/base/types';

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

export default class App extends React.Component {
  navigator: NavigationContainerComponent;
  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user)=> {
      if (user == null) {
        console.log(this.navigator.props.navigation.state);
        // this.props.navigation.navigate('Auth');
      }
    })
  }
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer ref={nav => {
          this.navigator = nav;
        }} />
      </PaperProvider>
    );
  }
}
