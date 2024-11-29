import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createUser } from "../services/Users";
import { styles } from "../styles/SingUpStyles";

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
      daily_activity: "",
      sports: "",
      target_weight: 1,
      time_to_target_weight: "",
    },
  });
  const onSubmit = (data) => {
    createUser(data, router.push("/tracker"));
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="Username"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.customInput}
              placeholder="email"
              placeholderTextColor="#888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />

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
