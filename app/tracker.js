import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const Traker = () => {
  const [data, setData] = useState([
    { date: "2024-10-11", items: [] },
    { date: "2024-10-12", items: [] },
    { date: "2024-10-13", items: [] },
  ]);
  const [inputValues, setInputValues] = useState({});
  const [expandedDates, setExpandedDates] = useState({});
  const [newDate, setNewDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);

  const addItem = () => {
    if (newItemText.trim() || newItemImage) {
      setData((prevData) =>
        prevData.map((day) =>
          day.date === currentDate
            ? {
                ...day,
                items: [
                  ...day.items,
                  {
                    id: Date.now().toString(),
                    text: newItemText,
                    image: newItemImage,
                  },
                ],
              }
            : day,
        ),
      );
      setNewItemText("");
      setNewItemImage(null);
      setModalVisible(false);
    }
  };

  const deleteItem = (date, id) => {
    setData((prevData) =>
      prevData.map((day) =>
        day.date === date
          ? { ...day, items: day.items.filter((item) => item.id !== id) }
          : day,
      ),
    );
  };

  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const openModal = (date) => {
    setCurrentDate(date);
    setModalVisible(true);
  };

  const addDate = () => {
    if (newDate.trim() && !data.some((day) => day.date === newDate)) {
      setData((prevData) => [...prevData, { date: newDate, items: [] }]);
      setNewDate("");
    }
  };

  const deleteDate = (date) => {
    setData((prevData) => prevData.filter((day) => day.date !== date));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      console.log(result?.assets[0]?.uri, "result.uri"); // Confirmar que el resultado no está cancelado
      setNewItemImage(result?.assets[0]?.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.newDateContainer}>
        <TextInput
          style={{ ...styles.input, ...styles.newDateInput }}
          placeholder="Add new date (YYYY-MM-DD)"
          value={newDate}
          onChangeText={setNewDate}
        />
        <Pressable style={styles.addButton} onPress={addDate}>
          <Text style={styles.buttonText}>Add Date</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.dateContainer}>
            <View style={styles.dateHeader}>
              <TouchableOpacity
                onPress={() => toggleExpand(item.date)}
                style={styles.dateHeaderButton}
              >
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.toggleIcon}>
                  {expandedDates[item.date] ? "-" : "+"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteDate(item.date)}
                style={styles.deleteDateButton}
              >
                <Text style={styles.deleteDateText}>Delete</Text>
              </TouchableOpacity>
            </View>

            {expandedDates[item.date] && (
              <View style={styles.content}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => openModal(item.date)}
                >
                  <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>

                <FlatList
                  data={item.items}
                  keyExtractor={(subItem) => subItem.id}
                  renderItem={({ item: subItem }) => (
                    <View
                      style={styles.listItem}
                      onClick={() => console.log(item, subItem)}
                    >
                      {/* Muestra la imagen si existe */}
                      {console.log(subItem)}
                      {subItem.image && (
                        <Image
                          source={{ uri: subItem.image }}
                          style={styles.itemImage}
                        />
                      )}
                      <Text style={styles.itemText}>{subItem.text}</Text>
                      <TouchableOpacity
                        onPress={() => deleteItem(item.date, subItem.id)}
                      >
                        <Text style={styles.deleteText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        )}
      />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter item for {currentDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Item text"
              value={newItemText}
              onChangeText={setNewItemText}
            />
            <TouchableOpacity style={styles.addButton} onPress={pickImage}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            {newItemImage && (
              <Image
                source={{ uri: newItemImage }}
                style={styles.previewImage}
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.addButton} onPress={addItem}>
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Traker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  newDateInput: {
    width: "100%",
  },
  newDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    overflow: "hidden",
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 20,
  },
  dateHeaderButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  toggleIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  deleteDateButton: {
    backgroundColor: "#f44",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteDateText: {
    color: "#fff",
  },
  content: {
    padding: 15,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
    width: "33%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center", // Asegura que el texto y la imagen estén alineados verticalmente
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "#999",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "40%",
  },
  itemImage: {
    width: 50, // Ancho de la imagen
    height: 50, // Alto de la imagen
    borderRadius: 5, // Redondea las esquinas de la imagen
    marginRight: 10, // Margen derecho entre la imagen y el texto
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
});
