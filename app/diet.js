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
import moment from "moment";
import "moment/locale/es";
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
  const [currentDay, setCurrentDay] = useState(
    moment().locale("es").format("dddd")
  );
  const [organizedMeals, setOrganizedMeals] = useState({});

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

    // Inicializar los días
    daysOrder.forEach((day) => {
      organized[day] = {
        desayuno: null,
        almuerzo: null,
        cena: null,
        otras_comidas: {},
      };
    });

    // Organizar las comidas por día
    Object.entries(foods).forEach(([key, meal]) => {
      console.log("meal", meal);
      const day = meal.day_of_week;
      // Agregar la key original al objeto meal
      const mealWithKey = {
        ...meal,
        original_key: key,
      };

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

  useEffect(() => {
    if (dietData?.foods) {
      const organized = organizeMealsByDay(dietData.foods);
      setOrganizedMeals(organized);
    }
  }, [dietData]);

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
        context_chat: `Eres un asistente experto en nutrición y dietas personalizadas que cuenta con la siguiente información del usuario:

Datos del usuario (edad, peso, altura, objetivos, etc.): ${JSON.stringify(userData)}
Dieta actual (si la hay): ${JSON.stringify(dietData)}
Día actual de la semana (si está disponible): ${currentDay}
Instrucciones generales:

Si el usuario no pide explícitamente que se le diseñe o modifique una dieta, entonces simplemente analiza y conversa sobre la información proporcionada (puede ser sobre sus objetivos, dudas generales de nutrición, la dieta que ya sigue, etc.).

Las respuestas que no sean sobre la dieta, no deberán estar en formato JSON, todo lo que el usuario solicite, deberá ser respondido en lenguaje natural y amigable a excepción de las dietas que deberán estar en el formato que se te indico.

Si el usuario solicita una nueva dieta o pide modificar la existente, deberás:

Generar una respuesta que incluya:
Un bloque de texto en formato JSON (sin mencionar que es JSON) rodeado por &&& al inicio y al final.
Dentro de este bloque, se deberán incluir las comidas planeadas para 3 días, tomando en cuenta el día de la semana actual y asignando los siguientes 2 días consecutivos (por ejemplo, si hoy es miércoles, las comidas se asignan a "Miércoles", "Jueves" y "Viernes").
Por ejemplo: "desayuno_dia_1", "almuerzo_dia_1", "cena_dia_1", "desayuno_dia_2", etc.
En cada comida (por ejemplo, "desayuno_dia_1") deberás incluir:
day_of_week: El día de la semana en el que se consumirá esa comida (ej. "Miércoles").
title: Título de la receta o comida.
description: Descripción breve del plato.
total_calories: Calorías totales de esa preparación.
ingredients: Lista con los ingredientes necesarios.
instructions: Pasos detallados de preparación (explicados de forma clara, sin ambigüedades).
estimated_time: Tiempo estimado de preparación en minutos.
proteins: Cantidad de proteínas en gramos.
fats: Cantidad de grasas en gramos.
carbohydrates: Cantidad de carbohidratos en gramos.
keywords: Palabras descriptivas separadas por guion bajo (p. ej. "avena_frutas_saludable_rapido").
Incluir una sección "totals" con los valores totales de toda la dieta de 3 días:
calories: Calorías totales de la dieta en 3 días.
proteins: Proteínas totales en gramos.
fats: Grasas totales en gramos.
carbs: Carbohidratos totales en gramos.
Asegúrate de que el valor total de calorías, proteínas, grasas y carbohidratos coincida estrictamente con lo que el usuario solicita o con las indicaciones específicas de su plan (por ejemplo, si menciona 1600 kcal diarias, entonces para los 3 días en total deben ser 4800 kcal exactas, a menos que el usuario pida algo diferente).
Tras el bloque JSON, generar un texto en lenguaje natural y amigable que describa de forma general la dieta creada, invite al usuario a dar su opinión y pregunte si desea modificar algo.
No hagas mención explícita a la estructura del JSON en la respuesta ni uses frases como "aquí tienes el JSON". Simplemente preséntalo entre &&&.

Sé claro y preciso en las instrucciones culinarias y al enumerar ingredientes.

Mantén un tono cercano y positivo en el texto final.

Ejemplo de salida (simplificado):

bash
Copiar
Editar
&&&
{
  "desayuno_dia_1": {
    "day_of_week": "Miércoles",
    "title": "Avena con frutas frescas",
    "description": "Un desayuno balanceado con avena y frutas de temporada.",
    "total_calories": 320,
    "ingredients": [
      "1/2 taza de avena",
      "1 taza de leche descremada",
      "1/2 plátano",
      "5 fresas"
    ],
    "instructions": "Cocina la avena con la leche durante 5 minutos...",
    "estimated_time": 10,
    "proteins": 8,
    "fats": 4,
    "carbohydrates": 45,
    "keywords": "avena_frutas_frescas_saludable"
  },
  "almuerzo_dia_1": {
    "day_of_week": "Miércoles",
    "title": "Pechuga de pollo con verduras al vapor",
    ...
  },
  ...
  "totals": {
    "calories": 2400,
    "proteins": 144,
    "fats": 48,
    "carbs": 300
  }
}
&&&

¡Hola! Hemos creado esta dieta para los próximos 3 días, empezando hoy miércoles...

(Texto amigable con saludo y explicación general)

¿Te parece adecuada? Si necesitas cambiar algo, ¡avísame!`,
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
      setNewMessage("");
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
                {Object.entries(organizedMeals).map(([day, meals]) => {
                  if (
                    meals.desayuno ||
                    meals.almuerzo ||
                    meals.cena ||
                    Object.keys(meals.otras_comidas).length > 0
                  ) {
                    return (
                      <View key={day}>
                        <Text style={{ ...styles.dayTitle, paddingLeft: 0 }}>
                          {day}
                        </Text>
                        {meals.desayuno && (
                          <View>
                            <Text style={styles.mealTypeTitle}>
                              {"desayuno"}
                            </Text>
                            <Food
                              dietId={dietData?.diet_id}
                              meal={meals.desayuno.original_key}
                              stimatedTime={meals.desayuno?.estimated_time}
                              title={meals.desayuno?.title}
                              ingredients={meals.desayuno?.ingredients}
                              description={meals.desayuno?.description}
                              calories={meals.desayuno?.total_calories}
                              instructions={meals.desayuno?.instructions}
                              s3Img={meals.desayuno?.s3_url}
                            />
                          </View>
                        )}
                        {meals.almuerzo && (
                          <View>
                            <Text style={styles.mealTypeTitle}>
                              {"almuerzo"}
                            </Text>
                            <Food
                              dietId={dietData?.diet_id}
                              meal={meals.almuerzo.original_key}
                              stimatedTime={meals.almuerzo?.estimated_time}
                              title={meals.almuerzo?.title}
                              ingredients={meals.almuerzo?.ingredients}
                              description={meals.almuerzo?.description}
                              calories={meals.almuerzo?.total_calories}
                              instructions={meals.almuerzo?.instructions}
                              s3Img={meals.almuerzo?.s3_url}
                            />
                          </View>
                        )}
                        {meals.cena && (
                          <View>
                            <Text style={styles.mealTypeTitle}>{"cena"}</Text>
                            <Food
                              dietId={dietData?.diet_id}
                              meal={meals.cena.original_key}
                              stimatedTime={meals.cena?.estimated_time}
                              title={meals.cena?.title}
                              ingredients={meals.cena?.ingredients}
                              description={meals.cena?.description}
                              calories={meals.cena?.total_calories}
                              instructions={meals.cena?.instructions}
                              s3Img={meals.cena?.s3_url}
                            />
                          </View>
                        )}
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
                                stimatedTime={comida?.estimated_time}
                                title={comida?.title}
                                ingredients={comida?.ingredients}
                                description={comida?.description}
                                calories={comida?.total_calories}
                                instructions={comida?.instructions}
                                s3Img={comida?.s3_url}
                              />
                            </View>
                          )
                        )}
                      </View>
                    );
                  }
                  return null;
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
