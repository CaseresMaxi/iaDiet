import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInput from "../Components/Input/Input";
import Button from "../Components/Button/Button";
import Colors from "../styles/Colors";
import GlobalStyles from "../styles/Global";
import { styles } from "../styles/MainStyles";
import { useState } from "react";

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [step, setStep] = useState("email"); // email o verification
  const [emailSent, setEmailSent] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const requestCode = async (data) => {
    try {
      const response = await fetch(
        "https://ainutritioner.click/users/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );

      if (response.ok) {
        setEmailSent(data.email);
        setStep("verification");
      } else {
        alert("Error al enviar el código. Por favor intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar el código. Por favor intenta nuevamente.");
    }
  };

  const resetPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        "https://ainutritioner.click/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailSent,
            reset_code: data.code,
            new_password: data.newPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Contraseña actualizada exitosamente");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(
          errorData.message ||
            "Error al restablecer la contraseña. Por favor verifica el código e intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Error al restablecer la contraseña. Por favor intenta nuevamente."
      );
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: Colors.Font1,
        }}
      >
        Recuperar Contraseña
      </Text>

      {step === "email" ? (
        <>
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              marginBottom: 20,
              textAlign: "center",
              paddingHorizontal: 40,
            }}
          >
            Te enviaremos un código de verificación a tu correo electrónico para
            que puedas restablecer tu contraseña
          </Text>

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
                onChangeText={onChange}
                value={value}
                label="Correo electrónico"
                paddingHorizontal={24}
              />
            )}
            name="email"
          />
          {errors.email && (
            <View style={GlobalStyles.errorWrapper}>
              <Text style={styles.errorText}>
                Por favor ingresa un email válido
              </Text>
            </View>
          )}

          <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
            <Button
              text="Enviar código de verificación"
              onClick={handleSubmit(requestCode)}
              width="220px"
            />
          </View>
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              marginBottom: 20,
              textAlign: "center",
              paddingHorizontal: 40,
            }}
          >
            Ingresa el código de verificación que enviamos a {emailSent} y tu
            nueva contraseña
          </Text>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Código de verificación"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Código"
                paddingHorizontal={24}
              />
            )}
            name="code"
          />
          {errors.code && (
            <View style={GlobalStyles.errorWrapper}>
              <Text style={styles.errorText}>El código es requerido</Text>
            </View>
          )}

          <Controller
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Nueva contraseña"
                placeholderTextColor="#888"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Nueva contraseña"
                paddingHorizontal={24}
                password
              />
            )}
            name="newPassword"
          />
          {errors.newPassword && (
            <View style={GlobalStyles.errorWrapper}>
              <Text style={styles.errorText}>
                La contraseña debe tener al menos 6 caracteres
              </Text>
            </View>
          )}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Confirmar contraseña"
                placeholderTextColor="#888"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Confirmar contraseña"
                paddingHorizontal={24}
                password
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <View style={GlobalStyles.errorWrapper}>
              <Text style={styles.errorText}>
                Por favor confirma tu contraseña
              </Text>
            </View>
          )}

          <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
            <Button
              text="Restablecer contraseña"
              onClick={handleSubmit(resetPassword)}
              width="220px"
            />
          </View>
        </>
      )}

      <Pressable onPress={() => router.push("/")} style={{ marginTop: 20 }}>
        <Text style={{ color: Colors.Color1, fontSize: 14 }}>
          Volver al inicio de sesión
        </Text>
      </Pressable>
    </View>
  );
}
