import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserDataLocally = async (img, username) => {
  await AsyncStorage.setItem("img", img);
  await AsyncStorage.setItem("username", username);
};
