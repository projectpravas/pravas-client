import { lazy } from "react";
import Login from "../../features/frontend/auth/Login";
import Register from "../../features/frontend/auth/Register";
import CancellationPolicy from "../../ui/footer/CancellationPolicy";
import PrivacyPolicy from "../../ui/footer/PrivacyPolicy";
import TermsAndConditions from "../../ui/footer/TermsAndConditions";

const Home = lazy(() => import("../../features/frontend/home/Home"));
const AboutUs = lazy(() => import("../../features/frontend/about-us/AboutUs"));
const ContactUs = lazy(
  () => import("../../features/frontend/contact-us/ContactUs")
);
const Careers = lazy(() => import("../../ui/footer/Career/Careers"));
const CareerDetails = lazy(
  () => import("../../ui/footer/Career/CareerDetails")
);
const Pravas = lazy(() => import("../../features/frontend/pravas/Pravas"));
const Blogs = lazy(() => import("../../features/frontend/blogs/Blogs"));
const BlogDetails = lazy(
  () => import("../../features/frontend/blogs/BlogDetails")
);
const ChangePassword = lazy(
  () => import("../../features/frontend/auth/ChangePassword")
);
const PasswordRecovery = lazy(
  () => import("../../features/frontend/auth/PasswordRecovery")
);
const PageNotFound = lazy(() => import("../../ui/404/PageNotFound"));

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
    label: "Blog Details",
    component: <BlogDetails />,
    path: "blogs/:id",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Contact Us",
    component: <ContactUs />,
    path: "contact-us",
    showInMenu: true,
    hasAuthenticate: "all",
  },
  {
    label: "Careers",
    component: <Careers />,
    path: "careers",
    showInMenu: false,
    hasAuthenticate: "all",
  },
  {
    label: "Career Details",
    component: <CareerDetails />,
    path: "careers/:id",
    showInMenu: false,
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
  {
    label: "Terms And Conditions",
    component: <TermsAndConditions />,
    path: "t&c",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Privacy Policy",
    component: <PrivacyPolicy />,
    path: "privacy-policy",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Cancellation Policy",
    component: <CancellationPolicy />,
    path: "cancellation-policy",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Page Not Found",
    component: <PageNotFound />,
    path: "*",
    showInMenu: false,
    hasAuthenticate: "no",
  },
];
