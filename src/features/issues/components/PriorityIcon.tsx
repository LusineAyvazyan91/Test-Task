import React from "react";
import { View, StyleSheet } from "react-native";
import type { Issue } from "../types";
import PriorityUpIcon from "../../../../assets/svgs/priority-up.svg";
import PriorityMediumIcon from "../../../../assets/svgs/priority-medium.svg";
import PriorityDownIcon from "../../../../assets/svgs/priority-down.svg";

interface PriorityIconProps {
  priority: Issue["priority"];
}

export const PriorityIcon: React.FC<PriorityIconProps> = ({ priority }) => {
  if (priority === "high" || priority === "critical") {
    return (
      <View style={styles.iconContainer}>
        <PriorityUpIcon width={20} height={20} />
      </View>
    );
  }

  if (priority === "medium") {
    return (
      <View style={styles.iconContainer}>
        <PriorityMediumIcon width={20} height={20} />
      </View>
    );
  }

  if (priority === "low") {
    return (
      <View style={styles.iconContainer}>
        <PriorityDownIcon width={20} height={20} />
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
