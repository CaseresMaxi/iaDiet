import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Image,
} from "react-native";
import Colors from "../styles/Colors";
import Chevron from "../assets/icons/ChevronTop.svg";
import { use } from "react";

const { width, height } = Dimensions.get("window");
const SENSITIVITY = 50; // Sensibilidad para cambiar valores

export default function TapeMeasureSlider({
  orientation = "horizontal",
  weightMeasure = false,
  heightMeasure = false,
  setValueCallback = () => {},
  defaultValue = 28,
  unit = "kg",
}) {
  const [value, setValue] = useState(defaultValue); // Valor inicial
  const [accumulatedDx, setAccumulatedDx] = useState(0); // Acumulador de desplazamiento

  useEffect(() => {
    setValueCallback(value);
  }, [value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, unit]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      // Determina si se está desplazando en el eje correcto
      const delta =
        orientation === "horizontal" ? -gestureState.dx : -gestureState.dy; // Invertir desplazamiento

      // Acumular el desplazamiento
      setAccumulatedDx((prev) => {
        const newAccumulatedDx = prev + delta;

        // Cuando el acumulador supera la sensibilidad, se cambia el valor
        if (newAccumulatedDx >= SENSITIVITY) {
          setValue((prevValue) => prevValue + 1); // Incrementa el valor
          return 0; // Reinicia el acumulador
        } else if (newAccumulatedDx <= -SENSITIVITY) {
          setValue((prevValue) => Math.max(prevValue - 1, 0)); // Decrementa el valor
          return 0; // Reinicia el acumulador
        }

        return newAccumulatedDx;
      });
    },
    onPanResponderRelease: () => {
      // Reinicia el acumulador al soltar el dedo
      setAccumulatedDx(0);
    },
  });

  // Generar los números para la cinta métrica
  const getNumbers = () => {
    const numbers = [];
    for (let i = value - 2; i <= value + 2; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: orientation !== "vertical" ? "column" : "row",
      }}
    >
      {!weightMeasure && (
        <View style={{ alignItems: "center" }}>
          {orientation !== "vertical" && (
            <Text style={styles.mainValue}>{value}</Text>
          )}

          <Image
            style={[
              { marginBottom: 20 },
              orientation === "vertical" && {
                transform: [{ rotate: "90deg" }],
              },
            ]}
            source={Chevron}
          />
        </View>
      )}

      <View
        style={[
          styles.rulerContainer,
          orientation === "vertical" ? styles.verticalRulerContainer : null,
        ]}
        {...panResponder.panHandlers}
      >
        {getNumbers().map((num, index) => (
          <View
            key={index}
            style={[
              styles.numberContainer,
              orientation === "vertical"
                ? styles.verticalNumberContainer
                : null,
              num === value ? styles.selectedNumberContainer : null,
            ]}
          >
            <Text
              style={[
                styles.number,
                num === value ? styles.selectedNumber : null,
                {
                  fontSize: orientation === "vertical" ? 16 : 24,
                },
              ]}
            >
              {heightMeasure ? `${num} cm` : `${num}`}
            </Text>
          </View>
        ))}
      </View>
      {weightMeasure && (
        <>
          <Image
            style={[
              { marginVertical: 20 },
              orientation === "vertical" && {
                transform: [{ rotate: "90deg" }],
              },
            ]}
            source={Chevron}
          />
          <Text style={styles.mainValue}>{`${value} ${unit}`}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  rulerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.Color6,
    width: "100%",
    height: 100,
  },
  verticalRulerContainer: {
    flexDirection: "column",
    width: 100,
    height: "100%",
    borderRadius: 14,
  },
  numberContainer: {
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  verticalNumberContainer: {
    height: height / 10,
    width: "100%",
  },
  selectedNumberContainer: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#fff",
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Color4,
    opacity: 0.65,
  },
  selectedNumber: {
    color: "#fff",
    fontSize: 32,
    opacity: 1,
  },
});
