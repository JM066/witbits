import { createTheme } from "@mui/material/styles";

// Single source of truth for the design. `cssVariables` exposes every token as
// a CSS custom property (e.g. --mui-palette-primary-main) so CSS Modules can
// use the same values without duplicating them.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      // Steel blue, darkened so white text on it stays above 4.5:1 contrast.
      main: "#386890",
      light: "#4682b4",
      dark: "#2f5a7e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f9f9f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#242424",
      secondary: "#484545",
    },
    divider: "#e4e4e4",
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      "system-ui",
      "-apple-system",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
