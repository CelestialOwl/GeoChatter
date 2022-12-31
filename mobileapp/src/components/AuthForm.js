import { StyleSheet, View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import React, { useState } from "react";
import Spacer from "./Spacer";

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  onSubmitButtonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        value={email}
        onChangeText={setEmail}
        label="Email"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}> {errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={onSubmitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
});
