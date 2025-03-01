import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text
            style={styles.navText}
            onPress={() => navigation.navigate("About")}
          >
            Giới thiệu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Contact")}
        >
          <Text style={styles.navText}>Liên hệ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.cartIcon}>
        <Image
          source={require("../images/cart.png")}
          style={styles.cartImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 100,
    height: 50,
  },
  nav: {
    flexDirection: "row",
  },
  navItem: {
    marginHorizontal: 10,
  },
  navText: {
    fontSize: 16,
    color: "#333",
  },
  cartIcon: {
    padding: 10,
  },
  cartImage: {
    width: 24,
    height: 24,
  },
});

export default Header;
