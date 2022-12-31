import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import AuthForm from "../components/AuthForm";
import Navlink from "../components/Navlink";
import { Context } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const { signin, state, clearErrorMessage } = useContext(Context);
  console.log(state, "the state");

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign in to your accout"
        errorMessage={state.errorMessage}
        onSubmitButtonText="Sign In"
        onSubmit={signin}
      />
      <Navlink
        navigation={navigation}
        text="Don't have an account? Sign up instead"
        routName="signup"
      />
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});
