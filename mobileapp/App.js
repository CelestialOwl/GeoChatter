import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AccountScreen from "./src/screens/AccountScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import UserPreferences from "./src/screens/UserPreferences";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from "./src/NavigationRef";
import "react-native-gesture-handler";

const DrawerUserPreferences = createDrawerNavigator();
const TabDashboard = createBottomTabNavigator();
const TabUserProfile = createBottomTabNavigator();

const StackNew = createStackNavigator();

function TabDashboardScreen() {
  return (
    <TabDashboard.Navigator>
      <TabDashboard.Screen name="Dashboard" component={DashboardScreen} />
      <TabUserProfile.Screen name="profile" component={UserProfileScreen} />
    </TabDashboard.Navigator>
  );
}
function DrawserUserPreferencesScreen() {
  return (
    <DrawerUserPreferences.Navigator>
      <DrawerUserPreferences.Screen name="preferences" />
    </DrawerUserPreferences.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <StackNew.Navigator screenOptions={{ headerShown: false }}>
          <StackNew.Screen name="signin" component={SigninScreen} />
          <StackNew.Screen name="signup" component={SignupScreen} />
          <StackNew.Screen name="account" component={TabDashboardScreen} />
        </StackNew.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "center",
  },
});
