import { lazy } from "react";
import Login from "../../features/frontend/auth/Login";
import Register from "../../features/frontend/auth/Register";
const Home = lazy(() => import("../../features/frontend/home/Home"));
const AboutUs = lazy(() => import("../../features/frontend/about-us/AboutUs"));
const ContactUs = lazy(
  () => import("../../features/frontend/contact-us/ContactUs")
);
const Pravas = lazy(() => import("../../features/frontend/pravas/Pravas"));
const Blogs = lazy(() => import("../../features/frontend/blogs/Blogs"));
const ChangePassword = lazy(
  () => import("../../features/frontend/auth/ChangePassword")
);
const PasswordRecovery = lazy(
  () => import("../../features/frontend/auth/PasswordRecovery")
);

export default [
  {
    label: "Home",
    component: <Home />,
    path: "",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "About Us",
    component: <AboutUs />,
    path: "about-us",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Pravas",
    component: <Pravas />,
    path: "pravas",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Blogs",
    component: <Blogs />,
    path: "blogs",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Contact Us",
    component: <ContactUs />,
    path: "contact-us",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Login",
    component: <Login />,
    path: "login",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Register",
    component: <Register />,
    path: "register",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Send Password Link",
    component: <PasswordRecovery />,
    path: "reset-password",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Reset Password",
    component: <ChangePassword />,
    path: "reset-password/:token",
    showInMenu: false,
    hasAuthenticate: "no",
  },
];
