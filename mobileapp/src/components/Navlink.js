import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {} from "react-native-gesture-handler";
import Spacer from "./Spacer";

const Navlink = ({ navigation, text, routName }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate(routName)}>
        <Spacer>
          <Text>{text}</Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

export default Navlink;

const styles = StyleSheet.create({});
