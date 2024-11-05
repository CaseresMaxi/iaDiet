import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";

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
  const onSubmit = (data) => {
    console.log(data);
    router.push("/tracker");
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>◉</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
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
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorText}>Password is required.</Text>
        )}

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Don't have any account? <Text style={styles.linkText}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20", // Fondo oscuro
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#7F56DA", // Color morado para el encabezado
    height: "30%",
    zIndex: -1,
  },
  logoContainer: {
    backgroundColor: "#1E2028", // Fondo oscuro para el contenedor del logo
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 36,
    color: "#FFFFFF", // Logo en color blanco
  },
  formContainer: {
    backgroundColor: "#1E2028", // Fondo oscuro para el formulario
    padding: 20,
    marginTop: -50,
    height: "40%",
    justifyContent: "space-between",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30, // Bordes redondeados en la parte superior del formulario
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF", // Título en blanco
  },
  input: {
    height: 50,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#282C34", // Fondo oscuro para los inputs
    color: "#FFFFFF", // Texto en blanco
  },
  button: {
    backgroundColor: "#7F56DA", // Botón morado
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", // Texto en blanco
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#B0B3C7", // Texto gris claro
  },
  linkText: {
    color: "#7F56DA", // Texto morado para los enlaces
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF4D4F", // Texto de error en rojo
    fontSize: 12,
    marginBottom: 10,
  },
});
