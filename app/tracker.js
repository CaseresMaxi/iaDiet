import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

const Traker = () => {
  const [data, setData] = useState([
    { date: "2024-10-11", items: [] },
    { date: "2024-10-12", items: [] },
    { date: "2024-10-13", items: [] },
  ]);
  const [inputValues, setInputValues] = useState({});
  const [expandedDates, setExpandedDates] = useState({});
  const [newDate, setNewDate] = useState("");

  // Función para agregar un nuevo elemento a una fecha específica
  const addItem = (date) => {
    const newText = inputValues[date];
    if (newText && newText.trim()) {
      setData((prevData) =>
        prevData.map((day) =>
          day.date === date
            ? {
                ...day,
                items: [
                  ...day.items,
                  { id: Date.now().toString(), text: newText },
                ],
              }
            : day,
        ),
      );
      setInputValues((prevValues) => ({ ...prevValues, [date]: "" }));
    }
  };

  // Función para eliminar un elemento de una fecha específica
  const deleteItem = (date, id) => {
    setData((prevData) =>
      prevData.map((day) =>
        day.date === date
          ? { ...day, items: day.items.filter((item) => item.id !== id) }
          : day,
      ),
    );
  };

  // Función para alternar el estado expandido de una fecha específica
  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  // Función para agregar un nuevo día
  const addDate = () => {
    if (newDate.trim() && !data.some((day) => day.date === newDate)) {
      setData((prevData) => [...prevData, { date: newDate, items: [] }]);
      setNewDate("");
    }
  };

  // Función para eliminar una fecha completa
  const deleteDate = (date) => {
    setData((prevData) => prevData.filter((day) => day.date !== date));
  };

  return (
    <View style={styles.container}>
      {/* Campo para agregar nuevas fechas */}
      <View style={styles.newDateContainer}>
        <TextInput
          style={{ ...styles.input, ...styles.newDateInput }}
          placeholder="Add new date (YYYY-MM-DD)"
          value={newDate}
          onChangeText={setNewDate}
        />
        <Pressable style={styles.addButton} onPress={addDate}>
          <Text style={styles.buttonText}>Add Date</Text>
        </Pressable>
      </View>

      {/* Lista de fechas con elementos */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.dateContainer}>
            {/* Cabecera de la fecha */}
            <View style={styles.dateHeader}>
              <TouchableOpacity
                onPress={() => toggleExpand(item.date)}
                style={styles.dateHeaderButton}
              >
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.toggleIcon}>
                  {expandedDates[item.date] ? "-" : "+"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteDate(item.date)}
                style={styles.deleteDateButton}
              >
                <Text style={styles.deleteDateText}>Delete</Text>
              </TouchableOpacity>
            </View>

            {/* Contenido desplegable */}
            {expandedDates[item.date] && (
              <View style={styles.content}>
                <TextInput
                  style={styles.input}
                  placeholder="Add new item"
                  value={inputValues[item.date] || ""}
                  onChangeText={(text) =>
                    setInputValues({ ...inputValues, [item.date]: text })
                  }
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addItem(item.date)}
                >
                  <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>

                <FlatList
                  data={item.items}
                  keyExtractor={(subItem) => subItem.id}
                  renderItem={({ item: subItem }) => (
                    <View style={styles.listItem}>
                      <Text style={styles.itemText}>{subItem.text}</Text>
                      <TouchableOpacity
                        onPress={() => deleteItem(item.date, subItem.id)}
                      >
                        <Text style={styles.deleteText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Traker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  newDateInput: {
    width: "100%",
  },
  newDateContainer: {
    gap: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    overflow: "hidden",
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
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
  },
  toggleIcon: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  deleteDateButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f44",
    borderRadius: 5,
  },
  deleteDateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    padding: 15,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
    width: "33%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  itemText: {
    fontSize: 18,
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});
