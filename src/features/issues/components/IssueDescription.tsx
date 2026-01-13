import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/ui/Text";

interface IssueDescriptionProps {
  description: string;
}

export const IssueDescription: React.FC<IssueDescriptionProps> = ({
  description,
}) => {
  return (
    <View style={styles.descriptionContainer}>
      <Text type="subtitle1" style={styles.descriptionTitle}>
        Description
      </Text>
      <Text type="bodyRegular" color="dark80">
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionTitle: {
    marginBottom: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
