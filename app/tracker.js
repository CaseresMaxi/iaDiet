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
import { getIngests, postIngest } from "../services/Ingests";
import { deleteContextChat } from "../services/Utils";
import { Stack } from "expo-router";
import { useStore } from "../utils/zustan";
import Food from "../Components/Food";
import {
  pickImageForChat,
  sendMessage,
  extractNutritionInfo,
} from "../services/Chat";
import { FlatList, ScrollView } from "react-native-web";

const schema = yup.object().shape({
  foodName: yup.string().required("El nombre de la comida es obligatorio"),
  calories: yup.number().required("Las calorías son obligatorias"),
  proteins: yup.number().required("Las proteínas son obligatorias"),
  carbs: yup.number().required("Los carbohidratos son obligatorios"),
  fats: yup.number().required("Las grasas son obligatorias"),
});

const Tracker = () => {
  const [data, setData] = useState([
    { date: dayjs("2024-10-11", "YYYY-MM-DD").format("YYYY-MM-DD"), items: [] },
  ]);
  const [expandedDates, setExpandedDates] = useState({});
  const [newDate, setNewDate] = useState(
    dayjs("2024-10-11", "YYYY-MM-DD").format("YYYY-MM-DD")
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [ingestData, setIngestData] = useState([]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastSelectedImg, setLastSelectedImg] = useState(null);

  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setHeaderVisible = useStore((state) => state.setHeaderVisible);

  useEffect(() => {
    setNavigationVisible(true);
    setHeaderTitle("Tracker");
    setHeaderVisible(true);
    getIngests((data) => {
      setIngestData(data);
      const grouped = data.reduce((acc, item) => {
        const date = dayjs(item.date).format("YYYY-MM-DD");
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {});
      setGroupedData(grouped);
    });
  }, []);

  useEffect(() => {
    console.log("grouped", groupedData);
  }, [groupedData]);

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
    postIngest(setIngestData, formData, formData.image);
    setData((prevData) =>
      prevData.map((day) =>
        day.date === currentDate
          ? {
              ...day,
              items: [
                ...day.items,
                {
                  id: Date.now().toString(),
                  ...formData,
                  image: formData.image,
                },
              ],
            }
          : day
      )
    );
    reset();
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

  const openChatModal = (date) => {
    setCurrentDate(date);
    setMessages([]);
    setLastSelectedImg(null);
    setChatModalVisible(true);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView style={{ ...styles.container }}>
      <>
        <Stack.Screen />
        <View style={{ display: "fixed", right: 0 }}>
          <Pressable
            style={{
              ...styles.addButton,
              color: "white",
              fontSize: 30,
              borderRadius: 100,
              fontWeight: "bold",
            }}
            onPress={() => {
              openChatModal(null);
            }}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              +
            </Text>
          </Pressable>
        </View>

        <View style={{ height: "100%", flexDirection: "column-reverse" }}>
          {Object.keys(groupedData).map((date, index) => (
            <View key={`${date}-${index}`} style={styles.dayContainer}>
              <View style={styles.dateContainer}>
                <View style={styles.dateHeader}>
                  <Text style={styles.dateText}>{date}</Text>
                </View>
              </View>
              <FlatList
                data={groupedData[date]}
                keyExtractor={(item) => `${item.id}+${Math.random()}`}
                renderItem={({ item, index }) => (
                  <Food
                    key={`${item.id}+ ${index}`}
                    title={item.ingest}
                    linkeable={false}
                    s3Img={item.signed_url}
                    {...item}
                  />
                )}
              />
            </View>
          ))}
        </View>

        <ModalAdd
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          addItem={addItem}
          lastSelectedImg={lastSelectedImg}
          nutritionData={nutritionData}
          setNutritionData={setNutritionData}
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
          pickImageForChat={() => pickImageForChat(setSelectedImage)}
          sendMessage={() =>
            sendMessage(
              setNutritionData,
              newMessage,
              selectedImage,
              setMessages,
              setNewMessage,
              setLastSelectedImg,
              setSelectedImage,
              setisLoading,
              extractNutritionInfo
            )
          }
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </>
    </ScrollView>
  );
};

export default Tracker;
