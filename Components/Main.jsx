import { notification } from "antd";
import { useRouter, useFocusEffect } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { login } from "../services/Users";
import { styles } from "../styles/MainStyles";
import { useEffect, useCallback } from "react";
import FormInput from "./Input/Input";
import Button from "./Button/Button";
import Colors from "../styles/Colors";
import GlobalStyles from "../styles/Global";
import { useStore } from "../utils/zustan";
import { AdSenseDisplay } from "./Ads/AdSense";

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const [api, contextHolder] = notification.useNotification();
  // const openNotification = (placement) => {
  //   api.error({
  //     message: `Credenciales incorrectas`,

  //     placement,
  //   });
  // };
  const setGoBackVisible = useStore((state) => state.setGoBackVisible);
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  const setHeaderVisible = useStore((state) => state.setHeaderVisible);

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect triggered");
      setGoBackVisible(false);
      setHeaderTitle("Login");
      setHeaderVisible(true);
      setNavigationVisible(false);

      return () => {
        // setNavigationVisible(true);
      };
    }, [])
  );

  const onSubmit = (data) => {
    login(
      data,
      () => router.push("/home"),
      () => {
        //console.log("error");
        // openNotification("topRight");
      }
    );
  };

  useEffect(() => {
    if (window.localStorage?.getItem("token")) {
      // router.push("/tracker");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
    }
  }, [router.isReady]);

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alaignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 35,
      }}
    >
      {/* {contextHolder} */}
      {/* <View style={styles.header}></View> */}

      {/* <View style={styles.formContainer}> */}
      {/* <Text style={styles.title}>Login</Text> */}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            // style={styles.customInput}
            placeholder="Email"
            placeholderTextColor="#888"
            onBlur={onBlur}
            onChangeText={onChange}
            paddingHorizontal={24}
            value={value}
            label="Username or email"
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
      {errors.email && (
        <View style={GlobalStyles.errorWrapper}>
          <Text style={styles.errorText}>Valid email is required.</Text>
        </View>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            // style={styles.customInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label={"Password"}
            password
          />
          // <TextInput
          //   style={styles.customInput}
          //   placeholder="Password"
          //   placeholderTextColor="#888"
          //   secureTextEntry
          //   onBlur={onBlur}
          //   onChangeText={onChange}
          //   value={value}
          // />
        )}
        name="password"
      />
      {errors.password && (
        <View style={GlobalStyles.errorWrapper}>
          <Text style={styles.errorText}>Password is required.</Text>
        </View>
      )}

      {/* <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable> */}
      <View>
        <View
          style={{
            width: "100%",
            height: "fit-content",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button text="Login" onClick={handleSubmit(onSubmit)} width="180px" />
          <Pressable
            onPress={() => router.push("/forgot-password")}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: Colors.Font2, fontSize: 14 }}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.footerText}>
            Don't have any account?{" "}
            <Text style={{ color: Colors.Color1, fontWeight: "medium" }}>
              Sign Up
            </Text>
          </Text>
        </Pressable>
      </View>
      {/* </View> */}

      <AdSenseDisplay
        client="ca-pub-9027784644042368"
        slot="tu-id-de-anuncio"
        format="auto"
        responsive={true}
      />
    </View>
  );
}
