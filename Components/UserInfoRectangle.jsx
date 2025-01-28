import { View, Text } from "react-native";
import Colors from "../styles/Colors";

const UserInfoRectangle = ({ weight, age, height }) => {
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
  };

  return (
    <View style={styles.rectangleInfoContainer}>
      <View style={{ ...styles.rectangeItem, width: "25%" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.text, ...styles.value }}>
            {`${weight || 0} kg`}
          </Text>
          <Text style={{ ...styles.text, ...styles.label }}>Weight</Text>
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
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.text, ...styles.value }}>{age || 0}</Text>
          <Text style={{ ...styles.text, ...styles.label }}>Years Old</Text>
        </View>
        <View style={styles.separator}></View>
      </View>
      <View style={{ ...styles.rectangeItem, width: "25%" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.text, ...styles.value }}>
            {`${height || 0} cm`}
          </Text>
          <Text style={{ ...styles.text, ...styles.label }}>Height</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfoRectangle;
