import { StyleSheet, Text, View } from "react-native";
import AndroidSafeArea from "../components/SafeArea";
import { SafeAreaView } from "react-native";
import React from "react";

const UserProfileScreen = () => {
  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View>
        <Text>UserProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
