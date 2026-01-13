import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/ui/Text";
import { SegmentControl } from "./SegmentControl";
import { getStatusOptions } from "../enums";
import type { Issue } from "../types";
import TaskListIcon from "../../../../assets/svgs/task-list.svg";

interface IssueStatusSectionProps {
  status: Issue["status"];
  onStatusChange: (status: Issue["status"]) => void;
}

export const IssueStatusSection: React.FC<IssueStatusSectionProps> = ({
  status,
  onStatusChange,
}) => {
  const statusOptions = getStatusOptions();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <TaskListIcon width={20} height={20} />
        <Text type="bodyRegular" color="dark80" style={styles.sectionTitleWithIcon}>
          Status
        </Text>
      </View>
      <SegmentControl
        options={statusOptions}
        selectedValue={status}
        onValueChange={onStatusChange}
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
