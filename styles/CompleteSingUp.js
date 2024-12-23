import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  stepsWrappper: {
    alignItems: "center",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  stepContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.Color4,
  },
  fullWidthImage: {
    width: "100%", // Ancho de la pantalla
    height: "100%", // Permite que la altura se ajuste automáticamente
    aspectRatio: 1, // Relación de aspecto (ajústala si conoces la de la imagen)
  },
  stepHeader: {
    alignItems: "center",
    width: "100%",
    height: 96,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Font2,
  },
  stepButtonContainer: { width: "100%", alignItems: "center", marginTop: 32 },
  step0TextContainer: {
    width: "100%",
    paddingHorizontal: 32,
    marginTop: 32,
    gap: 20,
  },
  step0Text: {
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 40,
    //   width: "100%",
    color: Colors.Color1,
  },
  step0Subtext: {
    fontSize: 20,
    color: Colors.Font2,
    fontWeight: "regular",
    textAlign: "center",
  },
  step1Container: {
    marginTop: 32,
    gap: 48,
  },
  step1GenderSelectorButtonText: {
    marginTop: 8,
    color: Colors.Font2,
    fontWeight: "bold",
    fontSize: 20,
  },
  step3Wrapper: {
    backgroundColor: Colors.Color1,
    width: "70%",
    height: 60,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
  },
  step3WeightSelectorButtonText: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.Color4,
    width: "auto",
  },
  step3WeightSelectorDivider: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.Color4,
    width: "auto",
    fontWeight: "700",
  },
  step5Wrapper: { gap: 16, width: "80%" },
  step5GoalSelectorButton: {
    width: "100%",
    height: 60,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  step5GoalSelectorButtonText: {
    color: Colors.Color4,
    fontSize: 18,
    fontWeight: "500",
  },
  step6Wrapper: {
    gap: 16,
    width: "80%",
  },
  step6ActivitySelectorButton: {
    width: "100%",
    height: 64,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  step6ActivitySelectorButtonText: {
    color: Colors.Color4,
    fontSize: 18,
    fontWeight: "500",
  },
  step6ActivitySelectorDescription: {
    width: "100%",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
