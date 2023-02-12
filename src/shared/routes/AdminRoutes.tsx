import { lazy } from "react";
import TourIcon from "@mui/icons-material/Tour";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import ChangePasswordIcon from "@mui/icons-material/LockReset";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CardTravelTwoToneIcon from "@mui/icons-material/CardTravelTwoTone";
import Enquiries from "../../features/admin/enquiries/Enquiries";

const Tours = lazy(() => import("../../features/admin/pravas/tours/Tours"));
const TourAndPackageForm = lazy(
  () => import("../../features/admin/pravas/TourAndPackageForm")
);
const Packages = lazy(
  () => import("../../features/admin/pravas/packages/Packages")
);
const Pravas = lazy(() => import("../../features/admin/pravas/Pravas"));
const Dashboard = lazy(
  () => import("../../features/admin/dashboard/Dashboard")
);
const Bookings = lazy(() => import("../../features/admin/bookings/Bookings"));
const Quotes = lazy(() => import("../../features/admin/enquiries/Enquiries"));
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
    path: "",
    showInMenu: false,
    showInSettings: false,
    roles: ["admin", "superAdmin", "customer"],
  },
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
    label: "Pravas",
    component: <Pravas />,
    icon: <TourIcon />,
    path: "pravas",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin", "customer"],
    subMenus: [
      {
        label: "Tour And Package Form",
        component: <TourAndPackageForm />,
        icon: <></>,
        path: ":base/add-edit/:0/:add/:admin",
        // path: "secured/pravas/packages/add-edit/0/edit/admin",
        showInMenu: false,
        showInSettings: false,
      },

      {
        label: "Packages",
        component: <Packages />,
        icon: <CardTravelTwoToneIcon />,
        path: "packages",
        showInMenu: true,
        showInSettings: false,
      },
      {
        label: "Tours",
        component: <Tours />,
        icon: <TravelExploreIcon />,
        path: "tours",
        showInMenu: true,
        showInSettings: false,
      },
    ],
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
    label: "Enquiries",
    component: <Enquiries />,
    icon: <RequestQuoteIcon />,
    path: "enquiries",
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
    component: <h1> Add account component in admin routes </h1>,
    icon: <PeopleIcon />,
    path: "accounts",
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

  // {
  //   label: "Packages",
  //   component: <Packages />,
  //   icon: <CardTravelTwoToneIcon />,
  //   path: "pravas/packages",
  //   showInMenu: true,
  //   showInSettings: false,
  // },
  // {
  //   label: "Tours",
  //   component: <Tours />,
  //   icon: <TravelExploreIcon />,
  //   path: "pravas/tours",
  //   showInMenu: true,
  //   showInSettings: false,
  // },
];
