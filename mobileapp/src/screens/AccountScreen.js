import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const fetchUserData = async () => {
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");
    setData({
      email: email,
      password: password,
    });
    console.log(email, password);
  };

  useEffect(() => {
    // fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "center",
          }}
        >
          User Email:
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "bold", marginLeft: 20 }}>
          123213
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "center",
          }}
        >
          User Password:
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "bold", marginLeft: 20 }}>
          213213
        </Text>
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
});
