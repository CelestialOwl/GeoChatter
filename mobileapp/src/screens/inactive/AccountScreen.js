import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image as ExpoImage } from "expo-image";
import Chatterapi from "../../API/ChatterAPI";
// import * as FileSystem from "expo-file-system";
// import axios from "axios";

const AccountScreen = () => {
  const [image, setImage] = useState(null);
  const [serverImage, setServerImage] = useState(null);

  // const fetchMyImage = async () => {
  //   const unsplashImage = await axios.get(
  //     "https://d8b1-119-155-47-98.ngrok-free.app/uploads/943881125_profile.jpg"
  //   );
  //   try {
  //     console.log("unsplashImage", unsplashImage.data);
  //     setServerImage(unsplashImage.data);
  //     const imageBlob = await unsplashImage.data.blob();
  //     console.log("unsplashBlob", imageBlob);

  //     // setServerImage(response);
  //     // const uri = URL.createObjectURL(response);
  //   } catch (err) {
  //     console.log("Something went wron", err);
  //   }
  //   // setServerImage(userImage.data);
  // };

  useEffect(() => {
    if (image !== null) {
      async function sendData() {
        const formData = new FormData();
        formData.append("image", {
          name: Math.floor(Math.random() * 1000000000) + "_profile",
          uri: image,
          type: "image/jpg",
        });
        const response = await Chatterapi.post("/edit-profile", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("user response from the data", response.data);
      }
      sendData();
    }
  }, [image]);

  // useEffect(() => {
  //   fetchMyImage();
  // }, []);

  // console.log("server omage", serverImage);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 8],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("my image ur", result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <View>
          {
            <ExpoImage
              style={styles.image}
              source={{
                uri: "https://d8b1-119-155-47-98.ngrok-free.app/uploads/104864175_profile.jpg",
              }}
              // placeholder={"blurhash"}
              contentFit="scale-down"
              transition={1000}
            />
          }
        </View>
        <View>
          <ExpoImage
            style={styles.image}
            source={
              "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
            }
            placeholder={"blurhash"}
            contentFit="cover"
            transition={1000}
          />
        </View>
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
