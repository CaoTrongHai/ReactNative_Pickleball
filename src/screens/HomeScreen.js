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
} from "react-native";
import axios from "axios";

const BASE_URL = "http://localhost:9999";

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
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  // const renderCategoryItem = ({ item }) => (
  //   <TouchableOpacity style={styles.categoryItem}>
  //     <Image
  //       source={{
  //         uri: item.image.startsWith("/images/")
  //           ? `${BASE_URL}${item.image}`
  //           : item.image,
  //       }}
  //       style={styles.categoryImage}
  //     />
  //     <Text style={styles.categoryText}>{item.name}</Text>
  //   </TouchableOpacity>
  // );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        console.log("Navigating to CategoryProducts with ID:", item._id);
        navigation.navigate("CategoryProducts", { categoryId: item._id });
      }}
    >
      <Image
        source={{
          uri: item.image.startsWith("/images/")
            ? `${BASE_URL}${item.image}`
            : item.image,
        }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{
          uri: item.images[0].url.startsWith("/images/")
            ? `${BASE_URL}${item.images[0].url}`
            : item.images[0].url,
        }}
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
      <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoryList: {
    paddingBottom: 10,
  },
  categoryItem: {
    marginRight: 15,
    alignItems: "center",
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: "#555",
  },
  productList: {
    paddingBottom: 20,
  },
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
    height: 600,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e63946",
  },
  detailButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
