import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PageSearchIcon from "../../../../assets/svgs/page-search.svg";
import { Text } from "@/ui/Text";
import { Colors } from "@/utils/colors";

interface EmptyStateProps {
  error?: string | null;
  hasSearchOrFilter: boolean;
  isEmptySearch?: boolean;
  onRetry?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  error,
  hasSearchOrFilter,
  isEmptySearch,
  onRetry,
}) => {
  if (error) {
    return (
      <View style={styles.container}>
        <Text type="subtitle1" style={styles.title}>
          Error
        </Text>
        <Text type="body2" color="dark80" centered>
          {error}
        </Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <PageSearchIcon width={48} height={48} />
      </View>
      <Text type="subtitle1" style={styles.title}>
        {isEmptySearch ? "No issues" : "No issues yet"}
      </Text>
      <Text type="body2" color="dark80" centered>
        {isEmptySearch
          ? "You're all set — there are no open or closed issues right now. New issues will appear here as soon as they're created."
          : hasSearchOrFilter
          ? "Try adjusting your search or filter"
          : "You're all set — there are no open or closed issues right now. New issues will appear here as soon as they're created."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 4,
  },

  retryButton: {
    backgroundColor: Colors.purple60,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
