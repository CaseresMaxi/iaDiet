import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "flex-start",
    // height: "100%",
    alignItems: "center",
  },
  innerFormContainer: {
    backgroundColor: Colors.Color4,
    height: "100%",
    width: "100%",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  rectangleInfoContainer: {
    flexDirection: "row",
    backgroundColor: Colors.Color2,
    width: "100%",
    height: 60,
    borderRadius: 10,
    marginBottom: 40,
    marginTop: 20,
  },
  rectangeItem: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
