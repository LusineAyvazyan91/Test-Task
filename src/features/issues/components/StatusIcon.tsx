import React from "react";
import { View, StyleSheet } from "react-native";
import type { Issue } from "../types";
import CheckCircleIcon from "../../../../assets/svgs/check-circle-solid.svg";
import SystemRestartIcon from "../../../../assets/svgs/system-restart.svg";

interface StatusIconProps {
  status: Issue["status"];
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === "open") {
    return (
      <View style={styles.iconContainer}>
        <SystemRestartIcon />
      </View>
    );
  }

  if (status === "closed") {
    return (
      <View style={styles.iconContainer}>
        <CheckCircleIcon width={20} height={20} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
