import React, { useState } from "react";
import { Text, View, Modal, TouchableOpacity, Pressable } from "react-native";
import Colors from "../../styles/Colors";
import Button from "../Button/Button";
import { router } from "expo-router";
import { useStore } from "../../utils/zustan";
import Home from "../../assets/icons/Home.svg";
import Ingest from "../../assets/icons/Ingest.svg";
import Diets from "../../assets/icons/Diets.svg";
import HeaderUserW from "../../assets/icons/HeaderUserW.svg";
import { Image } from "react-native-web";

const NavBar = ({ butons }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const setTriggerCamera = useStore((state) => state.setTriggerCamera);
  const setChatVisible = useStore((state) => state.setChatVisible);
  const handleAddIngest = () => {
    setModalVisible(false);
    setTriggerCamera(true);
    router.push("/tracker");
  };

  const handleCreateDiet = () => {
    setModalVisible(false);
    router.push("/diet");
  };

  const handleOpenChat = () => {
    setModalVisible(false);
    setChatVisible(true);
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
          backgroundColor: Colors.Color2,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.push("/home")} style={{}}>
          <Image source={Home} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/diet")} style={{}}>
          <Image source={Diets} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: Colors.Color1,
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "#000",
            top: -10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              color: Colors.Color4,
              fontWeight: "bold",
              // textAlign: "justify",
              lineHeight: 32,
              top: -2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/tracker")} style={{}}>
          <Image source={Ingest} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")} style={{}}>
          <Image source={HeaderUserW} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={{
              backgroundColor: Colors.Color4,
              padding: 24,
              borderRadius: 16,
              width: "90%",
              maxWidth: 400,
              gap: 16,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: Colors.Font2,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              ¿Qué deseas hacer?
            </Text>

            <Button
              text="Crear una dieta"
              onClick={handleCreateDiet}
              width="100%"
            />
            <Button text="Abrir chat" onClick={handleOpenChat} width="100%" />
            <Button
              text="Agregar ingesta"
              type="secondary"
              onClick={handleAddIngest}
              width="100%"
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default NavBar;
