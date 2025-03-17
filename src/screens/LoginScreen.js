import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import custom hook

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth(); // Get signIn function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);

      if (!email || !password) {
        setErrorMessage("Vui lòng nhập đầy đủ email và mật khẩu");
        setIsLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:9999/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Use the signIn function from context
      const username = await signIn(token, user);

      Alert.alert("Thành công", "Đăng nhập thành công");
      setIsLoading(false);

      // Kiểm tra username và chuyển hướng
      if (username === "admin") {
        navigation.navigate("Admin");
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <ImageBackground
      source={require("../images/backgroundLogin.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng nhập</Text>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={styles.linkText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  linkContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  linkText: {
    color: "#007BFF",
    textDecorationLine: "underline",
    marginTop: 5,
  },
});

export default LoginScreen;
