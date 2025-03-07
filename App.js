import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../my-app/src/screens/HomeScreen";
import ProductDetailScreen from "../my-app/src/screens/ProductDetailScreen";
import LoginScreen from "../my-app/src/screens/LoginScreen";
import RegisterScreen from "../my-app/src/screens/RegisterScreen";
import Header from "../my-app/src/components/Header";
import Footer from "../my-app/src/components/Footer";
import ContactScreen from "./src/screens/ContactScreen";
import "leaflet/dist/leaflet.css";
import AboutUsScreen from "./src/screens/AboutUsScreen";
import CategoryProductsScreen from "./src/screens/CategoryProductScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import CartScreen from "./src/screens/CartScreen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Header />
        </View>

        {/* Nội dung chính */}
        <View style={styles.content}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Trang chủ", headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: "Chi tiết sản phẩm", headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Đăng nhập", headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Đăng ký", headerShown: false }}
            />
            <Stack.Screen
              name="Contact"
              component={ContactScreen}
              options={{ title: "Liên hệ", headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={AboutUsScreen}
              options={{ title: "Giới thiệu", headerShown: false }}
            />
            <Stack.Screen
              name="CategoryProducts"
              component={CategoryProductsScreen}
              options={{ title: "Sản phẩm" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Hồ sơ" }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{ title: "Quên mật khẩu" }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Giỏ hàng" }}
            />
          </Stack.Navigator>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
  },
  content: {
    flex: 1,
  },
  footer: {
    height: 50,
  },
});

export default App;
