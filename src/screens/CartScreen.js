import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("Không tìm thấy ID người dùng");

      const cartResponse = await axios.get(
        `http://localhost:9999/carts/${userId}`
      );
      const cartData = cartResponse.data.data.items || [];

      const productDetailsPromises = cartData.map((item) =>
        axios.get(`http://localhost:9999/products/${item.productId}`)
      );

      const productResponses = await Promise.all(productDetailsPromises);

      const updatedCartItems = cartData.map((item, index) => ({
        ...item,
        name: productResponses[index].data.data.name,
      }));

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      Alert.alert("Lỗi", "Không thể tải giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("Không tìm thấy ID người dùng");

      const response = await axios.put(
        `http://localhost:9999/carts/${userId}/update`,
        {
          productId,
          quantity: newQuantity,
        }
      );

      if (response.status === 200) {
        fetchCart(); // Cập nhật lại giỏ hàng sau khi cập nhật thành công
      }
    } catch (error) {
      console.error("Lỗi cập nhật giỏ hàng:", error);
      Alert.alert("Lỗi", "Không thể cập nhật giỏ hàng");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🛒 Giỏ hàng của bạn đang trống</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🛒 Giỏ Hàng</Text>

        {cartItems.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {item.price.toLocaleString()} đ
              </Text>
              <Text style={styles.productQuantity}>
                Số lượng: {item.quantity}
              </Text>
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="-"
                onPress={() =>
                  item.quantity > 1
                    ? updateCartItem(item.productId, item.quantity - 1)
                    : updateCartItem(item.productId, 0)
                }
              />
              <Button
                title="+"
                onPress={() =>
                  updateCartItem(item.productId, item.quantity + 1)
                }
              />
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("CheckOut")}
        >
          <Text style={styles.checkoutText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  cartItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productInfo: { flex: 1, justifyContent: "center" },
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  productPrice: { fontSize: 16, color: "#ff5722", marginTop: 5 },
  productQuantity: { fontSize: 14, color: "#666", marginTop: 5 },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default CartScreen;
