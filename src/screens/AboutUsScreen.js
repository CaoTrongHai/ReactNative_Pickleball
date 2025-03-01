import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>Giới thiệu về Pickleball Shop</Text>
      <Text style={styles.subtitle}>
        Chào mừng bạn đến với Pickleball Shop – nơi cung cấp các sản phẩm
        Pickleball hàng đầu!
      </Text>

      {/* Ảnh & Giới thiệu */}
      <View style={styles.section}>
        <Image style={styles.logo} source={require("../images/logo.png")} />
        <Text style={styles.text}>
          Pickleball Shop chuyên cung cấp dụng cụ và phụ kiện cho bộ môn
          Pickleball. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao
          nhất, từ vợt, bóng, lưới đến trang phục thi đấu chuyên nghiệp.
        </Text>
      </View>

      {/* Tại sao chọn chúng tôi? */}
      <Text style={styles.sectionTitle}>Tại sao chọn chúng tôi?</Text>
      <View style={styles.section}>
        <Text style={styles.text}>✅ Sản phẩm chất lượng cao</Text>
        <Text style={styles.text}>✅ Dịch vụ khách hàng chuyên nghiệp</Text>
        <Text style={styles.text}>✅ Giao hàng nhanh chóng toàn quốc</Text>
        <Text style={styles.text}>✅ Chính sách đổi trả linh hoạt</Text>
      </View>

      {/* Liên hệ */}
      <Text style={styles.sectionTitle}>Liên hệ với chúng tôi</Text>
      <View style={styles.contactBox}>
        <Text style={styles.text}>
          📍 Địa chỉ: 06B Đồng Quế, Thành phố Hà Tĩnh
        </Text>
        <Text style={styles.text}>📞 Điện thoại: 0977 652 003</Text>
        <Text style={styles.text}>📧 Email: tronghaipdp@gmail.com</Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  section: {
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  productCard: {
    width: 180,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    margin: 10,
  },
  productImage: {
    width: 160,
    height: 120,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  productText: {
    fontSize: 14,
    textAlign: "center",
  },
  contactBox: {
    backgroundColor: "#e3e3e3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default AboutUsScreen;
