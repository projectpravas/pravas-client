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
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ReviewList from "../../features/admin/reviews/ReviewList";
import MyWishlist from "../../features/admin/pravas/my-wishlist/MyWishlist";

const Tours = lazy(() => import("../../features/admin/pravas/tours/Tours"));
const MyTours = lazy(
  () => import("../../features/admin/pravas/my-tours/Mytours")
);
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
const Blogs = lazy(() => import("../../features/admin/blogs/Blogs"));
const BlogList = lazy(() => import("../../features/admin/blogs/BlogList"));
const AddBlogs = lazy(
  () => import("../../features/admin/blogs/AddBlog/AddBlog")
);
const Users = lazy(() => import("../../features/admin/users/Users"));
const Wishlist = lazy(() => import("../../features/admin/wishlist/Wishlist"));
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
    roles: ["admin", "superAdmin"],
  },
  {
    label: "Dashboard",
    component: <Dashboard />,
    // icon: <DashboardCustomizeIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/1.png" />,
    path: "dashboard",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin"],
  },

  {
    label: "Pravas",
    component: <Pravas />,
    // icon: <TourIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/2.png" />,

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
        showInMenu: false,
        showInSettings: false,
        roles: ["admin", "superAdmin"],
      },

      {
        label: "Packages",
        component: <Packages />,
        icon: <CardTravelTwoToneIcon />,
        path: "packages",
        showInMenu: true,
        showInSettings: false,
        roles: ["admin", "superAdmin"],
      },
      {
        label: "Tours",
        component: <Tours />,
        icon: <TravelExploreIcon />,
        path: "tours",
        showInMenu: true,
        showInSettings: false,
        roles: ["admin", "superAdmin"],
      },
      {
        label: "My Tours",
        component: <MyTours />,
        icon: <TravelExploreIcon />,
        path: "my-tours",
        showInMenu: true,
        showInSettings: false,
        roles: ["admin", "superAdmin", "customer"],
      },
      {
        label: "My Wishlist",
        component: <MyWishlist />,
        icon: <TravelExploreIcon />,
        path: "my-wishlist",
        showInMenu: true,
        showInSettings: false,
        roles: ["admin", "superAdmin", "customer"],
      },
    ],
  },
  {
    label: "Bookings",
    component: <Bookings />,
    // icon: <BookOnlineIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/3.png" />,
    path: "bookings",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin", "customer"],
  },
  {
    label: "Enquiries",
    component: <Enquiries />,
    // icon: <RequestQuoteIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/4.png" />,
    path: "enquiries",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin"],
  },
  {
    label: "Blogs",
    component: <Blogs />,
    // icon: <ReceiptLongIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/5.png" />,
    path: "admin-blogs",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin"],
    subMenus: [
      {
        label: "Blogs",
        component: <BlogList />,
        icon: <></>,
        path: "blogs",
        showInMenu: true,
        showInSettings: false,
        roles: ["admin", "superAdmin"],
      },
      {
        label: "Add and Edit Blogs",
        component: <AddBlogs />,
        icon: <></>,
        path: ":base/add-edit/:id/:add/:admin",
        showInMenu: false,
        showInSettings: false,
        roles: ["admin", "superAdmin"],
      },
    ],
  },
  {
    label: "Users",
    component: <Users />,
    // icon: <PeopleIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/6.png" />,
    path: "users",
    showInMenu: true,
    showInSettings: false,
    roles: ["superAdmin"],
  },
  {
    label: "Customers",
    component: <Users />,
    // icon: <PeopleIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/7.png" />,
    path: "customers",
    showInMenu: true,
    showInSettings: false,
    roles: ["admin", "superAdmin"],
  },

  {
    label: "Review List",
    component: <ReviewList />,
    // icon: <BookmarksOutlinedIcon />,
    icon: <img style={{ width: 24, height: 24 }} src="/8.png" />,
    path: "reviewlist",
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
    label: "Add Edit User",
    component: <AddEditUser />,
    icon: <PeopleIcon />,
    path: "add-edit/:id/:op/:role",
    showInMenu: false,
    showInSettings: false,
    role: ["admin", "superAdmin"],
  },
];
