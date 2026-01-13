import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@/ui/Text";
import { BadgeStatus } from "./BadgeStatus";
import { Colors } from "@/utils/colors";
import { formatDate } from "@/utils/issueUtils";
import type { Issue } from "../types";
import ArrowLeftIcon from "../../../../assets/svgs/arrow-left.svg";
import ClockIcon from "../../../../assets/svgs/clock.svg";

interface IssueDetailsHeaderProps {
  issue: Issue;
  badgeStatus: "pending-sync" | "offline-mode" | "synchronized";
  onBackPress: () => void;
}

export const IssueDetailsHeader: React.FC<IssueDetailsHeaderProps> = ({
  issue,
  badgeStatus,
  onBackPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          accessible={true}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeftIcon width={20} height={20} />
          <Text
            type="bodyRegular"
            color="purple60"
            style={styles.backButtonText}
          >
            Go Back
          </Text>
        </TouchableOpacity>
        <BadgeStatus status={badgeStatus} />
      </View>

      <Text type="h1" style={styles.issueTitle}>
        {issue.title}
      </Text>

      <View style={styles.lastUpdatedRow}>
        <ClockIcon width={16} height={16} color={Colors.dark80} />
        <Text type="body2" color="dark80" style={styles.lastUpdatedText}>
          Last Updated:{" "}
          <Text type="bodyRegular" color="dark100">
            {formatDate(issue.updatedAt)}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 22,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 8,
  },
  issueTitle: {
    marginVertical: 12,
  },
  lastUpdatedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
  lastUpdatedText: {
    marginHorizontal: 8,
  },
});
