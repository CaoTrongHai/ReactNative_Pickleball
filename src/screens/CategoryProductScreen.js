import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import axios from "axios";

const BASE_URL = "http://localhost:9999";

const CategoryProductsScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/products/category/${categoryId}`
      );
      setProducts(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sản phẩm theo danh mục</Text>
      {products.length === 0 ? (
        <Text style={styles.noData}>Không có sản phẩm nào.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image
                source={{
                  uri: item.images?.[0]?.url?.startsWith("/images/")
                    ? `${BASE_URL}${item.images[0].url}`
                    : item.images?.[0]?.url ||
                      "https://via.placeholder.com/200",
                }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              >
                <Text style={styles.detailButtonText}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#333" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  noData: { fontSize: 16, color: "#777", textAlign: "center", marginTop: 20 },
  productItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e63946",
    marginTop: 5,
  },
  detailButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  detailButtonText: { color: "#fff", fontWeight: "bold" },
});

export default CategoryProductsScreen;
