import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/ui/Text";
import { Colors } from "@/utils/colors";

interface IssueDetailsErrorProps {
  onBackPress: () => void;
}

export const IssueDetailsError: React.FC<IssueDetailsErrorProps> = ({
  onBackPress,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text type="subtitle1" color="dark100">
        Issue not found
      </Text>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Text type="subtitle1" color="purple60">
          Go Back
        </Text>
      </TouchableOpacity>
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
  backButton: {
    marginTop: 20,
  },
});
