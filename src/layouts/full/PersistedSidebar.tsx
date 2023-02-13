import React, { ReactElement } from "react";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { NavLink as NLink, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLoggedUser } from "../../app/slices/AuthSlice";
import settingsRoutes from "../../shared/routes/AdminRoutes";
import { successToast } from "../../ui/toast/Toast";
import { Grid, Menu, MenuItem, ThemeProvider, Tooltip } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import SidebarRoutes from "./SidebarRoutes";
import AdminRoutes from "../../shared/routes/AdminRoutes";
import SecondaryAppbar from "./SecondaryAppbar";
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

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const PersistedSidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

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
            sx={{ mr: 2, ...(open && { display: "none" }) }}
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
                // maxHeight: { xs: "64px", md: "70px", lg: "90px" },
                // minHeight: { xs: "64px", md: "70px", lg: "90px" },
              }}
            >
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
                  {/* <Box sx={{ xs: "100%", sm: "50%" }}> */}
                  <img
                    src="/PTSM-LOGO.png"
                    // src="https://pravasthejourney.com/wp-content/uploads/2021/08/PTSM-LOGO1-1.png"
                    style={{ width: "100%", height: "auto" }}
                  />
                  {/* </Box> */}
                </NavLink>
              </Grid>
              <Grid item>
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
            </Grid>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <ThemeProvider theme={customTheme}>
          <DrawerHeader
            sx={{ minHeight: { xs: "64px", md: "70px", lg: "90px" } }}
          >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
        </ThemeProvider>
        <Divider />

        <SidebarMenu openStatus={false} />
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ position: "relative" }}>
          {pathname.split("/").length > 3 &&
            Array.isArray(AdminRoutes) &&
            AdminRoutes.map((route) => {
              if (route?.subMenus) return route?.path;
            }).includes(pathname.split("/")[2]) && (
              <SecondaryAppbar open={open} />
            )}
          <Box sx={{ pt: open ? 7 : 8 }}></Box>
          <SidebarRoutes />
        </Box>
      </Main>
    </Box>
  );
};
export default PersistedSidebar;
