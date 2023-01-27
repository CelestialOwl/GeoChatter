import { StyleSheet, Text, View, Platform } from "react-native";
import AndroidSafeArea from "../components/SafeArea";
import { SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Chatterapi from "../API/ChatterAPI";

const UserProfileScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const saveLocation = async (location) => {
    const email = await AsyncStorage.getItem("email");
    console.log(email);

    const response = await Chatterapi.post("/save-location", {
      location,
      email,
    });
    console.log(response.data);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      saveLocation(location);
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
        <MapView
          initialRegion={{
            latitude: 31.47,
            longitude: 74.34,
            latitudeDelta: 0.09,
            longitudeDelta: 0.05,
          }}
          style={styles.map}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "50%",
  },
});
