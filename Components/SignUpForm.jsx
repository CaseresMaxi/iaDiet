import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createUser } from "../services/Users";
import { styles } from "../styles/SingUpStyles";
import FormInput from "./Input/Input";
import { useEffect } from "react";
import { useStore } from "../utils/zustan";
import Button from "./Button/Button";
import { Col } from "antd";
import Colors from "../styles/Colors";

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      age: 1,
      height: 1,
      weight: 1,
      daily_activity: "1",
      sports: "1",
      target_weight: 1,
      time_to_target_weight: "1",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    delete data.confirmPassword;
    // delete data.username;
    createUser(data, router.push("/tracker"));
  };

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  useEffect(() => {
    setHeaderTitle("Sign Up");
  }, []);
  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          // backgroundColor: "red",
        }}
      >
        <Text style={{ ...styles.title, textAlign: "center" }}>
          Start Your New Fitness Journey
        </Text>
      </View>
      <View style={styles.formContainer}>
        {/* Existing email and password fields */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            // <TextInput
            //   style={styles.customInput}
            //   placeholder="Username"
            //   placeholderTextColor="#888"
            //   onBlur={onBlur}
            //   onChangeText={onChange}
            //   value={value}
            // />
            <FormInput
              placeholder="Username"
              valor={value}
              label={"Username"}
              setValor={onChange}
              onBlur={onBlur}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            // <TextInput
            //   style={styles.customInput}
            //   placeholder="email"
            //   placeholderTextColor="#888"
            //   onBlur={onBlur}
            //   onChangeText={onChange}
            //   value={value}
            // />
            <FormInput
              placeholder="Email" // Cambia el placeholder a "Email"
              valor={value}
              label={"Email"}
              setValor={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            // <TextInput
            //   style={styles.customInput}
            //   placeholder="Password"
            //   placeholderTextColor="#888"
            //   onBlur={onBlur}
            //   onChangeText={onChange}
            //   value={value}
            //   secureTextEntry={true} // Agrega esto para ocultar la contraseña
            // />
            <FormInput
              placeholder="Password" // Cambia el placeholder a "Password"
              valor={value}
              label={"Password"}
              setValor={onChange}
              onBlur={onBlur}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            // <TextInput
            //   style={styles.customInput}
            //   placeholder="Password"
            //   placeholderTextColor="#888"
            //   onBlur={onBlur}
            //   onChangeText={onChange}
            //   value={value}
            //   secureTextEntry={true} // Agrega esto para ocultar la contraseña
            // />
            <FormInput
              placeholder="Confirm Password" // Cambia el placeholder a "Password"
              valor={value}
              label={"Confirm Password"}
              setValor={onChange}
              onBlur={onBlur}
            />
          )}
          name="confirmPassword"
        />

        {/* <Controller
          control={control}
          rules={{ required: true, min: 0.1 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Height"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              keyboardType="numeric"
            />
          )}
          name="height"
        />

        <Controller
          control={control}
          rules={{ required: true, min: 0.1 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Weight"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              keyboardType="numeric"
            />
          )}
          name="weight"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Daily Activity"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="daily_activity"
        /> */}

        {/* <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Sports"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="sports"
        />

        <Controller
          control={control}
          rules={{ required: true, min: 0.1 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Target Weight"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              keyboardType="numeric"
            />
          )}
          name="target_weight"
        /> */}

        {/* <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Time to Target Weight"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="time_to_target_weight"
        /> */}

        {/* <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create account</Text>
        </Pressable> */}
        <View style={{ alignItems: "center", marginTop: 24, gap: 20 }}>
          <Text
            style={{
              width: 180,
              textAlign: "center",
              height: "fit-content",
              color: Colors.Font2,
              fontWeight: "500",
            }}
          >
            By continuing, you agree to{" "}
            <Text style={{ color: Colors.Color1, fontWeight: "500" }}>
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text style={{ color: Colors.Color1, fontWeight: "500" }}>
              Privacy Policy.
            </Text>
          </Text>
          <Button
            text="Create account"
            width={180}
            onClick={handleSubmit(onSubmit)}
          />
        </View>

        <View style={{ alignItems: "center", marginTop: 24, gap: 20 }}>
          <Pressable onPress={() => router.push("/")}>
            <Text
              style={{
                width: 180,
                textAlign: "center",
                height: "fit-content",
                color: Colors.Font2,
                fontWeight: "500",
              }}
            >
              Already have an account?{" "}
              <Text style={{ color: Colors.Color1, fontWeight: "500" }}>
                Log in
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
