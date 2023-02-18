import React from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import SidebarMenu from "./SidebarMenu";
import SidebarRoutes from "./SidebarRoutes";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addLoggedUser } from "../../app/slices/AuthSlice";
import settingsRoutes from "../../shared/routes/AdminRoutes";
import { NavLink as NLink } from "react-router-dom";
import { successToast } from "../../ui/toast/Toast";
import AdminRoutes from "../../shared/routes/AdminRoutes";
import SecondaryAppbar from "../full/SecondaryAppbar";

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 200,
      md: 400,
      lg: 1200,
      xl: 1536,
    },
  },
});

const NavLink = styled(NLink)({
  textDecoration: "none",
  marginRight: "30px",
});

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const secondaryAppFlag =
    pathname.split("/").length >= 3 &&
    Array.isArray(AdminRoutes) &&
    AdminRoutes.map((route) => {
      if (route?.subMenus) return route?.path;
    }).includes(pathname.split("/")[2]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(addLoggedUser({}));
    successToast("Logged out...", 3000);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <ThemeProvider theme={customTheme}>
            <Grid
              container
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                height: { xs: "64px", md: "70px", lg: "90px" },
              }}
            >
              {!open && (
                <Grid
                  item
                  sx={{
                    width: { xs: "50%", sm: "10vw" },
                    minWidth: "70px",
                    margin: "15px",
                    maxHeight: "64px",
                  }}
                >
                  <NavLink to="/home">
                    <img
                      src="/PTSM-LOGO.png"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </NavLink>
                </Grid>
              )}
            </Grid>
            <Grid>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <ManageAccountsIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {Array.isArray(settingsRoutes) &&
                    settingsRoutes
                      .filter((route) => route?.showInSettings)
                      .map((route, i) => {
                        return (
                          <NavLink
                            key={route?.label + "-" + i}
                            to={`${route?.path}`}
                            sx={{
                              display: "block",
                              width: "100%",
                              color: "inherit",
                            }}
                            onClick={handleCloseUserMenu}
                          >
                            <MenuItem sx={{ textTransform: "capitalize" }}>
                              {route?.label}
                            </MenuItem>
                          </NavLink>
                        );
                      })}
                  {
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        handleLogout();
                      }}
                    >
                      {"Logout"}
                    </MenuItem>
                  }
                </Menu>
              </Box>
            </Grid>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            position: "fixed",
            zIndex: 1,
            backgroundColor: "#fff",
            width: open ? "240px" : "64px",
            transition: "0.2s ease-in-out",
          }}
        >
          <ThemeProvider theme={customTheme}>
            <DrawerHeader
              sx={{ minHeight: { xs: "64px", md: "70px", lg: "90px" } }}
            >
              <Grid container padding={1}>
                <NavLink to="/home">
                  <img
                    src="/PTSM-LOGO.png"
                    style={{ width: "100%", height: "auto" }}
                  />
                </NavLink>
              </Grid>
              <IconButton onClick={handleDrawerClose} sx={{ mr: 1 }}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
          </ThemeProvider>
          <Divider />
        </Box>
        <Box sx={{ mt: { xs: "64px", md: "70px", lg: "90px" } }}>
          {/* sidebar menu  */}
          <SidebarMenu openStatus={open} />
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader
          sx={{
            minHeight: { xs: "40px", md: "46px", lg: "66px" },
          }}
        />
        {/* sidebar routes */}
        {secondaryAppFlag && <SecondaryAppbar openStatus={open} />}
        <Box
          sx={{
            pt: secondaryAppFlag
              ? { xs: "72px", md: "72px", lg: "98px" }
              : "0px",
          }}
        >
          <SidebarRoutes />
        </Box>
      </Box>
    </Box>
  );
};
export default Sidebar;
