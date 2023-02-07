import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import User from "../../shared/models/userModel";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemText from "@mui/material/ListItemText";
import routes from "../../shared/routes/AdminRoutes";
import { NavLink as NLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../app/slices/AuthSlice";
import { Box, Collapse } from "@mui/material";
import StarBorder from "@mui/icons-material/StarBorder";
import { log } from "console";

interface ISidebarMenuProps {}

const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 10px;
`;

// const ExpandCollapseIcon = () => {
//   const [open, setOpen] = React.useState(true);
//   return ;
// };

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = (props) => {
  const currentLoggedUser: User = useSelector(selectLoggedUser);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
    console.log("child");
  };

  const parent = () => {
    console.log("parent");
  };

  return (
    <>
      <List>
        {Array.isArray(routes) &&
          routes
            .filter(
              (route) =>
                route?.showInMenu &&
                route?.roles?.includes(currentLoggedUser?.role as string)
            )
            .map(({ label, path, icon, roles, subMenu }, i) => (
              <NavLink
                end
                key={path + i}
                to={path}
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                <ListItem
                  key={path + i}
                  disablePadding
                  sx={{ display: "block", mt: 0 }}
                >
                  <ListItemButton
                    sx={{ minHeight: 48, px: 2.5 }}
                    onClick={parent}
                  >
                    <ListItemIcon
                      sx={{ minWidth: 0, justifyContent: "center", mr: 3 }}
                    >
                      <NavLink
                        to={path}
                        style={({ isActive }) => ({
                          color: isActive ? "grey" : "black",
                        })}
                      >
                        {icon}
                      </NavLink>
                    </ListItemIcon>
                    <NavLink
                      to={path}
                      style={({ isActive }) => ({
                        color: isActive ? "grey" : "black",
                        borderBottom: isActive ? "3px solid #27488d" : "black",
                      })}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <ListItemText
                          primary={label}
                          sx={{ marginRight: "20px" }}
                        />
                        {subMenu && (
                          <ListItemButton
                            onClick={(e) => {
                              handleClick();
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            {open ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                        )}
                      </Box>
                    </NavLink>
                  </ListItemButton>
                  {subMenu && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary="Starred" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  )}
                </ListItem>
              </NavLink>
            ))}
      </List>
    </>
  );
};

export default SidebarMenu;
