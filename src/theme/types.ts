export type ThemeMode = 'light' | 'dark';

export type ColorVariant = 'lighter' | 'light' | 'main' | 'dark' | 'darker';

export interface PaletteColor {
  lighter?: string;
  light?: string;
  main: string;
  dark?: string;
  darker?: string;
  mainChannel?: string;
}

export interface TypographyToken {
  fontFamily: string;
  fontSize: number;
  fontWeight: {
    regular: number;
    medium: number;
    bold: number;
  };
}

export interface ShapeToken {
  borderRadius: number;
}

export interface ThemeTokens {
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    background: {
      default: string;
      paper: string;
      neutral?: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled?: string;
    };
    error?: PaletteColor;
    warning?: PaletteColor;
    info?: PaletteColor;
    success?: PaletteColor;
  };
  typography: TypographyToken;
  shape: ShapeToken;
  spacing?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
