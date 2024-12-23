import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Food from "../Components/Food";
import { styles } from "../styles/DietStyles";
import Button from "../Components/Button/Button";
import Chat from "../Components/Chat";
import { fetchDiet } from "../services/Diet";
import { deleteContextChat } from "../services/Utils";
import { Image, ScrollView } from "react-native";
import { useStore } from "../utils/zustan";
import MealPlans from "../assets/icons/MealPlans.svg";
import Colors from "../styles/Colors";

export default function Diet() {
  const insets = useSafeAreaInsets();
  const [dietData, setdietData] = useState({});
  const addDiet = () => {
    fetch("http://54.198.190.149:5000/diets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: window.sessionStorage?.getItem("user_id"),
        foods: newDiet,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchDiet(setdietData);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchDiet(setdietData);
  }, []);

  const [chatOpen, setChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const [newMessage, setNewMessage] = useState("");
  const extractDietData = (inputText) => {
    const regex = /&&&(.*?)&&&/s;
    const match = inputText.match(regex);

    if (match && match[1]) {
      try {
        const extractedObject = JSON.parse(match[1]);
        return extractedObject;
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error("No valid JSON found between &&&");
    }
  };

  const [newDiet, setnewDiet] = useState({});
  const sendMessage = async () => {
    setnewDiet(null);
    if (newMessage.trim()) {
      const contextMessage = "";
      const messageBody = {
        context_chat: `Lo que se está enviando aquí es en el contexto de una aplicación para crear dietas personalizadas. neceisto que dividas el mensaje en dos partes, una debe ser un json valido que como key en debe tener cada comida que se esta agregando a la dieta y el valor de cada key debe ser otro objeto que contenga, title, description , calorias, ingredientes, intrucciones para su preparacion y tiempo estiamdo de la preparacion, la otra parte debe ser una descripcion en lenguaje antural para que el usuario lea de lo que enviaste en el json, demas de preguntar de forma amable y simpatica al usurio si la dieta es correcta o si desea hacer modificaciones, es importante que el json sea valido y este rodeado por &&& al principio y al final y no se haga mencion a la estructura del texto, debe ser transparente para el usurio. yout response must be ins ${"Spanish"}`,
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

      // setSelectedImage(null);

      setIsChatLoading(true);

      try {
        const response = await fetch("http://54.198.190.149:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
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

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setHeaderColor = useStore((state) => state.setHeaderColor);
  const setHeaderVisible = useStore((state) => state.setHeaderVisible);

  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  useEffect(() => {
    setHeaderVisible(true);
    setNavigationVisible(true);
    setHeaderTitle("Diet");
    setHeaderColor(Colors.Color2);
    return () => {
      setHeaderTitle("Login");
      setHeaderColor(Colors.Color1);
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        ...styles.container,
        paddingTop: 60,
        paddingBottom: insets.bottom,
        overflow: "scroll",
      }}
    >
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
                fontWeight: "medium",
              }}
            >
              Access your personalized meal plans and get healthy
              recommendations tailored to your goals. Connect with an expert or
              explore options that fit your lifestyle.
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
      {console.log("dietData", dietData)}
      {dietData?.foods && (
        <View
          style={{
            height: "fit-content",
          }}
        >
          {Object.keys(dietData.foods).map((meal) => {
            return (
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
            );
          })}
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

      {/* <Pressable
        onPress={() => {
          setMessages([]);
          setChatOpen(true);
          deleteContextChat();
        }}
        style={{
          // with: "100%",
          height: 50,
          backgroundColor: "#7F56DA",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.mealTitle}>Crear una nueva dieta</Text>
      </Pressable> */}

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
        pickImageForChat={() => {}}
        sendMessage={sendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </ScrollView>
  );
}
