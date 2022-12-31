import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Nice Coochies</Text>
      <Button
        title="Go to Office"
        onPress={() => navigation.navigate("Work")}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "#992",
  },
});
