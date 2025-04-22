import { addColorChannels } from "./utils/colorUtils";
import { ThemeTokens } from "./types";

const baseTokens: ThemeTokens = {
  palette: {
    primary: {
      lighter: "#D1E9FC",
      light: "#76B0F1",
      main: "#2065D1",
      dark: "#103996",
      darker: "#061B64",
    },
    secondary: {
      lighter: "#D6E4FF",
      light: "#84A9FF",
      main: "#3366FF",
      dark: "#1939B7",
      darker: "#091A7A",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F9FAFB",
      neutral: "#F4F6F8",
    },
    text: {
      primary: "#212B36",
      secondary: "#637381",
      disabled: "#919EAB",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
};

const darkTokens: ThemeTokens = {
  palette: {
    primary: {
      lighter: "#3A507B",
      light: "#4B6B9A",
      main: "#648BD0",
      dark: "#354B70",
      darker: "#1F2A44",
    },
    secondary: {
      lighter: "#3F496E",
      light: "#566AA2",
      main: "#748EF1",
      dark: "#3E4B7D",
      darker: "#252D48",
    },
    background: {
      paper: "#1C1C1E",
      default: "#121212",
      neutral: "#2C2C2E",
    },
    text: {
      primary: "#F5F5F7",
      secondary: "#A1A1A1",
      disabled: "#6E6E73",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
};

export const themeTokens = {
  light: addColorChannels(baseTokens) as ThemeTokens,
  dark: addColorChannels(darkTokens) as ThemeTokens,
} as const;
