import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
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
import DotTypingAnimation from "../Components/DotTyping";
import DateTimePicker from "react-native-ui-datepicker";
import moment from "moment/moment";

// Esquema de validación con Yup
const schema = yup.object().shape({
  foodName: yup.string().required("El nombre de la comida es obligatorio"),
  calories: yup
    .number()
    // .typeError("Las calorías deben ser un número")
    .required("Las calorías son obligatorias"),
  proteins: yup
    .number()
    // .typeError("Las proteínas deben ser un número")
    .required("Las proteínas son obligatorias"),
  carbs: yup
    .number()
    // .typeError("Los carbohidratos deben ser un número")
    .required("Los carbohidratos son obligatorios"),
  fats: yup
    .number()
    // .typeError("Las grasas deben ser un número")
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
  const [chatModalVisible, setChatModalVisible] = useState(false); // Estado para el modal de chat
  const [isLoading, setisLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState(null); // Nuevo estado para guardar datos nutricionales

  const [messages, setMessages] = useState([]); // Estado para los mensajes del chat
  const [newMessage, setNewMessage] = useState(""); // Estado para el mensaje actual
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [lastSelectedImg, setLastSelectedImg] = useState(null); // Estado para la imagen seleccionada

  // React Hook Form setup

  useEffect(() => {
    console.log("nutritionData", nutritionData);
  }, [nutritionData]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      foodName: "",
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
    },
  });

  // Prellenar el formulario cuando nutritionData y modalVisible cambian
  useEffect(() => {
    if (nutritionData && modalVisible) {
      setValue("foodName", nutritionData.nombre || "");
      setValue("calories", Number(nutritionData.calorias) || 0);
      setValue("proteins", Number(nutritionData.proteinas) || 0);
      setValue("carbs", Number(nutritionData.carbohidratos) || 0);
      setValue("fats", Number(nutritionData.grasas) || 0);
    }
  }, [nutritionData, modalVisible, setValue]);
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
                  image: lastSelectedImg,
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

  const openChatModal = (date) => {
    setCurrentDate(date);
    setMessages([]);
    setLastSelectedImg(null);
    setChatModalVisible(true);
  };

  const sendMessage = async () => {
    setNutritionData(null);
    if (newMessage.trim() || selectedImage) {
      const contextMessage =
        "Lo que se está enviando aquí es en el contexto de una aplicación para el conteo de calorías. Necesito que seas preciso con la descripción de calorías e ingredientes que tiene las imágenes que te envíe o las descripciones que te dé. Ten en cuenta que necesito que, además de tu respuesta habitual, me envíes antes del mensaje la siguiente información nutricional del alimento encerrada toda esta seccion empara con /* y terminara con */. Necesito nombre del alimento, calorías, proteínas, grasas y carbohidratos, deben ir de la siguiente fomra: '&&&nombre:nombre del alimento&&&calorias: calorias&&&proteinas: proteinas&&&grasas&&&carbohidratos: carbohidratos&&&', recuerda que en las calorais, carbohidratos, rasas y proteinas, solo deben ir numeros, na nada de letras. Es importante que no hagas mención a este texto en tu respuesta, solo envía la información solicitada.";
      const messageBody = {
        message: `${contextMessage}\n${newMessage}`,
        images: selectedImage ? [selectedImage] : [],
      };

      console.log("messageBody", messageBody);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: newMessage,
          image: selectedImage,
          isBot: false,
        },
      ]);

      setNewMessage("");
      if (selectedImage) {
        setLastSelectedImg(selectedImage);
      }
      setSelectedImage(null);

      setisLoading(true);

      try {
        const response = await fetch("http://54.198.190.149:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageBody),
        });
        console.log("response", response);
        if (response.ok) {
          const data = await response.json();
          console.log("Response:", data);

          // Extraer información nutricional
          const nutritionInfo = extractNutritionInfo(data.response);

          // Guardar la información nutricional en el estado y limpiar el mensaje
          setNutritionData(nutritionInfo);
          const cleanMessage = data?.response
            ?.replace(/&&&.*?&&&/g, "")
            ?.replace(/\/\*[^]*?\*\//g, "")
            ?.trim();
          console.log("cleanMessage", cleanMessage);

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: `${Date.now().toString()}-res`,
              text: cleanMessage,
              isBot: true,
            },
          ]);
        } else {
          console.error("Error al enviar el mensaje:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }

      setisLoading(false);
    }
  };

  // Función para extraer información nutricional del mensaje
  const extractNutritionInfo = (responseText) => {
    const nutritionPattern =
      /&&&nombre:(.*?)&&&calorias:(.*?)&&&proteinas:(.*?)&&&grasas:(.*?)&&&carbohidratos:(.*?)&&&/;
    const match = responseText?.match(nutritionPattern);
    if (match) {
      return {
        nombre: match[1].trim(),
        calorias: match[2].trim(),
        proteinas: match[3].trim(),
        grasas: match[4].trim(),
        carbohidratos: match[5].trim(),
      };
    }
    return null;
  };

  // Función para simular una respuesta genérica del "bot"
  const sendBotReply = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: `${Date.now().toString()}-res`,
        text: "Este es un mensaje automático del sistema.",
        isBot: true, // Identificar mensaje como bot
      },
    ]);
  };

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const addDate = () => {
    if (newDate.trim() && !data.some((day) => day.date === newDate)) {
      setData((prevData) => [...prevData, { date: newDate, items: [] }]);
      setNewDate("");
    }
  };

  const onDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setNewDate(formattedDate);
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

  const pickImageForChat = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    console.log("result img", result);

    if (!result.cancelled) {
      setSelectedImage(`data:image/jpeg;base64,${result?.assets[0]?.base64}`); // Guardar la imagen seleccionada
    }
  };

  // Función para eliminar la imagen seleccionada
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.newDateContainer}>
        <Pressable onPress={() => setDatePickerVisible(true)}>
          <TextInput
            style={{ ...styles.input, ...styles.newDateInput }}
            placeholder="Add new date (YYYY-MM-DD)"
            value={newDate}
            editable={false} // Prevent direct editing
            pointerEvents="none" // Ensure pressable works
          />
        </Pressable>
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
                  onPress={() => openChatModal(item.date)}
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
              {/* <Pressable style={styles.addButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Tomar Foto</Text>
              </Pressable> */}

              {lastSelectedImg && (
                <Image
                  source={{ uri: lastSelectedImg }}
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

      <Modal
        transparent={true}
        animationType="slide"
        visible={chatModalVisible}
        onRequestClose={() => setChatModalVisible(false)}
      >
        <View style={styles.modalCenteredContainer}>
          <View style={styles.chatModalFixedContent}>
            <FlatList
              data={
                isLoading
                  ? [...messages, { id: "loading", isBot: true }]
                  : messages
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>
                item.id === "loading" ? (
                  <View style={styles.chatMessageContainer}>
                    <DotTypingAnimation />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.chatMessageContainer,
                      item.isBot ? styles.botMessage : styles.userMessage,
                    ]}
                  >
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.messageImage}
                      />
                    )}
                    <Text style={styles.messageText}>{item.text}</Text>
                    {nutritionData && (
                      <Pressable
                        style={styles.openModalButton}
                        onPress={() => {
                          setChatModalVisible(false);
                          setModalVisible(true);
                        }}
                      >
                        <Text style={styles.openModalButtonText}>
                          Abrir Modal
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )
              }
            />

            {selectedImage && (
              <View style={styles.selectedImageContainer}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
                <Pressable
                  style={styles.removeImageButton}
                  onPress={removeSelectedImage}
                >
                  <Text style={styles.removeImageButtonText}>✖</Text>
                </Pressable>
              </View>
            )}

            <View style={styles.chatInputContainer}>
              <Pressable
                style={styles.imagePickerButton}
                onPress={pickImageForChat}
              >
                <Text style={styles.imagePickerButtonText}>📷</Text>
              </Pressable>
              <TextInput
                style={styles.chatInput}
                placeholder="Escribe tu mensaje..."
                value={newMessage}
                onChangeText={setNewMessage}
              />
              <Pressable style={styles.chatSendButton} onPress={sendMessage}>
                <Text style={styles.sendButtonText}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Traker;

/* */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#181A20", // Fondo oscuro
  },
  newDateInput: {
    width: "100%",
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#1E2028", // Fondo oscuro para inputs
    color: "#FFFFFF", // Texto en blanco
  },
  newDateContainer: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderRadius: 15,
    overflow: "hidden",
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E2028", // Fondo oscuro
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
    color: "#FFFFFF", // Texto blanco
  },
  toggleIcon: {
    fontSize: 20,
    marginLeft: 10,
    color: "#FFFFFF", // Icono en blanco
  },
  deleteDateButton: {
    backgroundColor: "#FF4D4F", // Color rojo para eliminar
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteDateText: {
    color: "#FFFFFF", // Texto blanco en el botón de eliminar
  },
  content: {
    padding: 15,
    backgroundColor: "#1E2028", // Fondo oscuro para el contenido
  },
  input: {
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#1E2028", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#7F56DA", // Botón morado
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
    width: "40%",
  },
  buttonText: {
    color: "#FFFFFF", // Texto en blanco
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#1E2028", // Fondo oscuro para los items
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
    color: "#FFFFFF", // Texto blanco
  },
  deleteText: {
    color: "#FF4D4F", // Texto rojo para eliminar
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo transparente oscuro
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#1E2028", // Fondo oscuro para el modal
    borderRadius: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  previewImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 10,
  },
  errorText: {
    color: "#FF4D4F", // Texto de error en rojo
    marginBottom: 5,
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "#4E4C67", // Botón gris oscuro
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "40%",
    height: 50,
  },
  modalCenteredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  chatModalFixedContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "#1E2028", // Fondo oscuro para el chat modal
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-between",
  },
  chatMessageContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#282C34",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  botMessage: {
    backgroundColor: "#7F56DA", // Fondo morado para los mensajes del bot
    alignSelf: "flex-start", // Alinear los mensajes del bot a la izquierda
  },
  userMessage: {
    backgroundColor: "#4E4C67", // Fondo gris oscuro para los mensajes del usuario
    alignSelf: "flex-end", // Alinear los mensajes del usuario a la derecha
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: "#FFFFFF", // Texto blanco para los mensajes
  },
  openModalButton: {
    backgroundColor: "#7F56DA", // Botón morado para abrir modal
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  openModalButtonText: {
    color: "#FFFFFF", // Texto en blanco
    fontWeight: "bold",
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#4E4C67", // Borde gris oscuro
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#282C34", // Fondo gris oscuro
    color: "#FFFFFF", // Texto blanco
  },
  chatSendButton: {
    marginLeft: 10,
    backgroundColor: "#7F56DA", // Botón morado para enviar mensajes
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  sendButtonText: {
    color: "#FFFFFF", // Texto en blanco
    fontWeight: "bold",
  },
  imagePickerButton: {
    backgroundColor: "#4E4C67", // Botón gris oscuro para elegir imagen
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  imagePickerButtonText: {
    fontSize: 24,
    color: "#FFFFFF", // Icono blanco para el botón de imagen
  },
  selectedImageContainer: {
    position: "relative",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#282C34", // Fondo gris oscuro para la imagen seleccionada
    padding: 10,
    alignItems: "center",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro translúcido
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageButtonText: {
    color: "#FFFFFF", // Texto blanco para eliminar imagen
    fontSize: 16,
  },
});
