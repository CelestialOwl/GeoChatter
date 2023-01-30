import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import AndroidsafeArea from "../components/SafeArea";
import { Avatar, Text, Card, Image as EImage } from "react-native-elements";
import staticImage from "../assets/sarah.jpg";
import Sidra from "../assets/sidra.jpg";
const ChatListScreen = () => {
  return (
    <SafeAreaView style={AndroidsafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={Sidra} style={styles.iconImage} />
          <Text style={styles.name}>{"Sarah"}</Text>
        </View>
        <Text>ChatListScreen</Text>
        <View style={styles.inner}>
          <View
            style={{
              backgroundColor: "yellow",
              width: "60%",
              height: "100%",
              zIndex: 3,
            }}
          ></View>
          <View
            style={{
              backgroundColor: "red",
              width: "50%",
              height: "100%",
              zIndex: 100,
            }}
          ></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  name: {
    paddingVertical: 12,
    marginLeft: 7,
    fontSize: 20,
  },
  inner: {
    flex: 0.2,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  ImageBackground: {
    flex: 0.8,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
  },
});
