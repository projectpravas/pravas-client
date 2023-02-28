import React, { useEffect } from "react";
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
import Box from "@mui/material/Box";

interface ISidebarMenuProps {
  openStatus: boolean;
}

const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 10px;
`;

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = ({
  openStatus,
}) => {
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
                          color: isActive ? "#f7a707" : "black",
                        })}
                      >
                        {icon}
                      </NavLink>
                    </ListItemIcon>
                    <NavLink
                      to={path}
                      style={({ isActive }) => ({
                        color: isActive ? "#f7a707" : "black",
                        // borderBottom: isActive ? "3px solid #27488d" : "black",
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
                      </Box>
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
