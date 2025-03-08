import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const BASE_URL = "http://localhost:9999";
const { width } = Dimensions.get("window");

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const addToCart = async () => {
    if (!userId) {
      setMessage({
        type: "error",
        text: "⚠ Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/carts/${userId}/add`, {
        productId: product._id,
        quantity: 1,
      });

      setMessage({
        type: "success",
        text: "🛒 Sản phẩm đã được thêm vào giỏ hàng!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "❌ Không thể thêm vào giỏ hàng. Vui lòng thử lại!",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const renderImage = ({ item }) => {
    if (!item) return null;
    const imageUrl = typeof item === "string" ? item : item?.url;
    if (!imageUrl) return null;

    return (
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageUrl.startsWith("/images/")
              ? `${BASE_URL}${imageUrl}`
              : imageUrl,
          }}
          style={styles.carouselImage}
          onError={(e) => console.error("Lỗi tải ảnh:", e.nativeEvent.error)}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList
        data={product.images.slice(0, 3)}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />

      <View style={styles.productInfo}>
        <Text style={styles.title}>
          <MaterialIcons name="sports-tennis" size={22} color="#ff8c00" />{" "}
          {product.name}
        </Text>

        <Text style={styles.category}>
          <MaterialIcons name="category" size={20} color="#007bff" />{" "}
          {product.category.name}
        </Text>

        <Text style={styles.material}>
          Nguyên liệu:{" "}
          <Text style={{ fontWeight: "bold" }}>{product.material}</Text>
        </Text>

        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.price}>${product.price}</Text>

        {message && (
          <View
            style={[
              styles.messageBox,
              message.type === "success" ? styles.successBox : styles.errorBox,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={addToCart}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>🛒 Thêm vào giỏ hàng</Text>
          )}
        </TouchableOpacity>

        {!userId && (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>🔐 Đăng nhập ngay</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>⬅ Quay lại</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  carousel: {
    height: 500,
    marginBottom: 10,
  },
  imageContainer: {
    width: width - 40,
    height: 500,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productInfo: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "600",
    marginBottom: 5,
  },
  material: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e63946",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#ff8c00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  messageBox: {
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  successBox: {
    backgroundColor: "#d4edda",
  },
  errorBox: {
    backgroundColor: "#f8d7da",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default ProductDetailScreen;
