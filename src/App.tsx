import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import "../src/index.css";
import Network from "./ui/connections/Network";
import { Toast } from "./ui/toast/Toast";
import { Helmet } from "react-helmet";
import GoToTop from "./ui/GoToTop/GoToTop";
import "./ui/owl-carousel/owl.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins','Roboto',sans-serif",
  },
});
const App = () => {
  const [hasNetworkOffline, setHasNetworkOffline] = useState(false);

  function checkConnections() {
    window.addEventListener("online", () => {
      setHasNetworkOffline(false);
    });
    window.addEventListener("offline", () => {
      setHasNetworkOffline(true);
    });
  }
  useEffect(() => {
    checkConnections();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Helmet>
          <title>Pravas Tourism</title>
          <meta name="description" content="pravas tourism" />
          <meta name="keywords" content="Tours & Travel" />
        </Helmet>
        <Network show={hasNetworkOffline} />
        <Toast />
        <span id="recaptcha-container"></span>

        <Routes>
          <Route path="/*" element={<BlankLayout />} />
          <Route path="secured/*" element={<FullLayout />} />
        </Routes>
        <GoToTop />
      </div>
    </ThemeProvider>
  );
};

export default App;
