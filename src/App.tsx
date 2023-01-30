import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import "../src/index.css";
import Network from "./ui/connections/Network";
import { Toast } from "./ui/toast/Toast";

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
    <div className="App">
      <Network show={hasNetworkOffline} />
      <Toast />
      <span id="recaptcha-container"></span>

      <Routes>
        <Route path="/*" element={<BlankLayout />} />
        <Route path="secured/*" element={<FullLayout />} />
      </Routes>
    </div>
  );
};

export default App;
