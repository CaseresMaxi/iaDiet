import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: "",
      password: "",
      age: 1,
      height: 1,
      weight: 1,
      daily_activity: "",
      sports: "",
      target_weight: 1,
      time_to_target_weight: "",
    },
  });
  const onSubmit = (data) => {
    fetch("http://54.198.190.149:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.sessionStorage.setItem("user_id", data.user_id);
        router.push("/tracker");
      })
      .catch((error) => console.error(error));
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
        {/* <View style={styles.logoContainer}> */}
        {/* <Text style={styles.logo}>◉</Text> */}
        {/* </View> */}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        {/* Existing email and password fields */}
        {/* <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="username"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        /> */}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Password"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true} // Agrega esto para ocultar la contraseña
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{ required: true, min: 1 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Age"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              keyboardType="numeric"
            />
          )}
          name="age"
        />

        <Controller
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
        />

        <Controller
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
        />

        <Controller
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
        />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create account</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.footerText}>
            back to <Text style={styles.linkText}>login</Text>
          </Text>
        </Pressable>
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
    height: "10%",
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
    height: "90%",
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
  customInput: {
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
