import { StyleSheet, View, ScrollView, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import AndroidSafeArea from "../components/SafeArea";
import { SafeAreaView } from "react-native";
import { Button, Input, ListItem } from "react-native-elements";
import { io } from "socket.io-client";
import ChatterAPI from "../API/ChatterAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";

const socket = io("https://afdd-182-178-154-206.in.ngrok.io");
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
    // async function kappa() {
    //   await AsyncStorage.removeItem("token");
    // }
    // kappa();
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
      console.log(msg);
      setMessages((prevState) => [
        ...prevState,
        { id: messages.length + 1, text: msg.text, time: msg.time },
      ]);
    });
    fetchMessagesHistory();
    return () => console.log("stoped");
  }, [socket]);
  function onMessageSubmit(e) {
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
          <View
            style={{
              flex: 1,
            }}
          >
            <ScrollView ref={ListRef}>
              {messages.map((l, i) => (
                <ListItem key={i}>
                  <Text>{l.time}</Text>
                  <ListItem.Content>
                    <ListItem.Title>{l.text}</ListItem.Title>
                  </ListItem.Content>
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
});
