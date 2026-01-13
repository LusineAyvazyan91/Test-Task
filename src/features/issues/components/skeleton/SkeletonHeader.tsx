import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonBlock } from "@/ui/SkeletonBlock";
import { Colors } from "@/utils/colors";

export const SkeletonHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <SkeletonBlock width={42} height={12.8} />
        <SkeletonBlock width={81} height={11.2} />
      </View>
      <View style={styles.summarySection}>
        <SkeletonBlock width="100%" height={38.4} borderRadius={12} />
        <View style={styles.progressBar}>
          <View style={[styles.progressSegment, styles.progressGreen]} />
          <View style={[styles.progressSegment, styles.progressPurple]} />
        </View>
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <SkeletonBlock width={50} height={12} />
            <View style={styles.summaryCardContent}>
              <SkeletonBlock width={30} height={20} />
              <View style={[styles.dot, { backgroundColor: Colors.green80 }]} />
            </View>
          </View>
          <View style={styles.summaryCardSpacer} />
          <View style={styles.summaryCard}>
            <SkeletonBlock width={50} height={12} />
            <View style={styles.summaryCardContent}>
              <SkeletonBlock width={30} height={20} />
              <View style={[styles.dot, { backgroundColor: Colors.purple60 }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  summarySection: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 12,
    flexDirection: "row",
    marginVertical: 16,
    overflow: "hidden",
    gap: 2,
  },
  progressSegment: {
    height: "100%",
  },
  progressGreen: {
    width: "33%",
    backgroundColor: Colors.green80,
    borderRadius: 12,
  },
  progressPurple: {
    width: "67%",
    backgroundColor: Colors.purple60,
    borderRadius: 12,
  },
  summaryCards: {
    flexDirection: "row",
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
  },
  summaryCardSpacer: {
    width: 12,
  },
  summaryCardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
