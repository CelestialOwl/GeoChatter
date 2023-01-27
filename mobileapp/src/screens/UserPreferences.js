import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context } from "../context/AuthContext";
import { Button } from "react-native-elements";

const UserPreferences = ({ navigation }) => {
  const { signout } = useContext(Context);
  return (
    <View>
      <Text>UserPreferences</Text>
      <Button title={"Sign out"} onPress={() => signout()} />
    </View>
  );
};

export default UserPreferences;

const styles = StyleSheet.create({});
