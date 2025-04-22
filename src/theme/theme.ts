// src/theme/theme.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { themeTokens } from "./themeTokens";
import { ThemeMode, ThemeTokens } from "./types";

// Create a theme instance for the current mode
export const createThemeOptions = (mode: ThemeMode): ThemeOptions => {
  const tokens = themeTokens[mode] as ThemeTokens;
  const { palette } = tokens;

  return {
    palette: {
      mode,
      primary: {
        light: palette.primary.light || palette.primary.main,
        main: palette.primary.main,
        dark: palette.primary.dark || palette.primary.main,
        contrastText: mode === 'dark' ? '#fff' : '#000',
      },
      secondary: {
        light: palette.secondary.light || palette.secondary.main,
        main: palette.secondary.main,
        dark: palette.secondary.dark || palette.secondary.main,
        contrastText: mode === 'dark' ? '#fff' : '#000',
      },
      background: {
        default: palette.background.default,
        paper: palette.background.paper,
      },
      text: {
        primary: palette.text.primary,
        secondary: palette.text.secondary,
        disabled: palette.text.disabled,
      },
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeightRegular: tokens.typography.fontWeight.regular,
      fontWeightMedium: tokens.typography.fontWeight.medium,
      fontWeightBold: tokens.typography.fontWeight.bold,
    },
    shape: {
      borderRadius: tokens.shape.borderRadius,
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: tokens.shape.borderRadius,
            textTransform: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            "--colors-palette-primary-main": palette.primary.main,
            "--colors-palette-primary-mainChannel": palette.primary.mainChannel,
            "--colors-palette-secondary-main": palette.secondary.main,
            "--colors-palette-secondary-mainChannel": palette.secondary.mainChannel,
          },
        },
      },
    },
  };
};

// Default light theme
export const muiThemeOptions = createThemeOptions('light');
export const muiTheme = createTheme(muiThemeOptions);
