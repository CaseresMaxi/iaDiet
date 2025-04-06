import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CompleteSignUpBackground from "../assets/complete-singup-background.svg";
import Colors from "../styles/Colors";
import { useStore } from "../utils/zustan";
import Button from "../Components/Button/Button";
import { TouchableOpacity } from "react-native-web";
import male from "../assets/icons/male.svg";
import femaleSelected from "../assets/icons/femaleSelected.svg";
import maleSelected from "../assets/icons/maleSelected.svg";
import female from "../assets/icons/female.svg";
import TapeMeasureSlider from "../Components/TapeMeasuresSilder";
import { Controller, set, useForm } from "react-hook-form";
import FormInput from "../Components/Input/Input";
import ChevronBack from "../assets/icons/ChevronBack.svg";
import maleUser from "../assets/male_user.png";
import femaleUser from "../assets/female_user.png";
import { fetchUserData, modifyUserData } from "../services/UserData";
import { styles } from "../styles/CompleteSingUp";
import { useTranslation } from "react-i18next";
import "../utils/i18n";

export default function CompleteSignUp() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [val, setval] = useState(0);

  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  // const setHEaderTitle = useStore((state) => state.setHEaderTitle);
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setGoBackVisible = useStore((state) => state.setGoBackVisible);

  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  const [confirmStepUserData, setconfirmStepUserData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setHeaderVisible(false);
    setHeaderTitle("");
    setNavigationVisible(false);
    setGoBackVisible(true);

    return () => {
      setHeaderVisible(true);
      setNavigationVisible(true);
    };
  }, []);

  const [userValues, setUserValues] = useState({
    gender: "",
    age: 0,
    weight: 0.0,
    height: 0.0,
    imperial_system: false, // CAMBIAR POR IMPERIAL SISTEM
    goal: "",
    daily_activity: "",
    sports: "",
    email: "",
    username: "",
    phoneNumber: "",
  });

  const titles = [
    "",
    t("completeSignUp.gender.title"),
    t("completeSignUp.age"),
    t("completeSignUp.weight.title"),
    t("completeSignUp.height"),
    t("completeSignUp.goal.title"),
    t("completeSignUp.activity.title"),
    t("completeSignUp.profile.title"),
  ];

  const activityLevels = {
    [t("completeSignUp.activity.sedentary")]: t(
      "completeSignUp.activity.sedentaryDesc"
    ),
    [t("completeSignUp.activity.light")]: t(
      "completeSignUp.activity.lightDesc"
    ),
    [t("completeSignUp.activity.moderate")]: t(
      "completeSignUp.activity.moderateDesc"
    ),
    [t("completeSignUp.activity.active")]: t(
      "completeSignUp.activity.activeDesc"
    ),
    [t("completeSignUp.activity.veryActive")]: t(
      "completeSignUp.activity.veryActiveDesc"
    ),
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (val === 6) fetchUserData(setconfirmStepUserData, setisLoading);
  }, [val]);

  const handleInputChange = (field, value) => {
    setUserValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };
  const renderStep = () => {
    switch (val) {
      case 0: {
        return (
          <View style={styles.stepContainer}>
            <View style={{ width: "100%" }}>
              <Image
                source={CompleteSignUpBackground}
                style={styles.fullWidthImage}
                // resizeMode="contain" // Mantiene la relación de aspecto
              />
            </View>
            <View style={styles.step0TextContainer}>
              <Text style={styles.step0Text}>
                {t("completeSignUp.motivation")}
              </Text>
              <Text style={styles.step0Subtext}>
                {t("completeSignUp.motivationSubtext")}
              </Text>
            </View>
          </View>
        );
      }
      case 1: {
        return (
          <View
            style={{
              ...styles.stepContainer,
              justifyContent: "center",
              gap: 32,
            }}
          >
            <View style={styles.step1Container}>
              <TouchableOpacity
                onPress={() => setUserValues({ ...userValues, gender: "m" })}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  source={userValues.gender === "m" ? maleSelected : male}
                ></Image>
                <Text style={styles.step1GenderSelectorButtonText}>
                  {t("completeSignUp.gender.male")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserValues({ ...userValues, gender: "f" })}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  source={userValues.gender === "f" ? femaleSelected : female}
                ></Image>
                <Text style={styles.step1GenderSelectorButtonText}>
                  {t("completeSignUp.gender.female")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      case 2: {
        return (
          <View
            style={{
              ...styles.stepContainer,
              justifyContent: "center",
              gap: 128,
            }}
          >
            <TapeMeasureSlider
              setValueCallback={(age) =>
                setUserValues({ ...userValues, age: age })
              }
            />
          </View>
        );
      }
      case 3: {
        return (
          <View
            style={{
              ...styles.stepContainer,
              justifyContent: "center",
              gap: 128,
            }}
          >
            <View style={styles.step3Wrapper}>
              <TouchableOpacity
                onPress={() => {
                  setUserValues({ ...userValues, imperial_system: false });
                }}
              >
                <Text
                  style={{
                    ...styles.step3WeightSelectorButtonText,
                    fontWeight:
                      userValues.imperial_system === false ? "bold" : "600",
                  }}
                >
                  KG
                </Text>
              </TouchableOpacity>
              <Text style={styles.step3WeightSelectorDivider}>|</Text>
              <TouchableOpacity
                onPress={() => {
                  setUserValues({ ...userValues, imperial_system: true });
                }}
              >
                <Text
                  style={{
                    ...styles.step3WeightSelectorButtonText,
                    fontWeight:
                      userValues.imperial_system === true ? "bold" : "600",
                  }}
                >
                  LB
                </Text>
              </TouchableOpacity>
            </View>
            <TapeMeasureSlider
              weightMeasure
              defaultValue={
                userValues.gender === "m"
                  ? userValues.imperial_system === false
                    ? 70
                    : 150
                  : userValues.imperial_system === false
                    ? 50
                    : 110
              }
              setValueCallback={(weight) =>
                setUserValues({ ...userValues, weight: weight })
              }
              unit={userValues.imperial_system === false ? "kg" : "lb"}
            />
          </View>
        );
      }
      case 4: {
        return (
          <View
            style={{
              ...styles.stepContainer,
              justifyContent: "center",
              gap: 128,
            }}
          >
            <TapeMeasureSlider
              heightMeasure
              orientation="vertical"
              defaultValue={userValues.gender === "m" ? 170 : 150}
            />
          </View>
        );
      }
      case 5: {
        return (
          <View
            style={{
              ...styles.stepContainer,
              justifyContent: "center",
              gap: 128,
            }}
          >
            <View style={styles.step5Wrapper}>
              <TouchableOpacity
                onPress={() =>
                  setUserValues({ ...userValues, goal: "Lose Weight" })
                }
                style={{
                  ...styles.step5GoalSelectorButton,
                  backgroundColor:
                    userValues.goal === "Lose Weight"
                      ? Colors.Color1
                      : Colors.Font2,
                }}
              >
                <Text style={styles.step5GoalSelectorButtonText}>
                  {t("completeSignUp.goal.loseWeight")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setUserValues({ ...userValues, goal: "Gain weight" })
                }
                style={{
                  backgroundColor:
                    userValues.goal === "Gain weight"
                      ? Colors.Color1
                      : Colors.Font2,
                  ...styles.step5GoalSelectorButton,
                }}
              >
                <Text style={styles.step5GoalSelectorButtonText}>
                  {t("completeSignUp.goal.gainWeight")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setUserValues({ ...userValues, goal: "Muscle Mass Gain" })
                }
                style={{
                  ...styles.step5GoalSelectorButton,
                  backgroundColor:
                    userValues.goal === "Muscle Mass Gain"
                      ? Colors.Color1
                      : Colors.Font2,
                }}
              >
                <Text style={styles.step5GoalSelectorButtonText}>
                  {t("completeSignUp.goal.muscleMassGain")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setUserValues({ ...userValues, goal: "shape body" })
                }
                style={{
                  backgroundColor:
                    userValues.goal === "shape body"
                      ? Colors.Color1
                      : Colors.Font2,
                  ...styles.step5GoalSelectorButton,
                }}
              >
                <Text style={styles.step5GoalSelectorButtonText}>
                  {t("completeSignUp.goal.shapeBody")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserValues({ ...userValues, goal: "Others" })}
                style={{
                  backgroundColor:
                    userValues.goal === "Others" ? Colors.Color1 : Colors.Font2,
                  ...styles.step5GoalSelectorButton,
                }}
              >
                <Text style={styles.step5GoalSelectorButtonText}>
                  {t("completeSignUp.goal.others")}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <TapeMeasureSlider orientation="vertical" /> */}
          </View>
        );
      }
      case 6: {
        return (
          <View
            style={{
              ...styles.stepContainer,
              justifyContent: "center",
              gap: 128,
            }}
          >
            <View style={styles.step6Wrapper}>
              {Object.keys(activityLevels).map((key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() =>
                      setUserValues({ ...userValues, daily_activity: key })
                    }
                    style={{
                      backgroundColor:
                        userValues.daily_activity === key
                          ? Colors.Color1
                          : Colors.Font2,
                      ...styles.step6ActivitySelectorButton,
                    }}
                  >
                    <Text style={styles.step6ActivitySelectorButtonText}>
                      {key}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <View style={styles.step6ActivitySelectorDescription}>
                <View>
                  <Text style={{ color: Colors.Font2 }}>
                    {activityLevels[userValues.daily_activity]}
                  </Text>
                </View>
                {/* <Text style={{ color: Colors.Font2 }}>
                  What Sport's do you do? Tell us
                </Text>
                <TextArea
                  onChange={(e) =>
                    setUserValues({
                      ...userValues,
                      sports: e.nativeEvent.text,
                    })
                  }
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: 120,
                    birderRadius: 16,
                  }}
                ></TextArea> */}
              </View>
            </View>
            {/* <TapeMeasureSlider orientation="vertical" /> */}
          </View>
        );
      }
      case 7: {
        return (
          <View
            style={{
              ...styles.stepContainer,
              justifyContent: "center",
              gap: 32,
              paddingHorizontal: 16,
            }}
          >
            <View>
              <Image
                style={{ width: 100, height: 100 }}
                source={userValues.gender === "m" ? maleUser : femaleUser}
              ></Image>
            </View>
            <View style={{ width: "100%", gap: 16 }}>
              <View>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: t("completeSignUp.validation.usernameRequired"),
                  }}
                  render={({ field: { onBlur, value } }) => (
                    <FormInput
                      placeholder={t("completeSignUp.profile.username")}
                      placeholderTextColor="#888"
                      onBlur={onBlur}
                      onChangeText={(text) =>
                        handleInputChange("username", text)
                      }
                      value={userValues.username}
                      label={t("completeSignUp.profile.username")}
                    />
                  )}
                />
                {errors.username && (
                  <Text style={styles.error}>{errors.username.message}</Text>
                )}
              </View>

              <View>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: t("completeSignUp.validation.emailRequired"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("completeSignUp.validation.emailInvalid"),
                    },
                  }}
                  render={({ field: { onBlur, onChange } }) => (
                    <FormInput
                      placeholder="example@email.com"
                      placeholderTextColor="#888"
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        handleInputChange("email", text);
                        onChange(text);
                      }}
                      value={confirmStepUserData.email}
                      label={t("completeSignUp.profile.email")}
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </View>

              <View>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: t("completeSignUp.validation.phoneRequired"),
                    pattern: {
                      value: /^[0-9]+$/,
                      message: t("completeSignUp.validation.phoneInvalid"),
                    },
                  }}
                  render={({ field: { onBlur, value } }) => (
                    <FormInput
                      placeholder="1234567890"
                      placeholderTextColor="#888"
                      onBlur={onBlur}
                      onChangeText={(text) =>
                        handleInputChange("phoneNumber", text)
                      }
                      value={userValues.phoneNumber}
                      label={t("completeSignUp.profile.phoneNumber")}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber.message}</Text>
                )}
              </View>
            </View>
          </View>
        );
      }
    }
  };

  const isStepValid = () => {
    switch (val) {
      case 0:
        return true; // Paso de motivación, siempre válido
      case 1:
        return userValues.gender !== ""; // Validar selección de género
      case 2:
        return userValues.age > 0; // Validar edad
      case 3:
        return userValues.weight > 0; // Validar peso
      case 4:
        return userValues.height > 0; // Validar altura
      case 5:
        return userValues.goal !== ""; // Validar objetivo
      case 6:
        return userValues.daily_activity !== ""; // Validar nivel de actividad
      case 7:
        return (
          userValues.username !== "" &&
          userValues.email !== "" &&
          userValues.phoneNumber !== "" &&
          !errors.username &&
          !errors.email &&
          !errors.phoneNumber
        ); // Validar campos del perfil
      default:
        return false;
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        // paddingTop: 48,
        backgroundColor: Colors.Color4,
        paddingBottom: insets.bottom || 48,
      }}
    >
      <Stack.Screen />
      <View style={styles.stepsWrappper}>
        {titles[val] !== "" && (
          <View style={styles.stepHeader}>
            <TouchableOpacity onPress={() => setval((prev) => prev - 1)}>
              {/* <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              > */}
              <Image source={ChevronBack} resizeMode="cover" />
              {/* <Text
                style={{
                  color: Colors.Color1,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Back */}
              {/* </Text> */}
              {/* </View> */}
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{titles[val]}</Text>
            </View>
          </View>
        )}
        {renderStep()}
        <View style={styles.stepButtonContainer}>
          <Button
            onClick={() => {
              if (val === 7) {
                delete userValues.email;
                const dataToSend = {
                  ...userValues,
                  weight: [userValues.weight], // Convertir el peso a un array
                };
                modifyUserData(dataToSend, setisLoading, () =>
                  router.push("/home")
                );
              } else {
                setval((prev) => prev + 1);
              }
            }}
            type={val === 7 ? "secondary" : "primary"}
            text={
              val === 7
                ? t("completeSignUp.buttons.finish")
                : t("completeSignUp.buttons.continue")
            }
            style={{ width: 180 }}
            disabled={!isStepValid()}
          />
        </View>
      </View>
    </View>
  );
}
