import { NavigationTabProp } from "react-navigation-tabs";
import { Theme } from "react-native-paper";

interface NavigationPropBase {
  navigation: NavigationTabProp
}

interface ThemePropBase {
  theme: Theme
}

export { NavigationPropBase, ThemePropBase };
