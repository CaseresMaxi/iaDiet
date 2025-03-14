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
import Colors from "../styles/Colors";

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    //console.log(data);
    delete data.confirmPassword;
    createUser(data, router.push("/completeSignUp"));
  };

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  const setGoBackVisible = useStore((state) => state.setGoBackVisible);

  useEffect(() => {
    setHeaderTitle("Sign Up");
    setNavigationVisible(false);
    setGoBackVisible(true);
  }, []);

  // Watch para observar los valores de los campos
  const password = watch("password");

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
        }}
      >
        <Text style={{ ...styles.title, textAlign: "center" }}>
          Start Your New Fitness Journey
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Email"
              valor={value}
              label={"Email"}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Password"
              valor={value}
              label={"Password"}
              password
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Confirm Password"
              valor={value}
              password
              label={"Confirm Password"}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <View style={{ alignItems: "center", marginTop: 24, gap: 20 }}>
          <Text
            style={{
              width: 180,
              textAlign: "center",
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
