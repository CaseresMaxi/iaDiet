import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect } from "@react-navigation/native";
import { Stack } from "expo-router";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import * as yup from "yup";
import Notification from "../assets/icons/Notification.svg";
import AdPopup from "../Components/Ads/AdPopup";
import AdPopupService from "../Components/Ads/AdPopupService";
import AdsterraAd from "../Components/Ads/AdsterraAd";
import Chat from "../Components/Chat";
import Food from "../Components/Food";
import MacronutrientsProgress from "../Components/MacronutrientsProgress/MacronutrientsProgress";
import TutorialButton from "../Components/TutorialButton/TutorialButton";
import UserInfoRectangle from "../Components/UserInfoRectangle";
import {
  extractNutritionInfo,
  pickImageForChat,
  sendMessage,
} from "../services/Chat";
import { fetchDiet } from "../services/Diet";
import { getIngests, postIngest } from "../services/Ingests";
import { fetchUserData } from "../services/UserData";
import Colors from "../styles/Colors";
import "../utils/i18n";
import { useStore } from "../utils/zustan";

const CopilotText = walkthroughable(Text);

// Opciones para el anuncio en el popup
// const popupAdOptions = `{
// 'key' : '042516d131fbac62d6201e74af0f4f8f',
// 		'format' : 'iframe',
// 		'height' : 90,
// 		'width' : 728,
// 		'params' : {}
// 	}`;
const shouldShowPopup = () => {
  return Math.floor(Math.random() * 5) === 0; // 20% de probabilidad (1 de 5)
};

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
  // const [userData, setUserData] = useState();
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);
  const [isLoading, setisLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  // const [dietData, setDietData] = useState({});
  const dietData = useStore((state) => state.dietData);
  const setDietData = useStore((state) => state.setDietData);

  const [messages, setMessages] = useState([]); // Estado para los mensajes del chat
  const [newMessage, setNewMessage] = useState(""); // Estado para el mensaje actual
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [lastSelectedImg, setLastSelectedImg] = useState(null); // Estado para la imagen seleccionada
  // const [chatModalVisible, setChatModalVisible] = useState(false); // Estado para el modal de chat
  const chatVisible = useStore((state) => state.chatVisible);
  const setChatVisible = useStore((state) => state.setChatVisible);
  const setGoBackVisible = useStore((state) => state.setGoBackVisible);
  const [nutritionData, setNutritionData] = useState(null); // Nuevo estado para guardar datos nutricionales

  const [loadingIngest, setloadingIngest] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(true);

  const addItem = (formData) => {
    setloadingIngest(true);
    postIngest(
      (data) => {
        setIngestData(data);
        // Recalcular totales inmediatamente después de actualizar los datos
        const totals = data.reduce(
          (sum, ingest) => {
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
        setloadingIngest(false);
      },
      formData,
      formData.image
    );
    reset();
    setModalVisible(false);
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    setHeaderVisible(false);
    fetchUserData(setUserData, setisLoading);
    fetchDiet(setDietData, setisLoading);

    setNavigationVisible(true);
    getIngests(setIngestData, null, setloadingIngest);
    setGoBackVisible(true);

    return () => {
      setHeaderVisible(true);
      setGoBackVisible(true);
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

  const CustomComponents = ({ copilot, children }) => (
    <View {...copilot}>{children}</View>
  );
  //TODO: ESTA PORONGA SIGUE HACEINDO EL FETCH DE LAS IMAGENES LA REPUTA MADRE QUE ME PARIO, DESPUES LO ARREGLO
  const memoizedFoodList = useMemo(() => {
    return (
      <View style={{ marginBottom: 50 }}>
        {ingestData.map((ingest, index) => {
          // console.log(moment().diff(ingest.date, "days"), "diff");
          return (
            moment().diff(ingest.date, "days") === 0 && (
              <Food
                key={`${index}-${ingest.ingest_id}`}
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
    );
  }, [ingestData]);

  const loadingView = useMemo(
    () => (
      <View style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.Color1} />
      </View>
    ),
    []
  );

  const MemoizedChat = useMemo(
    () => (
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
    ),
    [chatVisible, isLoading, messages, nutritionData, selectedImage, newMessage]
  );

  const handleOpenChat = useCallback(() => {
    openChatModal(null);
    if (!modalOpened) setModalOpened(true);
  }, [modalOpened]);

  // Datos de prueba para el gráfico de peso
  const weightData = {
    labels: ["1 Ene", "15 Ene", "1 Feb", "15 Feb", "1 Mar", "15 Mar"],
    datasets: [
      {
        data: [75, 74.5, 73.8, 73.2, 72.5, 72],
        color: (opacity = 1) => Colors.Color1,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: Colors.Color6,
    backgroundGradientFrom: Colors.Color6,
    backgroundGradientTo: Colors.Color6,
    decimalPlaces: 1,
    color: (opacity = 1) => Colors.Color1,
    labelColor: (opacity = 1) => Colors.Font2,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: Colors.Color1,
    },
  };

  // Inicializar el servicio de anuncios
  useEffect(() => {
    // Configuración personalizada para los popups
    const adConfig = {
      minTimeBetweenPopups: 3, // 3 minutos entre popups
      showOnFirstVisit: true, // Mostrar en primera visita
      maxPopupsPerSession: 5, // Máximo 5 popups por sesión
      initialDelay: 15, // 15 segundos antes del primer popup
    };

    // Inicializar el servicio con callback para mostrar/ocultar el popup
    AdPopupService.init(adConfig, (shouldShow) => {
      setShowAdPopup(shouldShow);
    });

    return () => {
      // No es necesario limpiar nada aquí, el servicio es un singleton
    };
  }, []);

  // Manejar el cierre del popup
  const handleCloseAdPopup = () => {
    setShowAdPopup(false);
  };
  useFocusEffect(
    useCallback(() => {
      // Determinar si mostrar el popup cuando la pantalla obtiene el foco
      setShowAdPopup(shouldShowPopup());
    }, [])
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
              {/* <TouchableOpacity onPress={() => router.push("/profile")}>
                <Image style={{ width: 14, height: 18 }} source={HeaderUser} />
              </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              paddingVertical: 24,
              paddingTop: 0,

              width: "100%",
            }}
          >
            <View style={{ marginBottom: 12 }}>
              <UserInfoRectangle
                weight={userData?.current_weight || 0}
                age={userData?.age}
                height={userData?.height}
                userData={userData}
                setUserData={setUserData}
              />
            </View>
            <View style={{ marginVertical: 0 }}>
              <AdsterraAd
                options={`{
		'key' : 'f255d145b8b2ade65ac202c2eca1dd34',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	}`}
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
                    totalProteins={totalProteins || 0}
                    totalFats={totalFats || 0}
                    totalCarbs={totalCarbs || 0}
                    totalCalories={totalCalories || 0}
                    targetProteins={dietData.proteins || 0}
                    targetFats={dietData.fats || 0}
                    targetCarbs={dietData.carbs || 0}
                    targetCalories={dietData.calories || 0}
                  />
                </CustomComponents>
              </CopilotStep>
            </View>

            <View
              style={{
                marginTop: 12,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: Colors.Color1,
                    fontSize: 20,
                  }}
                >
                  {t("weight.history")}
                </Text>
                {userData?.weight && userData.weight.length > 0 && (
                  <View style={styles.chartContainer}>
                    <LineChart
                      data={{
                        labels: userData.weight
                          .filter((item) => {
                            // Mantener tanto objetos con fecha como números (formato antiguo)
                            return (
                              (typeof item === "object" && item.date) ||
                              typeof item === "number"
                            );
                          })
                          .map((item, index) => {
                            if (typeof item === "object" && item.date) {
                              // Para nuevas entradas con formato objeto
                              const date = new Date(item.date);
                              return `${date.getDate()}/${date.getMonth() + 1}`;
                            } else {
                              // Para entradas antiguas (números), usar índice
                              return `${index + 1}`;
                            }
                          }),
                        datasets: [
                          {
                            data: userData.weight
                              .filter((item) => {
                                // Mantener tanto objetos con fecha como números (formato antiguo)
                                return (
                                  (typeof item === "object" && item.date) ||
                                  typeof item === "number"
                                );
                              })
                              .map((item) => {
                                // Extraer el peso dependiendo del formato
                                return typeof item === "object"
                                  ? item.weight
                                  : item;
                              }),

                            color: (opacity = 1) => {
                              // Color principal de la aplicación con opacidad
                              return `${Colors.Color1}${Math.floor(
                                opacity * 255
                              )
                                .toString(16)
                                .padStart(2, "0")}`;
                            },
                            strokeWidth: 3,
                          },
                        ],
                      }}
                      width={Dimensions.get("window").width - 80}
                      height={220}
                      chartConfig={{
                        backgroundColor: "transparent",
                        backgroundGradientFrom: "transparent",
                        backgroundGradientTo: "transparent",
                        decimalPlaces: 1,
                        color: (opacity = 1) => Colors.Font2,
                        labelColor: (opacity = 1) => Colors.Font2,
                        style: {
                          borderRadius: 16,
                        },
                        propsForLabels: {
                          fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                          fontWeight: "400",
                          fill: Colors.Font2,
                          // fontFamily: "inherit",
                        },
                        propsForDots: {
                          r: "4",
                          strokeWidth: "0",
                          stroke: Colors.Color1,
                          fill: Colors.Color1,
                        },
                        strokeWidth: 2,
                        useShadowColorFromDataset: false,
                        yAxisWidth: 45,
                      }}
                      style={{
                        marginVertical: 16,
                        borderRadius: 16,
                      }}
                      bezier
                      withInnerLines={false}
                      withOuterLines={true}
                      withVerticalLines={false}
                      withHorizontalLines={true}
                      withDots={true}
                      withShadow
                      yAxisSuffix=" kg"
                    />
                  </View>
                )}
              </View>
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
                {/* <CopilotStep text={t("tutorial.add")} order={4} name="add">
                    <CustomComponents>
                      <TouchableOpacity onPress={handleOpenChat}>
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
                  </CopilotStep> */}
              </View>
              <CopilotStep text={t("tutorial.hoy")} order={3} name="hoy">
                <CustomComponents>
                  {loadingIngest ? loadingView : memoizedFoodList}
                </CustomComponents>
              </CopilotStep>
            </View>
          </View>
        </View>
      </ScrollView>
      <TutorialButton />

      {/* <AdPopup
        isVisible={showAdPopup}
        onClose={handleCloseAdPopup}
        adOptions={popupAdOptions}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  chartContainer: {
    marginTop: 16,
    padding: "16 16 16 0",
    backgroundColor: Colors.Color6,
    borderRadius: 12,
    overflow: "hidden",
  },
  chartTitle: {
    color: Colors.Font2,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    paddingHorizontal: 12,
  },
});
