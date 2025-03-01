import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Tạo icon tùy chỉnh
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

const ContactScreen = () => {
  const position = [18.3428, 105.9057];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Liên hệ chúng tôi</Text>

      {/* Thông tin liên hệ */}
      <View style={styles.contactBox}>
        <Text style={styles.contactText}>
          <Text style={styles.bold}>Địa chỉ:</Text> 06B Đồng Quế, thành phố Hà
          Tĩnh
        </Text>
        <Text style={styles.contactText}>
          <Text style={styles.bold}>Điện thoại:</Text> 0977652003
        </Text>
        <Text style={styles.contactText}>
          <Text style={styles.bold}>Email:</Text> tronghaipdp@gmail.com
        </Text>
      </View>

      {/* Bản đồ */}
      <View style={styles.mapContainer}>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: 300, width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon}>
            <Popup>
              Đây là vị trí Shop Pickleball của chúng tôi tại TP. Hà Tĩnh!
            </Popup>
          </Marker>
        </MapContainer>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  contactBox: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  mapContainer: {
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default ContactScreen;
