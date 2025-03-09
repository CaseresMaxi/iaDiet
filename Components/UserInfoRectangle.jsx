import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import Colors from "../styles/Colors";
import { useState } from "react";
import { modifyUserData } from "../services/UserData";
import balanza from "../assets/balanza.png";
import scale from "../assets/icons/scale.svg";
import FormInput from "./Input/Input";

const UserInfoRectangle = ({ weight, age, height, userData, setUserData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  const styles = {
    rectangleInfoContainer: {
      flexDirection: "row",
      backgroundColor: Colors.Color6,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
      justifyContent: "space-between",
      alignItems: "center",
    },
    rectangeItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    separator: {
      width: 1,
      backgroundColor: Colors.Font2,
      height: "80%",
    },
    text: {
      color: Colors.Font2,
      fontSize: 15,
    },
    value: {
      fontWeight: "600",
    },
    label: {
      fontWeight: "400",
    },
    weightContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    weightButton: {
      marginVertical: 4,
      padding: 4,
      borderRadius: 20,
      backgroundColor: Colors.Color6,
      opacity: 0.9,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: Colors.Color6,
      padding: 20,
      borderRadius: 12,
      width: "80%",
      maxWidth: 300,
      alignItems: "center",
    },
    input: {
      backgroundColor: Colors.Color4,
      width: "100%",
      padding: 10,
      borderRadius: 8,
      marginVertical: 10,
      color: Colors.Font2,
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 10,
    },
    modalButton: {
      padding: 10,
      borderRadius: 8,
      minWidth: 100,
      alignItems: "center",
    },
  };

  const handleUpdateWeight = () => {
    if (!newWeight || isNaN(newWeight)) return;

    const weightValue = parseFloat(newWeight);

    const updatedWeights = userData.weight ? [...userData.weight] : [];
    updatedWeights.push({
      weight: weightValue,
      date: new Date().toISOString(),
    });

    const updatedUserData = {
      ...userData,
      weight: updatedWeights,
      current_weight: weightValue,
    };

    modifyUserData(
      updatedUserData,
      () => {},
      () => {
        setUserData(updatedUserData);
        setModalVisible(false);
        setNewWeight("");
      }
    );
  };

  return (
    <>
      <View style={styles.rectangleInfoContainer}>
        <View style={{ ...styles.rectangeItem, width: "25%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...styles.text, ...styles.value }}>
              {`${height || 0} cm`}
            </Text>
            <Text style={{ ...styles.text, ...styles.label }}>Height</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.rectangeItem,
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.separator}></View>
          <View style={styles.weightContainer}>
            <Text style={{ ...styles.text, ...styles.value }}>
              {`${weight || 0} kg`}
            </Text>

            <Text style={{ ...styles.text, ...styles.label }}>Weight</Text>
            <TouchableOpacity
              style={styles.weightButton}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={scale}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.separator}></View>
        </View>
        <View style={{ ...styles.rectangeItem, width: "25%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...styles.text, ...styles.value }}>{age || 0}</Text>
            <Text style={{ ...styles.text, ...styles.label }}>Years Old</Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ ...styles.text, fontSize: 18, marginBottom: 10 }}>
              Actualizar Peso
            </Text>
            <FormInput
              style={styles.input}
              type="numeric"
              value={newWeight}
              onChangeText={setNewWeight}
              placeholder="Ingrese nuevo peso"
              placeholderTextColor={Colors.Font2}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  ...styles.modalButton,
                  backgroundColor: Colors.Color1,
                }}
                onPress={handleUpdateWeight}
              >
                <Text style={{ color: Colors.Color4 }}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.modalButton,
                  backgroundColor: Colors.Color4,
                }}
                onPress={() => {
                  setModalVisible(false);
                  setNewWeight("");
                }}
              >
                <Text style={{ color: Colors.Color1 }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default UserInfoRectangle;
