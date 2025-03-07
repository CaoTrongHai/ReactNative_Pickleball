import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";

const BASE_URL = "http://localhost:9999";
const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(`${BASE_URL}/categories`);
        const productRes = await axios.get(`${BASE_URL}/products`);
        setCategories(categoryRes.data.data);
        setProducts(productRes.data.data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() =>
        navigation.navigate("CategoryProducts", { categoryId: item._id })
      }
    >
      <Image
        source={{ uri: `${BASE_URL}${item.image}` }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: `${BASE_URL}${item.images[0].url}` }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text numberOfLines={2} style={styles.productDescription}>
        {item.description}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
      >
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Image source={require("../images/banner.png")} style={styles.banner} />

      {/* Danh mục sản phẩm */}
      <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      {/* Sản phẩm nổi bật */}
      <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />

      {/* Mẹo chơi Pickleball */}
      <Text style={styles.sectionTitle}>Mẹo chơi Pickleball</Text>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipItem}>
          🎾 Giữ vợt thấp khi phòng thủ để phản ứng nhanh hơn.
        </Text>
        <Text style={styles.tipItem}>
          🏃‍♂️ Luôn di chuyển để giữ vị trí tốt trên sân.
        </Text>
        <Text style={styles.tipItem}>
          🔄 Tập luyện kỹ thuật dinks để kiểm soát bóng tốt hơn.
        </Text>
        <Text style={styles.tipItem}>
          💪 Tập trung vào chiến thuật đôi để phối hợp với đồng đội.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 10 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  banner: {
    width: screenWidth - 20,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoryList: { paddingBottom: 10 },
  categoryItem: { marginRight: 15, alignItems: "center" },
  categoryImage: { width: 80, height: 80, borderRadius: 10, marginBottom: 5 },
  categoryText: { fontSize: 14, color: "#555" },
  productList: { paddingBottom: 20 },
  productItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 280,
  },
  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  productDescription: { fontSize: 14, color: "#777", marginBottom: 10 },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "#e63946" },
  detailButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  detailButtonText: { color: "#fff", fontWeight: "bold" },
  tipsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
});

export default HomeScreen;
