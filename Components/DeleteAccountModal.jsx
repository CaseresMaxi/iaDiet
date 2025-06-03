import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import Button from "./Button/Button";
import Colors from "../styles/Colors";
import SimpleModal from "./SimpleModal/SimpleModal";

const DeleteAccountModal = ({
  visible,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const { t } = useTranslation();

  return (
    <SimpleModal visible={visible} onClose={onClose}>
      <View
        style={{
          backgroundColor: Colors.Color6,
          borderRadius: 16,
          padding: 24,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Warning Icon */}
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#FF4444",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            ⚠️
          </Text>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: Colors.Font2,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {t("profile.deleteAccount.title")}
        </Text>

        {/* Description */}
        <Text
          style={{
            fontSize: 16,
            color: Colors.Font2,
            textAlign: "center",
            lineHeight: 22,
            marginBottom: 24,
          }}
        >
          {t("profile.deleteAccount.description")}
        </Text>

        {/* Warning Message */}
        <View
          style={{
            backgroundColor: "#FFEBEE",
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#C62828",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {t("profile.deleteAccount.warning")}
          </Text>
        </View>

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            gap: 12,
          }}
        >
          <Button
            text={t("common.cancel")}
            type="secondary"
            onClick={onClose}
            width="48%"
            disabled={loading}
          />

          {loading ? (
            <View
              style={{
                flex: 1,
                height: 45,
                backgroundColor: "#FF4444",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Button
              text={t("profile.deleteAccount.confirm")}
              type="error"
              onClick={onConfirm}
              width="48%"
              disabled={loading}
            />
          )}
        </View>
      </View>
    </SimpleModal>
  );
};

export default DeleteAccountModal;
