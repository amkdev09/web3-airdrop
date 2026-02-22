import { createTheme } from "@mui/material/styles";

// =============================================================================
// SELSILA AIRDROP – Design tokens (pixel-perfect match to reference)
// =============================================================================

// Responsive breakpoints
// xs: 0px (mobile), sm: 600px, md: 900px, lg: 1200px, xl: 1536px
const breakpoints = {
  values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
};

// Colors – exact match to reference
const colors = {
  // Backgrounds
  primaryBackground: "#0A001F",
  secondaryBackground: "rgba(20, 0, 40, 0.7)",
  surfaceCard: "rgba(20, 0, 40, 0.5)",
  surfaceCardStrong: "rgba(20, 0, 40, 0.7)",
  navBackground: "rgba(0, 0, 0, 0.8)",
  navBackgroundAlt: "rgba(10, 0, 30, 0.8)",

  // Accents
  primaryAccent: "#00FFFF",
  primaryAccentEnd: "#00FF7F",
  accentGradient: "linear-gradient(to right, #00FFFF, #00FF7F)",
  secondaryAccent: "#AF00FF",
  purpleGlow: "rgba(175, 0, 255, 0.4)",
  tealGlow: "rgba(0, 255, 255, 0.35)",
  activeStateGlow: "rgba(173, 216, 230, 0.35)",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.9)",
  textMuted: "rgba(255, 255, 255, 0.7)",

  // Borders
  borderPrimary: "linear-gradient(to right, #00FFFF, #00FF7F)",
  borderFaint: "rgba(255, 255, 255, 0.15)",
};

// Spacing scale (px) – consistent padding/margins
const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 24,
  pill: 9999,
};

// Font sizes (rem for scalability)
const fontSizes = {
  xs: "0.6875rem",   // 11px – nav labels, small labels
  sm: "0.8125rem",   // 13px – roadmap phases, stats labels, descriptions
  md: "0.9375rem",   // 15px – body, button text
  lg: "1.125rem",    // 18px – stats numbers
  xl: "1.25rem",     // 20px – section headings (ROADMAP, Selsi Future X Plan)
  xxl: "1.5rem",     // 24px – main title "SELSILA AIRDROP"
  hero: "1.75rem",   // 28px – "Join the Future..." heading
};

const fontWeights = {
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

// Shadow / glow presets
const shadows = {
  glowPrimary: `0 0 20px ${colors.tealGlow}, 0 0 40px rgba(0, 255, 255, 0.15)`,
  glowSecondary: `0 0 24px ${colors.purpleGlow}, 0 0 48px rgba(175, 0, 255, 0.1)`,
  glowActive: `0 0 16px ${colors.activeStateGlow}`,
  cardGlow: `0 0 16px rgba(0, 255, 255, 0.12)`,
  subtle: "0 4px 20px rgba(0, 0, 0, 0.3)",
};

// Line heights
const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
};

// Export for use in components (e.g. theme.selsila.colors)
export const selsilaTokens = {
  colors,
  space,
  radius,
  fontSizes,
  fontWeights,
  shadows,
  lineHeights,
};

const theme = createTheme({
  breakpoints,
  palette: {
    primary: {
      main: colors.primaryAccent,
      light: colors.primaryAccentEnd,
      dark: "#00B8B8",
      contrastText: colors.textPrimary,
    },
    secondary: {
      main: colors.secondaryAccent,
      light: colors.purpleGlow,
      dark: "#7B00CC",
      contrastText: colors.textPrimary,
    },
    background: {
      default: colors.primaryBackground,
      paper: colors.secondaryBackground,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      disabled: colors.textMuted,
    },
    success: { main: colors.primaryAccentEnd },
    error: { main: "#ff4444" },
    mode: "dark",
  },
  typography: {
    fontFamily: `Inter, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif`,
    h1: {
      fontWeight: fontWeights.bold,
      fontSize: fontSizes.xxl,
      lineHeight: lineHeights.tight,
      color: colors.textPrimary,
    },
    h2: {
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.tight,
      color: colors.textPrimary,
    },
    h3: {
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.normal,
      color: colors.textPrimary,
    },
    h4: {
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.normal,
      color: colors.textPrimary,
    },
    h5: {
      fontWeight: fontWeights.medium,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.normal,
      color: colors.textPrimary,
    },
    h6: {
      fontWeight: fontWeights.normal,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.normal,
      color: colors.textPrimary,
    },
    body1: {
      fontSize: fontSizes.md,
      lineHeight: lineHeights.relaxed,
      color: colors.textPrimary,
    },
    body2: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.normal,
      color: colors.textPrimary,
    },
    caption: {
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.normal,
      color: colors.textMuted,
    },
  },
  shape: {
    borderRadius: radius.md,
  },
  // Custom theme key for Selsila tokens (use in sx: (theme) => theme.selsila.colors.primaryAccent)
  selsila: selsilaTokens,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.secondaryBackground,
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          maxWidth: "28rem",
          textTransform: "uppercase",
          fontWeight: fontWeights.bold,
          fontSize: fontSizes.md,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surfaceCard,
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
