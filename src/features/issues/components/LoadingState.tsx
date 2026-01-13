import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading issues...",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#9333EA" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  message: {
    marginTop: 16,
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "400",
  },
});
