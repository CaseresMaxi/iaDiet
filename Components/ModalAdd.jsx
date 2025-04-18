import { Controller } from "react-hook-form";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/TrakerStyles";
import GlobalStyles from "../styles/Global";
import FormInput from "./Input/Input";
import Food from "./Food";
import { useEffect, useState, useMemo, useCallback } from "react";
import { createImage } from "../services/Chat";
import { useTranslation } from "react-i18next";

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
  const [isLoadingImg, setisLoadingImg] = useState(false);
  const { t } = useTranslation();

  // Memoizar la función de actualización de nutritionData
  const updateNutritionData = useCallback(
    (field, value) => {
      setNutritionData((prev) => ({ ...prev, [field]: value }));
    },
    [setNutritionData]
  );

  useEffect(() => {
    if (lastSelectedImg) {
      updateNutritionData("image", lastSelectedImg);
    } else if (
      !isLoadingImg &&
      !generateImg &&
      nutritionData?.nombre &&
      !nutritionData?.image
    ) {
      createImage(
        setgenerateImg,
        nutritionData.nombre,
        "test",
        setisLoadingImg
      );
    }
  }, [
    lastSelectedImg,
    isLoadingImg,
    generateImg,
    nutritionData?.nombre,
    nutritionData?.image,
    updateNutritionData,
  ]);

  useEffect(() => {
    if (!lastSelectedImg && generateImg) {
      updateNutritionData("image", generateImg);
    }
  }, [generateImg, lastSelectedImg, updateNutritionData]);

  // Memoizar el componente Food para evitar rerenders innecesarios
  const memoizedFood = useMemo(
    () => (
      <Food
        title={nutritionData?.nombre || formValues.foodName}
        calories={nutritionData?.calorias || formValues.calories}
        proteins={nutritionData?.proteinas || formValues.proteins}
        carbs={nutritionData?.carbohidratos || formValues.carbs}
        fats={nutritionData?.grasas || formValues.fats}
        enableGenerateImg={true}
        linkeable={false}
        generatedImg={lastSelectedImg || nutritionData?.image}
        generatingImg={isLoadingImg}
      />
    ),
    [nutritionData, formValues, lastSelectedImg, isLoadingImg]
  );

  // Memoizar los controladores de cambio para los inputs
  const handleFoodNameChange = useCallback(
    (onChange) => (text) => {
      onChange(text);
      updateNutritionData("nombre", text);
    },
    [updateNutritionData]
  );

  const handleCaloriesChange = useCallback(
    (onChange) => (text) => {
      onChange(text);
      updateNutritionData("calorias", text);
    },
    [updateNutritionData]
  );

  const handleProteinsChange = useCallback(
    (onChange) => (text) => {
      onChange(text);
      updateNutritionData("proteinas", text);
    },
    [updateNutritionData]
  );

  const handleCarbsChange = useCallback(
    (onChange) => (text) => {
      onChange(text);
      updateNutritionData("carbohidratos", text);
    },
    [updateNutritionData]
  );

  const handleFatsChange = useCallback(
    (onChange) => (text) => {
      onChange(text);
      updateNutritionData("grasas", text);
    },
    [updateNutritionData]
  );

  return (
    <Modal
      transparent={true}
      animationType="slide"
      destroyOnClose={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.title}>{t("modal.add.title")}</Text>
          <Controller
            control={control}
            name="foodName"
            render={({ field: { onChange, value } }) => (
              <FormInput
                placeholder={t("modal.add.food_name")}
                value={value}
                onChangeText={handleFoodNameChange(onChange)}
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
                    placeholder={t("modal.add.calories")}
                    value={value}
                    onChangeText={handleCaloriesChange(onChange)}
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
                    onChangeText={handleProteinsChange(onChange)}
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
                    onChangeText={handleCarbsChange(onChange)}
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
                    onChangeText={handleFatsChange(onChange)}
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

          {memoizedFood}

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
        </Pressable>
      </Pressable>
    </Modal>
  );
};
