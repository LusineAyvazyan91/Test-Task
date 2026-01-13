import React from "react";
import { View, StyleSheet } from "react-native";
import { calculateIssueStats } from "../../../utils/issueUtils";
import type { Issue } from "../types";
import { Text } from "@/ui/Text";
import { Colors } from "@/utils/colors";

interface IssueSummaryProps {
  issues: Issue[];
}

export const IssueSummary: React.FC<IssueSummaryProps> = ({ issues }) => {
  const stats = calculateIssueStats(issues);
  const hasIssues = issues.length > 0;

  return (
    <View style={styles.container}>
      <Text type="display1">{hasIssues ? stats.total : "N/A"}</Text>
      <View
        style={[styles.progressBar, !hasIssues && styles.backgroundColorClosed]}
      >
        {hasIssues && (
          <>
            <View
              style={[
                styles.progressSegment,
                styles.progressClosed,
                { width: `${stats.closedPercentage}%` },
              ]}
            />
            <View
              style={[
                styles.progressSegment,
                styles.progressOpened,
                { width: `${stats.openedPercentage}%` },
              ]}
            />
          </>
        )}
      </View>
      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <Text type="body2" color="dark80">
            Closed
          </Text>
          <View style={styles.summaryCardContent}>
            <Text type="subtitle1">{stats.closed}</Text>
            <View
              style={[styles.summaryDot, { backgroundColor: Colors.green80 }]}
            />
          </View>
        </View>
        <View style={styles.summaryCardSpacer} />
        <View style={styles.summaryCard}>
          <Text type="body2" color="dark80">
            Opened
          </Text>
          <View style={styles.summaryCardContent}>
            <Text type="subtitle1">{stats.opened}</Text>
            <View
              style={[styles.summaryDot, { backgroundColor: Colors.purple60 }]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 12,
    flexDirection: "row",
    marginVertical: 16,
    overflow: "hidden",
    gap: 2,
  },
  backgroundColorClosed: {
    backgroundColor: Colors.gray40,
  },
  progressSegment: {
    height: "100%",
  },
  progressClosed: {
    backgroundColor: Colors.green80,
    borderRadius: 12,
  },
  progressOpened: {
    backgroundColor: Colors.purple60,
    borderRadius: 12,
  },
  summaryCards: {
    flexDirection: "row",
  },
  summaryCardSpacer: {
    width: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
  },
  summaryCardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
