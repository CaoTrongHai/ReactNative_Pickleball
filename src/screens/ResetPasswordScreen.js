import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSendOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9999/users/forgotPassword",
        { email }
      );
      Alert.alert("Thành công", response.data.message);
      setStep(2);
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9999/users/verifyOTP",
        { email, otp }
      );
      Alert.alert("Thành công", response.data.message);
      setStep(3);
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "OTP không hợp lệ");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 9) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 9 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/users/resetPassword",
        { email, otp, newPassword }
      );
      Alert.alert("Thành công", response.data.message);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Không thể đổi mật khẩu"
      );
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.label}>Nhập email của bạn:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Gửi mã OTP</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.label}>Nhập mã OTP:</Text>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            placeholder="Mã OTP"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Xác thực OTP</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.label}>Nhập mật khẩu mới:</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Mật khẩu mới"
            secureTextEntry
          />
          <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Xác nhận mật khẩu mới"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </>
      )}
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
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
