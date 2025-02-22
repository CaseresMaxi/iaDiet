import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Image, Pressable, Text, View, ActivityIndicator } from "react-native";
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
import { useTranslation } from "react-i18next";
import TutorialButton from "../Components/TutorialButton/TutorialButton";
import {
  CopilotProvider,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
import Colors from "../styles/Colors";
import Button from "../Components/Button/Button";

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

const schema = yup.object().shape({
  foodName: yup.string().required("El nombre de la comida es obligatorio"),
  calories: yup.number().required("Las calorías son obligatorias"),
  proteins: yup.number().required("Las proteínas son obligatorias"),
  carbs: yup.number().required("Los carbohidratos son obligatorios"),
  fats: yup.number().required("Las grasas son obligatorias"),
});

const CustomComponents = ({ copilot, children }) => (
  <View {...copilot}>{children}</View>
);

const Tracker = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([
    { date: dayjs("2024-10-11", "YYYY-MM-DD").format("YYYY-MM-DD"), items: [] },
  ]);
  const [expandedDates, setExpandedDates] = useState({});
  const [newDate, setNewDate] = useState(
    dayjs("2024-10-11", "YYYY-MM-DD").format("YYYY-MM-DD")
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  // const [chatModalVisible, setChatModalVisible] = useState(false);
  const chatVisible = useStore((state) => state.chatVisible);
  const setChatVisible = useStore((state) => state.setChatVisible);
  const [isLoading, setisLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [ingestData, setIngestData] = useState([]);
  const [loadingIngest, setloadingIngest] = useState(true);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastSelectedImg, setLastSelectedImg] = useState(null);

  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  const triggerCamera = useStore((state) => state.triggerCamera);
  const setTriggerCamera = useStore((state) => state.setTriggerCamera);

  useEffect(() => {
    setNavigationVisible(true);
    setHeaderTitle("Tracker");
    setHeaderVisible(true);
    getIngests(
      (data) => {
        setIngestData(data);
        setloadingIngest(false);
        const grouped = data.reduce((acc, item) => {
          const date = dayjs(item.date).format("YYYY-MM-DD");
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {});
        setGroupedData(grouped);
      },
      null,
      setloadingIngest
    );
    return () => {
      setHeaderVisible(false);
    };
  }, []);

  useEffect(() => {
    if (triggerCamera) {
      handleCameraAndChat();
      setTriggerCamera(false);
    }
  }, [triggerCamera]);

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
    setloadingIngest(true);
    postIngest(
      (data) => {
        setIngestData(data);
        const grouped = data.reduce((acc, item) => {
          const date = dayjs(item.date).format("YYYY-MM-DD");
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {});
        setGroupedData(grouped);
        setloadingIngest(false);
      },
      formData,
      formData.image
    );
    reset();
    setModalVisible(false);
  };

  // const deleteItem = (date, id) => {
  //   setData((prevData) =>
  //     prevData.map((day) =>
  //       day.date === date
  //         ? { ...day, items: day.items.filter((item) => item.id !== id) }
  //         : day
  //     )
  //   );
  // };

  const handleCameraAndChat = async () => {
    try {
      const imageResult = await pickImageForChat(setSelectedImage);
      if (imageResult) {
        setSelectedImage(imageResult);
        setMessages([]);
        setLastSelectedImg(null);
        setisLoading(true);
        await sendMessage(
          setNutritionData,
          "",
          imageResult,
          setMessages,
          setNewMessage,
          setLastSelectedImg,
          setSelectedImage,
          setisLoading
        );
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error en el proceso de cámara y chat:", error);
    } finally {
      setisLoading(false);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };
  const memoFood = useMemo(() => {
    return (
      <View style={{ height: "100%", flexDirection: "column-reverse" }}>
        {!loadingIngest ? (
          Object.keys(groupedData).map((date, index) => (
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
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 50,
            }}
          >
            <ActivityIndicator size="large" color={Colors.Color1} />
          </View>
        )}
      </View>
    );
  }, [loadingIngest, groupedData]);
  return (
    <>
      <TutorialButton />

      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ActivityIndicator size="large" color={Colors.Color1} />
          <Text style={{ color: Colors.Font2, marginTop: 10, fontSize: 16 }}>
            Analizando imagen...
          </Text>
        </View>
      )}

      <ScrollView style={{ ...styles.container }}>
        <>
          <Stack.Screen />
          <CopilotStep
            text={t("tutorial.addButton")}
            order={1}
            name="addButton"
          >
            <CustomComponents>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center !important",
                  marginBottom: 20,
                  justifyContent: "center !important",
                  gap: 10,
                }}
              >
                <Pressable
                  style={{
                    ...styles.addButton,
                    color: "white",
                    fontSize: 30,
                    borderRadius: 100,
                    fontWeight: "bold",
                  }}
                  onPress={handleCameraAndChat}
                >
                  <Text
                    style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                  >
                    +
                  </Text>
                </Pressable>
                <Button
                  text="💬"
                  width={50}
                  type="secondary"
                  style={{
                    // ...styles.addButton,
                    // width: "50px !important",
                    backgroundColor: Colors.Color2,
                    borderColor: Colors.Color2,
                  }}
                  onClick={() => {
                    setMessages([]);
                    setChatVisible(true);
                    deleteContextChat();
                  }}
                />
              </View>
            </CustomComponents>
          </CopilotStep>

          <CopilotStep
            text={t("tutorial.historyList")}
            order={2}
            name="historyList"
          >
            <CustomComponents>{memoFood}</CustomComponents>
          </CopilotStep>

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
            chatModalVisible={chatVisible}
            setChatModalVisible={setChatVisible}
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
    </>
  );
};

export default () => (
  <CopilotProvider>
    <Tracker />
  </CopilotProvider>
);
