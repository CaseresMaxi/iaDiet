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
  StyleSheet,
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
            <Text style={styles.openModalButtonText}>Me parece bien!</Text>
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
    suggestedMessages = [],
    initialMessage = null,
  }) => {
    const [localLoading, setLocalLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);

    React.useEffect(() => {
      if (initialMessage && messages.length === 0) {
        const botMessage = {
          id: Date.now().toString(),
          text: initialMessage,
          isBot: true,
        };
        messages.push(botMessage);
      }
    }, [chatModalVisible]);

    const handleSendMessage = useCallback(async () => {
      setLocalLoading(true);
      setShowSuggestions(false);
      await sendMessage();
      setLocalLoading(false);
    }, [sendMessage]);

    const handleSuggestedMessage = useCallback(
      async (message) => {
        setNewMessage(message);
        setShowSuggestions(false);
        await sendMessage();
      },
      [sendMessage, setNewMessage]
    );

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
        <Pressable
          style={styles.modalCenteredContainer}
          onPress={() => setChatModalVisible(false)}
        >
          <Pressable
            style={styles.chatModalFixedContent}
            onPress={(e) => e.stopPropagation()}
          >
            <FlatList
              data={
                isLoading
                  ? [...messages, { id: "loading", isBot: true }]
                  : messages
              }
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />

            {showSuggestions && suggestedMessages.length > 0 && (
              <ScrollView
                vertical
                style={styles.suggestionsContainer}
                showsHorizontalScrollIndicator={false}
              >
                {suggestedMessages.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionBubble}
                    onPress={() => handleSuggestedMessage(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

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
                onChangeText={(text) => {
                  setNewMessage(text);
                  if (text) setShowSuggestions(false);
                  else setShowSuggestions(true);
                }}
              />
              <Pressable
                style={styles.chatSendButton}
                onPress={handleSendMessage}
                disabled={localLoading || isLoading}
              >
                <Text style={styles.sendButtonText}>➡️</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);

// const styles = StyleSheet.create({
//   suggestionsContainer: {
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   suggestionBubble: {
//     backgroundColor: Colors.Color1,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 8,
//     marginVertical: 4,
//   },
//   suggestionText: {
//     color: Colors.Color6,
//     fontSize: 14,
//   },
// });

export default Chat;
