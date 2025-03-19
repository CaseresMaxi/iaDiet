import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import Button from "../Components/Button/Button";
import FormInput from "../Components/Input/Input";
import Female from "../assets/female_user.png";
import ChevronForward from "../assets/icons/ChevronForward.svg";
import User from "../assets/icons/user.svg";
import Male from "../assets/male_user.png";
import { fetchUserData, modifyUserData } from "../services/UserData";
import Colors from "../styles/Colors";
import styles from "../styles/ProfileStyles";
import { useStore } from "../utils/zustan";
import AdsterraAd from "../Components/Ads/AdsterraAd";

// Componente para selector desplegable reutilizable
const DropdownSelector = ({
  title,
  options,
  value,
  onChange,
  displayValue,
  descriptionField,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: Colors.Color5,
          marginTop: 10,
        }}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text
          style={{
            color: Colors.Font2,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: Colors.Color1,
              fontSize: 14,
              marginRight: 10,
            }}
          >
            {displayValue || "Seleccionar"}
          </Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Image source={ChevronForward} resizeMode="cover" />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            width: "80%",

            flexDirection: "column",
            gap: 8,
            marginVertical: 10,
            //  backgroundColor: "#f9f9f9",
            borderRadius: 8,
            padding: 8,
            borderWidth: 1,
            borderColor: Colors.Color5,
          }}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={typeof option === "string" ? option : option.value}
              onPress={() => {
                onChange(typeof option === "string" ? option : option.value);
                setIsOpen(false);
              }}
              style={{
                backgroundColor:
                  value === (typeof option === "string" ? option : option.value)
                    ? Colors.Color1
                    : Colors.Font2,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 10,
                width: "100%",
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  // color: "#fff",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {typeof option === "string" ? option : option.label}
              </Text>
            </TouchableOpacity>
          ))}

          {value && descriptionField && (
            <View style={{ paddingHorizontal: 5, marginTop: 5 }}>
              <Text style={{ color: Colors.Font2 }}>
                {descriptionField[value]}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default function Profile() {
  const insets = useSafeAreaInsets();

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  const setHeaderColor = useStore((state) => state.setHeaderColor);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  useEffect(() => {
    // setHeaderTitle("My Profile");
    // setHeaderColor(Colors.Font2);
    setHeaderVisible(false);
    setNavigationVisible(true);
    fetchUserData(setuserData, setLoading);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      age: 0,
      weight: 0,
      height: 0,
      goal: "",
      daily_activity: "",
    },
  });

  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");

  const activityLevels = {
    Sedentario: "Poca o nula actividad física.",
    Ligero: "Ejercicio ligero 1-3 días por semana.",
    Moderado: "Ejercicio moderado 3-5 días por semana.",
    Activo: "Ejercicio intenso 6-7 días por semana.",
    "Muy Activo": "Ejercicio intenso diario o entrenamiento físico doble.",
  };

  // Opciones para el objetivo formateadas para el componente
  const goalOptions = [
    { value: "Lose Weight", label: "Perder peso" },
    { value: "Gain weight", label: "Ganar peso" },
    { value: "Muscle Mass Gain", label: "Ganar masa muscular" },
    { value: "shape body", label: "Modelar el cuerpo" },
    { value: "Others", label: "Otros" },
  ];

  // Función para obtener la etiqueta del objetivo según su valor
  const getGoalLabel = (value) => {
    const option = goalOptions.find((opt) => opt.value === value);
    return option ? option.label : null;
  };

  useEffect(() => {
    reset({
      username: userData?.username || "",
      email: userData?.email || "",
      age: userData?.age || 0,
      weight: userData?.current_weight || 0,
      height: userData?.height,
      goal: userData?.goal || "",
      daily_activity: userData?.daily_activity || "",
    });
    setSelectedGoal(userData?.goal || "");
    setSelectedActivity(userData?.daily_activity || "");
  }, [userData]);
  // Nueva función onSubmit
  const onSubmit = (data) => {
    // Incluir el objetivo seleccionado en los datos
    const updatedData = {
      ...data,
      goal: selectedGoal,
      daily_activity: selectedActivity,
    };
    // Enviar los datos actualizados al servidor
    modifyUserData(updatedData, setLoading, () =>
      fetchUserData(setuserData, setLoading)
    );
  };
  return (
    <ScrollView
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom || 80,
      }}
    >
      <View style={styles.innerFormContainer}>
        <Image
          source={!userData ? User : userData?.gender === "m" ? Male : Female}
          style={styles.profileImg}
        />
        {loading ? (
          <View
            style={{
              width: 120,
              height: 20,
              marginVertical: 8,
              backgroundColor: Colors.Color5,
              borderRadius: 4,
            }}
          ></View>
        ) : (
          <Text
            style={{ color: Colors.Font2, fontSize: 20, fontWeight: "700" }}
          >
            {userData?.username || "John Doe"}
          </Text>
        )}
        {loading ? (
          <View
            style={{
              width: 120,
              height: 20,
              marginVertical: 8,
              backgroundColor: Colors.Color5,
              borderRadius: 4,
            }}
          ></View>
        ) : (
          <Text
            style={{ color: Colors.Font2, fontSize: 15, fontWeight: "300" }}
          >
            {userData?.email || "zZB0b@example.com"}
          </Text>
        )}
        <Text
          style={{
            color: Colors.Font2,
            fontSize: 15,
            fontWeight: "300",
            marginTop: 5,
          }}
        >
          <Text
            style={{ color: Colors.Font2, fontSize: 15, fontWeight: "600" }}
          >
            Birday:
          </Text>{" "}
          01/01/2000
        </Text>
        {/* <View style={{ paddingHorizontal: 24, width: "100%" }}>
          <UserInfoRectangle
            weight={userData?.weight}
            age={25}
            height={userData?.height}
          />
        </View> */}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Cool nickname"
                placeholderTextColor="#888"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                label="User Name"
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="25"
                placeholderTextColor="#888"
                onBlur={onBlur}
                type="number"
                onChangeText={onChange}
                value={value}
                label="Age"
              />
            )}
            name="age"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="70Kg"
                placeholderTextColor="#888"
                onBlur={onBlur}
                type="number"
                onChangeText={onChange}
                value={value || ""}
                label="Weight (kg)"
              />
            )}
            name="weight"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="180cm"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                label="Height (cm)"
                type="number"
              />
            )}
            name="height"
          />

          {/* Selector de objetivo */}
          <DropdownSelector
            title="Objetivo"
            options={goalOptions}
            value={selectedGoal}
            onChange={setSelectedGoal}
            displayValue={getGoalLabel(selectedGoal)}
          />

          {/* Selector de nivel de actividad */}
          <DropdownSelector
            title="Nivel de Actividad"
            options={Object.keys(activityLevels)}
            value={selectedActivity}
            onChange={setSelectedActivity}
            displayValue={selectedActivity}
            descriptionField={activityLevels}
          />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Button
            text="Save"
            style={{ marginTop: 20 }}
            type={"secondary"}
            onClick={handleSubmit(onSubmit)}
            width={142}
          />
          <Button
            text="Log Out"
            style={{ marginTop: 20 }}
            type={"error"}
            onClick={() => {
              window.sessionStorage.clear();
              router.push("/");
            }}
            width={142}
          />
        </View>
      </View>

      {/* <View>
        <AdsterraAd
          options={`{
  "key": "ffe342de43ba35b7e331c1a15e408e19",
  "format": "iframe",
  "height": 50,
  "width": 320,
  "params": {}
}`}
        />
      </View> */}
    </ScrollView>
  );
}
