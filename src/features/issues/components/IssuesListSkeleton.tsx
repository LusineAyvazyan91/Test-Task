import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SkeletonBlock } from "@/ui/SkeletonBlock";
import { Colors } from "@/utils/colors";
import { SkeletonHeader } from "./skeleton/SkeletonHeader";
import { SkeletonFilters } from "./skeleton/SkeletonFilters";
import { SkeletonIssueCard } from "./skeleton/SkeletonIssueCard";

export const IssuesListSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SkeletonHeader />
      <SkeletonFilters />
      <View style={styles.listContent}>
        <SkeletonBlock width="100%" height={12} style={styles.topBar} />
        <SkeletonIssueCard isFirst={true} />
        <SkeletonIssueCard isFirst={false} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray60,
  },
  listContent: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    gap: 12,
    flex: 1,
  },
  topBar: {
    marginBottom: 12,
  },
});
