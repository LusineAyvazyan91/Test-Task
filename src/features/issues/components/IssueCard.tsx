import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import type { Issue } from "../types";
import { StatusIcon } from "./StatusIcon";
import { PriorityIcon } from "./PriorityIcon";
import { formatUpdatedDate } from "../../../utils/issueUtils";
import { Text } from "@/ui/Text";
import ClockIcon from "../../../../assets/svgs/clock.svg";
import { Colors } from "@/utils/colors";

interface IssueCardProps {
  issue: Issue;
  onPress: (issueId: string) => void;
}

const getStatusLabel = (status: Issue["status"]): string => {
  switch (status) {
    case "open":
      return "Opened";
    case "closed":
      return "Closed";
    default:
      return status;
  }
};

const getPriorityLabel = (priority: Issue["priority"]): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

export const IssueCard: React.FC<IssueCardProps> = React.memo(
  ({ issue, onPress }) => {
    const statusLabel = getStatusLabel(issue.status);
    const priorityLabel = getPriorityLabel(issue.priority);
    const accessibilityLabel = `${
      issue.title
    }. Status: ${statusLabel}. Priority: ${priorityLabel}. Updated: ${formatUpdatedDate(
      issue.updatedAt
    )}`;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(issue.id)}
        activeOpacity={0.7}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
      >
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            <StatusIcon status={issue.status} />
            <Text type="bodyRegular" style={styles.textRegular}>
              {getStatusLabel(issue.status)}
            </Text>
          </View>
          <View style={styles.priorityContainer}>
            <PriorityIcon priority={issue.priority} />
            <Text type="bodyRegular" style={styles.textRegular}>
              {getPriorityLabel(issue.priority)}
            </Text>
          </View>
        </View>

        <Text type="subtitle2">{issue.title}</Text>
        <Text
          type="body2"
          color="dark80"
          style={styles.description}
          numberOfLines={2}
        >
          {issue.description}
        </Text>

        <View style={styles.updatedRow}>
          <ClockIcon width={20} height={20} />
          <Text type="body2" color="dark80" style={styles.updatedText}>
            {formatUpdatedDate(issue.updatedAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.issue.id === nextProps.issue.id &&
      prevProps.issue.status === nextProps.issue.status &&
      prevProps.issue.priority === nextProps.issue.priority &&
      prevProps.issue.updatedAt === nextProps.issue.updatedAt &&
      prevProps.issue.title === nextProps.issue.title &&
      prevProps.issue.description === nextProps.issue.description
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gray70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray40,
    paddingBottom: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacer: {
    width: 6,
  },
  statusText: {
    marginLeft: 8,
  },
  textRegular: {
    marginLeft: 8,
  },
  description: {
    marginTop: 8,
    marginBottom: 12,
  },
  updatedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  clockIconSpacer: {
    width: 6,
  },
  updatedText: {
    marginLeft: 8,
  },
});
