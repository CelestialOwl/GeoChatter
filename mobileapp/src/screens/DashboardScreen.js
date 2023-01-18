import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import AndroidSafeArea from "../components/SafeArea";
import { SafeAreaView } from "react-native";
import { Button, Input, ListItem } from "react-native-elements";
import { io } from "socket.io-client";

const DashboardScreen = () => {
  const [messages, setMessages] = useState([]);
  const [field, setField] = useState("");

  const socket = io("https://0792-182-185-180-220.in.ngrok.io");

  useEffect(() => {
    socket.emit("joinRoom", { username: "Hassan", room: "Web" });
    socket.on("connect", () => {
      console.log("connected");
    });
    // socket.io.on("error", (err) => {
    //   console.log(err);
    // });
    socket.on("roomUsers", ({ room, users }) => {
      console.log(users, room);
    });
    socket.on("message", (msg) => {
      console.log("my msg", msg);
      setMessages((prevState) => [
        ...prevState,
        { id: messages.length + 1, text: msg.text },
      ]);
    });
  }, []);
  function onMessageSubmit(e) {
    setField("");
    socket.emit("chatMessage", field);
  }
  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
          }}
        >
          <ScrollView>
            {messages.map((l, i) => (
              <ListItem key={i}>
                <ListItem.Content>
                  <ListItem.Title>{l.text}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        </View>
        <View style={styles.textField}>
          <Input value={field} onChangeText={setField} />
          <Button
            title="Send"
            onPress={onMessageSubmit}
            style={styles.SubmitButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  textField: {
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    paddingBottom: 50,
    display: "flex",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
