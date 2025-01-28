import { router, Stack } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStore } from "../utils/zustan";
import { useEffect, useState } from "react";
import HeaderUser from "../assets/icons/HeaderUser.svg";
import Notification from "../assets/icons/Notification.svg";
import Food from "../Components/Food";
import * as yup from "yup";
import Colors from "../styles/Colors";
import { ProgressBar } from "react-native-paper";
import { Button, ScrollView, TouchableOpacity } from "react-native-web";
import { getIngests, postIngest } from "../services/Ingests";
import { fetchUserData } from "../services/UserData";
import {
  extractNutritionInfo,
  pickImageForChat,
  sendMessage,
} from "../services/Chat";
import { useForm } from "react-hook-form";
import { ModalAdd } from "../Components/ModalAdd";
import Chat from "../Components/Chat";
import { renewToken } from "../services/Utils";
import {
  CopilotProvider,
  CopilotStep,
  useCopilot,
  walkthroughable,
} from "react-native-copilot";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "../utils/i18n";
import TutorialButton from "../Components/TutorialButton/TutorialButton";
import { fetchDiet } from "../services/Diet";
import UserInfoRectangle from "../Components/UserInfoRectangle";
import MacronutrientsProgress from "../Components/MacronutrientsProgress/MacronutrientsProgress";

const CopilotText = walkthroughable(Text);

export default function Home() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const schema = yup.object().shape({
    foodName: yup.string().required(t("validation.required.foodName")),
    calories: yup.number().required(t("validation.required.calories")),
    proteins: yup.number().required(t("validation.required.proteins")),
    carbs: yup.number().required(t("validation.required.carbs")),
    fats: yup.number().required(t("validation.required.fats")),
  });

  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  const [ingestData, setIngestData] = useState([]);
  const [userData, setUserData] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [dietData, setdietData] = useState({});

  const [messages, setMessages] = useState([]); // Estado para los mensajes del chat
  const [newMessage, setNewMessage] = useState(""); // Estado para el mensaje actual
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [lastSelectedImg, setLastSelectedImg] = useState(null); // Estado para la imagen seleccionada
  const [chatModalVisible, setChatModalVisible] = useState(false); // Estado para el modal de chat
  const [nutritionData, setNutritionData] = useState(null); // Nuevo estado para guardar datos nutricionales

  const [loadingIngest, setloadingIngest] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const addItem = (formData) => {
    postIngest(setIngestData, formData, formData.image);
    reset(); // Limpiar el formulario después de añadir el item
    // setNewItemImage(null);
    setModalVisible(false);
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    fetchUserData(setUserData, setisLoading);
    setHeaderVisible(false);
    fetchDiet(setdietData, setisLoading);

    setNavigationVisible(true);
    getIngests(setIngestData, null, setloadingIngest);
    return () => {
      setHeaderVisible(true);
    };
  }, []);

  useEffect(() => {
    // Calcular totales cuando cambie ingestData
    const calculateTotals = () => {
      const totals = ingestData.reduce(
        (sum, ingest) => {
          // Solo sumar las ingestas de los últimos 7 días
          if (moment().diff(ingest.date, "days") === 0) {
            return {
              calories: sum.calories + (Number(ingest.calories) || 0),
              proteins: sum.proteins + (Number(ingest.proteins) || 0),
              fats: sum.fats + (Number(ingest.fats) || 0),
              carbs: sum.carbs + (Number(ingest.carbs) || 0),
            };
          }
          return sum;
        },
        { calories: 0, proteins: 0, fats: 0, carbs: 0 }
      );

      setTotalCalories(totals.calories);
      setTotalProteins(totals.proteins);
      setTotalFats(totals.fats);
      setTotalCarbs(totals.carbs);
    };

    calculateTotals();
  }, [ingestData]);

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

  const openChatModal = (date) => {
    setCurrentDate(date);
    setMessages([]);
    setLastSelectedImg(null);
    setChatModalVisible(true);
  };
  const { start } = useCopilot();

  const CustomComponents = ({ copilot, children }) => (
    <View {...copilot}>{children}</View>
  );
  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.Color4 }}>
        <View
          style={{
            ...styles.container,
            paddingTop: insets.top || 30,
            backgroundColor: Colors.Color4,
            paddingHorizontal: 36,
          }}
        >
          <Stack.Screen />

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <CopilotStep text={t("tutorial.header")} order={1} name="header">
              <CustomComponents>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: Colors.Color2,
                    fontSize: 20,
                  }}
                >
                  {t("greeting", { username: userData?.username })}
                </Text>
              </CustomComponents>
            </CopilotStep>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Image style={{ width: 14, height: 18 }} source={Notification} />
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Image style={{ width: 14, height: 18 }} source={HeaderUser} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingVertical: 24, paddingTop: 0, width: "100%" }}>
            <UserInfoRectangle
              weight={userData?.weight}
              age={userData?.age}
              height={userData?.height}
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.Color1,
                fontSize: 20,
                marginBottom: 12,
              }}
            >
              {t("today")}
            </Text>
            <CopilotStep text={t("tutorial.macros")} order={2} name="macros">
              <CustomComponents>
                <MacronutrientsProgress
                  totalProteins={totalProteins}
                  totalFats={totalFats}
                  totalCarbs={totalCarbs}
                  totalCalories={totalCalories}
                  targetProteins={dietData.proteins}
                  targetFats={dietData.fats}
                  targetCarbs={dietData.carbs}
                  targetCalories={dietData.calories}
                />
              </CustomComponents>
            </CopilotStep>
          </View>

          <View
            style={{
              marginTop: 32,
              // flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: Colors.Color1,
                  fontSize: 20,
                  fontWeight: "bold",
                  flex: 1,
                }}
              >
                {t("ingests.title")}
              </Text>
              <CopilotStep text={t("tutorial.add")} order={4} name="add">
                <CustomComponents>
                  <TouchableOpacity
                    onPress={() => {
                      openChatModal(null);
                      if (!modalOpened) setModalOpened(true);
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Color1,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </CustomComponents>
              </CopilotStep>
            </View>
            {!loadingIngest ? (
              <CopilotStep text={t("tutorial.hoy")} order={3} name="hoy">
                <CustomComponents>
                  <View>
                    {ingestData.map((ingest, index) => {
                      return (
                        moment().diff(ingest.date, "days") === 0 && (
                          <Food
                            key={`${index}-${ingest.ingest_id}`} // Agregamos la propiedad key única
                            title={ingest.ingest}
                            calories={ingest.calories}
                            s3Img={ingest.signed_url}
                            stimatedTime={ingest.stimatedTime}
                            linkeable={false}
                            description={ingest.description}
                          />
                        )
                      );
                    })}
                  </View>
                </CustomComponents>
              </CopilotStep>
            ) : (
              <View style={{ padding: 20, alignItems: "center" }}>
                <ActivityIndicator size="large" color={Colors.Color1} />
              </View>
            )}
          </View>
        </View>
        {modalVisible && (
          <ModalAdd
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            control={control}
            handleSubmit={handleSubmit}
            errors={errors}
            addItem={addItem}
            lastSelectedImg={lastSelectedImg}
            nutritionData={nutritionData}
            enableGenerateImg={true}
            setNutritionData={setNutritionData}
          />
        )}
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
      </ScrollView>
      <TutorialButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
