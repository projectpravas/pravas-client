import { lazy } from "react";
import CustomTourForm from "../../features/frontend/customtourform/CustomTourForm";

const Home = lazy(() => import("../../features/frontend/home/Home"));
const AboutUs = lazy(() => import("../../features/frontend/about-us/AboutUs"));
const ContactUs = lazy(
  () => import("../../features/frontend/contact-us/ContactUs")
);
const Careers = lazy(() => import("../../ui/footer/Career/Careers"));
const CareerDetails = lazy(
  () => import("../../ui/footer/Career/CareerDetails")
);
const CareerForm = lazy(() => import("../../ui/footer/Career/CareerForm"));
const Pravas = lazy(() => import("../../features/frontend/pravas/Pravas"));
const ExplorePravas = lazy(
  () => import("../../features/frontend/pravas/ExplorePravas")
);
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
const Login = lazy(() => import("../../features/frontend/auth/Login"));
const Register = lazy(() => import("../../features/frontend/auth/Register"));
const CancellationPolicy = lazy(
  () => import("../../ui/footer/CancellationPolicy")
);
const PrivacyPolicy = lazy(() => import("../../ui/footer/PrivacyPolicy"));
const PageNotFound = lazy(() => import("../../ui/404/PageNotFound"));
const TermsAndConditions = lazy(
  () => import("../../ui/footer/TermsAndConditions")
);

export default [
  {
    label: "Home",
    component: <Home />,
    path: "",
    showInMenu: false,
    hasAuthenticate: "all",
  },
  {
    label: "Home",
    component: <Home />,
    path: "/home",
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
    subRoutes: [
      {
        label: "Explore Details",
        component: <ExplorePravas />,
        path: "explore/:id",
        showInMenu: false,
        hasAuthenticate: "all",
      },
    ],
  },

  {
    label: "Blogs",
    component: <Blogs />,
    path: "blogs",
    showInMenu: true,
    hasAuthenticate: "all",
    subRoutes: [
      {
        label: "Blog Details",
        component: <BlogDetails />,
        path: "details/:id",
        showInMenu: false,
        hasAuthenticate: "no",
      },
    ],
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
    label: "Career ",
    component: <CareerForm />,
    path: "careers/:id/form",
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
    path: "terms-and-conditions",
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
    label: "Create Custom Tour",
    component: <CustomTourForm />,
    path: "pravas/custom-tour-form",
    showInMenu: false,
    hasAuthenticate: "no",
  },

  {
    label: "Create Custom Tour",
    component: <CustomTourForm />,
    path: "pravas/explore/custom-tour-form",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Page Not Found",
    component: <PageNotFound />,
    path: "/*",
    showInMenu: false,
    hasAuthenticate: "no",
  },
];
