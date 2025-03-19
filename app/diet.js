import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import {
  CopilotProvider,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
import moment from "moment";
import "moment/locale/es";

import { styles } from "../styles/DietStyles";
import Colors from "../styles/Colors";

import MealPlans from "../assets/icons/MealPlans.svg";

import Button from "../Components/Button/Button";
import Food from "../Components/Food";
import Chat from "../Components/Chat";
import TutorialButton from "../Components/TutorialButton/TutorialButton";
import AdsterraAd from "../Components/Ads/AdsterraAd";

import { useStore } from "../utils/zustan";
import { fetchDiet } from "../services/Diet";
import { deleteContextChat } from "../services/Utils";
import { fetchUserData } from "../services/UserData";

moment.locale("es");

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

const CustomComponents = ({ copilot, children }) => (
  <View {...copilot}>{children}</View>
);

/**
 * Organizes meals by day according to a predefined day order.
 * Returns an object containing the structured meals for each day.
 */
const organizeMealsByDay = (foods) => {
  const daysOrder = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const organized = {};
  daysOrder.forEach((day) => {
    organized[day] = {
      desayuno: null,
      almuerzo: null,
      cena: null,
      otras_comidas: {},
    };
  });

  Object.entries(foods).forEach(([key, meal]) => {
    const day = meal.day_of_week;
    const mealWithKey = { ...meal, original_key: key };

    if (key.includes("desayuno")) {
      organized[day].desayuno = mealWithKey;
    } else if (key.includes("almuerzo")) {
      organized[day].almuerzo = mealWithKey;
    } else if (key.includes("cena")) {
      organized[day].cena = mealWithKey;
    } else {
      const comidaNombre = key.split("_")[0];
      if (!organized[day].otras_comidas[comidaNombre]) {
        organized[day].otras_comidas[comidaNombre] = mealWithKey;
      }
    }
  });

  return organized;
};

/**
 * Extracts the diet data JSON block from the AI response (surrounded by &&&).
 * Returns the parsed object if found, otherwise null.
 */
const extractDietData = (inputText) => {
  const regex = /&&&(.*?)&&&/s;
  const match = inputText.match(regex);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }
  return null;
};

const Diet = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [isDietLoading, setIsDietLoading] = useState(true);
  const [organizedMeals, setOrganizedMeals] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [newDiet, setNewDiet] = useState(null);

  // Zustand store states/actions
  const dietData = useStore((state) => state.dietData);
  const setDietData = useStore((state) => state.setDietData);

  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);

  const chatVisible = useStore((state) => state.chatVisible);
  const setChatVisible = useStore((state) => state.setChatVisible);

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setHeaderColor = useStore((state) => state.setHeaderColor);
  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  const setGoBackVisible = useStore((state) => state.setGoBackVisible);
  const currentDay = moment().format("dddd");

  /**
   * Adds a new diet to the server using the diet data from AI response
   * or from the argument if provided.
   */
  const addDiet = (diet) => {
    setIsDietLoading(true);
    const dietToSave = diet || newDiet;
    if (!dietToSave) return;

    const { totals } = dietToSave;
    delete dietToSave.totals;

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
        foods: dietToSave,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchDiet(setDietData, setIsDietLoading);
      })
      .catch((error) => console.error("Error adding new diet:", error));
  };

  /**
   * Sends a message to the AI service and handles the response.
   */
  const sendMessage = async (message, callback = () => {}) => {
    if (!message && !newMessage.trim()) return;

    const userText = message || newMessage;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        text: userText,
        image: null,
        isBot: false,
      },
    ]);

    setIsChatLoading(true);
    setNewMessage("");

    try {
      const response = await fetch("https://ainutritioner.click/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
        },
        body: JSON.stringify({
          context_chat: `
Datos del usuario (edad, peso, altura, objetivos, etc.): ${JSON.stringify(
            userData
          )}
Dieta actual (si la hay): ${JSON.stringify(dietData)}
Día actual de la semana (si está disponible): ${currentDay}
Instrucciones generales:

Si el usuario no pide explícitamente que se le diseñe o modifique una dieta, no generes el bloque de datos. Limítate a analizar o conversar en un tono cercano y amigable sobre los datos proporcionados (objetivos, dudas nutricionales, etc.).

Si el usuario solicita una nueva dieta o pide modificar la existente, procede así:

Por defecto, crea una dieta para 1 día, tomando en cuenta el día de la semana actual.
Deberás generar una respuesta que incluya:
Un bloque de texto en formato JSON (sin mencionar que es JSON) rodeado por &&& al inicio y al final.
Dentro de este bloque, se deberán incluir las comidas planeadas para solo 1 día (por ejemplo: "desayuno_dia_1", "almuerzo_dia_1", "cena_dia_1").
Cada comida debe tener los campos:
day_of_week: El día de la semana en el que se consumirá esa comida (ej. "Lunes").
title: Título de la receta o comida.
description: Breve descripción del plato.
total_calories: Calorías totales de esa preparación.
ingredients: Lista de los ingredientes necesarios.
instructions: Pasos detallados de preparación (claros y sin ambigüedades).
estimated_time: Tiempo estimado de preparación (en minutos).
proteins: Cantidad de proteínas en gramos.
fats: Cantidad de grasas en gramos.
carbohydrates: Cantidad de carbohidratos en gramos.
keywords: Palabras descriptivas separadas por guion bajo.

Incluir una sección "totals" con los valores totales de esa dieta de 1 día:
calories: Calorías totales.
proteins: Proteínas totales en gramos.
fats: Grasas totales en gramos.
carbs: Carbohidratos totales en gramos.

Tras el bloque &&&, generar un texto en lenguaje natural y amigable describiendo la dieta, invitando al usuario a opinar y preguntar si desea algún cambio.

Si el usuario pide explícitamente que la dieta sea para más días (2 o 3 días), antes de generarla adviértele que puede tardar un poco más por temas de rendimiento y pídele confirmación. Solo si confirma, crea la dieta extendida. En ese caso, el mismo formato anterior aplica, pero para cada día extra: "desayuno_dia_2", "almuerzo_dia_2", "cena_dia_2", etc., hasta un máximo de 3 días. Ajusta la sección "totals" para incluir el total de los valores para todos los días planificados. Asegúrate de que el valor total de calorías, proteínas, grasas y carbohidratos coincida estrictamente con lo que el usuario solicita o con las indicaciones de su plan. No menciones explícitamente la estructura del JSON ni uses frases como "aquí tienes el JSON".

Sé claro y preciso en las instrucciones culinarias y al enumerar ingredientes. Mantén un tono cercano y positivo en el texto final.
            `,
          message: userText,
          images: [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const extractedDiet = extractDietData(data.response);

        setNewDiet(extractedDiet);
        callback(extractedDiet);

        // The plain text from the bot is the AI response minus the JSON block
        const botText = data.response.replace(/&&&[\s\S]*?&&&/g, "").trim();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `${Date.now()}-res`,
            text: botText,
            isBot: true,
          },
        ]);
      } else {
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      console.error("Error in sendMessage request:", error);
    }

    setIsChatLoading(false);
  };

  /**
   * Removes the selected image from state (not currently used to send images).
   */
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  /**
   * Fetch diet data once on mount and fetch user data. Also set up header.
   */
  useEffect(() => {
    setHeaderVisible(true);
    setNavigationVisible(true);
    setHeaderTitle("Diet");
    setHeaderColor(Colors.Color2);

    fetchDiet(setDietData, setIsDietLoading);
    fetchUserData(setUserData, setIsDietLoading);
    setGoBackVisible(true);

    return () => {
      setHeaderVisible(false);
      setHeaderColor(Colors.Color1);
    };
  }, [
    setHeaderVisible,
    setNavigationVisible,
    setHeaderTitle,
    setHeaderColor,
    setDietData,
    setUserData,
  ]);

  /**
   * Organize meals once diet data is available.
   */
  useEffect(() => {
    if (dietData?.foods) {
      const organized = organizeMealsByDay(dietData.foods);
      setOrganizedMeals(organized);
    }
  }, [dietData]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingTop: 60,
          paddingBottom: insets.bottom || 60,
          justifyContent: "flex-start",
        }}
      >
        {/* Add meal / Create menu buttons */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //marginBottom: 20,
            justifyContent: "space-between",
            gap: 10,
            // paddingHorizontal: 20,
          }}
        >
          <CopilotStep
            text={t("tutorial.diet.createMenu")}
            order={2}
            name="createMenu"
          >
            <CustomComponents>
              <Button
                text="Crear menú para hoy"
                width={250}
                type="secondary"
                onClick={() => {
                  setMessages([]);
                  setIsDietLoading(true);
                  sendMessage(
                    "Crea un menú saludable para hoy respetando los formatos e indicaciones actuales, y teniendo obligatoriamente el mismo formato de comidas que el ejemplo anterior, pero con ligeros cambios en los platos para que no sean exactamente iguales.",
                    (data) => {
                      addDiet(data);
                    }
                  );
                }}
              />
            </CustomComponents>
          </CopilotStep>

          <CopilotStep
            text={t("tutorial.diet.addMeal")}
            order={1}
            name="addMeal"
          >
            <CustomComponents>
              <Button
                text="💬"
                width={50}
                type="secondary"
                style={{
                  backgroundColor: Colors.Color2,
                  borderColor: Colors.Color2,
                }}
                onClick={() => {
                  setMessages([]);
                  setChatVisible(true);
                  deleteContextChat();
                }}
              />
            </CustomComponents>
          </CopilotStep>
        </View>
        <View>
          <AdsterraAd
            options={`{
  "key": "ffe342de43ba35b7e331c1a15e408e19",
  "format": "iframe",
  "height": 50,
  "width": 320,
  "params": {}
}`}
          />
        </View>
        {/* If no dietData and not loading, show a placeholder */}
        {!dietData?.foods && !isDietLoading && (
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
                  fontWeight: "500",
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
                type="secondary"
                onClick={() => {
                  setMessages([]);
                  setChatVisible(true);
                  deleteContextChat();
                }}
              />
            </View>
          </View>
        )}

        {/* Loading spinner */}
        {isDietLoading && (
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

        {/* Render meals by day if we have data */}
        {dietData?.foods && !isDietLoading && (
          <CopilotStep text={t("tutorial.diet.meals")} order={3} name="meals">
            <CustomComponents>
              <View style={{ height: "fit-content" }}>
                {Object.entries(organizedMeals).map(([day, meals]) => {
                  const hasMeals =
                    meals.desayuno ||
                    meals.almuerzo ||
                    meals.cena ||
                    Object.keys(meals.otras_comidas).length > 0;

                  if (!hasMeals) return null;

                  return (
                    <View key={day}>
                      <Text style={{ ...styles.dayTitle, paddingLeft: 0 }}>
                        {day}
                      </Text>

                      {/* Desayuno */}
                      {meals.desayuno && (
                        <View>
                          <Text style={styles.mealTypeTitle}>desayuno</Text>
                          <Food
                            dietId={dietData?.diet_id}
                            meal={meals.desayuno.original_key}
                            stimatedTime={meals.desayuno.estimated_time}
                            title={meals.desayuno.title}
                            ingredients={meals.desayuno.ingredients}
                            description={meals.desayuno.description}
                            calories={meals.desayuno.total_calories}
                            instructions={meals.desayuno.instructions}
                            s3Img={meals.desayuno.s3_url}
                          />
                        </View>
                      )}

                      {/* Almuerzo */}
                      {meals.almuerzo && (
                        <View>
                          <Text style={styles.mealTypeTitle}>almuerzo</Text>
                          <Food
                            dietId={dietData?.diet_id}
                            meal={meals.almuerzo.original_key}
                            stimatedTime={meals.almuerzo.estimated_time}
                            title={meals.almuerzo.title}
                            ingredients={meals.almuerzo.ingredients}
                            description={meals.almuerzo.description}
                            calories={meals.almuerzo.total_calories}
                            instructions={meals.almuerzo.instructions}
                            s3Img={meals.almuerzo.s3_url}
                          />
                        </View>
                      )}

                      {/* Cena */}
                      {meals.cena && (
                        <View>
                          <Text style={styles.mealTypeTitle}>cena</Text>
                          <Food
                            dietId={dietData?.diet_id}
                            meal={meals.cena.original_key}
                            stimatedTime={meals.cena.estimated_time}
                            title={meals.cena.title}
                            ingredients={meals.cena.ingredients}
                            description={meals.cena.description}
                            calories={meals.cena.total_calories}
                            instructions={meals.cena.instructions}
                            s3Img={meals.cena.s3_url}
                          />
                        </View>
                      )}

                      {/* Otras comidas */}
                      {Object.entries(meals.otras_comidas).map(
                        ([nombreComida, comida]) => (
                          <View key={nombreComida}>
                            <Text style={styles.mealTypeTitle}>
                              {nombreComida.charAt(0).toUpperCase() +
                                nombreComida.slice(1)}
                            </Text>
                            <Food
                              dietId={dietData?.diet_id}
                              meal={comida.original_key}
                              stimatedTime={comida.estimated_time}
                              title={comida.title}
                              ingredients={comida.ingredients}
                              description={comida.description}
                              calories={comida.total_calories}
                              instructions={comida.instructions}
                              s3Img={comida.s3_url}
                            />
                          </View>
                        )
                      )}
                    </View>
                  );
                })}
              </View>
            </CustomComponents>
          </CopilotStep>
        )}

        {/* Chat Modal */}
        <Chat
          chatModalVisible={chatVisible}
          setChatModalVisible={setChatVisible}
          isLoading={isChatLoading}
          messages={messages}
          nutritionData={newDiet}
          setModalVisible={() => {
            addDiet();
          }}
          suggestedMessages={[
            "¿Cuántas calorías tiene una manzana?",
            "¿Qué comida me recomiendas?",
            "¿Cómo va mi progreso?",
          ]}
          disabledImgPicker
          selectedImage={selectedImage}
          removeSelectedImage={removeSelectedImage}
          pickImageForChat={() => {}}
          sendMessage={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          initialMessage="¡Hola! Soy tu nutricionista IA personal y estoy aquí para ayudarte a crear una dieta personalizada que se ajuste perfectamente a tus objetivos y necesidades. ¿En qué puedo ayudarte hoy? 😊"
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
