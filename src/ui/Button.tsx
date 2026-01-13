import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/colors";
import { Text } from "./Text";

export type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}) => {
  const getButtonStyle = () => {
    if (disabled) {
      return styles.buttonSecondary;
    }
    return variant === "primary"
      ? styles.buttonPrimary
      : styles.buttonSecondary;
  };

  const getTextColor = () => {
    if (disabled) {
      return "dark80";
    }
    return variant === "primary" ? "white" : "dark80";
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text type="subtitle2" color={getTextColor()}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: Colors.purple60,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    backgroundColor: Colors.gray60,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
