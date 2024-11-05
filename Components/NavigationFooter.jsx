import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export const URLS = {
  HOME: "/",
  TRACKER: "/tracker",
  DIET: "/diet",
};

const NavigationFooter = () => {
  return (
    <View style={styles.footerContainer}>
      {/* Fondo Curvo */}
      <View style={styles.curvedBackground}></View>

      {/* Navigation Menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="dashboard" size={24} color="white" />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="book" size={24} color="white" />
          <Text style={styles.menuText}>Diary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="ellipsis-h" size={24} color="white" />
          <Text style={styles.menuText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#181A20",
    border: "none",
  },
  curvedBackground: {
    backgroundColor: "#0056B3",
    height: 30,
    borderTopLeftRadius: 2000,
    borderTopRightRadius: 2000,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "80%",
  },
  searchText: {
    flex: 1,
    paddingHorizontal: 10,
    color: "gray",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#0056B3",
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontSize: 10,
    marginTop: 5,
  },
});

export default NavigationFooter;
