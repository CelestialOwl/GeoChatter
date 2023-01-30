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

const socket = io("https://c395-182-185-213-143.in.ngrok.io");
const DashboardScreen = () => {
  const [messages, setMessages] = useState([]);
  const [field, setField] = useState("");

  const ListRef = useRef();

  async function fetchMessagesHistory() {
    const response = await ChatterAPI.get("/fetch-messages");
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

  useEffect(() => {
    if (ListRef) {
      ListRef.current.scrollToEnd({ animated: false });
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem("email");
      socket.emit("joinRoom", {
        username: "Hassan",
        room: "Web",
        email: email,
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
    fetchMessagesHistory();
    return () => console.log("stoped");
  }, [socket]);

  function onMessageSubmit(e) {
    console.log(socket.id);
    setField("");
    socket.emit("chatMessage", field);
  }
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
            <Text style={styles.name}>{"Sarah"}</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <ScrollView ref={ListRef}>
              {messages.map((l, i) => (
                <ListItem key={i}>
                  <View style={{ flex: 1 }}>
                    <View>
                      <Avatar
                        rounded
                        source={{
                          uri: "https://randomuser.me/api/portraits/men/36.jpg",
                        }}
                      />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text>{l.time}</Text>
                      <ListItem.Content>
                        <ListItem.Title style={{ marginLeft: 10 }}>
                          {l.text}
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
