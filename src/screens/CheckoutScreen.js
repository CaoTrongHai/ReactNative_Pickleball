import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import QRCode from "react-native-qrcode-svg"; // Import the QR code library

const CheckoutScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCart();
    fetchUserInfo();
  }, []);

  const fetchCart = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("Không tìm thấy ID người dùng");

      // Lấy dữ liệu giỏ hàng
      const cartResponse = await axios.get(
        `http://localhost:9999/carts/${userId}`
      );
      const cartData = cartResponse.data.data.items || [];

      // Lấy thông tin chi tiết sản phẩm
      const productDetailsPromises = cartData.map((item) =>
        axios.get(`http://localhost:9999/products/${item.productId}`)
      );

      const productResponses = await Promise.all(productDetailsPromises);

      // Cập nhật cartItems với thông tin chi tiết sản phẩm
      const updatedCartItems = cartData.map((item, index) => ({
        ...item,
        name: productResponses[index].data.data.name,
        image: productResponses[index].data.data.image,
      }));

      // Tính tổng tiền
      let total = 0;
      updatedCartItems.forEach((item) => {
        total += item.price * item.quantity;
      });

      setCartItems(updatedCartItems);
      setTotalPrice(total);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
      Alert.alert("Lỗi", "Không thể tải giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("Không tìm thấy ID người dùng");

      const response = await axios.get(`http://localhost:9999/users/${userId}`);
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("Lỗi khi tải thông tin người dùng:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin người dùng");
    }
  };

  const handleCheckout = () => {
    Alert.alert("Thanh toán thành công", "Cảm ơn bạn đã mua hàng!");
    navigation.navigate("Home");
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🛍 Thanh Toán</Text>

        {/* Thông tin người dùng */}
        {userInfo && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.sectionTitle}>Thông tin người dùng</Text>
            <View style={styles.userInfoContent}>
              <Text style={styles.userInfoText}>Tên: {userInfo.username}</Text>
              <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>
              <Text style={styles.userInfoText}>
                Địa chỉ: {userInfo.address}
              </Text>
              <Text style={styles.userInfoText}>
                Số điện thoại: {userInfo.phoneNumber}
              </Text>
            </View>
          </View>
        )}

        {/* Danh sách sản phẩm */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm trong giỏ hàng</Text>
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
            </View>
          ))}
        </View>

        {/* Tổng tiền */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalPriceText}>
            Tổng tiền: {totalPrice.toLocaleString()} đ
          </Text>
        </View>

        {/* Thông tin chuyển khoản và QR Code */}
        <View style={styles.paymentContainer}>
          {/* Thông tin chuyển khoản */}
          <View style={styles.bankInfoContainer}>
            <Text style={styles.sectionTitle}>Thông tin chuyển khoản</Text>
            <Text style={styles.bankInfoText}>CHỦ TÀI KHOẢN: CAO TRỌNG HẢI</Text>
            <Text style={styles.bankInfoText}>Số TK: 6666977652003</Text>
            <Text style={styles.bankInfoText}>NGÂN HÀNG: MB BANK</Text>
            <Text style={styles.bankInfoText}>
              NỘI DUNG: THANHTOAN {totalPrice}
            </Text>
          </View>

          {/* QR Code */}
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={`Total Amount: ${totalPrice.toLocaleString()} đ`}
              size={150}
              color="black"
              backgroundColor="white"
            />
          </View>
        </View>

        {/* Nút thanh toán */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Xác nhận Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  userInfoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoContent: {
    paddingLeft: 10,
  },
  userInfoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  productsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  productPrice: { fontSize: 14, color: "#ff5722", marginTop: 5 },
  productQuantity: { fontSize: 14, color: "#666", marginTop: 5 },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bankInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  bankInfoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  qrCodeContainer: {
    alignItems: "center",
  },
  checkoutButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CheckoutScreen;
