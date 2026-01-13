import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { SegmentControl, SegmentOption } from "./SegmentControl";
import { Text } from "@/ui/Text";

type FilterType = "all" | "open" | "closed";

interface IssueFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const IssueFilters: React.FC<IssueFiltersProps> = ({
  filter,
  onFilterChange,
}) => {
  const filterOptions: SegmentOption<FilterType>[] = useMemo(
    () => [
      { label: "All", value: "all" },
      { label: "Closed", value: "closed" },
      { label: "Opened", value: "open" },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <Text type="h2">Issues</Text>
      <SegmentControl
        options={filterOptions}
        selectedValue={filter}
        onValueChange={onFilterChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingTop: 24,
  },
});
