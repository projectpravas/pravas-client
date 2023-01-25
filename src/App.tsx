import React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import "../src/index.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
      contrastText: "#aaaaaa",
    },
    secondary: {
      main: "#313041",
      light: "#1d3456",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/*" element={<BlankLayout />} />
          <Route path="secured/*" element={<FullLayout />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
