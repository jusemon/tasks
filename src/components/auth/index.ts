import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "./Auth";
import RegisterScreen from "./Auth";
import { theme } from "../../shared/theme";

export const AuthStack = createStackNavigator({
  Home: AuthScreen,
  Register: RegisterScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff',
  }
});

AuthStack.navigationOptions = () => {
  return {
    tabBarVisible: false
  };
};

export default AuthStack;
