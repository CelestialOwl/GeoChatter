import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatterAPI from "../API/ChatterAPI";
// import { navigate } from "../NavigationRef";
import createDataContext from "./createDataContext";
import Navigationref from "../NavigationRef";
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
  const token = AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("account");
  }
  // navigate("login")
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await ChatterAPI.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data);
      dispatch({ type: "signin", payload: response.data });
      navigate("account");
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
      dispatch({ type: "signin", payload: response.data.token });
      RootNavigation.navigate("account");
      // navigate("account");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("signin");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, tryLocalSignIn, signup, clearErrorMessage, signout },
  { token: null, errorMessage: "" }
);
