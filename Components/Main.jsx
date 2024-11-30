import { notification } from "antd";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { login } from "../services/Users";
import { styles } from "../styles/MainStyles";
import { useEffect } from "react";
import FormInput from "./Input/Input";
import Button from "./Button/Button";
import Colors from "../styles/Colors";

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

  const onSubmit = (data) => {
    login(
      data,
      () => router.push("/tracker"),
      () => {
        console.log("error");
        // openNotification("topRight");
      }
    );
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      router.push("/tracker");
    }
  }, []);

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
        <Text style={styles.errorText}>Valid email is required.</Text>
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
        <Text style={styles.errorText}>Password is required.</Text>
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
  );
}
