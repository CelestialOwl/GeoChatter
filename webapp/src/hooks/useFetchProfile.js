import React, { useState } from "react";
import Api from "../API/ChatterAPI";

const useFetchProfile = (update = false) => {
  const [userProfile, setUserProfile] = useState();
  const email = localStorage.getItem("email");
  const formData = { email: email };
  const fetchRemoteProfile = async () => {
    try {
      const response = await Api.post("/fetch-profile", formData);
      setUserProfile(response.data.user);
      return response.data.user;
    } catch (err) {
      console.log(err);
    }
  };

  if (!update && userProfile) {
    return userProfile;
  } else {
    fetchRemoteProfile();
  }
};

export default useFetchProfile;
