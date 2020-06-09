import React, { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import SafeArea from "../components/SafeArea";
import AppText from "../components/AppText";
import Spacer from "../components/Spacer";
import LoginSignupForm from "../components/LoginSignupForm";
import Background from "../components/Background";
import screencap from "../api/screencap";
import { updateLoginUsername } from "../actions/loginActions";

import messages from "../enums/messages";
import colors from "../enums/colors";

function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const result = await screencap.post("/auth/register", { username, password });

    if (result.data.message == messages.success) {
      updateLoginUsername(username);
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  const navigatorToLogin = () => {
    navigation.navigate("LoginScreen", {
      username,
      password
    });
  };

  return (
    <Background>
      <SafeArea style={styles.safeContainer}>
        <Spacer height={10} />
        <Image source={require("../assets/images/book.png")} style={styles.book} />

        <LoginSignupForm
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={onSubmit}
          submitButtonTitle={"Sign up"}
        />

        <TouchableOpacity onPress={navigatorToLogin} styel={styles.text}>
          <AppText style={styles.text}>
            Already have an account? Click me to login.
          </AppText>
        </TouchableOpacity>
      </SafeArea>
    </Background>
  );
}

SignupScreen.navigationOptions = () => {
  // To see all the options, see
  // https://reactnavigation.org/docs/stack-navigator/
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.5
  },
  book: {
    alignSelf: "center",
    width: 150,
    height: 150
  },
  safeContainer: { flex: 1, marginHorizontal: 15 },
  text: {
    alignSelf: "flex-end",
    marginHorizontal: 10,
    color: colors.mediumBlue
  }
});

export default SignupScreen;
