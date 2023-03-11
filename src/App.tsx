import React, {
  useState,
  useEffect,
  FunctionComponent,
  ReactComponentElement,
} from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import "../src/index.css";
import Network from "./ui/connections/Network";
import { Toast } from "./ui/toast/Toast";
import { Helmet } from "react-helmet-async";
import GoToTop from "./ui/GoToTop/GoToTop";
import { useDispatch, useSelector } from "react-redux";
import UserModel from "./shared/models/userModel";
import { addLoggedUser, selectLoggedUser } from "./app/slices/AuthSlice";
import AuthService from "./services/AuthService";
import PageNotFound from "./ui/404/PageNotFound";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

interface ProtectedRouteProps {
  children: ReactComponentElement<any>;
}

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins','Roboto',sans-serif",
  },
});
const App = () => {
  const [hasNetworkOffline, setHasNetworkOffline] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentLoggedUser: UserModel = useSelector(selectLoggedUser);
  const token = sessionStorage.getItem("aToken") as string;

  function checkConnections() {
    window.addEventListener("online", () => {
      setHasNetworkOffline(false);
    });
    window.addEventListener("offline", () => {
      setHasNetworkOffline(true);
    });
  }

  let ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
    children,
  }) => {
    return token && currentLoggedUser?._id ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  const destroySession = () => {
    sessionStorage.clear();
    dispatch(addLoggedUser({}));
    navigate("/login");
  };

  useEffect(() => {
    if (currentLoggedUser?._id && !token) {
      destroySession();
    } else if (currentLoggedUser?._id && token) {
      AuthService.validateToken(token)
        .then((res) => {})
        .catch((err) => {
          console.error(err);
          destroySession();
        });
    }
  }, [pathname]);

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
          <Route
            path="secured/*"
            element={
              <ProtectedRoute>
                <FullLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <GoToTop />
      </div>
    </ThemeProvider>
  );
};

export default App;
