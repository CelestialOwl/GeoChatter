import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import AuthForm from "../../components/AuthForm";
import Navlink from "../../components/Navlink";
import { Context } from "../../context/AuthContext";
import AndroidSafeArea from "../../components/SafeArea";

const SigninScreen = ({ navigation }) => {
  const { signin, state, clearErrorMessage } = useContext(Context);
  // useEffect(() => {
  //   navigation.navigate("account");
  // }, []);

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
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
    </SafeAreaView>
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
