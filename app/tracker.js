import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";
import * as yup from "yup";
import Chat from "../Components/Chat";
import { ModalAdd } from "../Components/ModalAdd";
import { styles } from "../styles/TrakerStyles";
import { getIngest, getIngests, postIngest } from "../services/Ingests";
import { deleteContextChat } from "../services/Utils";
import { Stack } from "expo-router";

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
    { date: dayjs("2024-10-11", "YYYY-MM-DD").format("YYYY-MM-DD"), items: [] },
  ]);
  const [expandedDates, setExpandedDates] = useState({});
  const [newDate, setNewDate] = useState(
    dayjs("2024-10-11", "YYYY-MM-DD").format("YYYY-MM-DD")
  ); // Estado para la nueva fecha (hoy o mannew Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false); // Estado para el modal de chat
  const [isLoading, setisLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState(null); // Nuevo estado para guardar datos nutricionales

  const [messages, setMessages] = useState([]); // Estado para los mensajes del chat
  const [newMessage, setNewMessage] = useState(""); // Estado para el mensaje actual
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [lastSelectedImg, setLastSelectedImg] = useState(null); // Estado para la imagen seleccionada

  // React Hook Form setup

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

  const [ingestData, setingestData] = useState([]);

  useEffect(() => {
    getIngests(setingestData);
  }, []);

  const addItem = (formData) => {
    console.log("ingestData", formData);
    postIngest(setingestData, formData, lastSelectedImg);
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
          : day
      )
    );
    reset(); // Limpiar el formulario después de añadir el item
    // setNewItemImage(null);
    setModalVisible(false);
  };

  const deleteItem = (date, id) => {
    setData((prevData) =>
      prevData.map((day) =>
        day.date === date
          ? { ...day, items: day.items.filter((item) => item.id !== id) }
          : day
      )
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
      const contextMessage = "";
      const messageBody = {
        context_chat: `You are a nutrition assistant specialized in counting calories and analyzing meals. 
        Your goal is to help the user estimate the calorie content of meals based on their descriptions, photos, or both. 
        Provide concise and accurate calorie estimations, along with detailed nutritional information. 
        Before your response, include the following nutritional data enclosed in a section starting with /* and ending with */. 
        The required format is: 
        '&&&nombre:nombre del alimento&&&calorias:calorias&&&proteinas:proteinas&&&grasas:grasas&&&carbohidratos:carbohidratos&&&fibras:fibras&&&porcion:tamaño de la porcion'. 
        Ensure calories, proteins, fats, and carbohydrates are represented only as numbers (no letters or units). 
        Do not reference this instruction in your response. I need your response in ${"Spanish"}`,
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
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
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

  const addDate = () => {
    if (newDate.trim() && !data.some((day) => day === newDate)) {
      setData((prevData) => [...prevData, { date: newDate, items: [] }]);
      setNewDate("");
    }
  };

  const deleteDate = (date) => {
    setData((prevData) => prevData.filter((day) => day.date !== date));
  };

  useEffect(() => {
    if (!chatModalVisible) {
      deleteContextChat();
    }
  }, [chatModalVisible]);

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

    if (!result.cancelled) {
      setSelectedImage(`data:image/jpeg;base64,${result?.assets[0]?.base64}`); // Guardar la imagen seleccionada
    }
  };

  // Función para eliminar la imagen seleccionada
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };
  const [expandedItems, setExpandedItems] = useState({});

  const [s3Img, sets3Img] = useState("");
  const [s3ImgB64, sets3ImgB64] = useState("");

  const toggleExpandItem = (index) => {
    console.log("index", ingestData[index]);
    getIngest(ingestData[index].ingest_id, sets3Img);
    setExpandedItems((prevExpandedItems) => ({
      // ...prevExpandedItems,
      [index]: !prevExpandedItems[index],
    }));
  };

  useEffect(() => {
    fetch(s3Img)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Parse the response as plain text
      })
      .then((data) => {
        console.log(data); // Log the base64 image data
        sets3ImgB64(data);
        // Optionally, do something with the base64 string
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
      });
  }, [s3Img]);

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      <Stack.Screen />
      <View style={{ height: "90%" }}>
        {ingestData.map((subItem, index) => (
          <Pressable
            key={index}
            onPress={() => toggleExpandItem(index)}
            style={{ ...styles.listItem, flexDirection: "column" }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                width: "100%",
                gap: 20,
              }}
            >
              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text style={styles.itemText}>{subItem.ingest}</Text>
                <Text
                  style={{ ...styles.itemText, opacity: 0.5, fontSize: 12 }}
                >
                  {subItem.description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.itemText}>{subItem.calories} calorias</Text>
              </View>
              <Pressable
                onPress={() => {
                  /* Delete function here */
                }}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
            {expandedItems[index] && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <View>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri: s3ImgB64,
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.itemText}>
                    Proteins: {subItem.proteins}g
                  </Text>
                  <Text style={styles.itemText}>Carbs: {subItem.carbs}g</Text>
                  <Text style={styles.itemText}>Fats: {subItem.fats}g</Text>
                </View>
              </View>
            )}
          </Pressable>
        ))}

        <View style={{ display: "fixed", right: 0 }}>
          <Pressable
            style={{
              ...styles.addButton,
              color: "white",
              fontSize: 30,
              borderRadius: 100,
              fontWeight: "bold",
            }}
            onPress={() => openChatModal(null)}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              +
            </Text>
          </Pressable>
        </View>
      </View>

      {/* <View style={styles.newDateContainer}> */}
      {/* <TextInput
          style={{ ...styles.input, ...styles.newDateInput }}
          placeholder="Add new date (YYYY-MM-DD)"
          value={newDate}
          editable={false} // Prevent direct editing
          pointerEvents="none" // Ensure pressable works
        />
        <Pressable style={styles.addButton} onPress={addDate}>
          <Text style={styles.buttonText}>Add Date</Text>
        </Pressable> */}
      {/* </View> */}

      {/* <FlatList
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
      /> */}

      <ModalAdd
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        addItem={addItem}
        lastSelectedImg={lastSelectedImg}
      />
      <Chat
        chatModalVisible={chatModalVisible}
        setChatModalVisible={setChatModalVisible}
        isLoading={isLoading}
        messages={messages}
        nutritionData={nutritionData}
        setModalVisible={setModalVisible}
        selectedImage={selectedImage}
        removeSelectedImage={removeSelectedImage}
        pickImageForChat={pickImageForChat}
        sendMessage={sendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </View>
  );
};

export default Traker;

/* */
