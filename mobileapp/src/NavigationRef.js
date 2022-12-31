// import { NavigationAction } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
// let navigator;

// export const setNavigator = (nav) => {
//   navigator = nav;
// };

// export const navigate = (routeName) => {
//   navigator.dispatch(NavigationAction.navigate({ routeName, params }));
// };
