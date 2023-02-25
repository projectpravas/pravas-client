import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../../shared/routes/FrontendRoutes";
import PageNotFound from "../../ui/404/PageNotFound";

import Footer from "../../ui/footer/Footer";
import Loader from "../../ui/loader/Loader";
import Header from "./Header";

interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          {Array.isArray(routes) &&
            routes.map((route, i) => (
              <Route
                key={route.path + i}
                path={`${route?.path}`}
                element={route?.component}
              />
            ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default BlankLayout;
