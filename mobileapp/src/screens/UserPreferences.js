import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { Context } from "../context/AuthContext";
import { Button, Input, ListItem, Chip, Slider } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import App from "../../App.scss";
import Sidra from "../assets/sidra.jpg";
import Chatterapi from "../API/ChatterAPI.js";

const UserPreferences = ({ navigation }) => {
  const { signout } = useContext(Context);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [locationRange, setLocationRange] = useState(0.2);

  let emailFromLocalStorage;

  const fetchUserData = async () => {
    const response = await Chatterapi.post("/fetch-profile", {
      email: emailFromLocalStorage,
    });
    setUser(response.data.user.username);
    setEmail(response.data.user.email);
    var aasaasaas;
  };

  const fetchHobbies = async () => {
    const response = await Chatterapi.post("/fetch-hobbies", {
      email: emailFromLocalStorage,
    });
    setHobbies(response.data.hobbies);
  };

  const saveHobby = async (hobby) => {
    const userEmail = await AsyncStorage.getItem("email");
    const response = await Chatterapi.post("/save-hobby", {
      email: userEmail,
      name: hobby.name,
      selected: !hobby.selected,
      id: hobby._id,
    });
    const hobbyIndex = hobbies.findIndex((data) => data._id === hobby._id);
    if (hobbyIndex >= 0) {
      const clonedHobbies = [...hobbies];
      clonedHobbies[hobbyIndex].selected = !hobby.selected;
      setHobbies(clonedHobbies);
    } else {
    }
  };

  const fetchEmailFromLocalStorage = async () => {
    emailFromLocalStorage = await AsyncStorage.getItem("email");
    fetchUserData();
    fetchHobbies();
  };

  useEffect(() => {
    fetchEmailFromLocalStorage();
  }, []);
  return (
    <View>
      <View style={styles.card}>
        <Image source={Sidra} style={App.iconImage} />
        <Text style={App.name}>{"Sarah"}</Text>
      </View>
      <Input value={user} placeholder="Username" />
      <Input value={email} placeholder="Email" />
      <Button title={"Sign out"} onPress={() => signout()} />
      <ScrollView>
        {hobbies
          ? hobbies.map((hobby, index) => (
              <View key={index} onTouchEnd={() => saveHobby(hobby)}>
                <ListItem>
                  <Chip
                    title={hobby.name}
                    type={hobby.selected ? "solid" : "outline"}
                    icon={
                      <FontAwesome
                        style={{ paddingLeft: 7 }}
                        name={hobby.selected ? "close" : "plus"}
                        size={15}
                      />
                    }
                    iconRight
                  />
                </ListItem>
              </View>
            ))
          : null}
      </ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Slider
          value={locationRange}
          thumbTintColor={"#2171ff"}
          step={0.1}
          minimumValue={0}
          maximumValue={1}
          onValueChange={(value) => {
            setLocationRange(value);
          }}
        />
      </View>
      <View>
        <Text>Value: {Math.floor(locationRange * 100)}</Text>
      </View>
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
