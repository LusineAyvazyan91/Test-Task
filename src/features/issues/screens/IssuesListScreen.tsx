import React, { useState, useCallback, useMemo } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, Issue } from "../types";
import { filterIssues } from "../../../utils/issueUtils";
import { IssueSummary } from "../components/IssueSummary";
import { IssueFilters } from "../components/IssueFilters";
import { SearchBar } from "../components/SearchBar";
import { IssueCard } from "../components/IssueCard";
import { EmptyState } from "../components/EmptyState";
import { IssuesListSkeleton } from "../components/IssuesListSkeleton";
import { useIssues } from "../hooks/useIssues";
import { Text } from "@/ui/Text";
import { Colors } from "@/utils/colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "IssuesList"
>;

type FilterType = "all" | "open" | "closed";

export default function IssuesListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    data: issues = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useIssues();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const onRefresh = () => {
    refetch();
  };

  const handleIssuePress = useCallback(
    (issueId: string) => {
      navigation.navigate("IssueDetails", { issueId });
    },
    [navigation]
  );

  const filteredIssues = useMemo(
    () => filterIssues(issues, filter, searchQuery),
    [issues, filter, searchQuery]
  );

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const hasSearchOrFilter = useMemo(
    () => searchQuery.trim().length > 0 || filter !== "all",
    [searchQuery, filter]
  );

  const isEmptySearch = useMemo(
    () =>
      searchQuery.trim().length > 0 &&
      filteredIssues.length === 0 &&
      !isLoading &&
      issues.length > 0,
    [searchQuery, filteredIssues.length, isLoading, issues.length]
  );

  const hasSearchError = useMemo(
    () =>
      searchQuery.trim().length > 0 &&
      filteredIssues.length === 0 &&
      issues.length > 0 &&
      !isLoading,
    [searchQuery, filteredIssues.length, issues.length, isLoading]
  );

  const renderIssueItem = useCallback(
    ({ item }: { item: Issue }) => (
      <IssueCard issue={item} onPress={handleIssuePress} />
    ),
    [handleIssuePress]
  );

  const renderEmptyState = useCallback(
    () =>
      !isLoading && (
        <EmptyState
          error={error?.message || null}
          hasSearchOrFilter={hasSearchOrFilter}
          isEmptySearch={isEmptySearch}
          onRetry={() => refetch()}
        />
      ),
    [isLoading, error, hasSearchOrFilter, isEmptySearch, refetch]
  );

  const getCurrentDate = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    []
  );

  if (isLoading) {
    return <IssuesListSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text type="subtitle2">Issues</Text>
          <Text type="bodyRegular" color="dark80">
            {getCurrentDate}
          </Text>
        </View>
        <IssueSummary issues={issues} />
      </View>
      <View style={styles.filtersContainer}>
        <IssueFilters filter={filter} onFilterChange={setFilter} />

        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
          error={hasSearchError ? "An error occurred while searching" : null}
        />
      </View>

      <FlatList
        data={filteredIssues}
        renderItem={renderIssueItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          filteredIssues.length === 0
            ? styles.emptyListContent
            : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

  listContent: {
    gap: 12,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  emptyListContent: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  issuesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 16,
  },
});
