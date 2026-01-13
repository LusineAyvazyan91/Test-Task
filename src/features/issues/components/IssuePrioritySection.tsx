import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/ui/Text";
import { SegmentControl } from "./SegmentControl";
import { getPriorityOptions } from "../enums";
import type { Issue } from "../types";
import SparksIcon from "../../../../assets/svgs/sparks.svg";

interface IssuePrioritySectionProps {
  priority: Issue["priority"];
  onPriorityChange: (priority: Issue["priority"]) => void;
}

export const IssuePrioritySection: React.FC<IssuePrioritySectionProps> = ({
  priority,
  onPriorityChange,
}) => {
  const priorityOptions = getPriorityOptions();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <SparksIcon width={20} height={20} />
        <Text type="bodyRegular" color="dark80" style={styles.sectionTitleWithIcon}>
          Priority
        </Text>
      </View>
      <SegmentControl
        options={priorityOptions}
        selectedValue={priority}
        onValueChange={onPriorityChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitleWithIcon: {
    marginLeft: 8,
  },
});
