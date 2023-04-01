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
import { FontAwesome } from "@expo/vector-icons";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import ChatListScreen from "./src/screens/ChatListScreen";
import { useFonts } from "expo-font";

const DrawerUserPreferences = createDrawerNavigator();
const TabDashboard = createBottomTabNavigator();
const TabUserProfile = createBottomTabNavigator();

const StackNew = createStackNavigator();

function TabDashboardScreen() {
  return (
    <TabDashboard.Navigator
      initialRouteName="chats"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "signal" : "gear";
          }
          return <FontAwesome name={iconName} size={25} />;
        },
      })}
    >
      <TabUserProfile.Screen name="chats" component={ChatListScreen} />
      <TabDashboard.Screen name="Dashboard" component={DashboardScreen} />
      {/* <TabUserProfile.Screen name="profile" component={UserProfileScreen} /> */}
      <TabUserProfile.Screen
        name="preferences"
        component={DrawserUserPreferencesScreen}
      />
    </TabDashboard.Navigator>
  );
}
function DrawserUserPreferencesScreen() {
  return (
    <DrawerUserPreferences.Navigator initialRouteName="preference">
      <DrawerUserPreferences.Screen
        name="preference"
        component={UserPreferences}
      />
      <DrawerUserPreferences.Screen
        name="accountsetting"
        component={AccountScreen}
      />
    </DrawerUserPreferences.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("./src/assets/fonts/Montserrat-Regular.otf"),
    MontserratLight: require("./src/assets/fonts/Montserrat-Light.otf"),
    MontserratSemiBold: require("./src/assets/fonts/Montserrat-SemiBold.otf"),
    MontserratBold: require("./src/assets/fonts/Montserrat-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <StackNew.Navigator
          initialRouteName="localsignin"
          screenOptions={{ headerShown: false }}
        >
          <StackNew.Screen name="localsignin" component={ResolveAuthScreen} />
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
