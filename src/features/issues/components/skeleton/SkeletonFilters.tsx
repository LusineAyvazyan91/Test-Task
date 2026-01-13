import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonBlock } from "@/ui/SkeletonBlock";
import { Colors } from "@/utils/colors";
import SearchIcon from "../../../../../assets/svgs/search.svg";

export const SkeletonFilters: React.FC = () => {
  return (
    <View style={styles.filtersContainer}>
      <View style={styles.filterRow}>
        <SkeletonBlock width={50} height={16} />
        <View style={styles.segmentControlContainer}>
          <View style={styles.segmentControlActive}>
            <SkeletonBlock width={15} height={10.4} borderRadius={6} />
          </View>
          <SkeletonBlock width={40} height={10.4} borderRadius={8} />
          <SkeletonBlock width={40} height={10.4} borderRadius={8} />
        </View>
      </View>
      <View style={styles.searchBarContainer}>
        <SkeletonBlock
          width="100%"
          height={11.2}
          style={styles.searchBarInput}
        />
        <View style={styles.searchIconContainer}>
          <SearchIcon width={18} height={18} color={Colors.gray70} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 24,
    marginTop: 24,
    paddingBottom: 24,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  segmentControlContainer: {
    flexDirection: "row",
    backgroundColor: Colors.gray60,
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.gray80,
    alignItems: "center",
    gap: 4,
    shadowColor: Colors.dark100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentControlActive: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 7,
    shadowColor: Colors.dark100,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.gray80,
    minHeight: 44,
  },
  searchBarInput: {
    flex: 1,
    marginRight: 8,
  },
  searchIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
