import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Sử dụng icon từ thư viện expo

const NewsDetail = ({ route, navigation }) => {
  // Lấy dữ liệu tin tức từ route.params
  const { news } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>

      {/* Hình ảnh tin tức */}
      <Image source={news.image} style={styles.newsImage} />

      {/* Tiêu đề tin tức */}
      <Text style={styles.newsTitle}>{news.title}</Text>

      {/* Nội dung tin tức */}
      <View style={styles.newsContent}>
        {news.description.map((paragraph, index) => (
          <Text key={index} style={styles.newsParagraph}>
            {paragraph}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  newsImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  newsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsContent: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  newsParagraph: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default NewsDetail;
