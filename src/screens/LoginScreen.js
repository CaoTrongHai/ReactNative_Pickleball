import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Kiểm tra các trường nhập liệu
      if (!email || !password) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
        return;
      }

      // Gọi API đăng nhập
      const response = await axios.post("http://localhost:9999/users/login", {
        email,
        password,
      });

      // Xử lý kết quả trả về từ API
      const { token, user } = response.data;
      console.log("Đăng nhập thành công:", user);
      console.log("Token:", token);

      // Lưu token vào AsyncStorage hoặc Redux (nếu cần)
      // Chuyển hướng đến màn hình chính
      Alert.alert("Thành công", "Đăng nhập thành công");
      navigation.navigate("Home"); // Thay 'Home' bằng màn hình chính của bạn
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response?.data?.message || error.message
      );
      Alert.alert("Lỗi", error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  link: {
    color: "blue",
    marginTop: 10,
  },
});

export default LoginScreen;
