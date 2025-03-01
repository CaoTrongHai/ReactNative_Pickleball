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
    if (!item) return null; // Trả về null nếu item không tồn tại

    const imageUrl = typeof item === "string" ? item : item?.url;
    if (!imageUrl) return null; // Trả về null nếu không có URL

    return (
      <Image
        source={{
          uri: imageUrl.startsWith("/images/")
            ? `${BASE_URL}${imageUrl}`
            : imageUrl,
        }}
        // defaultSource={require("./path/to/placeholder.png")} // Ảnh placeholder
        style={styles.carouselImage}
        onError={(e) => console.error("Lỗi tải ảnh:", e.nativeEvent.error)}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Carousel hiển thị 3 ảnh */}
      <FlatList
        data={product.images.slice(0, 3)} // Chỉ lấy 3 ảnh đầu tiên
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled // Cho phép cuộn từng ảnh một
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />
      <Text style={styles.title}>
        {" "}
        <MaterialIcons name="sports-tennis" size={20} />
        {product.name}
      </Text>
      <Text>
        {" "}
        <MaterialIcons name="category" size={20} />
        {product.category.name}
      </Text>{" "}
      <Text>Nguyên liệu: {product.material}</Text>
      <Text style={styles.description}> {product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Thêm vào giỏ hàng thành công!")}
      >
        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  carousel: {
    height: 500, // Chiều cao cố định cho carousel
    marginBottom: 10,
  },
  carouselImage: {
    width: width - 20, // Chiều rộng bằng chiều rộng màn hình trừ padding
    height: 600,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e63946",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductDetailScreen;
