import { lazy } from "react";
import TourIcon from "@mui/icons-material/Tour";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const Tours = lazy(() => import("../../features/admin/tours/Tours"));
const Dashboard = lazy(
  () => import("../../features/admin/dashboard/Dashboard")
);
const Bookings = lazy(() => import("../../features/admin/bookings/Bookings"));
const Quotes = lazy(() => import("../../features/admin/quotes/Quotes"));
const Records = lazy(() => import("../../features/admin/records/Records"));
const Users = lazy(() => import("../../features/admin/users/Users"));

export default [
  {
    label: "Dashboard",
    component: <Dashboard />,
    icon: <DashboardCustomizeIcon />,
    path: "dashboard",
    showInMenu: true,
    roles: ["admin", "superadmin", "customer"],
  },
  {
    label: "Tours",
    component: <Tours />,
    icon: <TourIcon />,
    path: "tours",
    showInMenu: true,
    roles: ["admin", "superadmin", "customer"],
  },
  {
    label: "Bookings",
    component: <Bookings />,
    icon: <BookOnlineIcon />,
    path: "bookings",
    showInMenu: true,
    roles: ["admin", "superadmin", "customer"],
  },
  {
    label: "Quotes",
    component: <Quotes />,
    icon: <RequestQuoteIcon />,
    path: "quotes",
    showInMenu: true,
    roles: ["admin", "superadmin"],
  },
  {
    label: "Records",
    component: <Records />,
    icon: <ReceiptLongIcon />,
    path: "records",
    showInMenu: true,
    roles: ["admin", "superadmin"],
  },
  {
    label: "Users",
    component: <Users />,
    icon: <PeopleOutlineIcon />,
    path: "users",
    showInMenu: true,
    roles: ["admin", "superadmin"],
  },
];
