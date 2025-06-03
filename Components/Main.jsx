import { notification } from "antd";
import { useRouter, useFocusEffect } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { login } from "../services/Users";
import { styles } from "../styles/MainStyles";
import { useEffect, useCallback, useState } from "react";
import FormInput from "./Input/Input";
import Button from "./Button/Button";
import Colors from "../styles/Colors";
import GlobalStyles from "../styles/Global";
import { useStore } from "../utils/zustan";
import AdsterraAd from "./Ads/AdsterraAd";
import AuthService from "../services/Auth";
import CheckBox from "./CheckBox/CheckBox";

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
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

      // Clear session data every time user enters login page
      AuthService.clearAuth();

      // Load saved credentials if they exist
      const savedEmail = window.localStorage?.getItem("rememberedEmail");
      const savedPassword = window.localStorage?.getItem("rememberedPassword");

      if (savedEmail && savedPassword) {
        setValue("email", savedEmail);
        setValue("password", savedPassword);
        setRememberMe(true);
      }

      setGoBackVisible(false);
      setHeaderTitle("Login");
      setHeaderVisible(true);
      setNavigationVisible(false);

      return () => {
        // setNavigationVisible(true);
      };
    }, [setValue])
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await AuthService.login(data.email, data.password);

      // Handle remember me functionality
      if (rememberMe) {
        window.localStorage?.setItem("rememberedEmail", data.email);
        window.localStorage?.setItem("rememberedPassword", data.password);
      } else {
        window.localStorage?.removeItem("rememberedEmail");
        window.localStorage?.removeItem("rememberedPassword");
      }

      setIsLoading(false);
      router.push("/home");
    } catch (error) {
      setIsLoading(false);
      setLoginError(true);
      setError("email", {
        type: "manual",
        message: "Usuario o contraseña incorrectos",
      });
      setError("password", {
        type: "manual",
        message: "Usuario o contraseña incorrectos",
      });
    }
  };

  // useEffect(() => {
  //   if (AuthService.isAuthenticated()) {
  //     AuthService.clearAuth();
  //   }
  // }, [router.isReady]);

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
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ActivityIndicator size="large" color={Colors.Color1} />
        </View>
      )}
      {/* {contextHolder} */}
      {/* <View style={styles.header}></View> */}

      {/* <View style={styles.formContainer}> */}
      {/* <Text style={styles.title}>Login</Text> */}
      <View style={{ flex: 1, justifyContent: "center", gap: 24 }}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Email"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text);
                setLoginError(false);
              }}
              paddingHorizontal={24}
              value={value}
              email
              label="Username or email"
              error={errors.email?.message}
            />
          )}
          name="email"
        />
        {errors.email && (
          <View style={GlobalStyles.errorWrapper}>
            <Text style={styles.errorText}>
              {errors.email.message || "Valid email is required."}
            </Text>
          </View>
        )}
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setLoginError(false);
                }}
                value={value}
                label={"Password"}
                password
                error={errors.password?.message}
              />
            )}
            name="password"
          />
          {errors.password && (
            <View style={GlobalStyles.errorWrapper}>
              <Text style={styles.errorText}>
                {errors.password.message || "Password is required."}
              </Text>
            </View>
          )}

          {/* Remember me checkbox */}
          <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
            <CheckBox
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              label="Recordarme"
            />
          </View>
        </View>
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
            <Button
              text="Login"
              onClick={handleSubmit(onSubmit)}
              width="180px"
            />
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
      </View>
      <AdsterraAd
        options={`{
		'key' : 'ffe342de43ba35b7e331c1a15e408e19',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	}`}
      />
    </View>
  );
}
