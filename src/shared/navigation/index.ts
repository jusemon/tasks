import { NavigationState } from "react-navigation";

export function getActiveRouteName(navigationState: NavigationState, parent?: string) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    const parentName = parent ? `${parent}/${route.routeName}` : route.routeName;
    return getActiveRouteName(route, parentName);
  }
  return parent ? `${parent}/${route.routeName}` : route.routeName;
}
