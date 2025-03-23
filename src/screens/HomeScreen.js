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
  TextInput,
} from "react-native";
import axios from "axios";

const BASE_URL = "http://localhost:9999";
const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Dữ liệu tin tức giả lập
  const newsData = [
    {
      id: 1,
      title: "Cách chọn vợt Pickleball phù hợp",
      image: require("../images/new1.png"),
      description: [
        "Chọn vợt Pickleball phù hợp là bước quan trọng để cải thiện hiệu suất chơi. Bài viết này sẽ hướng dẫn bạn cách chọn vợt dựa trên trọng lượng, kích thước và chất liệu.",
        "Trọng lượng của vợt ảnh hưởng đến khả năng kiểm soát và sức mạnh của cú đánh. Vợt nhẹ phù hợp với người mới bắt đầu, trong khi vợt nặng hơn giúp tăng lực đánh.",
        "Kích thước vợt cũng quan trọng không kém. Vợt lớn hơn cung cấp diện tích tiếp xúc bóng lớn hơn, giúp bạn dễ dàng kiểm soát bóng hơn.",
        "Chất liệu vợt cũng cần được xem xét. Vợt làm từ composite nhẹ và bền, trong khi vợt graphite cung cấp độ chính xác cao hơn.",
      ],
    },
    {
      id: 2,
      title: "Top 5 địa điểm chơi Pickleball tại Hà Nội",
      image: require("../images/new2.png"),
      description: [
        "Hà Nội là thành phố có nhiều địa điểm chơi Pickleball chất lượng. Bài viết này sẽ giới thiệu 5 địa điểm hàng đầu, bao gồm thông tin về giá vé, chất lượng sân và dịch vụ đi kèm.",
        "1. **Sân Pickleball Hồ Tây**: Nằm ngay cạnh hồ Tây, sân này có view đẹp và chất lượng sân tốt. Giá vé chỉ 100.000 VND/giờ.",
        "2. **Trung tâm thể thao Thanh Xuân**: Sân rộng rãi, được trang bị đầy đủ tiện nghi. Giá vé 150.000 VND/giờ.",
        "3. **Công viên Thống Nhất**: Sân ngoài trời, phù hợp cho những người yêu thích không gian thoáng đãng. Giá vé 50.000 VND/giờ.",
        "4. **CLB Pickleball Hà Nội**: Nơi tập trung của các tay vợt chuyên nghiệp. Giá vé 200.000 VND/giờ.",
        "5. **Sân Pickleball Long Biên**: Sân mới, được đầu tư hiện đại. Giá vé 120.000 VND/giờ.",
      ],
    },
    {
      id: 3,
      title: "Lợi ích sức khỏe từ việc chơi Pickleball",
      image: require("../images/new3.png"),
      description: [
        "Pickleball không chỉ là một môn thể thao giải trí mà còn mang lại nhiều lợi ích sức khỏe. Bài viết này sẽ phân tích các lợi ích như cải thiện tim mạch, tăng cường sức mạnh cơ bắp và giảm căng thẳng.",
        "1. **Cải thiện tim mạch**: Pickleball là môn thể thao vận động toàn thân, giúp tăng cường sức khỏe tim mạch và tuần hoàn máu.",
        "2. **Tăng cường sức mạnh cơ bắp**: Các động tác di chuyển và đánh bóng giúp phát triển cơ bắp chân, tay và lưng.",
        "3. **Giảm căng thẳng**: Chơi Pickleball giúp giải tỏa stress, tăng cường endorphin và cải thiện tâm trạng.",
        "4. **Tăng cường sự linh hoạt**: Các động tác trong Pickleball giúp cải thiện sự linh hoạt và phản xạ của cơ thể.",
      ],
    },
  ];

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

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render danh mục sản phẩm
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

  // Render sản phẩm nổi bật
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

  // Render tin tức
  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate("NewsDetail", { news: item })}
    >
      <Image source={item.image} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription} numberOfLines={3}>
          {item.description.join(" ")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Image source={require("../images/banner.png")} style={styles.banner} />

      {/* Ô tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Tìm kiếm sản phẩm..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

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
        data={filteredProducts}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />

      {/* Tin tức mới nhất */}
      <Text style={styles.sectionTitle}>Tin tức mới nhất</Text>
      <FlatList
        horizontal
        data={newsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNewsItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newsList}
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
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
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
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: { fontSize: 14, fontWeight: "bold", color: "#333" },
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
  newsList: { paddingBottom: 20 },
  newsItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 280,
  },
  newsImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  newsDescription: {
    fontSize: 14,
    color: "#777",
  },
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
