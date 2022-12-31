import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const WorkScreen = ({ navigation }) => {
  // const { itemId, other } = route.params;
  return (
    <View>
      <Text style={styles.text}>Working...</Text>
      {/* <Text style={styles.text}>{JSON.stringify(itemId)}</Text>
      <Text style={styles.text}>{other}</Text> */}
      <Button title="Go back" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default WorkScreen;

const styles = StyleSheet.create({
  text: {
    color: "purple",
    fontSize: 32,
  },
});
