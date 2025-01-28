import React from "react";
import { Image, Pressable } from "react-native";
import { FlatList, Modal, Text, TextInput, View } from "react-native";
import { styles } from "../styles/TrakerStyles";
import DotTypingAnimation from "./DotTyping";
import Markdown from "react-native-markdown-display";
import Colors from "../styles/Colors";

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
  const markdownStyles = {
    body: {
      color: Colors.Font2,
    },
    heading1: {
      color: Colors.Font2,
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
    },
    heading2: {
      color: Colors.Font2,
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
    },
    heading3: {
      color: Colors.Font2,
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
    },
    strong: {
      color: Colors.Font2,
      fontWeight: "bold",
    },
    bullet_list: {
      color: Colors.Font2,
      marginLeft: 20,
    },
    bullet_list_icon: {
      color: Colors.Font2,
    },
    ordered_list: {
      color: Colors.Font2,
      marginLeft: 20,
    },
    ordered_list_icon: {
      color: Colors.Font2,
    },
    paragraph: {
      color: Colors.Font2,
      marginVertical: 8,
    },
  };

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
                  {item.isBot ? (
                    <Markdown style={markdownStyles}>{item.text}</Markdown>
                  ) : (
                    <Text style={styles.messageText}>{item.text}</Text>
                  )}
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
