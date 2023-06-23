import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatterApi from "../API/ChatterAPI.js";
import React, { useState, useEffect } from "react";

const useFetchUser = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    img: "",
  });

  async function fetchUserProfile1() {
    const email = await AsyncStorage.getItem("email");
    const { data } = await ChatterApi.post("/fetch-profile", {
      email: email,
    });
    setUserData({
      email: data.user.email,
      username: data.user.username,
      img: data.user.img,
    });
  }

  useEffect(() => {
    // fetchUserData();

    fetchUserProfile1();
  }, []);

  return userData;
};

export default useFetchUser;
