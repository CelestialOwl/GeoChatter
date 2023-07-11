import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import React, { useContext, useState } from "react";
import AuthForm from "../../components/AuthForm";
import Navlink from "../../components/Navlink";
import { Context as AuthContext } from "../../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign up for Geo Chatter"
        errorMessage={state.errorMessage}
        onSubmitButtonText="Sign Up"
        onSubmit={signup}
        parentElem={"signup"}
      />
      <Navlink
        navigation={navigation}
        routName="signin"
        text="Already have an account? Sign in instead"
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});
