import React, { useState, useCallback, memo } from "react";
import { Image, Pressable, TouchableOpacity } from "react-native";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/TrakerStyles";
import DotTypingAnimation from "./DotTyping";
import Markdown from "react-native-markdown-display";
import Colors from "../styles/Colors";

const MessageItem = memo(
  ({ item, nutritionData, onOpenModal, index, messagesLength }) => {
    if (item.id === "loading") {
      return (
        <View style={styles.chatMessageContainer}>
          <DotTypingAnimation />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.chatMessageContainer,
          item.isBot ? styles.botMessage : styles.userMessage,
        ]}
      >
        {item?.image && (
          <Image source={{ uri: item?.image }} style={styles.messageImage} />
        )}
        {item.isBot ? (
          <Markdown style={markdownStyles}>{item.text}</Markdown>
        ) : (
          <Text style={styles.messageText}>{item.text}</Text>
        )}
        {nutritionData && index === messagesLength - 1 && (
          <Pressable style={styles.openModalButton} onPress={onOpenModal}>
            <Text style={styles.openModalButtonText}>Abrir Modal</Text>
          </Pressable>
        )}
      </View>
    );
  }
);

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

const Chat = memo(
  ({
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
  }) => {
    const [localLoading, setLocalLoading] = useState(false);

    const handleSendMessage = useCallback(async () => {
      setLocalLoading(true);
      await sendMessage();
      setLocalLoading(false);
    }, [sendMessage]);

    const handleOpenModal = useCallback(() => {
      setChatModalVisible(false);
      setModalVisible(true);
    }, [setChatModalVisible, setModalVisible]);

    const renderItem = useCallback(
      ({ item, index }) => (
        <MessageItem
          item={item}
          nutritionData={nutritionData}
          onOpenModal={handleOpenModal}
          index={index}
          messagesLength={messages.length}
        />
      ),
      [nutritionData, handleOpenModal, messages.length]
    );

    const keyExtractor = useCallback((item) => item.id, []);

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
              keyExtractor={keyExtractor}
              renderItem={renderItem}
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
              <Pressable
                style={styles.chatSendButton}
                onPress={handleSendMessage}
                disabled={localLoading || isLoading}
              >
                <Text style={styles.sendButtonText}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

export default Chat;
