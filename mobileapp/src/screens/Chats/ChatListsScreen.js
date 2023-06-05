import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AndroidsafeArea from "../../components/SafeArea";
import { Avatar, Image, Text } from "react-native-elements";
import ChatterApi from "../../API/ChatterAPI.js";
import Notification from "../../components/Notification";
import { url } from "../../API/ChatterAPI.js";

const ChatListScreen = ({ navigation }) => {
  const [userList, setUserList] = useState(null);

  const fetchUserList = async () => {
    const response = await ChatterApi.get("/users-list");
    setUserList(response.data.userList);
  };

  const startChat = async (recipient) => {
    const response = await ChatterApi.post("/create-room", {
      recipient: recipient,
    });
    if (response.data.status === true) {
      navigation.navigate("Dashboard", {
        roomId: response.data.chatId,
        userData: response.data.user,
      });
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <SafeAreaView style={AndroidsafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        <Text h2 style={{ marginLeft: 20 }}>
          All Chats
        </Text>
        {userList !== null
          ? userList.map((user) => {
              return (
                <View
                  onTouchEnd={() => startChat(user)}
                  key={user._id}
                  style={styles.card}
                >
                  {user.img !== undefined ? (
                    <Image
                      source={{ uri: `${url}/${user.img}` }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                      }}
                    />
                  ) : (
                    <Avatar
                      containerStyle={{
                        borderColor: "black",
                        borderWidth: 2,
                      }}
                      rounded
                      title={"SA"}
                      titleStyle={{ color: "black", fontSize: 20 }}
                      onPress={() => console.log("clicked")}
                      onLongPress={() => console.log("long")}
                    />
                  )}
                  <Text style={styles.name}>{user.username}</Text>
                </View>
              );
            })
          : null}
        <Notification />
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  name: {
    marginLeft: 12,
    fontSize: 22,
    marginTop: 3,
  },
  container: {
    flex: 1,
  },
  ImageBackground: {
    flex: 0.8,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    marginVertical: 10,
  },
});
