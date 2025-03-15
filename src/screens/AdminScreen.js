import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";

const BASE_URL = "http://localhost:9999";

const AdminScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5; // Số sản phẩm mỗi trang

  // State cho modal chỉnh sửa
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMaterial, setProductMaterial] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // State cho modal xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page]); // Gọi lại API khi page thay đổi

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoryRes, productRes] = await Promise.all([
        fetch(`${BASE_URL}/categories`).then((res) => res.json()),
        fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`).then((res) =>
          res.json()
        ),
      ]);

      console.log("Categories:", categoryRes);
      console.log("Products:", productRes);

      setCategories(categoryRes.data || []);
      setProducts(productRes.data.docs || []);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa sản phẩm
  const handleDeleteProduct = (id) => {
    setProductToDelete(id); // Lưu ID sản phẩm cần xóa
    setDeleteModalVisible(true); // Hiển thị modal xác nhận xóa
  };

  // Hàm thực hiện xóa sản phẩm
  const confirmDeleteProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Không thể xóa sản phẩm");
      }

      // Đóng modal và tải lại dữ liệu
      setDeleteModalVisible(false);
      Alert.alert("Thành công", "Đã xóa sản phẩm!");
      fetchData();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  // Mở modal chỉnh sửa và lấy thông tin sản phẩm
  const handleEditProduct = async (product) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${product._id}`);
      const result = await response.json();

      if (result.data) {
        setEditingProduct(result.data);
        setProductName(result.data.name || "");
        setProductPrice(result.data.price ? result.data.price.toString() : "");
        setProductMaterial(result.data.material || "");
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải thông tin sản phẩm. Vui lòng thử lại.");
    }
  };

  // Cập nhật sản phẩm
  const updateProduct = async () => {
    if (!productName.trim() || !productPrice.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ tên sản phẩm và giá");
      return;
    }

    try {
      setSubmitting(true);

      const updatedData = {
        name: productName,
        price: parseInt(productPrice),
        material: productMaterial,
      };

      const response = await fetch(
        `${BASE_URL}/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Không thể cập nhật sản phẩm");
      }

      setModalVisible(false);
      Alert.alert("Thành công", "Đã cập nhật sản phẩm thành công!");
      fetchData();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Trang Quản Trị</Text>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>← Quay lại</Text>
      </TouchableOpacity>
      {loading ? (
        <Text style={styles.loadingText}>Đang tải...</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((item) => (
              <View key={item._id} style={styles.categoryCard}>
                <Image
                  source={{ uri: `${BASE_URL}${item.image}` }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryTitle}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
          {products.map((item) => (
            <View key={item._id} style={styles.productCard}>
              <Image
                source={{ uri: `${BASE_URL}${item.images[0].url}` }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.material}</Text>
                <Text style={styles.productPrice}>{item.price} đ</Text>
              </View>
              <View style={styles.productActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditProduct(item)}
                >
                  <Text style={styles.buttonText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteProduct(item._id)}
                >
                  <Text style={styles.buttonText}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Nút chuyển trang */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, page === 1 && styles.disabledButton]}
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
        >
          <Text style={styles.pageButtonText}>← Trước</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>Trang {page}</Text>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.pageButtonText}>Sau →</Text>
        </TouchableOpacity>
      </View>

      {/* Modal chỉnh sửa sản phẩm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Chỉnh Sửa Sản Phẩm</Text>
            {editingProduct &&
              editingProduct.images &&
              editingProduct.images.length > 0 && (
                <Image
                  source={{ uri: `${BASE_URL}${editingProduct.images[0].url}` }}
                  style={styles.modalProductImage}
                />
              )}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tên sản phẩm:</Text>
              <TextInput
                style={styles.input}
                value={productName}
                onChangeText={setProductName}
                placeholder="Nhập tên sản phẩm"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Giá (VNĐ):</Text>
              <TextInput
                style={styles.input}
                value={productPrice}
                onChangeText={setProductPrice}
                placeholder="Nhập giá sản phẩm"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Chất liệu:</Text>
              <TextInput
                style={styles.input}
                value={productMaterial}
                onChangeText={setProductMaterial}
                placeholder="Nhập chất liệu sản phẩm"
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonTextWhite}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, submitting && styles.disabledButton]}
                onPress={updateProduct}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonTextWhite}>Xác nhận</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal xác nhận xóa sản phẩm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Xác Nhận Xóa</Text>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.buttonTextWhite}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmDeleteProduct}
              >
                <Text style={styles.buttonTextWhite}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  categoryContainer: {
    marginTop: 10,
  },
  categoryCard: {
    marginRight: 10,
    alignItems: "center",
  },
  categoryImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  categoryTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "black",
    fontSize: 14,
  },
  productActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginRight: 10,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  buttonTextWhite: {
    color: "white",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  pageButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  pageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  returnButton: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#777",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
});

export default AdminScreen;
