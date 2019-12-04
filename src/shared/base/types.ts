import { NavigationTabProp } from "react-navigation-tabs";
import { NavigationStackProp } from "react-navigation-stack";
import { Theme } from "react-native-paper";

interface NavigationPropBase {
  navigation: NavigationTabProp | NavigationStackProp
}

interface ThemePropBase {
  theme: Theme
}

export { NavigationPropBase, ThemePropBase };
