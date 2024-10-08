import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image as ExpoImage } from "expo-image";
import Chatterapi from "../../API/ChatterAPI";

const AccountScreen = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image !== null) {
      async function sendData() {
        const userEmail = await AsyncStorage.getItem("email");
        const formData = new FormData();
        formData.append("image", {
          name: Math.floor(Math.random() * 1000000000) + "_profile",
          uri: image,
          type: "image/jpg",
        });
        formData.append("email", userEmail);
        const response = await Chatterapi.post("/edit-profile", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
      }
      sendData();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 8],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Upload" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
  image: {
    height: 200,
    width: 200,
  },
});
