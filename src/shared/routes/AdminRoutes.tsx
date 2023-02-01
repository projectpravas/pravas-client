import { lazy } from "react";
import TourIcon from "@mui/icons-material/Tour";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import ChangePasswordIcon from "@mui/icons-material/LockReset";

const Tours = lazy(() => import("../../features/admin/tours/Tours"));
const Dashboard = lazy(
  () => import("../../features/admin/dashboard/Dashboard")
);
const Bookings = lazy(() => import("../../features/admin/bookings/Bookings"));
const Quotes = lazy(() => import("../../features/admin/quotes/Quotes"));
const Records = lazy(() => import("../../features/admin/records/Records"));
const Users = lazy(() => import("../../features/admin/users/Users"));
const UserProfile = lazy(
  () => import("../../features/admin/user-profile/UserProfile")
);
const AddEditUser = lazy(
  () => import("../../features/admin/users/AddEditUser")
);
const ChangePassword = lazy(
  () => import("../../features/frontend/auth/ChangePassword")
);

export default [
  {
    label: "Dashboard",
    component: <Dashboard />,
    icon: <DashboardCustomizeIcon />,
    path: "dashboard",
    showInMenu: true,
    showInSettings: true,
    roles: ["admin", "superAdmin", "customer"],
  },
  {
    label: "Tours",
    component: <Tours />,
    icon: <TourIcon />,
    path: "tours",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin", "customer"],
  },
  {
    label: "Bookings",
    component: <Bookings />,
    icon: <BookOnlineIcon />,
    path: "bookings",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin", "customer"],
  },
  {
    label: "Quotes",
    component: <Quotes />,
    icon: <RequestQuoteIcon />,
    path: "quotes",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin"],
  },
  {
    label: "Records",
    component: <Records />,
    icon: <ReceiptLongIcon />,
    path: "records",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin"],
  },
  {
    label: "Users",
    component: <Users />,
    icon: <PeopleIcon />,
    path: "users",
    showInMenu: true,
    showInSettings: false,
    roles: ["superAdmin"],
  },
  {
    label: "Customers",
    component: <Users />,
    icon: <PeopleIcon />,
    path: "customers",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin"],
  },
  {
    label: "My Profile",
    component: <UserProfile />,
    icon: <PeopleIcon />,
    path: "user-profile",
    showInMenu: false,
    showInSettings: true,
    role: ["admin", "superAdmin", "customer"],
  },
  {
    label: "Change Password",
    component: <ChangePassword />,
    icon: <ChangePasswordIcon />,
    path: "change-password",
    showInMenu: false,
    showInSettings: true,
    role: ["admin", "superAdmin", "customer"],
  },
  {
    label: "Account",
    component: <> Add account component in admin routes </>,
    icon: <PeopleIcon />,
    path: "/accounts",
    showInMenu: false,
    showInSettings: true,
    role: ["admin", "superAdmin", "customer"],
  },
  {
    label: "Add Edit User",
    component: <AddEditUser />,
    icon: <PeopleIcon />,
    path: "add-edit/:id/:op/:role",
    showInMenu: false,
    showInSettings: false,
    role: ["admin", "superAdmin"],
  },
];
