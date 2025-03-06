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

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({}); // Trạng thái lỗi

  const handleRegister = async () => {
    let newErrors = {};

    // Kiểm tra nhập liệu
    if (!username) newErrors.username = "Vui lòng nhập Username";
    if (!email) newErrors.email = "Vui lòng nhập Email";
    if (!password) newErrors.password = "Vui lòng nhập Mật khẩu";
    if (!confirmPassword)
      newErrors.confirmPassword = "Vui lòng nhập Xác nhận mật khẩu";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp";
    if (!address) newErrors.address = "Vui lòng nhập Địa chỉ";
    if (!phoneNumber) newErrors.phoneNumber = "Vui lòng nhập Số điện thoại";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/users/register",
        {
          username,
          email,
          password,
          address,
          phoneNumber,
        }
      );

      console.log("Đăng ký thành công:", response.data);
      Alert.alert("Thành công", "Đăng ký thành công");
      navigation.navigate("Login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
      console.error("Lỗi đăng ký:", errorMessage);

      setErrors({ general: errorMessage });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <TextInput
        style={[styles.input, errors.username && styles.errorInput]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TextInput
        style={[styles.input, errors.confirmPassword && styles.errorInput]}
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <TextInput
        style={[styles.input, errors.address && styles.errorInput]}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      <TextInput
        style={[styles.input, errors.phoneNumber && styles.errorInput]}
        placeholder="Số điện thoại"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorInput: {
    borderColor: "red",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#007bff",
    marginTop: 15,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
});

export default RegisterScreen;
