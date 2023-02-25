import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../../ui/loader/Loader";
import routes from "../../shared/routes/AdminRoutes";
import PackageForm from "../../features/admin/pravas/package-tour";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../app/slices/AuthSlice";
import UserModel from "../../shared/models/userModel";
import PageNotFound from "../../ui/404/PageNotFound";

interface ISidebarRoutesProps {}

const SidebarRoutes: React.FunctionComponent<ISidebarRoutesProps> = (props) => {
  const currentLoggedUser: UserModel = useSelector(selectLoggedUser);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {Array.isArray(routes) &&
          routes.map((route, i) => (
            <React.Fragment key={route?.path + i}>
              <Route path={`${route?.path}`} element={route?.component}>
                {Array.isArray(route?.subMenus) &&
                  route?.subMenus
                    .filter((route) =>
                      route?.roles?.includes(currentLoggedUser?.role as string)
                    )
                    .map((subMenu, i) => {
                      return (
                        <React.Fragment key={subMenu?.path}>
                          {subMenu?.roles.includes(
                            currentLoggedUser?.role as string
                          ) && (
                            <Route
                              key={subMenu?.path + i}
                              path={`${subMenu?.path}`}
                              element={subMenu?.component}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </React.Fragment>
          ))}
      </Routes>
    </Suspense>
  );
};

export default SidebarRoutes;
