import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonBlock } from "@/ui/SkeletonBlock";
import { Colors } from "@/utils/colors";
import SystemRestartIcon from "../../../../../assets/svgs/system-restart.svg";
import CheckCircleIcon from "../../../../../assets/svgs/check-circle-solid.svg";
import PriorityUpIcon from "../../../../../assets/svgs/priority-up.svg";
import PriorityMediumIcon from "../../../../../assets/svgs/priority-medium.svg";
import ClockIcon from "../../../../../assets/svgs/clock.svg";

interface SkeletonIssueCardProps {
  isFirst?: boolean;
}

export const SkeletonIssueCard: React.FC<SkeletonIssueCardProps> = ({
  isFirst = false,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          {isFirst ? (
            <SystemRestartIcon width={20} height={20} />
          ) : (
            <CheckCircleIcon width={20} height={20} />
          )}
          <SkeletonBlock width={80} height={14} style={styles.cardTitle} />
        </View>
        <View style={styles.cardHeaderRight}>
          {isFirst ? (
            <PriorityUpIcon width={20} height={20} />
          ) : (
            <PriorityMediumIcon width={20} height={20} />
          )}
          <SkeletonBlock width={60} height={14} style={styles.cardPriority} />
        </View>
      </View>
      <SkeletonBlock width="100%" height={12} style={styles.cardLine} />
      <SkeletonBlock width="85%" height={12} style={styles.cardLine} />
      <SkeletonBlock width="70%" height={12} style={styles.cardLine} />
      <View style={styles.cardFooter}>
        <ClockIcon width={16} height={16} color={Colors.gray70} />
        <SkeletonBlock width={100} height={12} style={styles.cardTimestamp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gray70,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray40,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    marginLeft: 8,
  },
  cardPriority: {
    marginLeft: 8,
  },
  cardLine: {
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  cardTimestamp: {
    marginLeft: 8,
  },
});
