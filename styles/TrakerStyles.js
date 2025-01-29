import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Color1,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.Color4, // Fondo oscuro
  },
  newDateInput: {
    width: "50%",
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#1E2028", // Fondo oscuro para inputs
    color: "#FFFFFF", // Texto en blanco
  },
  newDateContainer: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  dateContainer: {
    // marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderRadius: 15,
    overflow: "hidden",
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E2028", // Fondo oscuro
    padding: 20,
  },
  dateHeaderButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // Texto blanco
  },
  toggleIcon: {
    fontSize: 20,
    marginLeft: 10,
    color: "#FFFFFF", // Icono en blanco
  },
  deleteDateButton: {
    backgroundColor: "#FF4D4F", // Color rojo para eliminar
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteDateText: {
    color: "#FFFFFF", // Texto blanco en el botón de eliminar
  },
  content: {
    padding: 15,
    backgroundColor: "#1E2028", // Fondo oscuro para el contenido
  },
  input: {
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#1E2028", // Fondo oscuro
    color: "#FFFFFF", // Texto blanco
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#7F56DA", // Botón morado
    padding: 15,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    width: "100%",
    height: 40,
  },
  buttonText: {
    color: "#FFFFFF", // Texto en blanco
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#1E2028", // Fondo oscuro para los items
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
    gap: 20,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
    color: "#FFFFFF", // Texto blanco
  },
  deleteText: {
    color: "#FF4D4F", // Texto rojo para eliminar
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo transparente oscuro
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#1E2028", // Fondo oscuro para el modal
    borderRadius: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  previewImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 10,
  },
  errorText: {
    color: "#FF4D4F", // Texto de error en rojo
    marginBottom: 5,
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "#4E4C67", // Botón gris oscuro
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 40,
  },

  chatModalFixedContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "#1E2028", // Fondo oscuro para el chat modal
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-between",
  },
  chatMessageContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#282C34",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  botMessage: {
    backgroundColor: "#7F56DA", // Fondo morado para los mensajes del bot
    alignSelf: "flex-start", // Alinear los mensajes del bot a la izquierda
  },
  userMessage: {
    backgroundColor: "#4E4C67", // Fondo gris oscuro para los mensajes del usuario
    alignSelf: "flex-end", // Alinear los mensajes del usuario a la derecha
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: "#FFFFFF", // Texto blanco para los mensajes
  },
  openModalButton: {
    backgroundColor: "#7F56DA", // Botón morado para abrir modal
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  openModalButtonText: {
    color: "#FFFFFF", // Texto en blanco
    fontWeight: "bold",
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#4E4C67", // Borde gris oscuro
    width: "100%",
    overflow: "hidden",
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#282C34", // Fondo gris oscuro
    color: "#FFFFFF", // Texto blanco
  },
  chatSendButton: {
    marginLeft: 10,
    backgroundColor: "#7F56DA", // Botón morado para enviar mensajes
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    width: "40px",
    height: "40px",
  },
  sendButtonText: {
    color: "#FFFFFF", // Texto en blanco
    fontWeight: "bold",
  },
  imagePickerButton: {
    backgroundColor: "#4E4C67", // Botón gris oscuro para elegir imagen
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    borderRadius: "100%",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",

    width: "40px",
    height: "40px",
  },
  imagePickerButtonText: {
    // fontSize: 24,
    color: "#FFFFFF", // Icono blanco para el botón de imagen
    // textAlign: "center",
    // paddingBottom: 10,
  },
  selectedImageContainer: {
    position: "relative",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#282C34", // Fondo gris oscuro para la imagen seleccionada
    padding: 10,
    alignItems: "center",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro translúcido
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageButtonText: {
    color: "#FFFFFF", // Texto blanco para eliminar imagen
    fontSize: 16,
  },
  datePickerContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF", // Fondo claro para el DatePicker
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    width: "100%",
    height: "100%",
  },
  modalCenteredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro translúcido
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro translúcido para el modal
  },
});
