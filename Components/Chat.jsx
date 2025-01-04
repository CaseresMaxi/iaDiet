import React from "react";
import { Image, Pressable } from "react-native";
import { FlatList, Modal, Text, TextInput, View } from "react-native";
import { styles } from "../styles/TrakerStyles";
import DotTypingAnimation from "./DotTyping";

const Chat = ({
  chatModalVisible,
  setChatModalVisible,
  isLoading,
  messages,
  nutritionData,
  setModalVisible,
  selectedImage,
  removeSelectedImage,
  pickImageForChat,
  sendMessage,
  disabledImgPicker = false,
  newMessage,
  setNewMessage,
  ...props
}) => {
  // Estado del componente

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={chatModalVisible}
      onRequestClose={() => setChatModalVisible(false)}
    >
      <View style={styles.modalCenteredContainer}>
        <View style={styles.chatModalFixedContent}>
          <FlatList
            data={
              isLoading
                ? [...messages, { id: "loading", isBot: true }]
                : messages
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) =>
              item.id === "loading" ? (
                <View style={styles.chatMessageContainer}>
                  <DotTypingAnimation />
                </View>
              ) : (
                <View
                  style={[
                    styles.chatMessageContainer,
                    item.isBot ? styles.botMessage : styles.userMessage,
                  ]}
                >
                  {item?.image && (
                    <Image
                      source={{ uri: item?.image }}
                      style={styles.messageImage}
                    />
                  )}
                  <Text style={styles.messageText}>{item.text}</Text>
                  {console.log(nutritionData, index, messages.length)}
                  {nutritionData && index === messages.length - 1 && (
                    <Pressable
                      style={styles.openModalButton}
                      onPress={() => {
                        setChatModalVisible(false);
                        setModalVisible(true);
                      }}
                    >
                      <Text style={styles.openModalButtonText}>
                        Abrir Modal
                      </Text>
                    </Pressable>
                  )}
                </View>
              )
            }
          />

          {selectedImage && (
            <View style={styles.selectedImageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
              <Pressable
                style={styles.removeImageButton}
                onPress={removeSelectedImage}
              >
                <Text style={styles.removeImageButtonText}>✖</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.chatInputContainer}>
            {!disabledImgPicker && (
              <Pressable
                style={styles.imagePickerButton}
                onPress={pickImageForChat}
              >
                <Text style={styles.imagePickerButtonText}>📷</Text>
              </Pressable>
            )}
            <TextInput
              style={styles.chatInput}
              placeholder="Escribe tu mensaje..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <Pressable style={styles.chatSendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Chat;
