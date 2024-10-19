import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

// Esquema de validación con Yup
const schema = yup.object().shape({
  foodName: yup.string().required("El nombre de la comida es obligatorio"),
  calories: yup
    .number()
    .typeError("Las calorías deben ser un número")
    .required("Las calorías son obligatorias"),
  proteins: yup
    .number()
    .typeError("Las proteínas deben ser un número")
    .required("Las proteínas son obligatorias"),
  carbs: yup
    .number()
    .typeError("Los carbohidratos deben ser un número")
    .required("Los carbohidratos son obligatorios"),
  fats: yup
    .number()
    .typeError("Las grasas deben ser un número")
    .required("Las grasas son obligatorias"),
});

const Traker = () => {
  const [data, setData] = useState([
    { date: "2024-10-11", items: [] },
    { date: "2024-10-12", items: [] },
    { date: "2024-10-13", items: [] },
  ]);
  const [expandedDates, setExpandedDates] = useState({});
  const [newDate, setNewDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addItem = (formData) => {
    setData((prevData) =>
      prevData.map((day) =>
        day.date === currentDate
          ? {
              ...day,
              items: [
                ...day.items,
                {
                  id: Date.now().toString(),
                  ...formData, // Aquí se añaden los datos del formulario
                  image: newItemImage,
                },
              ],
            }
          : day,
      ),
    );
    reset(); // Limpiar el formulario después de añadir el item
    setNewItemImage(null);
    setModalVisible(false);
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
              <Pressable
                onPress={() => toggleExpand(item.date)}
                style={styles.dateHeaderButton}
              >
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.toggleIcon}>
                  {expandedDates[item.date] ? "-" : "+"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => deleteDate(item.date)}
                style={styles.deleteDateButton}
              >
                <Text style={styles.deleteDateText}>Delete</Text>
              </Pressable>
            </View>

            {expandedDates[item.date] && (
              <View style={styles.content}>
                <Pressable
                  style={styles.addButton}
                  onPress={() => openModal(item.date)}
                >
                  <Text style={styles.buttonText}>Add Item</Text>
                </Pressable>

                <FlatList
                  data={item.items}
                  keyExtractor={(subItem) => subItem.id}
                  renderItem={({ item: subItem }) => (
                    <View style={styles.listItem}>
                      {subItem.image && (
                        <Image
                          source={{ uri: subItem.image }}
                          style={styles.itemImage}
                        />
                      )}
                      <Text style={styles.itemText}>{subItem.foodName}</Text>
                      <Pressable
                        onPress={() => deleteItem(item.date, subItem.id)}
                      >
                        <Text style={styles.deleteText}>Delete</Text>
                      </Pressable>
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
            {/* <Text style={styles.modalTitle}>
              Añadir comida para {currentDate}
            </Text> */}

            <Controller
              control={control}
              name="foodName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de la comida"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.foodName && (
              <Text style={styles.errorText}>{errors.foodName.message}</Text>
            )}

            <Controller
              control={control}
              name="calories"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Calorías"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.calories && (
              <Text style={styles.errorText}>{errors.calories.message}</Text>
            )}

            <Controller
              control={control}
              name="proteins"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Proteínas (g)"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.proteins && (
              <Text style={styles.errorText}>{errors.proteins.message}</Text>
            )}

            <Controller
              control={control}
              name="carbs"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Carbohidratos (g)"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.carbs && (
              <Text style={styles.errorText}>{errors.carbs.message}</Text>
            )}

            <Controller
              control={control}
              name="fats"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Grasas (g)"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.fats && (
              <Text style={styles.errorText}>{errors.fats.message}</Text>
            )}

            <View style={styles.imagePickerContainer}>
              <Pressable style={styles.addButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Tomar Foto</Text>
              </Pressable>

              {/* Vista previa de la imagen junto al botón */}
              {newItemImage && (
                <Image
                  source={{ uri: newItemImage }}
                  style={styles.previewImageSmall}
                />
              )}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.addButton}
                onPress={handleSubmit(addItem)}
              >
                <Text style={styles.buttonText}>Añadir Item</Text>
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
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
    width: "40%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
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
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  imagePickerContainer: {
    flexDirection: "row",
    alignItems: "center", // Alinea la imagen y el botón verticalmente
    marginBottom: 20,
  },
  previewImageSmall: {
    width: 50, // Ancho de la imagen
    height: 50, // Alto de la imagen
    borderRadius: 5, // Borde redondeado
    marginLeft: 10, // Espacio entre la imagen y el botón
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
});
