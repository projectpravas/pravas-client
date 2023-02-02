import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import User from "../../shared/models/userModel";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import routes from "../../shared/routes/AdminRoutes";
import { NavLink as NLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../app/slices/AuthSlice";

interface ISidebarMenuProps {}

const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 10px;
`;

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = (props) => {
  const currentLoggedUser: User = useSelector(selectLoggedUser);
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
            .map(({ label, path, icon, roles }, i) => (
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
                  <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
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
                      <ListItemText primary={label} />
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
      </List>
    </>
  );
};

export default SidebarMenu;
