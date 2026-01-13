import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/utils/colors";
import { Text } from "@/ui/Text";

export interface SegmentOption<T = string> {
  label: string;
  value: T;
  icon?: React.ReactNode;
}

interface SegmentControlProps<T = string> {
  options: SegmentOption<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
}

export const SegmentControl = <T extends string>({
  options,
  selectedValue,
  onValueChange,
}: SegmentControlProps<T>) => {
  return (
    <View style={styles.container}>
      {options.map((option, _) => {
        const isSelected = option.value === selectedValue;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segmentButton,
              option.icon ? styles.segmentButtonWithIcon : undefined,
              isSelected && styles.segmentButtonActive,
            ]}
            onPress={() => onValueChange(option.value)}
            accessible={true}
            accessibilityLabel={`${option.label}${
              isSelected ? ", selected" : ""
            }`}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <View style={styles.segmentContent}>
              {option.icon && (
                <View style={styles.iconWrapper}>{option.icon}</View>
              )}
              <Text
                type={isSelected ? "body2" : "bodyTab"}
                color={isSelected ? "dark100" : "dark80"}
                style={option.icon ? styles.textWithIcon : undefined}
              >
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.gray60,
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.gray80,
  },
  segmentButton: {
    paddingHorizontal: 8,
    paddingTop: 7,
    paddingBottom: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonWithIcon: {
    flex: 1,
  },
  segmentContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  textWithIcon: {
    marginLeft: 0,
  },
  segmentButtonActive: {
    backgroundColor: Colors.white,
    // iOS shadow
    shadowColor: Colors.dark100,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    // Android shadow
    elevation: 2,
  },
});
