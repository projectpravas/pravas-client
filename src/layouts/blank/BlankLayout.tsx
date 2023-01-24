import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../../shared/routes/FrontendRoutes";

import Footer from "../../ui/footer/Footer";
import Header from "./Header";

interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          {Array.isArray(routes) &&
            routes.map((route, i) => (
              <Route
                key={route.path + i}
                path={route?.path}
                element={route?.component}
              />
            ))}
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default BlankLayout;
