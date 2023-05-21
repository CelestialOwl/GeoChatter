import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatterAPI from "../API/ChatterAPI";
// import { navigate } from "../NavigationRef";
import createDataContext from "./createDataContext";
import * as RootNavigation from "../NavigationRef";
const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    RootNavigation.navigate("account");
  } else {
    RootNavigation.navigate("signin");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ email, password, username }) => {
    try {
      const response = await ChatterAPI.post("/signup", {
        email,
        password,
        username,
      });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data);
      await AsyncStorage.setItem("email", email);
      dispatch({ type: "signin", payload: response.data });
      RootNavigation.navigate("account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with signup",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await ChatterAPI.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("email", email);
      dispatch({ type: "signin", payload: response.data.token });
      RootNavigation.navigate("account");
      // navigate("account");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.clear();
  dispatch({ type: "signout" });
  RootNavigation.navigate("signin");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, tryLocalSignIn, signup, clearErrorMessage, signout },
  { token: null, errorMessage: "" }
);
