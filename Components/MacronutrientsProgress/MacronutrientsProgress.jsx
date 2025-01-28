import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";
import Colors from "../../styles/Colors";
import { useTranslation } from "react-i18next";

const MacronutrientsProgress = ({
  totalProteins = 0,
  totalFats = 0,
  totalCarbs = 0,
  totalCalories = 0,
  targetProteins = 0,
  targetFats = 0,
  targetCarbs = 0,
  targetCalories = 0,
}) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        backgroundColor: Colors.Color2,
        height: "fit-content",
        paddingHorizontal: 18,
        paddingVertical: 24,
        borderRadius: 24,
        gap: 8,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {totalProteins}/{targetProteins}
          </Text>
          <View style={{ height: 10, width: "80%" }}>
            <ProgressBar
              style={{ width: "auto" }}
              progress={totalProteins / (targetProteins || 1)}
              color={Colors.Font2}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              fontWeight: 600,
            }}
          >
            {t("macros.proteins")}:
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {totalFats}/{targetFats}
          </Text>
          <View style={{ height: 10, width: "80%" }}>
            <ProgressBar
              style={{ width: "auto" }}
              progress={totalFats / (targetFats || 1)}
              color={Colors.Font2}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              fontWeight: 600,
            }}
          >
            {t("macros.fats")}:
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {totalCarbs}/{targetCarbs}
          </Text>
          <View style={{ height: 10, width: "80%" }}>
            <ProgressBar
              style={{ width: "auto" }}
              progress={totalCarbs / (targetCarbs || 1)}
              color={Colors.Font2}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              fontWeight: 600,
            }}
          >
            {t("macros.carbs")}:
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: Colors.Font2,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {totalCalories}/{targetCalories}
        </Text>
        <View style={{ height: 10, width: "100%" }}>
          <ProgressBar
            style={{ width: "auto" }}
            progress={totalCalories / (targetCalories || 1)}
            color={Colors.Font2}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: Colors.Font2,
            fontWeight: 600,
          }}
        >
          {t("macros.calories")}:
        </Text>
      </View>
    </View>
  );
};

export default MacronutrientsProgress;
