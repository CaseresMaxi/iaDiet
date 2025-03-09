import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInput from "../Components/Input/Input";
import Button from "../Components/Button/Button";
import Colors from "../styles/Colors";
import GlobalStyles from "../styles/Global";
import { styles } from "../styles/MainStyles";
import { useState, useEffect } from "react";
import { useStore } from "../utils/zustan";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [step, setStep] = useState("email"); // email o verification
  const [emailSent, setEmailSent] = useState("");
  const { t } = useTranslation();

  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  useEffect(() => {
    setHeaderTitle(t("forgotPassword.title"));
    setNavigationVisible(false);
    return () => {
      setNavigationVisible(true);
    };
  }, []);

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
        alert(t("forgotPassword.errorSendingCode"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t("forgotPassword.errorSendingCode"));
    }
  };

  const resetPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert(t("forgotPassword.passwordMismatch"));
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
        alert(t("forgotPassword.successMessage"));
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || t("forgotPassword.errorResettingPassword"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t("forgotPassword.errorResettingPassword"));
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
      <View style={localStyles.formContainer}>
        <Text style={localStyles.title}>{t("forgotPassword.title")}</Text>

        {step === "email" ? (
          <>
            <Text style={localStyles.subtitle}>
              {t("forgotPassword.emailStep")}
            </Text>

            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  placeholderTextColor={Colors.Color3}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t("forgotPassword.emailLabel")}
                />
              )}
              name="email"
            />
            {errors.email && (
              <View style={GlobalStyles.errorWrapper}>
                <Text style={styles.errorText}>
                  {t("forgotPassword.emailRequired")}
                </Text>
              </View>
            )}

            <View style={localStyles.buttonContainer}>
              <Button
                text={t("forgotPassword.sendCodeButton")}
                onClick={handleSubmit(requestCode)}
                width="90%"
                type="secondary"
              />
            </View>
          </>
        ) : (
          <>
            <Text style={localStyles.subtitle}>
              {t("forgotPassword.verificationStep", { email: emailSent })}
            </Text>

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder={t("forgotPassword.codePlaceholder")}
                  placeholderTextColor={Colors.Color3}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t("forgotPassword.codeLabel")}
                />
              )}
              name="code"
            />
            {errors.code && (
              <View style={GlobalStyles.errorWrapper}>
                <Text style={styles.errorText}>
                  {t("forgotPassword.codeRequired")}
                </Text>
              </View>
            )}

            <Controller
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder={t("forgotPassword.newPasswordPlaceholder")}
                  placeholderTextColor={Colors.Color3}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t("forgotPassword.newPasswordLabel")}
                  password
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && (
              <View style={GlobalStyles.errorWrapper}>
                <Text style={styles.errorText}>
                  {t("forgotPassword.newPasswordRequired")}
                </Text>
              </View>
            )}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder={t("forgotPassword.confirmPasswordPlaceholder")}
                  placeholderTextColor={Colors.Color3}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={t("forgotPassword.confirmPasswordLabel")}
                  password
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <View style={GlobalStyles.errorWrapper}>
                <Text style={styles.errorText}>
                  {t("forgotPassword.confirmPasswordRequired")}
                </Text>
              </View>
            )}

            <View style={localStyles.buttonContainer}>
              <Button
                text={t("forgotPassword.resetPasswordButton")}
                onClick={handleSubmit(resetPassword)}
                width="90%"
                type="secondary"
              />
            </View>
          </>
        )}

        <Pressable
          onPress={() => router.push("/")}
          style={localStyles.backToLogin}
        >
          <Text style={localStyles.backToLoginText}>
            {t("forgotPassword.backToLogin")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  formContainer: {
    backgroundColor: Colors.Color4,
    padding: 20,
    borderRadius: 20,
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Font2,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.Font2,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  backToLogin: {
    marginTop: 20,
    alignItems: "center",
  },
  backToLoginText: {
    color: Colors.Color1,
    fontSize: 14,
    fontWeight: "bold",
  },
});
