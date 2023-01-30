import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Context } from "../context/AuthContext";
import { Button, Input } from "react-native-elements";
import App from "../../App.scss";
import Sidra from "../assets/sidra.jpg";

const UserPreferences = ({ navigation }) => {
  const { signout } = useContext(Context);
  return (
    <View>
      <View style={styles.card}>
        <Image source={Sidra} style={App.iconImage} />
        <Text style={App.name}>{"Sarah"}</Text>
      </View>
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
      <Button title={"Sign out"} onPress={() => signout()} />
    </View>
  );
};

export default UserPreferences;

const styles = StyleSheet.create({
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: "cover",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
  },
});
