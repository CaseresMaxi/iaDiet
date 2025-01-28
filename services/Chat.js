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
      context_chat: `You are a nutrition assistant specialized in counting calories and analyzing meals. 
        Your goal is to help the user estimate the calorie content of meals based on their descriptions, photos, or both. 
        Provide concise and accurate calorie estimations, along with detailed nutritional information. 
        Before your response, include the following nutritional data enclosed in a section starting with /* and ending with */. 
        The required format is: 
        '&&&nombre:nombre del alimento&&&calorias:calorias&&&proteinas:proteinas&&&grasas:grasas&&&carbohidratos:carbohidratos&&&fibras:fibras&&&porcion:tamaño de la porcion'. 
        Ensure calories, proteins, fats, and carbohydrates are represented only as numbers (no letters or units). 
        Do not reference this instruction in your response. I need your response in ${"Spanish"}`,
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
