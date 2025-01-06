import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserCard from "../Components/UserCard";
import { useStore } from "../utils/zustan";
import { useEffect, useState } from "react";
import styles from "../styles/ProfileStyles";
import { Controller, useForm } from "react-hook-form";
import Colors from "../styles/Colors";
import Female from "../assets/female_user.png";
import Male from "../assets/male_user.png";
import User from "../assets/icons/user.svg";
import { Image, Text } from "react-native";
import FormInput from "../Components/Input/Input";
import Button from "../Components/Button/Button";
import { fetchUserData } from "../services/UserData";

export default function Profile() {
  const insets = useSafeAreaInsets();

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setHeaderColor = useStore((state) => state.setHeaderColor);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  useEffect(() => {
    setHeaderTitle("My Profile");
    setHeaderColor(Colors.Font2);
    setNavigationVisible(true);
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
      age: "",
      weight: "",
      height: "",
    },
  });

  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const fetchUserData = async (setuserData) => {
    //   setLoading(true); // Indica que la carga ha comenzado
    //   try {
    //     const response = await fetch(
    //       `https://ainutritioner.click/users/${window.sessionStorage?.user_id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
    //         },
    //       }
    //     );
    //     const data = await response.json();
    //     setuserData(data);
    //     reset({
    //       username: data.username || "",
    //       email: data.email || "",
    //       birdthday: data.birdthday || "",
    //       weight: data.weight || "",
    //       height: data.height || "",
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false); // Indica que la carga ha terminado
    //   }
    // };

    fetchUserData(setuserData, setLoading);
  }, []);

  useEffect(() => {
    reset({
      username: userData?.username || "",
      email: userData?.email || "",
      age: userData?.age || "",
      weight: `${userData?.weight} kg` || "",
      height:
        userData?.height !== undefined || userData?.height !== null
          ? `${userData?.height} cm`
          : "",
    });
  }, [userData]);

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
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
        <View style={{ paddingHorizontal: 24, width: "100%" }}>
          <View style={styles.rectangleInfoContainer}>
            <View
              style={{
                ...styles.rectangeItem,
                width: "25%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.Font2,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  {`${userData?.weight || 0} kg`}
                </Text>
                <Text
                  style={{
                    color: Colors.Font2,
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  Weight
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.rectangeItem,
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 1,
                  backgroundColor: Colors.Font2,
                  height: "80%",
                }}
              ></View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.Font2,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  25
                </Text>
                <Text
                  style={{
                    color: Colors.Font2,
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  Years Old
                </Text>
              </View>
              <View
                style={{
                  width: 1,
                  backgroundColor: Colors.Font2,
                  height: "80%",
                }}
              ></View>
            </View>
            <View
              style={{
                ...styles.rectangeItem,
                width: "25%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.Font2,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  {userData?.height || 0} cm
                </Text>
                <Text
                  style={{
                    color: Colors.Font2,
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  Height
                </Text>
              </View>
            </View>
          </View>
        </View>
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
              // pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                // style={styles.customInput}
                placeholder="Cool nickname"
                placeholderTextColor="#888"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                label="User Name"
              />
              // <TextInput
              //   style={styles.customInput}
              //   placeholder="Email"
              //   placeholderTextColor="#888"
              //   onBlur={onBlur}
              //   onChangeText={onChange}
              //   value={value}
              // />
            )}
            name="username"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                // style={styles.customInput}
                placeholder="example@email.com"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Email"
              />
              // <TextInput
              //   style={styles.customInput}
              //   placeholder="Email"
              //   placeholderTextColor="#888"
              //   onBlur={onBlur}
              //   onChangeText={onChange}
              //   value={value}
              // />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                // style={styles.customInput}
                placeholder="25"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Age"
              />
            )}
            name="age"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                // style={styles.customInput}
                placeholder="70Kg"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                label="Weight"
              />
              // <TextInput
              //   style={styles.customInput}
              //   placeholder="Email"
              //   placeholderTextColor="#888"
              //   onBlur={onBlur}
              //   onChangeText={onChange}
              //   value={value}
              // />
            )}
            name="weight"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                // style={styles.customInput}
                placeholder="180cm"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                label="Height"
              />
              // <TextInput
              //   style={styles.customInput}
              //   placeholder="Email"
              //   placeholderTextColor="#888"
              //   onBlur={onBlur}
              //   onChangeText={onChange}
              //   value={value}
              // />
            )}
            name="height"
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
          {/* <UserCard /> */}
          <Button
            text="Save"
            style={{ marginTop: 20 }}
            type={"secondary"}
            onClick={handleSubmit}
            width={142}
          />
          <Button
            text="Log Out"
            style={{ marginTop: 20 }}
            type={"error"}
            onClick={handleSubmit}
            width={142}
          />
        </View>
      </View>
    </View>
  );
}
