import { router, Stack } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image, StyleSheet, Text, View } from "react-native";
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

const CopilotText = walkthroughable(Text);

export default function Home() {
  const insets = useSafeAreaInsets();
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

  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  const [ingestData, setIngestData] = useState([]);
  const [userData, setUserData] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  const [messages, setMessages] = useState([]); // Estado para los mensajes del chat
  const [newMessage, setNewMessage] = useState(""); // Estado para el mensaje actual
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const [lastSelectedImg, setLastSelectedImg] = useState(null); // Estado para la imagen seleccionada
  const [chatModalVisible, setChatModalVisible] = useState(false); // Estado para el modal de chat
  const [nutritionData, setNutritionData] = useState(null); // Nuevo estado para guardar datos nutricionales

  const [modalVisible, setModalVisible] = useState(false);
  const addItem = (formData) => {
    console.log("formData", formData);
    postIngest(() => {}, formData, formData.image);
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
    setNavigationVisible(true);
    getIngests(setIngestData);
    return () => {
      setHeaderVisible(true);
    };
  }, []);
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

  const CustomComponents = ({ copilot }) => (
    <View {...copilot}>
      <Text>test</Text>
    </View>
  );
  return (
    <ScrollView style={{ backgroundColor: Colors.Color4 }}>
      {/* <View>
        <Button
          title="Start tutorial"
          onPress={() => {
            console.log("start");
            start();
          }}
        />
      </View> */}

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
          <Text
            style={{ fontWeight: "bold", color: Colors.Color2, fontSize: 20 }}
          >
            {`Hello, ${userData?.username}!`}
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Image style={{ width: 14, height: 18 }} source={Notification} />
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image style={{ width: 14, height: 18 }} source={HeaderUser} />
            </TouchableOpacity>
          </View>
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
            Today
          </Text>
          {/* <CopilotStep
            text="This is a hello world example!"
            order={1}
            name="hello"
          >
            <CustomComponents />
          </CopilotStep> */}
          <View
            style={{
              backgroundColor: Colors.Color2,
              height: "fit-content",
              paddingHorizontal: 18,
              paddingVertical: 24,
              borderRadius: 24,
              gap: 8,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // flex: 1,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {/* <View>
              <ProgressBar progress={0.5} title="Carbs" />
            </View> */}
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  300g/600g
                </Text>
                <View style={{ height: 10, width: "80%" }}>
                  <ProgressBar
                    style={{ width: "auto" }}
                    progress={0.6}
                    color={Colors.Font2}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  proteins:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  300g/600g
                </Text>
                <View style={{ height: 10, width: "80%" }}>
                  <ProgressBar
                    style={{ width: "auto" }}
                    progress={0.6}
                    color={Colors.Font2}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  fats:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  300g/600g
                </Text>
                <View style={{ height: 10, width: "80%" }}>
                  <ProgressBar
                    style={{ width: "auto" }}
                    progress={0.6}
                    color={Colors.Font2}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  Carbs:
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Font2,
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                2000/3000
              </Text>
              <View style={{ height: 10, width: "100%" }}>
                <ProgressBar
                  style={{ width: "auto" }}
                  progress={0.6}
                  color={Colors.Font2}
                />
              </View>

              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Font2,
                  fontWeight: 600,
                }}
              >
                Caloeries:
              </Text>
            </View>
          </View>
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
              Your lasts ingests
            </Text>
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
          </View>
          <View>
            {console.log("ingestData", ingestData)}
            {ingestData.map((ingest, index) => (
              <Food
                key={`${index}-${ingest.ingest_id}`} // Agregamos la propiedad key única
                title={ingest.ingest}
                calories={ingest.calories}
                s3Img={ingest.signed_url}
                stimatedTime={ingest.stimatedTime}
                description={ingest.description}
              />
            ))}
          </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
