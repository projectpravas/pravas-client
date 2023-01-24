import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled } from "@mui/material/styles";
import routes from "../../shared/routes/FrontendRoutes";
import { NavLink as NLink, Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const pages = ["Contact Us", "Blogs", "Pravas", "About Us", "Home"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 30px;
`;

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routes.map((route, i) => (
                <MenuItem key={route.path + i} onClick={handleCloseNavMenu}>
                  <NavLink
                    sx={{ color: "#fff" }}
                    to={route.path}
                    style={({ isActive }) => ({
                      color: isActive ? "grey" : "black",
                      borderBottom: isActive ? "3px solid #27488d" : "",
                    })}
                  >
                    {route.label}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
            <Container style={{ width: "30%", margin: "15px" }}>
              <img
                src="PTSM-LOGO.png"
                style={{ width: "100%", height: "100%" }}
              />
            </Container>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <Container style={{ width: "15%", margin: "15px" }}>
              <img
                src="PTSM-LOGO.png"
                style={{ width: "100%", height: "100%" }}
              />
            </Container>
            <Grid container sx={{ justifyContent: "right" }}>
              <Grid item>
                {routes.map((route, i) => (
                  <NavLink
                    key={route.path + i}
                    sx={{ color: "#fff" }}
                    to={route.path}
                    style={({ isActive }) => ({
                      color: isActive ? "grey" : "black",
                      borderBottom: isActive ? "3px solid #27488d" : "",
                    })}
                  >
                    {route.label}
                  </NavLink>
                ))}
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonAddAlt1Icon fontSize="large" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
