import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) throw new Error("Không tìm thấy ID người dùng");

        const response = await axios.get(
          `http://localhost:9999/users/${userId}`
        );
        const userData = response.data.data;

        setUser(userData);
        setFormData({
          username: userData.username || "",
          address: userData.address || "",
          phoneNumber: userData.phoneNumber || "",
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        Alert.alert("Lỗi", "Không thể lấy thông tin người dùng");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const response = await axios.put(
        `http://localhost:9999/users/${userId}`,
        formData
      );

      if (response.status === 200) {
        setUser(response.data.data);
        setEditing(false);
        Alert.alert("Thành công", "Thông tin đã được cập nhật");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Không tìm thấy thông tin người dùng.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={require("../images/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user.username}</Text>
        </View>

        <View style={styles.profileInfo}>
          <TextInput
            style={styles.input}
            value={formData.username}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
            editable={editing}
            placeholder="Tên người dùng"
          />
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            editable={editing}
            placeholder="Địa chỉ"
          />
          <TextInput
            style={styles.input}
            value={formData.phoneNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, phoneNumber: text })
            }
            editable={editing}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
          />

          {editing ? (
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.buttonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          )}

          {/* Nút xem giỏ hàng */}
          <TouchableOpacity
            style={[styles.button, styles.cartButton]}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.buttonText}>🛒 Xem Giỏ Hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#6200ee",
  },
  username: { fontSize: 24, fontWeight: "bold", color: "#333" },
  profileInfo: { width: "100%" },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: "#ff9800", // Màu cam nổi bật
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  errorText: { fontSize: 16, color: "#ff4444" },
});

export default ProfileScreen;
