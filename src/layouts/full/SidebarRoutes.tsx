import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../../ui/loader/Loader";
import routes from "../../shared/routes/AdminRoutes";
import PackageForm from "../../features/admin/pravas/package-tour";

interface ISidebarRoutesProps {}

const SidebarRoutes: React.FunctionComponent<ISidebarRoutesProps> = (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {Array.isArray(routes) &&
          routes.map((route, i) => (
            <Route
              key={route?.path + i}
              path={route?.path}
              element={route?.component}
            >
              {Array.isArray(route?.subMenus) &&
                route?.subMenus.map((subMenu, i) => (
                  <Route
                    key={subMenu?.path + i}
                    path={`${subMenu?.path}`}
                    element={subMenu?.component}
                  />
                ))}
            </Route>
          ))}
      </Routes>
    </Suspense>
  );
};

export default SidebarRoutes;
