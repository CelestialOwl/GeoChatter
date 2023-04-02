import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import AndroidSafeArea from "../components/SafeArea";
import { SafeAreaView } from "react-native";
import { Button, Input, ListItem, Avatar } from "react-native-elements";
import { io } from "socket.io-client";
import ChatterAPI from "../API/ChatterAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import Sidra from "../assets/sidra.jpg";
import { url } from "../API/ChatterAPI";

const socket = io(url);
let USER_EMAIL;

const DashboardScreen = ({ route, navigation }) => {
  const { roomId, userData } = route.params;
  const [messages, setMessages] = useState([]);
  const [field, setField] = useState("");

  const ListRef = useRef();

  async function fetchMessagesHistory() {
    if (roomId) {
      const formData = new FormData();
      formData.append("roomId", roomId);
      const response = await ChatterAPI.post("/fetch-messages", { roomId });
      const updatedArray = response.data.map((data) => {
        return {
          id: data._id,
          text: data.text,
          username: data.username,
          time: data.time,
        };
      });
      setMessages(updatedArray);
    }
  }

  useEffect(() => {
    if (ListRef) {
      setTimeout(() => {
        ListRef.current.scrollToEnd({ animated: false });
      }, 200);
    }
  }, [messages, ListRef]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setMessages([]);
      fetchMessagesHistory();
    });
    return unsubscribe;
  }, [roomId]);

  useEffect(() => {
    (async () => {
      USER_EMAIL = await AsyncStorage.getItem("email");
      socket.emit("joinRoom", {
        username: "Hassan",
        room: "Web",
        email: USER_EMAIL,
      });
    })();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.io.on("error", (err) => {
      console.log(err);
    });
    socket.on("roomUsers", ({ room, users }) => {
      // console.log(users, room);
    });
    socket.on("message", (msg) => {
      setMessages((prevState) => [
        ...prevState,
        { id: msg.userId, text: msg.text, time: msg.time },
      ]);
    });
    return () => console.log("stoped");
  }, [socket]);

  function onMessageSubmit(e) {
    console.log(socket.id);
    setField("");
    socket.emit("chatMessage", {
      field: field,
      chatRoomId: roomId,
      email: USER_EMAIL,
    });
  }
  // const mapArrayToObjects = messages.map();
  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"height"}
        keyboardVerticalOffset={50}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={Sidra} style={styles.iconImage} />
            <Text style={styles.name}>{userData.username}</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <ScrollView ref={ListRef}>
              {messages.map((l, i) => (
                <ListItem
                  style={{
                    borderColor: "black",
                    borderWidth: 2,
                    borderStyle: "solid",
                  }}
                  key={i}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <View>
                      <Text
                        style={{ position: "absolute", right: 10, bottom: 0 }}
                      >
                        {l.time}
                      </Text>
                      <Avatar
                        rounded
                        source={{
                          uri: "https://randomuser.me/api/portraits/men/36.jpg",
                        }}
                      />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <ListItem.Content>
                        <ListItem.Title
                          style={{ position: "absolute", left: 45, top: -40 }}
                        >
                          <View style={{ display: "flex" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                              {l.username}
                            </Text>
                            <Text>{l.text}</Text>
                          </View>
                        </ListItem.Title>
                      </ListItem.Content>
                    </View>
                  </View>
                </ListItem>
              ))}
            </ScrollView>
          </View>
          <View style={styles.textField}>
            <View style={styles.input}>
              <Input
                onFocus={() => ListRef.current.scrollToEnd({ animated: false })}
                value={field}
                onChangeText={setField}
              />
            </View>
            <FontAwesome name="send" size={25} onPress={onMessageSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  textField: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    flex: 0.95,
    width: 100,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    // marginBottom: 50,
    paddingBottom: 10,
  },
  name: {
    paddingVertical: 12,
    marginLeft: 7,
    fontSize: 20,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
});
