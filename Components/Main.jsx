import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function Main() {
  const insets = useSafeAreaInsets();
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
    window.location.href = "/tracker";
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
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    height: "30%",
    zIndex: -1,
  },
  logoContainer: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 36,
    color: "#000",
  },
  formContainer: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    marginTop: -50,
    borderTopLeftRadius: "50px",
    height: "40%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  linkText: {
    color: "#000",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
