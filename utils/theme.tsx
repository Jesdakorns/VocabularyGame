import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary:{
      main: "#FFF",
      contrastText: "#637cff",
    },
    success: {
      main: "#49bb4f",
      contrastText: "#fff",
    },
  },
  typography: {},
  breakpoints: {},
  components: {
    MuiCssBaseline: {},
    MuiButtonBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {},
      },
    },
  },
});
