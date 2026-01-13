import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle as RNTextStyle,
} from "react-native";
import { Color, Colors } from "../utils/colors";

export type TextType =
  | "subtitle2"
  | "subtitle1"
  | "bodyRegular"
  | "display1"
  | "body2"
  | "h2"
  | "bodyLight"
  | "h1"
  | "bodyTab";

export interface ITextProps extends RNTextProps {
  type?: TextType;
  color?: Color;
  bold?: boolean;
  normal?: boolean;
  centered?: boolean;
  underline?: boolean;
}

export const FontFamily = {
  Outfit: "Outfit",
};

const FontWeightName: { [key: string]: string } = {
  "300": "Light",
  "400": "Regular",
};

export const providePlatformTextStyle = (styles: StyleProp<RNTextStyle>) => {
  const flatten = StyleSheet.flatten(styles);

  if (
    flatten.fontFamily &&
    !Object.values(FontFamily).includes(flatten.fontFamily)
  ) {
    throw new Error(
      `Unknown font family provided. Provided: ${
        flatten.fontFamily
      }, available: [${Object.values(FontFamily)}]`
    );
  }

  if (flatten.fontWeight) {
    if (!(flatten.fontWeight in FontWeightName)) {
      throw new Error(
        `Unknown font weight provided. Provided: ${
          flatten.fontWeight
        }, available: [${Object.keys(FontWeightName)}]`
      );
    }
    flatten.fontFamily = `${flatten.fontFamily}${
      FontWeightName[flatten.fontWeight]
    }`;
    delete flatten.fontWeight;
  }
  return flatten;
};

export const Text: React.FC<ITextProps> = ({
  type = "subtitle2",
  color = "dark100",
  style,
  bold,
  normal,
  centered,
  underline,
  children,
  ...rest
}) => {
  const platformStyle = providePlatformTextStyle([
    TextStyle[type] as RNTextStyle,
    { color: Colors[color] },
    centered && TextStyle.centered,
    underline && TextStyle.underline,
    style,
  ]);
  return (
    <RNText style={[style, platformStyle]} {...rest}>
      {children}
    </RNText>
  );
};

export const TextStyle = StyleSheet.create({
  centered: {
    textAlign: "center",
  },

  underline: {
    textDecorationLine: "underline",
  },

  subtitle2: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  subtitle1: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  bodyRegular: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  display1: {
    fontSize: 48,
    fontWeight: "400",
    lineHeight: 48,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  body2: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18.2,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  h2: {
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  bodyLight: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 19.6,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  h1: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 32,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },

  bodyTab: {
    fontSize: 13,
    fontWeight: "300",
    lineHeight: 13,
    letterSpacing: 0,
    fontFamily: FontFamily.Outfit,
  },
});
