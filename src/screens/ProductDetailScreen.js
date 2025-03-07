import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BASE_URL = "http://localhost:9999";
const { width } = Dimensions.get("window"); // Lấy chiều rộng màn hình

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  // Hàm render ảnh trong carousel
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
      {/* Carousel hiển thị 3 ảnh */}
      <FlatList
        data={product.images.slice(0, 3)}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />

      {/* Thông tin sản phẩm */}
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

        {/* Nút Thêm vào giỏ hàng */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Thêm vào giỏ hàng thành công!")}
        >
          <Text style={styles.buttonText}>🛒 Thêm vào giỏ hàng</Text>
        </TouchableOpacity>

        {/* Nút Quay lại */}
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
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductDetailScreen;
