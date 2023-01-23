import React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<BlankLayout />} />
        <Route path="secured/*" element={<FullLayout />} />
      </Routes>
    </div>
  );
}

export default App;
