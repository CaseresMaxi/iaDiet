import { Controller } from "react-hook-form";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/TrakerStyles";
import GlobalStyles from "../styles/Global";
import FormInput from "./Input/Input";
import Food from "./Food";
import { useEffect, useState } from "react";
import { createImage } from "../services/Chat";

export const ModalAdd = ({
  modalVisible,
  setModalVisible,
  control,
  handleSubmit,
  errors,
  addItem,
  nutritionData,
  lastSelectedImg,
  setNutritionData,
}) => {
  const [formValues, setFormValues] = useState({});
  const [generateImg, setgenerateImg] = useState(null);
  // Update formValues whenever the control values change

  useEffect(() => {
    if (lastSelectedImg) {
      setNutritionData((prev) => ({
        ...prev,
        image: lastSelectedImg,
      }));
    } else {
      createImage(setgenerateImg, nutritionData?.nombre, "test");
    }
  }, [nutritionData, lastSelectedImg]);
  useEffect(() => {
    if (!lastSelectedImg)
      setNutritionData((prev) => ({
        ...prev,
        image: generateImg,
      }));
  }, [generateImg]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      destroyOnClose={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Controller
            control={control}
            name="foodName"
            render={({ field: { onChange, value } }) => (
              <FormInput
                placeholder="Nombre de la comida"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setNutritionData((prev) => ({ ...prev, foodName: text }));
                }}
                label={"Nombre de la comida"}
              />
            )}
          />
          {errors.foodName && (
            <View style={GlobalStyles.errorWrapper}>
              <Text style={styles.errorText}>{errors.foodName.message}</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Controller
                control={control}
                name="calories"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    style={{ maxWidth: 100 }}
                    placeholder="Calorias"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                      setNutritionData((prev) => ({
                        ...prev,
                        calories: text || prev.calories,
                      }));
                    }}
                    label={"Calorias"}
                  />
                )}
              />
              {errors.calories && (
                <View style={GlobalStyles.errorWrapper}>
                  <Text style={styles.errorText}>
                    {errors.calories.message}
                  </Text>
                </View>
              )}
              <Controller
                control={control}
                name="proteins"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    placeholder="Proteinas (g)"
                    style={{ maxWidth: 100 }}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                      setNutritionData((prev) => ({
                        ...prev,
                        proteins: text || prev.proteins,
                      }));
                    }}
                    label={"Proteinas (g)"}
                  />
                )}
              />
              {errors.proteins && (
                <View style={GlobalStyles.errorWrapper}>
                  <Text style={styles.errorText}>
                    {errors.proteins.message}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Controller
                control={control}
                name="carbs"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    style={{ maxWidth: 100 }}
                    placeholder="Carbohidratos (g)"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                      setNutritionData((prev) => ({
                        ...prev,
                        carbs: text || prev.carbs,
                      }));
                    }}
                    label={"Carbohidratos (g)"}
                  />
                )}
              />
              {errors.carbs && (
                <View style={GlobalStyles.errorWrapper}>
                  <Text style={styles.errorText}>{errors.carbs.message}</Text>
                </View>
              )}
              <Controller
                control={control}
                name="fats"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    placeholder="Grasas (g)"
                    style={{ maxWidth: 100 }}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                      setNutritionData((prev) => ({
                        ...prev,
                        fats: text || prev.fats,
                      }));
                    }}
                    label={"Grasas (g)"}
                  />
                )}
              />
              {errors.fats && (
                <View style={GlobalStyles.errorWrapper}>
                  <Text style={styles.errorText}>{errors.fats.message}</Text>
                </View>
              )}
            </View>
          </View>
          {/* <View style={styles.imagePickerContainer}>
            {lastSelectedImg && (
              <Image
                source={{ uri: lastSelectedImg }}
                style={styles.previewImageSmall}
              />
            )}
          </View> */}

          {/* Pasar los valores del formulario al componente Food */}
          {console.log("nutritionData123", nutritionData)}
          {
            <Food
              title={nutritionData?.nombre || formValues.foodName}
              calories={nutritionData?.calorias || formValues.calories}
              proteins={nutritionData?.proteinas || formValues.proteins}
              carbs={nutritionData?.carbohidratos || formValues.carbs}
              fats={nutritionData?.grasas || formValues.fats}
              enableGenerateImg={true}
              linkeable={false}
              generatedImg={lastSelectedImg || nutritionData?.image}
            />
          }

          <View style={styles.modalButtons}>
            <Pressable
              style={{ ...styles.addButton, width: "auto", borderRadius: 25 }}
              onPress={handleSubmit(() => addItem(nutritionData))}
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
