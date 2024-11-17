import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Food from "../Components/Food";
import { styles } from "../styles/DietStyles";

import Chat from "../Components/Chat";
import { fetchDiet } from "../services/Diet";

export default function Diet() {
  const insets = useSafeAreaInsets();
  const [dietData, setdietData] = useState({});
  const addDiet = () => {
    fetch("http://54.198.190.149:5000/diets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: window.sessionStorage.getItem("user_id"),
        foods: newDiet,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "dietData");
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
      const contextMessage =
        "Lo que se está enviando aquí es en el contexto de una aplicación para crear dietas personalizadas. neceisto que dividas el mensaje en dos partes, una debe ser un json valido que como key en debe tener cada comida que se esta agregando a la dieta y el valor de cada key debe ser otro objeto que contenga, title, description y calories, la otra parte debe ser una descripcion en lenguaje antural para que el usuario lea de lo que enviaste en el json, demas de preguntar de forma amable y simpatica al usurio si la dieta es correcta o si desea hacer modificaciones, es importante que el json sea valido y este rodeado por &&& al principio y al final y no se haga mencion a la estructura del texto, debe ser transparente para el usurio.";
      const messageBody = {
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
            Authorization: `${window.sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(messageBody),
        });
        console.log("response", response);
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
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        justifyContent: "center",
      }}
    >
      <Text style={styles.header}>User's Diet</Text>
      {dietData?.foods &&
        Object.keys(dietData.foods).map((meal) => {
          return (
            <Food
              key={meal}
              title={meal}
              description={dietData.foods[meal]?.description}
              calories={dietData.foods[meal]?.calories}
            />
          );
        })}

      <Pressable
        onPress={() => {
          setChatOpen(true);
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
      </Pressable>

      <Chat
        chatModalVisible={chatOpen}
        setChatModalVisible={setChatOpen}
        isLoading={isChatLoading}
        messages={messages}
        nutritionData={newDiet}
        setModalVisible={() => {
          addDiet();
        }}
        selectedImage={selectedImage}
        removeSelectedImage={removeSelectedImage}
        pickImageForChat={() => {}}
        sendMessage={sendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </View>
  );
}
