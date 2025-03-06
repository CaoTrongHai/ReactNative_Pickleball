import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const storedUsername = await AsyncStorage.getItem("username");
        setUsername(storedUsername);
      };
      fetchUser();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("username");
    setUsername(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={require("../images/logo.png")} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
          <Text style={styles.navText}>Liên hệ</Text>
        </TouchableOpacity>
      </View>

      {username ? (
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.username}>👋 {username}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 3,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
  nav: {
    flexDirection: "row",
    gap: 20,
  },
  navText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Header;
