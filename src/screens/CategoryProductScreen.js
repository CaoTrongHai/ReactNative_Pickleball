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
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const BASE_URL = "http://localhost:9999";

const CategoryProductsScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterPrice, setFilterPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/products/category/${categoryId}`
      );
      setProducts(response.data || []);
      setFilteredProducts(response.data || []);
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

  // Lọc sản phẩm dựa trên tìm kiếm và giá tối đa
  useEffect(() => {
    const maxPrice = parseFloat(filterPrice) || Infinity;
    const filtered = products.filter(
      (item) =>
        item.price <= maxPrice &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, filterPrice, products]);

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

      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#777"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Nút lọc sản phẩm */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Lọc sản phẩm</Text>
      </TouchableOpacity>

      {filteredProducts.length === 0 ? (
        <Text style={styles.noData}>Không có sản phẩm nào.</Text>
      ) : (
        <FlatList
          data={filteredProducts}
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

      {/* Modal lọc sản phẩm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lọc theo giá</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập giá tối đa"
              keyboardType="numeric"
              value={filterPrice}
              onChangeText={setFilterPrice}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.applyButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#333" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16 },
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
  filterButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  filterButtonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  applyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  applyButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default CategoryProductsScreen;
