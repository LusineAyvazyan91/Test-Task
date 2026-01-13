import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/utils/colors";
import { Text } from "@/ui/Text";
import SearchIcon from "../../../../assets/svgs/search.svg";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search for",
  error,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const showError = !!error;
  const displayHelpText = error;

  // Determine state: disabled > error > focused > filled > default
  const getContainerStyle = () => {
    if (disabled) return styles.containerDisabled;
    if (showError) return styles.containerError;
    if (isFocused) return styles.containerFocused;
    return styles.container;
  };

  const getIconColor = () => {
    if (disabled) return Colors.gray40;
    if (showError || isFocused || hasValue) return Colors.dark100;
    return Colors.gray70;
  };

  const getPlaceholderColor = () => {
    if (disabled) return Colors.gray40;
    if (showError || isFocused || hasValue) return Colors.dark80;
    return Colors.gray70;
  };

  const getTextColor = () => {
    if (disabled) return Colors.gray40;
    return Colors.dark100;
  };

  return (
    <View>
      <View style={[getContainerStyle()]}>
        <TextInput
          style={[styles.input, { color: getTextColor() }]}
          placeholder={placeholder}
          placeholderTextColor={getPlaceholderColor()}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
        />
        <View style={styles.iconContainer}>
          <SearchIcon width={18} height={18} color={getIconColor()} />
        </View>
      </View>
      {displayHelpText && (
        <Text
          type="body2"
          color={showError ? "red" : "dark80"}
          style={styles.helpText}
        >
          {displayHelpText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.gray80,
    minHeight: 44,
  },
  containerFocused: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.purple60,
    minHeight: 44,
  },
  containerError: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.red,
    minHeight: 44,
  },
  containerDisabled: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray60,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.gray80,
    minHeight: 44,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: "OutfitRegular",
  },
  iconContainer: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  helpText: {
    marginTop: 6,
    marginLeft: 4,
  },
});
