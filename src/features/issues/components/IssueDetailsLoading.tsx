import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/utils/colors";

export const IssueDetailsLoading: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ActivityIndicator size="large" color="#2563EB" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
