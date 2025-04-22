import { themeTokens } from "../themeTokens";
import { ThemeTokens } from "../types";

export const toCssVar = (propertyPath: string): string => {
  return `--${propertyPath.split(".").join("-")}`;
};

export const getThemeTokenVariants = (propertyPath: string): string[] => {
  const keys = propertyPath.split(".");
  const val = keys.reduce((obj: Record<string, unknown>, key: string) => {
    if (obj && typeof obj === "object") {
      return obj[key] as Record<string, unknown>;
    }
    return {} as Record<string, unknown>;
  }, themeTokens.light as unknown as Record<string, unknown>);

  return val ? Object.keys(val) : [];
};

// Use Partial<ThemeTokens> for recursive processing
export const addColorChannels = (obj: ThemeTokens): ThemeTokens => {
  const result = { ...obj };

  // Process palette colors to add color channels
  if (result.palette) {
    // Process primary color
    if (result.palette.primary && typeof result.palette.primary.main === 'string') {
      const mainColor = result.palette.primary.main;
      if (mainColor.startsWith('#')) {
        const hex = mainColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        result.palette.primary.mainChannel = `${r} ${g} ${b}`;
      }
    }

    // Process secondary color
    if (result.palette.secondary && typeof result.palette.secondary.main === 'string') {
      const mainColor = result.palette.secondary.main;
      if (mainColor.startsWith('#')) {
        const hex = mainColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        result.palette.secondary.mainChannel = `${r} ${g} ${b}`;
      }
    }
  }

  return result;
};
