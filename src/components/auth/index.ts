import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "./Auth";
import RegisterScreen from "./Auth";
import { theme } from "../../shared/theme";
import Profile from "./Profile";

export const AuthStack = createStackNavigator({
  Home: AuthScreen,
  Register: RegisterScreen,
  Profile: Profile
}, {
  headerMode: "none"
});

AuthStack.navigationOptions = () => {
  return {
    tabBarVisible: false
  };
};

export default AuthStack;
