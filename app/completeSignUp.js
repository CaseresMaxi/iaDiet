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

export default function CompleteSignUp() {
  const insets = useSafeAreaInsets();
  const [val, setval] = useState(0);

  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  // const setHEaderTitle = useStore((state) => state.setHEaderTitle);
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);

  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  const [confirmStepUserData, setconfirmStepUserData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setHeaderVisible(false);
    setHeaderTitle("");
    setNavigationVisible(false);

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
    "What’s Your Gender",
    "How Old Are You?",
    "What’s Your Weight?",
    "What’s Your Height?",
    "What Is Your Goal?",
    "Physical Activity Level",
    "Fill Your Profile",
  ];

  const activityLevels = {
    Sedentary: "Little or no exercise",
    Light: "Light exercise/sports 1-3 days/week",
    Moderate: "Moderate exercise/sports 3-5 days/week",
    Active: "Hard exercise/sports 6-7 days/week",
    "Very Active": "Hard exercise/sports 2x a day",
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
                Consistency Is the Key To progress. Don't Give Up!
              </Text>
              <Text style={styles.step0Subtext}>
                Invest in your physical and mental well-being. Every step, no
                matter how small, brings you closer to your goals. You’ve got
                this!
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
                <Text style={styles.step1GenderSelectorButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserValues({ ...userValues, gender: "f" })}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  source={userValues.gender === "f" ? femaleSelected : female}
                ></Image>
                <Text style={styles.step1GenderSelectorButtonText}>Female</Text>
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
                  setUserValues({ ...userValues, goal: "Lose Web" })
                }
                style={{
                  ...styles.step5GoalSelectorButton,
                  backgroundColor:
                    userValues.goal === "Lose Web"
                      ? Colors.Color1
                      : Colors.Font2,
                }}
              >
                <Text style={styles.step5GoalSelectorButtonText}>Lose Web</Text>
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
                  Gain weight{" "}
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
                  Muscle Mass Gain{" "}
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
                  shape body{" "}
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
                <Text style={styles.step5GoalSelectorButtonText}>Others </Text>
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
                  What Sport’s do you do? Tell us
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
                  rules={{ required: "Username is required" }}
                  render={({ field: { onBlur, value } }) => (
                    <FormInput
                      placeholder="Username"
                      placeholderTextColor="#888"
                      onBlur={onBlur}
                      onChangeText={(text) =>
                        handleInputChange("username", text)
                      }
                      value={userValues.username}
                      label="Username"
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
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
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
                      label="Email"
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
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Enter a valid phone number",
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
                      label="Phone Number"
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
              delete userValues.email;
              if (val === 7) {
                modifyUserData(userValues, setisLoading, () =>
                  router.push("/diet")
                );
              } else setval((prev) => prev + 1);
            }}
            type={val === 7 ? "secondary" : "primary"}
            text={val === 7 ? "Finish" : "Continue"}
            style={{ width: 180 }}
          />
        </View>
      </View>
    </View>
  );
}
