export type Color =
  | "dark100"
  | "dark80"
  | "gray40"
  | "white"
  | "purple60"
  | "gray60"
  | "gray70"
  | "green80"
  | "gray80"
  | "red"
  | "orange8"
  | "orange100"
  | "green12"
  | "green100"
  | "gray100";
export type IColor = {
  [key in Color]: string;
};

export const Colors: IColor = {
  dark100: "#313131",
  dark80: "#6F6F6F",
  gray40: "#C0C0C0",
  white: "#FFFFFF",
  purple60: "#5850EC",
  gray60: "#F6F6F6",
  gray70: "#D1D5DB",
  green80: "#29AD2C",
  gray80: "#E5E7EB",
  red: "#FF2929",
  orange8: "#F3560014",
  orange100: "#EA580C",
  green12: "#329D471F",
  green100: "#267B37",
  gray100: "#1F2937",
};
