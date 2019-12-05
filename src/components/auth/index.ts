import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "./Auth";
import RegisterScreen from "./Auth";

export const AuthStack = createStackNavigator({
  Home: AuthScreen,
  Register: RegisterScreen,
}, {
  headerMode: "none"
});

AuthStack.navigationOptions = () => {
  return {
    tabBarVisible: false
  };
};

export default AuthStack;
