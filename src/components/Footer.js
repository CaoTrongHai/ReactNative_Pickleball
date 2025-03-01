import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        © 2025 Pickleball Store. All rights reserved.
      </Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

export default Footer;
