import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
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
import { useTranslation } from "react-i18next";
import TutorialButton from "../Components/TutorialButton/TutorialButton";
import {
  CopilotProvider,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
import { fetchUserData } from "../services/UserData";

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

const CustomComponents = ({ copilot, children }) => (
  <View {...copilot}>{children}</View>
);

const Diet = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [dietData, setdietData] = useState({});
  const [dietLoading, setdietLoading] = useState(true);
  const [userData, setUserData] = useState();

  const addDiet = () => {
    setdietLoading(true);
    const totals = newDiet.totals;
    delete newDiet.totals;
    fetch("https://ainutritioner.click/diets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: window.sessionStorage?.getItem("user_id"),
        calories: totals.calories,
        proteins: totals.proteins,
        fats: totals.fats,
        carbs: totals.carbs,
        foods: newDiet,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setLoading(true);
        fetchDiet(setdietData, setdietLoading);
      })
      .catch((error) => console.error("Error:", error));
    // .finally(() => setdietLoading(false));
  };
  useEffect(() => {
    fetchDiet(setdietData, setdietLoading);
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
        // Modificar los keywords a cadena vacía para cada comida
        // const { calories, proteins, fats, carbs } = extractedObject.totals;
        // delete extractedObject.totals;
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
        context_chat: `Lo que se está enviando aquí es en el contexto de una aplicación para crear dietas personalizadas. Divide el mensaje en dos partes:

Un JSON válido rodeado por &&& al principio y al final.

Cada comida agregada a la dieta debe ser una clave.

Cada clave tendrá como valor un objeto que incluya:

title: Título de la receta o comida.
description: Descripción breve del plato.
total_calories: Calorías totales de la preparación.
ingredients: Lista de ingredientes necesarios.
instructions: Pasos detallados para preparar la comida.
estimated_time: Tiempo estimado de preparación en minutos.
proteins: Cantidad de proteínas en gramos.
fats: Cantidad de grasas en gramos.
carbohydrates: Cantidad de carbohidratos en gramos.
keywords: Una cadena de texto con palabras descriptivas del plato separadas por guion bajo (por ejemplo: avena_frutas_saludable_rapido).
Además, incluye un resumen total de la dieta, que debe estar en el mismo JSON con los siguientes campos:

calories: Calorías totales de toda la dieta.
proteins: Proteínas totales de toda la dieta en gramos.
fats: Grasas totales de toda la dieta en gramos.
carbs: Carbohidratos totales de toda la dieta en gramos.
Un texto en lenguaje natural que:

Describa la dieta creada en términos generales para el usuario.
Sea amigable y simpático.
Pregunte si la dieta cumple con sus expectativas o si desea realizar modificaciones.
Es importante que:

El JSON sea completamente válido.
No se haga mención explícita a su estructura en el texto para que el usuario lo perciba de manera transparente.
Es Extremadamente importante que si se hacen menciones a valores de calorías, proteínas, grasas o carbohidratos, se respete de forma estricta en la elaboración de la dieta, por ejemplo, si se menciona que la dieta tiene 770 calorías, la dieta debe tener 770 calorías, no menos ni más, si estos valores no son correctos, la dieta no será valdia. ES DE VITAL IMPORTANCIA QUE SE RESPETEN LOS VALORES NNUTRICIONALES INDICADOS POR EL USUARIO.
Las instrucciones deben ser claras y detalladas, no deben ser ambiguas y tener todo lo necesario para que alguien con poco conocimiento en cocina pueda preparar la comida.
La dieta tenga en cuenta los datos del usuario: ${JSON.stringify(userData)}
Y si se hace mencion de la dieta actual tambien la tengas en cuenta ${JSON.stringify(dietData)}
Ejemplo de salida:

&&& { "desayuno": { "title": "Avena con frutas frescas", "description": "Un desayuno balanceado con avena y frutas de temporada.", "total_calories": 320, "ingredients": ["1/2 taza de avena", "1 taza de leche descremada", "1/2 plátano", "5 fresas"], "instructions": "Cocina la avena con la leche durante 5 minutos, corta las frutas y colócalas sobre la avena antes de servir.", "estimated_time": 10, "proteins": 8, "fats": 4, "carbohydrates": 45, "keywords": "avena_frutas_frescas_saludable" }, "almuerzo": { "title": "Pechuga de pollo con verduras al vapor", "description": "Una opción ligera y rica en proteínas con pollo y verduras frescas.", "total_calories": 450, "ingredients": ["200g de pechuga de pollo", "1 taza de brócoli", "1/2 taza de zanahorias", "1 cda de aceite de oliva"], "instructions": "Cocina el pollo a la plancha y sirve con las verduras al vapor aderezadas con aceite de oliva.", "estimated_time": 20, "proteins": 40, "fats": 10, "carbohydrates": 15, "keywords": "pollo_verduras_vapor_alto_proteinas_saludable" }, "totals": { "calories": 770, "proteins": 48, "fats": 14, "carbs": 60 } } &&&

¡Hola! 🎉 Hemos creado esta dieta personalizada para ti:

Desayuno: Avena con frutas frescas. Un desayuno delicioso y nutritivo que te dará energía para el día.
Almuerzo: Pechuga de pollo con verduras al vapor, una comida ligera pero llena de sabor y proteínas.
Totales de la dieta:

Calorías: 770 kcal
Proteínas: 48 g
Grasas: 14 g
Carbohidratos: 60 g
¿Te parece que esta dieta es adecuada? 😊 Si necesitas ajustar algo (ingredientes, calorías o preferencias), no dudes en decírmelo. ¡Estoy aquí para ayudarte!`,
        message: `${newMessage}`,
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
        const response = await fetch("https://ainutritioner.click/chat", {
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
    fetchUserData(setUserData, setdietLoading);
    return () => {
      setHeaderTitle("Login");
      setHeaderColor(Colors.Color1);
    };
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          ...styles.container,
          paddingTop: 60,
          paddingBottom: insets.bottom,
          overflow: "scroll",
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <CopilotStep
            text={t("tutorial.diet.addMeal")}
            order={1}
            name="addMeal"
          >
            <CustomComponents>
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
            </CustomComponents>
          </CopilotStep>
        </View>

        {!dietData?.foods && !dietLoading && (
          <View style={{ height: "100%", justifyContent: "center" }}>
            <CopilotStep
              text={t("tutorial.diet.mealPlan")}
              order={2}
              name="mealPlan"
            >
              <CustomComponents>
                <View style={styles.headerContainer}>
                  <Image source={MealPlans} />
                  <Text style={styles.header}>Meal Plans</Text>
                </View>
              </CustomComponents>
            </CopilotStep>

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
                recommendations tailored to your goals. Connect with an expert
                or explore options that fit your lifestyle.
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

        {dietLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 50,
            }}
          >
            <ActivityIndicator size="large" color={Colors.Color2} />
          </View>
        )}

        {dietData?.foods && !dietLoading && (
          <CopilotStep text={t("tutorial.diet.meals")} order={3} name="meals">
            <CustomComponents>
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
                      stimatedTime={dietData.foods[meal]?.estimated_time}
                      title={dietData.foods[meal]?.title}
                      ingredients={dietData.foods[meal]?.ingredients}
                      description={dietData.foods[meal]?.description}
                      calories={dietData.foods[meal]?.total_calories}
                      instructions={dietData.foods[meal]?.instructions}
                      s3Img={dietData.foods[meal]?.s3_url}
                    />
                  );
                })}
              </View>
            </CustomComponents>
          </CopilotStep>
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
          pickImageForChat={() => {}}
          sendMessage={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </ScrollView>
      <TutorialButton />
    </>
  );
};

export default () => (
  <CopilotProvider>
    <Diet />
  </CopilotProvider>
);
