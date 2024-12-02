import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchDiet } from "../services/Diet";
import Button from "../Components/Button/Button";
import Chat from "../Components/Chat";
import { useStore } from "../utils/zustan";
import MealPlans from "../assets/icons/MealPlans.svg";
import Colors from "../styles/Colors";
import Food from "../Components/Food";
import { styles } from "../styles/DietStyles";
import { deleteContextChat } from "../services/Utils";
import DietSkeletonCard from "../Components/DietsSkeletonCard";

export default function Diet() {
  const insets = useSafeAreaInsets();

  const [dietData, setdietData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [chatOpen, setChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newDiet, setnewDiet] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);

  useEffect(() => {
    setHeaderTitle("Diet");
    loadDietData(); // Llama a la función para cargar las dietas
  }, []);

  const loadDietData = async () => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      await fetchDiet(setdietData); // Llama al servicio para obtener los datos
    } catch (error) {
      console.error("Error al cargar dietas:", error);
    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  };

  const addDiet = async () => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const response = await fetch("http://54.198.190.149:5000/diets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user_id: window.sessionStorage.getItem("user_id"),
          foods: newDiet,
        }),
      });
      const data = await response.json();
      console.log(data, "dietData");
      await loadDietData(); // Recarga las dietas
    } catch (error) {
      console.error("Error al agregar dieta:", error);
    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const sendMessage = async () => {
    setnewDiet(null);
    if (newMessage.trim()) {
      const contextMessage = "";
      const messageBody = {
        context_chat: `Lo que se está enviando aquí es en el contexto de una aplicación para crear dietas personalizadas...`,
        message: `${contextMessage}\n${newMessage}`,
        images: [],
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: newMessage,
          image: null,
          isBot: false,
        },
      ]);

      setIsChatLoading(true);

      try {
        const response = await fetch("http://54.198.190.149:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(messageBody),
        });
        if (response.ok) {
          const data = await response.json();
          setnewDiet(extractDietData(data.response));

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: `${Date.now().toString()}-res`,
              text: data.response?.replace(/&&&[\s\S]*?&&&/g, "")?.trim(),
              isBot: true,
            },
          ]);
        } else {
          console.error("Error al enviar el mensaje:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }

      setIsChatLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        ...styles.container,
        paddingTop: 60,
        paddingBottom: insets.bottom,
      }}
    >
      {isLoading ? (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* <Text style={{ fontSize: 18, color: Colors.Font2 }}> */}
          <DietSkeletonCard />
          <DietSkeletonCard />
          <DietSkeletonCard />
          <DietSkeletonCard />

          {/* </Text> */}
        </View>
      ) : (
        <>
          {!dietData?.foods && (
            <View style={{ height: "100%", justifyContent: "center" }}>
              <View style={styles.headerContainer}>
                <Image source={MealPlans} />
                <Text style={styles.header}>Meal Plans</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 65,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.Font2,
                    fontSize: 20,
                  }}
                >
                  Access your personalized meal plans and get healthy
                  recommendations...
                </Text>
              </View>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Button
                  text="Open Chat"
                  width={250}
                  type={"secondary"}
                  onClick={() => {
                    setMessages([]);
                    setChatOpen(true);
                    deleteContextChat();
                  }}
                />
              </View>
            </View>
          )}
          {dietData?.foods && (
            <View style={{ height: "fit-content" }}>
              {Object.keys(dietData.foods).map((meal) => (
                <Food
                  dietId={dietData?.diet_id}
                  meal={meal}
                  key={meal}
                  stimatedTime={dietData.foods[meal]?.tiempo_estimado}
                  title={dietData.foods[meal]?.title}
                  ingredients={dietData.foods[meal]?.ingredientes}
                  description={dietData.foods[meal]?.description}
                  calories={dietData.foods[meal]?.calorias}
                  instructions={dietData.foods[meal]?.instrucciones}
                />
              ))}
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Button
                  text="Open Chat"
                  width={250}
                  type={"secondary"}
                  onClick={() => {
                    setMessages([]);
                    setChatOpen(true);
                    deleteContextChat();
                  }}
                />
              </View>
            </View>
          )}
        </>
      )}
      <Chat
        chatModalVisible={chatOpen}
        setChatModalVisible={setChatOpen}
        isLoading={isChatLoading}
        messages={messages}
        nutritionData={newDiet}
        setModalVisible={() => {
          addDiet();
        }}
        disabledImgPicker
        selectedImage={selectedImage}
        removeSelectedImage={removeSelectedImage}
        sendMessage={sendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </ScrollView>
  );
}
