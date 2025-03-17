import React, { useState } from "react";
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
import AdminScreen from "./src/screens/AdminScreen";
import { AuthProvider } from "./src/context/AuthContext"; // Import AuthProvider

const Stack = createStackNavigator();

const App = () => {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  return (
    <AuthProvider>
      {" "}
      {/* Wrap entire app with AuthProvider */}
      <NavigationContainer>
        <View style={styles.container}>
          {/* Header */}
          {showHeaderFooter && (
            <View style={styles.header}>
              <Header />
            </View>
          )}

          {/* Nội dung chính */}
          <View
            style={[
              styles.content,
              !showHeaderFooter && styles.contentFullScreen,
            ]}
          >
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false, // Ẩn header mặc định của navigator
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Contact" component={ContactScreen} />
              <Stack.Screen name="About" component={AboutUsScreen} />
              <Stack.Screen
                name="CategoryProducts"
                component={CategoryProductsScreen}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
              />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen
                name="Admin"
                component={AdminScreen}
                listeners={({ navigation }) => ({
                  focus: () => {
                    setShowHeaderFooter(false);
                    navigation.setOptions({ headerShown: false });
                  },
                  blur: () => setShowHeaderFooter(true),
                })}
              />
            </Stack.Navigator>
          </View>

          {/* Footer */}
          {showHeaderFooter && (
            <View style={styles.footer}>
              <Footer />
            </View>
          )}
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60, // Chiều cao của Header
  },
  content: {
    flex: 1, // Chiếm phần còn lại của màn hình
  },
  contentFullScreen: {
    flex: 1, // Đảm bảo chiếm toàn bộ màn hình khi ẩn Header/Footer
    marginTop: 0,
    marginBottom: 0,
  },
  footer: {
    height: 50, // Chiều cao của Footer
  },
});

export default App;
