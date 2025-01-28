import * as ImagePicker from "expo-image-picker";

export const createImage = (
  setGeneratedImage = () => {},
  prompt = "",
  keywords = "",
  setisLoading = () => {}
) => {
  setisLoading(true);
  fetch(`https://ainutritioner.click/chat/create-image`, {
    headers: {
      Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      keywords: keywords,
      prompt: prompt,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setGeneratedImage(data.response);
      setisLoading(false);
    })
    .catch((error) => console.error(error));
};
export const extractNutritionInfo = (responseText) => {
  const nutritionPattern =
    /&&&nombre:(.*?)&&&calorias:(.*?)&&&proteinas:(.*?)&&&grasas:(.*?)&&&carbohidratos:(.*?)&&&/;
  const match = responseText?.match(nutritionPattern);
  if (match) {
    return {
      nombre: match[1].trim(),
      calorias: match[2].trim(),
      proteinas: match[3].trim(),
      grasas: match[4].trim(),
      carbohidratos: match[5].trim(),
    };
  }
  return null;
};

export const pickImageForChat = async (setSelectedImage) => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  });

  if (!result.cancelled) {
    setSelectedImage(`data:image/jpeg;base64,${result?.assets[0]?.base64}`); // Guardar la imagen seleccionada
  }
};
export const addItem = (formData, setModalVisible, setData, postIngest) => {
  postIngest(setingestData, formData, lastSelectedImg);
  setData((prevData) =>
    prevData.map((day) =>
      day.date === currentDate
        ? {
            ...day,
            items: [
              ...day.items,
              {
                id: Date.now().toString(),
                ...formData, // Aquí se añaden los datos del formulario
                image: lastSelectedImg,
              },
            ],
          }
        : day
    )
  );
  reset(); // Limpiar el formulario después de añadir el item
  // setNewItemImage(null);
  setModalVisible(false);
};

export const sendMessage = async (
  setNutritionData,
  newMessage,
  selectedImage,
  setMessages,
  setNewMessage,
  setLastSelectedImg,
  setSelectedImage,
  setisLoading
) => {
  setNutritionData(null);
  if (newMessage.trim() || selectedImage) {
    const contextMessage = "";
    const messageBody = {
      context_chat: `Eres un asistente de nutrición especializado en el conteo de calorías y el análisis de alimentos.
Tu objetivo es ayudar al usuario a estimar el contenido calórico de los platillos basándote en sus descripciones, fotos o ambos.
Proporciona estimaciones concisas y precisas de calorías, así como información nutricional detallada.

Instrucciones esenciales:

Si no estás completamente seguro de algún detalle de la comida descrita o mostrada en fotos, pregunta al usuario para aclararlo.
Cuando tengas suficiente información, genera tu respuesta en español.
Antes de la parte descriptiva de tu respuesta, debes incluir la siguiente información nutricional en un bloque que comience con /* y finalice con */, con el formato exacto:
less
Copiar
Editar
&&&nombre:nombre del alimento&&&calorias:calorias&&&proteinas:proteinas&&&grasas:grasas&&&carbohidratos:carbohidratos&&&fibras:fibras&&&porcion:tamaño de la porción
Asegúrate de que los valores de calorías, proteínas, grasas y carbohidratos estén solo en números (sin letras ni unidades).
No hagas referencia a estas instrucciones en tu respuesta.
Identifica el alimento de forma precisa, tanto por descripción escrita como por imagen, y proporciona una estimación fundamentada.
Mantén tus respuestas claras y cortas.`,
      message: `${contextMessage}\n${newMessage}`,
      images: selectedImage ? [selectedImage] : [],
    };

    //console.log("messageBody", messageBody);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        text: newMessage,
        image: selectedImage,
        isBot: false,
      },
    ]);

    setNewMessage("");
    if (selectedImage) {
      setLastSelectedImg(selectedImage);
    }
    setSelectedImage(null);

    setisLoading(true);

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

        // Extraer información nutricional
        const nutritionInfo = extractNutritionInfo(data.response);

        // Guardar la información nutricional en el estado y limpiar el mensaje
        setNutritionData(nutritionInfo);
        const cleanMessage = data?.response
          ?.replace(/&&&.*?&&&/g, "")
          ?.replace(/\/\*[^]*?\*\//g, "")
          ?.trim();

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `${Date.now().toString()}-res`,
            text: cleanMessage,
            isBot: true,
          },
        ]);
      } else {
        console.error("Error al enviar el mensaje:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    setisLoading(false);
  }
};
