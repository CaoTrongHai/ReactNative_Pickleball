import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      {/* Điều hướng nhanh */}
      <View style={styles.navLinks}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome5 name="home" size={18} color="#007bff" />
          <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Contact")}
        >
          <FontAwesome5 name="phone" size={18} color="#28a745" />
          <Text style={styles.navText}>Liên hệ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("About")}
        >
          <FontAwesome5 name="info-circle" size={18} color="#ffc107" />
          <Text style={styles.navText}>Giới thiệu</Text>
        </TouchableOpacity>
      </View>

      {/* Phần bản quyền */}
      <Text style={styles.footerText}>© 2025 Pickleball Store</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
  },
  navLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 15,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: "#333",
    marginTop: 2,
  },
});

export default Footer;
