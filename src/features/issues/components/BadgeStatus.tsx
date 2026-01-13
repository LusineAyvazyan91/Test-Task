import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/ui/Text";
import { Color, Colors } from "@/utils/colors";

export type BadgeStatusType = "pending-sync" | "offline-mode" | "synchronized";

interface BadgeStatusProps {
  status: BadgeStatusType;
}

const getBadgeConfig = (status: BadgeStatusType) => {
  switch (status) {
    case "pending-sync":
      return {
        label: "Pending Sync",
        backgroundColor: Colors.orange8,
        textColor: "orange100" as Color,
      };
    case "offline-mode":
      return {
        label: "Offline Mode",
        backgroundColor: Colors.gray60,
        textColor: "dark100" as Color,
      };
    case "synchronized":
      return {
        label: "Synchronized",
        backgroundColor: Colors.green12,
        textColor: "green100" as Color,
      };
    default:
      return {
        label: "",
        backgroundColor: Colors.gray60,
        textColor: "dark100" as Color,
      };
  }
};

export const BadgeStatus: React.FC<BadgeStatusProps> = ({ status }) => {
  const config = getBadgeConfig(status);

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.backgroundColor,
        },
      ]}
    >
      <Text type="body2" color={config.textColor}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 9999,
    alignSelf: "flex-start",
  },
});
