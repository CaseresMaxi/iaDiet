import { Controller } from "react-hook-form";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/TrakerStyles";

export const ModalAdd = ({
  modalVisible,
  setModalVisible,
  control,
  handleSubmit,
  errors,
  addItem,
  lastSelectedImg,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Controller
            control={control}
            name="foodName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nombre de la comida"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.foodName && (
            <Text style={styles.errorText}>{errors.foodName.message}</Text>
          )}

          <Controller
            control={control}
            name="calories"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Calorías"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          {errors.calories && (
            <Text style={styles.errorText}>{errors.calories.message}</Text>
          )}

          <Controller
            control={control}
            name="proteins"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Proteínas (g)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          {errors.proteins && (
            <Text style={styles.errorText}>{errors.proteins.message}</Text>
          )}

          <Controller
            control={control}
            name="carbs"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Carbohidratos (g)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          {errors.carbs && (
            <Text style={styles.errorText}>{errors.carbs.message}</Text>
          )}

          <Controller
            control={control}
            name="fats"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Grasas (g)"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          {errors.fats && (
            <Text style={styles.errorText}>{errors.fats.message}</Text>
          )}

          <View style={styles.imagePickerContainer}>
            {/* <Pressable style={styles.addButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </Pressable> */}

            {lastSelectedImg && (
              <Image
                source={{ uri: lastSelectedImg }}
                style={styles.previewImageSmall}
              />
            )}
          </View>

          <View style={styles.modalButtons}>
            <Pressable
              style={{ ...styles.addButton, width: "auto", borderRadius: 25 }}
              onPress={handleSubmit(addItem)}
            >
              <Text style={styles.buttonText}>Añadir Item</Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.cancelButton,
                width: "auto",
                minWidth: 100,
                borderRadius: 25,
                padding: 0,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
